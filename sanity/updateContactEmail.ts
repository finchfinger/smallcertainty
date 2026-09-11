import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",token,useCdn:false});
const email="hello@smallcertainty.com";
const mailto=`mailto:${email}`;

async function main(){
  const products=await client.fetch<Array<{_id:string;name?:string;outboundUrl?:string}>>(`*[_type=="product"&&outboundUrl match "mailto:*"]{_id,name,outboundUrl}`);
  const items=await client.fetch<Array<{_id:string;recommendations?:Array<{_key:string;outboundUrlOverride?:string}>}>>(`*[_type=="catalogItem"&&count(recommendations[outboundUrlOverride match "mailto:*"])>0]{_id,"recommendations":recommendations[]{_key,outboundUrlOverride}}`);
  let transaction=client.transaction();
  for(const product of products) transaction=transaction.patch(product._id,patch=>patch.set({outboundUrl:mailto}));
  for(const item of items){
    for(const recommendation of item.recommendations||[]){
      if(recommendation.outboundUrlOverride?.startsWith("mailto:")) transaction=transaction.patch(item._id,patch=>patch.set({[`recommendations[_key=="${recommendation._key}"].outboundUrlOverride`]:mailto}));
    }
  }
  const result=await transaction.commit();
  console.log(`Set ${products.length} product email links and ${items.length} catalog records to ${email}. Updated ${result.documentIds.length} documents.`);
  const publicDocs=await client.fetch<unknown[]>(`*[_type in ["product","catalogItem","article","siteSettings","catalogSection"]]`);
  const addresses=[...new Set(JSON.stringify(publicDocs).match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)||[])];
  console.log(`Public Sanity email addresses: ${addresses.join(", ")||"none"}`);
}
main().catch(error=>{console.error(error);process.exit(1);});
