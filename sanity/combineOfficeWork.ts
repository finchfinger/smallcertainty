import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { officeRecommendations,slugify } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before combining Office and Work.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function combineOfficeWork(){
  const officeSection=await client.fetch<{_id:string}|null>(`*[_type == "catalogSection" && slug.current == "office"][0]{_id}`);
  if(!officeSection) throw new Error("Could not find Office section.");

  const oldOfficeItems=await client.fetch<{_id:string}[]>(`*[_type == "catalogItem" && section->slug.current == "office"]{_id}`);
  const oldWorkItems=await client.fetch<{_id:string}[]>(`*[_type == "catalogItem" && section->slug.current == "work"]{_id}`);
  const workSection=await client.fetch<{_id:string}|null>(`*[_type == "catalogSection" && slug.current == "work"][0]{_id}`);
  const today=new Date().toISOString().slice(0,10);
  let tx=client.transaction();

  [...oldOfficeItems,...oldWorkItems].forEach(item=>{
    tx=tx.patch(item._id,patch=>patch.set({published:false}));
  });

  tx=tx.patch(officeSection._id,patch=>patch.set({title:"Office",icon:"office",sortOrder:6,published:true}));
  if(workSection) tx=tx.patch(workSection._id,patch=>patch.set({published:false}));

  officeRecommendations.forEach(({label,recommendations},index)=>{
    const productName=recommendations[0].productName;
    const itemSlug=slugify(label);
    const itemId=`catalogItem-office-${itemSlug}`;

    recommendations.forEach(recommendation=>{
      const productSlug=slugify(recommendation.productName);
      const productId=`product-${productSlug}`;
      tx=tx.createOrReplace({
        _id:productId,
        _type:"product",
        name:recommendation.productName,
        slug:{_type:"slug",current:productSlug},
        description:recommendation.note,
        outboundUrl:recommendation.productHref,
        published:true,
      });
    });

    tx=tx.createOrReplace({
      _id:itemId,
      _type:"catalogItem",
      label,
      slug:{_type:"slug",current:itemSlug},
      productName,
      outboundUrl:recommendations[0].productHref,
      section:{_type:"reference",_ref:officeSection._id},
      sortOrder:index+1,
      updated:false,
      published:true,
      intro:recommendations[0].note,
      lastReviewed:today,
      recommendations:recommendations.map((recommendation,rankIndex)=>({
        _key:`pick-${rankIndex+1}-${slugify(recommendation.productName)}`,
        _type:"recommendation",
        rank:rankIndex+1,
        badge:rankIndex===0?"Best overall":rankIndex===1?"Runner up":"Also good",
        product:{_type:"reference",_ref:`product-${slugify(recommendation.productName)}`},
        editorialNote:recommendation.note,
        published:true,
      })),
    });
  });

  tx=tx
    .patch("catalogSection-culture",patch=>patch.set({sortOrder:7,published:true}))
    .patch("catalogSection-miscellaneous",patch=>patch.set({title:"Colophon",sortOrder:8,published:true}));

  await tx.commit();
  console.log(`Combined Office and Work into Office with ${officeRecommendations.length} rows.`);
}

combineOfficeWork().catch(error=>{
  const message=error instanceof Error ? error.message : String(error);
  console.error(`Office combine failed: ${message}`);
  process.exit(1);
});
