import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding recommendations.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const note="Through workshops, illustration systems and careful typographic choices, Hymn has built something that operates at human scale within technological infrastructure. The mascot guides without lecturing. The colours signal without shouting. The sub-brands distinguish themselves without fragmenting. In an industry that often designs for buildings first and people second, Shareman reverses the priority, a benevolent companion that happens to automate your laundry payments.";

async function addBestTowelsRecommendations(){
  const item=await client.fetch<{_id:string; recommendations?:Array<{_key?:string; rank?:number}>}|null>(
    `*[_type == "catalogItem" && slug.current == "best-towels" && section->slug.current == "home"][0]{_id,recommendations}`
  );

  if(!item) throw new Error("Could not find Home / Best Towels.");

  const existingRanks=new Set((item.recommendations||[]).map(recommendation=>recommendation.rank).filter(Boolean));
  const additions=[
    {rank:2,productId:"product-bestest-towels-runner-up",name:"Bestest Towels",badge:"Runner up"},
    {rank:3,productId:"product-bestest-towels-budget-pick",name:"Bestest Towels",badge:"Budget pick"},
  ].filter(addition=>!existingRanks.has(addition.rank));

  if(!additions.length) {
    console.log("Home / Best Towels already has rank 2 and rank 3 recommendations.");
    return;
  }

  let tx=client.transaction();
  additions.forEach(addition=>{
    tx=tx.createIfNotExists({
      _id:addition.productId,
      _type:"product",
      name:addition.name,
      slug:{_type:"slug",current:addition.productId.replace(/^product-/,"")},
      description:note,
      outboundUrl:`https://example.com/products/${addition.productId.replace(/^product-/,"")}`,
      published:true,
    });
  });

  tx=tx.patch(item._id,patch=>patch.setIfMissing({recommendations:[]}).append("recommendations",additions.map(addition=>({
    _key:`pick-${addition.rank}-${addition.productId.replace(/^product-/,"")}`,
    _type:"recommendation",
    rank:addition.rank,
    badge:addition.badge,
    product:{_type:"reference",_ref:addition.productId},
    editorialNote:note,
    published:true,
  }))));

  await tx.commit();
  console.log(`Added ${additions.length} recommendations to Home / Best Towels.`);
}

addBestTowelsRecommendations().catch(error=>{console.error(error);process.exit(1);});
