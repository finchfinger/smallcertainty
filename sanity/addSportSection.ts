import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { slugify,sportRecommendations } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding Sport.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const sectionOrder=[
  ["home",1],
  ["womens-clothing",2],
  ["mens-clothing",3],
  ["kitchen",4],
  ["children",5],
  ["pets",6],
  ["body",7],
  ["sport",8],
  ["travel",9],
  ["office",10],
  ["culture",11],
  ["miscellaneous",12],
] as const;

async function addSportSection(){
  const today=new Date().toISOString().slice(0,10);
  const existingSections=await client.fetch<{_id:string; slug?:{current?:string}}[]>(
    `*[_type == "catalogSection" && slug.current in $slugs]{_id,slug}`,
    {slugs:sectionOrder.map(([slug])=>slug)},
  );
  const existingSectionIdBySlug=new Map(existingSections.map(section=>[section.slug?.current,section._id]));
  const wellnessWalkingItems=await client.fetch<{_id:string}[]>(
    `*[_type == "catalogItem" && slug.current == "best-walking-shoe" && section->slug.current in ["wellness","body"]]{_id}`,
  );

  let tx=client.transaction();

  sectionOrder.forEach(([slug,sortOrder])=>{
    const sectionId=existingSectionIdBySlug.get(slug);
    if(sectionId) tx=tx.patch(sectionId,patch=>patch.set({sortOrder,published:true}));
  });

  wellnessWalkingItems.forEach(item=>{
    tx=tx.patch(item._id,patch=>patch.set({published:false}));
  });

  tx=tx.createOrReplace({
    _id:"catalogSection-sport",
    _type:"catalogSection",
    title:"Sport",
    slug:{_type:"slug",current:"sport"},
    icon:"sport",
    sortOrder:8,
    published:true,
  });

  sportRecommendations.forEach((row,rowIndex)=>{
    const itemSlug=slugify(row.label);
    const itemId=`catalogItem-sport-${itemSlug}`;
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
      section:{_type:"reference",_ref:"catalogSection-sport"},
      sortOrder:rowIndex+1,
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
  console.log(`Added Sport: ${sportRecommendations.length} rows and ${sportRecommendations.length*3} recommendations. Removed Best Walking Shoe from Wellness.`);
}

addSportSection().catch(error=>{console.error(error);process.exit(1);});
