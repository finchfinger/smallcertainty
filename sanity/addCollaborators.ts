import { createClient } from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding collaborators.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const collaborators=[
  ["best-editor","Best Editor","Eleanor Vale","https://example.com/eleanor-vale"],
  ["best-contributing-writer","Best Contributing Writer","Miles Hart","https://example.com/miles-hart"],
  ["best-foreign-correspondent","Best Foreign Correspondent","Anika Sato","https://example.com/anika-sato"],
  ["best-photographer","Best Photographer","Leo Mercer","https://example.com/leo-mercer"],
  ["best-researcher","Best Researcher","Clara Finch","https://example.com/clara-finch"],
] as const;

async function addCollaborators(){
  let transaction=client.transaction();
  collaborators.forEach(([id,role,name,url],index)=>{
    transaction=transaction.createOrReplace({
      _id:`collaborator-${id}`,
      _type:"collaborator",
      role,
      name,
      url,
      sortOrder:index+1,
      published:true,
    });
  });
  const result=await transaction.commit();
  console.log(`Added ${result.results.length} collaborator roles to ${projectId}/${dataset}.`);
}

addCollaborators().catch(error=>{
  console.error(error);
  process.exitCode=1;
});
