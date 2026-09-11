import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";
loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if(!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",useCdn:false});
type Link={status:string;httpStatus?:number;message?:string;label:string;url:string};
async function main(){
  const report=await client.fetch<{links:Link[]}>(`*[_id=="siteHealthReport-current"][0]{links}`);
  const broken=report.links.filter(link=>link.status==="broken");
  const groups=new Map<string,number>();
  for(const link of broken){const key=String(link.httpStatus||link.message||"Unknown");groups.set(key,(groups.get(key)||0)+1);}
  console.log([...groups.entries()].sort((a,b)=>b[1]-a[1]).map(([key,count])=>`${count}\t${key}`).join("\n"));
  console.log("\nBROKEN LINKS");
  console.log(broken.map(link=>`${link.httpStatus||"ERR"}\t${link.label}\t${link.url}`).join("\n"));
}
main().catch(error=>{console.error(error);process.exit(1);});
