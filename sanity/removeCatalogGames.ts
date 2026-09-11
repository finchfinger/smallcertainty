import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",token,useCdn:false});

async function main(){
  const items=await client.fetch<Array<{_id:string}>>(`*[_type=="catalogItem"&&label in ["Best Board Game","Best Chess Set"]]{_id}`);
  if(items.length) await client.delete({query:`*[_type=="catalogItem"&&label in ["Best Board Game","Best Chess Set"]]`});
  console.log(`Deleted ${items.length} catalog entries.`);
}
main().catch(error=>{console.error(error);process.exit(1);});
