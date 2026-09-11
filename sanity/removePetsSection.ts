import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",token,useCdn:false});

async function main(){
  const sections=await client.fetch<Array<{_id:string}>>(`*[_type=="catalogSection"&&slug.current=="pets"]{_id}`);
  const sectionIds=sections.map(section=>section._id);
  const items=sectionIds.length?await client.fetch<Array<{_id:string}>>(`*[_type=="catalogItem"&&section._ref in $sectionIds]{_id}`,{sectionIds}):[];
  let transaction=client.transaction();
  for(const section of sections) transaction=transaction.patch(section._id,patch=>patch.set({published:false}));
  for(const item of items) transaction=transaction.patch(item._id,patch=>patch.set({published:false}));
  if(sections.length||items.length) await transaction.commit();
  console.log(`Unpublished ${sections.length} Pets section and ${items.length} Pets items.`);
}
main().catch(error=>{console.error(error);process.exit(1);});
