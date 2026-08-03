import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { childrenRecommendations,slugify } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding Kids categories.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const sectionSlug="children";
const sectionId=`catalogSection-${sectionSlug}`;
const labelsToAdd=new Set([
  "Best Balance Bike",
  "Best Raincoat",
  "Best Wooden Blocks",
  "Best Toy Car",
  "Best Children’s Chair",
]);

async function addMonocleKidsCategories(){
  const today=new Date().toISOString().slice(0,10);
  const currentCount=await client.fetch<number>(
    `count(*[_type == "catalogItem" && section._ref == $sectionId && published == true])`,
    {sectionId},
  );
  const rows=childrenRecommendations.filter(row=>labelsToAdd.has(row.label));
  let tx=client.transaction();

  rows.forEach((row,rowIndex)=>{
    const itemSlug=slugify(row.label);
    const itemId=`catalogItem-${sectionSlug}-${itemSlug}`;
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

    tx=tx.createOrReplace({
      _id:itemId,
      _type:"catalogItem",
      label:row.label,
      slug:{_type:"slug",current:itemSlug},
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      section:{_type:"reference",_ref:sectionId},
      sortOrder:currentCount+rowIndex+1,
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
          outboundUrlOverride:recommendation.productHref,
          published:true,
        };
      }),
    });
  });

  await tx.commit();
  console.log(`Added ${rows.length} Kids categories and ${rows.length*3} recommendations.`);
}

addMonocleKidsCategories().catch(error=>{
  console.error(error instanceof Error?error.message:"Unable to update the Kids categories.");
  process.exit(1);
});
