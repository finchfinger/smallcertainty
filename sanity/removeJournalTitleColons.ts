import { createClient } from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"8luodcfj";
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;

if(!token) throw new Error("Set SANITY_API_WRITE_TOKEN before updating Journal titles.");

const client=createClient({projectId,dataset,token,apiVersion:"2025-01-01",useCdn:false});
const titles:Record<string,string>={
  "article-kluane-mountaineering-made-for-the-long-cold":"Kluane Mountaineering — Made for the Long Cold",
  "article-one-good-street-jaegersborggade":"One Good Street — Jægersborggade, Copenhagen",
  "article-the-patagonia-test":"The Best Thing He Could Make",
  "article-lamp-for-the-hour-before-dinner":"A Lamp for the Hour Before Dinner",
  "article-weekly-certainties-001":"Weekly Certainties No. 001 — The Useful Pile",
};

async function main(){
  let transaction=client.transaction();
  for(const [id,title] of Object.entries(titles)){
    transaction=transaction.patch(id,operation=>operation.set({title}));
    const draftId=`drafts.${id}`;
    if(await client.getDocument(draftId)) transaction=transaction.patch(draftId,operation=>operation.set({title}));
  }
  const result=await transaction.commit();
  console.log(`Updated ${result.results.length} Journal title records in ${projectId}/${dataset}.`);
}

main().catch(error=>{
  console.error(error instanceof Error?error.message:error);
  process.exitCode=1;
});
