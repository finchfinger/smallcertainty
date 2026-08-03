import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before migrating.");

const client=createClient({projectId,dataset,token,apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01",useCdn:false});
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

type LegacyItem={_id:string;label:string;productName:string;outboundUrl:string};

async function migrate(){
  const items=await client.fetch<LegacyItem[]>(`*[_type == "catalogItem" && defined(productName) && defined(outboundUrl)]{_id,label,productName,outboundUrl}`);
  const products=new Map<string,LegacyItem>();
  items.forEach(item=>products.set(slugify(item.productName),item));

  let tx=client.transaction();
  products.forEach((item,slug)=>{ tx=tx.createIfNotExists({_id:`product-${slug}`,_type:"product",name:item.productName,slug:{_type:"slug",current:slug},outboundUrl:item.outboundUrl,published:true}); });
  items.forEach(item=>{
    const slug=slugify(item.productName);
    tx=tx.patch(item._id,patch=>patch.setIfMissing({
      slug:{_type:"slug",current:slugify(item.label)},
      recommendations:[{_key:`pick-${slug}`,_type:"recommendation",rank:1,product:{_type:"reference",_ref:`product-${slug}`},published:true}],
    }));
  });

  const result=await tx.commit();
  console.log(`Prepared ${items.length} catalog items and ${products.size} reusable products.`);
  return result;
}

migrate().catch(error=>{console.error(error);process.exit(1);});
