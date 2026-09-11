import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",token,useCdn:false});

async function main(){
  const section=await client.fetch<{_id:string}|null>(`*[_type=="catalogSection"&&slug.current=="garden"][0]{_id}`);
  if(!section) throw new Error("Garden section not found.");
  await client.patch(section._id).set({title:"Garden"}).commit();
  console.log("Renamed Garden & Yard to Garden.");
}
main().catch(error=>{console.error(error);process.exit(1);});
