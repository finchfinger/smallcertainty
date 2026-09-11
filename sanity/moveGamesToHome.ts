import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",token,useCdn:false});

async function main(){
  const home=await client.fetch<{_id:string}|null>(`*[_type=="catalogSection"&&slug.current=="home"][0]{_id}`);
  if(!home) throw new Error("Home section not found.");
  const items=await client.fetch<Array<{_id:string;label:string}>>(`*[_type=="catalogItem"&&label in ["Best Board Game","Best Chess Set"]]{_id,label}`);
  const itemIds=items.map(item=>item._id);
  const maxOrder=await client.fetch<number>(`coalesce(*[_type=="catalogItem"&&section._ref==$homeId&&!(_id in $itemIds)]|order(sortOrder desc)[0].sortOrder,0)`,{homeId:home._id,itemIds});
  let transaction=client.transaction();
  items.sort((a,b)=>(a.label==="Best Board Game"?0:1)-(b.label==="Best Board Game"?0:1)).forEach((item,index)=>{
    transaction=transaction.patch(item._id,patch=>patch.set({section:{_type:"reference",_ref:home._id},sortOrder:maxOrder+index+1,published:true}));
  });
  await transaction.commit();
  console.log(`Moved ${items.length} game entries from Culture to Home.`);
}
main().catch(error=>{console.error(error);process.exit(1);});
