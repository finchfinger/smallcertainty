import {createClient} from "@sanity/client";
import {imprintRecommendations} from "./imprintRecommendations";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const targets=[
  {id:"catalogItem-imprint-contact-method",slug:"contact-method"},
  {id:"catalogItem-imprint-instagram-account",slug:"instagram-account"},
];

async function main(){
  const documents=await client.fetch<{_id:string;recommendations:{_key:string;productId:string}[]}[]>(
    `*[_id in $ids]{_id,recommendations[]{_key,"productId":product._ref}}`,
    {ids:targets.map(target=>target.id)},
  );
  let tx=client.transaction();
  for(const target of targets){
    const content=imprintRecommendations.find(entry=>entry.slug===target.slug);
    const document=documents.find(entry=>entry._id===target.id);
    if(!content||!document||document.recommendations.length<3) throw new Error(`Incomplete profile data for ${target.slug}.`);
    const first=content.recommendations[0];
    tx=tx.patch(target.id,patch=>patch.set({
      label:content.label,
      directLink:false,
      productName:first.productName,
      outboundUrl:first.productHref,
      intro:first.note,
      rowStatus:"updated",
      lastReviewed:new Date().toISOString().slice(0,10),
    }));
    content.recommendations.forEach((recommendation,index)=>{
      const remote=document.recommendations[index];
      tx=tx
        .patch(target.id,patch=>patch
          .set({[`recommendations[_key=="${remote._key}"].editorialNote`]:recommendation.note})
          .set({[`recommendations[_key=="${remote._key}"].outboundUrlOverride`]:recommendation.productHref}))
        .patch(remote.productId,patch=>patch.set({name:recommendation.productName,description:recommendation.note,outboundUrl:recommendation.productHref}));
    });
  }
  await tx.commit();
  const verified=await client.fetch(`*[_id in $ids]|order(label asc){label,directLink,"winner":recommendations[0].product->name,"count":count(recommendations),"winnerWords":string::split(recommendations[0].editorialNote," ")}`,{ids:targets.map(target=>target.id)});
  console.log(JSON.stringify(verified.map((row:{winnerWords?:string[]}&Record<string,unknown>)=>({...row,winnerWords:row.winnerWords?.length})),null,2));
}

main().catch(error=>{console.error(error);process.exitCode=1;});
