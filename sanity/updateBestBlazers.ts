import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { menRecommendations, slugify } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before updating Best Blazer.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const row=menRecommendations.find(item=>item.label==="Best Blazer");

if(!row) throw new Error("Best Blazer is missing from the men’s seed data.");
const recommendations=row.recommendations;

async function updateBestBlazers(){
  const items=await client.fetch<{_id:string}[]>(
    `*[_type == "catalogItem" && label == "Best Blazer" && section->slug.current in ["men", "mens-clothing", "men-s-clothing"]]{_id}`
  );

  if(items.length===0) throw new Error("Could not find Men / Best Blazer.");

  let tx=client.transaction();
  recommendations.forEach(recommendation=>{
    const productSlug=slugify(recommendation.productName);
    const productId=`product-${productSlug}`;
    tx=tx.createIfNotExists({
      _id:productId,
      _type:"product",
      name:recommendation.productName,
      slug:{_type:"slug",current:productSlug},
      description:recommendation.note,
      outboundUrl:recommendation.productHref,
      published:true,
    }).patch(productId,patch=>patch.set({
      name:recommendation.productName,
      description:recommendation.note,
      outboundUrl:recommendation.productHref,
      published:true,
    }));
  });

  items.forEach(item=>{
    const topPick=recommendations[0];
    tx=tx.patch(item._id,patch=>patch.set({
      published:true,
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      intro:topPick.note,
      lastReviewed:new Date().toISOString().slice(0,10),
      recommendations:recommendations.map((recommendation,index)=>{
        const rank=index+1;
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
  const saved=await client.fetch<Array<{_id:string; names:string[]}>>(
    `*[_type == "catalogItem" && label == "Best Blazer" && section->slug.current in ["men", "mens-clothing", "men-s-clothing"]]{_id,"names":recommendations[].product->name}`
  );
  const expected=recommendations.map(recommendation=>recommendation.productName);
  const invalid=saved.filter(item=>JSON.stringify(item.names)!==JSON.stringify(expected));
  if(saved.length!==items.length||invalid.length>0) throw new Error("Sanity verification failed for Men / Best Blazer.");

  console.log(`Updated and verified ${saved.length} Men / Best Blazer document(s): ${expected.join(" / ")}.`);
}

updateBestBlazers().catch(error=>{console.error(error);process.exit(1);});
