import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { childrenRecommendations,petsRecommendations,wellnessRecommendations,slugify } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding Children, Pets, and Wellness.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const sections=[
  {title:"Children",icon:"children",sortOrder:5,recommendations:childrenRecommendations},
  {title:"Pets",icon:"pets",sortOrder:6,recommendations:petsRecommendations},
  {title:"Wellness",icon:"wellness",sortOrder:7,recommendations:wellnessRecommendations},
] as const;

const sectionOrder=[
  ["home",1],
  ["womens-clothing",2],
  ["mens-clothing",3],
  ["kitchen",4],
  ["travel",8],
  ["office",9],
  ["culture",10],
  ["miscellaneous",11],
] as const;

async function addChildrenPetsWellnessSections(){
  const today=new Date().toISOString().slice(0,10);
  let tx=client.transaction();

  sectionOrder.forEach(([slug,sortOrder])=>{
    tx=tx.patch(`catalogSection-${slug}`,patch=>patch.set({sortOrder,published:true}));
  });

  sections.forEach(section=>{
    const sectionSlug=slugify(section.title);
    const sectionId=`catalogSection-${sectionSlug}`;

    tx=tx.createOrReplace({
      _id:sectionId,
      _type:"catalogSection",
      title:section.title,
      slug:{_type:"slug",current:sectionSlug},
      icon:section.icon,
      sortOrder:section.sortOrder,
      published:true,
    });

    section.recommendations.forEach((row,rowIndex)=>{
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
  });

  await tx.commit();
  const rowCount=sections.reduce((sum,section)=>sum+section.recommendations.length,0);
  console.log(`Added Children, Pets, and Wellness: ${rowCount} rows and ${rowCount*3} recommendations.`);
}

addChildrenPetsWellnessSections().catch(error=>{console.error(error);process.exit(1);});
