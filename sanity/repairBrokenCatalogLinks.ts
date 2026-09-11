import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";
loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
const apply=process.argv.includes("--apply");
if(!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
if(apply&&!token) throw new Error("SANITY_API_WRITE_TOKEN is required with --apply.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",token,useCdn:false});
type HealthLink={status:string;httpStatus?:number;sourceId:string;url:string};
type Item={_id:string;recommendations:Array<{_key:string;outboundUrlOverride?:string;product?:{_id:string;outboundUrl?:string}}>};
const replacements:Record<string,string>={
  "https://hawswateringcans.com/":"https://haws.co.uk/collections/two-gallon",
};
const replacement=(value:string)=>{if(replacements[value]) return replacements[value];const url=new URL(value);return `${url.protocol}//${url.host}/`;};

async function main(){
  const report=await client.fetch<{links:HealthLink[]}>(`*[_id=="siteHealthReport-current"][0]{links}`);
  const confirmed=report.links.filter(link=>link.status==="broken"&&[404,410,500].includes(link.httpStatus||0)&&/^https?:/.test(link.url));
  const ids=[...new Set(confirmed.map(link=>link.sourceId))];
  const items=await client.fetch<Item[]>(`*[_type=="catalogItem"&&_id in $ids]{_id,"recommendations":recommendations[]{_key,outboundUrlOverride,"product":product->{_id,outboundUrl}}}`,{ids});
  const broken=new Set(confirmed.map(link=>`${link.sourceId}|${link.url}`));
  const changes=items.flatMap(item=>item.recommendations.flatMap(recommendation=>{
    const oldUrl=recommendation.outboundUrlOverride||recommendation.product?.outboundUrl;
    if(!oldUrl||!broken.has(`${item._id}|${oldUrl}`)) return [];
    return [{itemId:item._id,key:recommendation._key,productId:recommendation.product?._id,oldUrl,newUrl:replacement(oldUrl)}];
  }));
  console.log(`${apply?"APPLY":"DRY RUN"}: ${changes.length} confirmed dead catalog destinations will fall back to their official site homepages.`);
  changes.slice(0,30).forEach(change=>console.log(`${change.oldUrl} -> ${change.newUrl}`));
  if(!apply) return;
  let tx=client.transaction();
  for(const change of changes){
    tx=tx.patch(change.itemId,patch=>patch.set({[`recommendations[_key=="${change.key}"].outboundUrlOverride`]:change.newUrl}));
    if(change.productId) tx=tx.patch(change.productId,patch=>patch.set({outboundUrl:change.newUrl}));
  }
  const result=await tx.commit();
  console.log(`Updated ${result.documentIds.length} Sanity documents.`);
}
main().catch(error=>{console.error(error);process.exit(1);});
