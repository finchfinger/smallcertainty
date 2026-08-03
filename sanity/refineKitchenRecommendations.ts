import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { kitchenRecommendations,slugify } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before refining Kitchen.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

type ExistingItem={_id:string; label:string; slug?:{current?:string}};

async function refineKitchenRecommendations(){
  const section=await client.fetch<{_id:string}|null>(`*[_type == "catalogSection" && slug.current == "kitchen"][0]{_id}`);
  if(!section) throw new Error("Could not find Kitchen section.");

  const existingItems=await client.fetch<ExistingItem[]>(`*[_type == "catalogItem" && section->_id == $sectionId]{_id,label,slug}`,{sectionId:section._id});
  const itemIdByLabel=new Map(existingItems.map(item=>[item.label,item._id]));
  const today=new Date().toISOString().slice(0,10);
  let tx=client.transaction();

  kitchenRecommendations.forEach((row,index)=>{
    const itemSlug=slugify(row.label);
    const itemId=itemIdByLabel.get(row.label)||`catalogItem-kitchen-${itemSlug}`;
    const topPick=row.recommendations[0];

    row.recommendations.forEach(recommendation=>{
      const productSlug=slugify(recommendation.productName);
      tx=tx.createOrReplace({
        _id:`product-${productSlug}`,
        _type:"product",
        name:recommendation.productName,
        slug:{_type:"slug",current:productSlug},
        description:recommendation.note,
        outboundUrl:recommendation.productHref,
        published:true,
      });
    });

    tx=tx.createIfNotExists({
      _id:itemId,
      _type:"catalogItem",
      label:row.label,
      slug:{_type:"slug",current:itemSlug},
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      section:{_type:"reference",_ref:section._id},
      sortOrder:index+1,
      updated:false,
      published:true,
      intro:topPick.note,
      lastReviewed:today,
      recommendations:[],
    });

    tx=tx.patch(itemId,patch=>patch.set({
      label:row.label,
      slug:{_type:"slug",current:itemSlug},
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      section:{_type:"reference",_ref:section._id},
      sortOrder:index+1,
      updated:false,
      published:true,
      intro:topPick.note,
      lastReviewed:today,
      recommendations:row.recommendations.map((recommendation,recommendationIndex)=>{
        const rank=recommendationIndex+1;
        const productSlug=slugify(recommendation.productName);
        return {
          _key:`pick-${rank}-${productSlug}`,
          _type:"recommendation",
          rank,
          badge:rank===1?"Best overall":rank===2?"Runner up":"Also good",
          product:{_type:"reference",_ref:`product-${productSlug}`},
          editorialNote:recommendation.note,
          published:true,
        };
      }),
    }));
  });

  await tx.commit();
  console.log(`Refined Kitchen with ${kitchenRecommendations.length} rows and ${kitchenRecommendations.length*3} recommendations.`);
}

refineKitchenRecommendations().catch(error=>{console.error(error);process.exit(1);});
