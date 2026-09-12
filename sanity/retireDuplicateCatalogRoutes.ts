import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

type Row={_id:string;_updatedAt:string;label:string;section?:string;slug?:string};
async function main(){
  const rows=await client.fetch<Row[]>(`*[_type=="catalogItem"&&published==true]{_id,_updatedAt,label,"section":section->slug.current,"slug":slug.current}`);
  const routes=new Map<string,Row[]>();
  for(const row of rows){
    if(!row.section||!row.slug) continue;
    const key=`${row.section}/${row.slug}`;
    routes.set(key,[...(routes.get(key)||[]),row]);
  }
  const retired:Row[]=[];
  let transaction=client.transaction();
  for(const duplicates of routes.values()){
    if(duplicates.length<2) continue;
    const canonical=[...duplicates].sort((a,b)=>b._updatedAt.localeCompare(a._updatedAt))[0];
    for(const row of duplicates){
      if(row._id===canonical._id) continue;
      transaction=transaction.patch(row._id,patch=>patch.set({published:false}));
      retired.push(row);
    }
  }
  if(retired.length) await transaction.commit();
  console.log(JSON.stringify({retired:retired.length,ids:retired.map(row=>row._id)},null,2));
}

main().catch(error=>{console.error(error);process.exitCode=1;});
