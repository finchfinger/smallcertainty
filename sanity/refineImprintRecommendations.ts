import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { imprintRecommendations } from "./imprintRecommendations";
import { slugify } from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before refining Imprint recommendations.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function refineImprintRecommendations(){
  const sectionId="catalogSection-imprint";
  const maxSortOrder=await client.fetch<number|null>(`*[_type == "catalogSection"] | order(sortOrder desc)[0].sortOrder`);
  const reviewedOn=new Date().toISOString().slice(0,10);
  let tx=client.transaction().createOrReplace({
    _id:sectionId,
    _type:"catalogSection",
    title:"Imprint",
    slug:{_type:"slug",current:"imprint"},
    icon:"miscellaneous",
    sortOrder:(maxSortOrder||0)+1,
    published:true,
  });

  imprintRecommendations.forEach((set,setIndex)=>{
    const topPick=set.recommendations[0];
    set.recommendations.forEach((recommendation,index)=>{
      const productId=`product-imprint-${set.slug}-${index+1}`;
      tx=tx.createOrReplace({
        _id:productId,
        _type:"product",
        name:recommendation.productName,
        slug:{_type:"slug",current:slugify(`${set.slug}-${recommendation.productName}`)},
        description:recommendation.note,
        outboundUrl:recommendation.productHref,
        published:true,
      });
    });
    tx=tx.createOrReplace({
      _id:`catalogItem-imprint-${set.slug}`,
      _type:"catalogItem",
      label:set.label,
      slug:{_type:"slug",current:set.slug},
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      section:{_type:"reference",_ref:sectionId},
      sortOrder:setIndex+1,
      rowStatus:"none",
      updated:false,
      published:true,
      intro:topPick.note,
      lastReviewed:reviewedOn,
      recommendations:set.recommendations.map((recommendation,index)=>({
        _key:`imprint-${set.slug}-${index+1}`,
        _type:"recommendation",
        rank:index+1,
        badge:index===0?"Best overall":index===1?"Runner up":"Also good",
        product:{_type:"reference",_ref:`product-imprint-${set.slug}-${index+1}`},
        editorialNote:recommendation.note,
        outboundUrlOverride:recommendation.productHref,
        published:true,
      })),
    });
  });

  await tx.commit();
  console.log(`Published ${imprintRecommendations.length} Imprint lists with ${imprintRecommendations.length*3} recommendations.`);
}

refineImprintRecommendations().catch(error=>{console.error(error);process.exit(1);});
