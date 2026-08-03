import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { seedSections } from "./seedData";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");
const client=createClient({projectId,dataset,token,apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01",useCdn:false});
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

async function seed(){
  let tx=client.transaction();
  seedSections.forEach((section,sectionIndex)=>{
    const sectionId=`catalogSection-${slugify(section.title)}`;
    tx=tx.createOrReplace({_id:sectionId,_type:"catalogSection",title:section.title,slug:{_type:"slug",current:slugify(section.title)},icon:section.icon,sortOrder:sectionIndex+1,published:true});
    section.items.forEach(([label,productName],itemIndex)=>{ const slug=slugify(productName); tx=tx.createOrReplace({_id:`catalogItem-${slug}`,_type:"catalogItem",label,productName,outboundUrl:`https://example.com/products/${slug}`,section:{_type:"reference",_ref:sectionId},sortOrder:itemIndex+1,updated:itemIndex===3,published:true,lastReviewed:new Date().toISOString().slice(0,10)}); });
  });
  const result=await tx.commit(); console.log(`Seeded ${result.results.length} documents into ${projectId}/${dataset}.`);
}
seed().catch(error=>{ console.error(error); process.exit(1); });
