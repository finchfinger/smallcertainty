import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before renaming Wellness to Body.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function renameWellnessToBody(){
  const wellnessSections=await client.fetch<{_id:string}[]>(
    `*[_type == "catalogSection" && slug.current == "wellness"]{_id}`,
  );
  const bodySections=await client.fetch<{_id:string}[]>(
    `*[_type == "catalogSection" && slug.current == "body"]{_id}`,
  );

  let tx=client.transaction();

  wellnessSections.forEach(section=>{
    tx=tx.patch(section._id,patch=>patch.set({
      title:"Body",
      slug:{_type:"slug",current:"body"},
      icon:"body",
      sortOrder:7,
      published:true,
    }));
  });

  bodySections.forEach(section=>{
    tx=tx.patch(section._id,patch=>patch.set({
      title:"Body",
      icon:"body",
      sortOrder:7,
      published:true,
    }));
  });

  await tx.commit();
  console.log(`Renamed Wellness to Body. Updated ${wellnessSections.length+bodySections.length} section document(s).`);
}

renameWellnessToBody().catch(error=>{console.error(error);process.exit(1);});
