import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { infrastructureRecommendations } from "./infrastructureRecommendations";
import { slugify } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before refining Infrastructure recommendations.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function refineInfrastructureRecommendations(){
  const sectionId="catalogSection-infrastructure";
  const existingSection=await client.fetch<{sortOrder?:number}|null>(`*[_id == $sectionId][0]{sortOrder}`,{sectionId});
  const maxSortOrder=await client.fetch<number|null>(`*[_type == "catalogSection"] | order(sortOrder desc)[0].sortOrder`);
  const sectionSortOrder=existingSection?.sortOrder??(maxSortOrder||0)+1;
  const reviewedOn=new Date().toISOString().slice(0,10);

  let tx=client.transaction().createOrReplace({
    _id:sectionId,
    _type:"catalogSection",
    title:"Infrastructure",
    slug:{_type:"slug",current:"infrastructure"},
    icon:"miscellaneous",
    sortOrder:sectionSortOrder,
    published:true,
  });

  infrastructureRecommendations.forEach((set,setIndex)=>{
    const topPick=set.recommendations[0];
    const itemSlug=slugify(set.label);

    set.recommendations.forEach(recommendation=>{
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
      _id:`catalogItem-infrastructure-${itemSlug}`,
      _type:"catalogItem",
      label:set.label,
      slug:{_type:"slug",current:itemSlug},
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      section:{_type:"reference",_ref:sectionId},
      sortOrder:setIndex+1,
      rowStatus:"none",
      updated:false,
      published:true,
      intro:topPick.note,
      lastReviewed:reviewedOn,
      recommendations:set.recommendations.map((recommendation,index)=>{
        const rank=index+1;
        const productSlug=slugify(recommendation.productName);
        return {
          _key:`infrastructure-${itemSlug}-${productSlug}`,
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
  console.log(`Published ${infrastructureRecommendations.length} Infrastructure lists with ${infrastructureRecommendations.length*3} real recommendations.`);
}

refineInfrastructureRecommendations().catch(error=>{console.error(error);process.exit(1);});
