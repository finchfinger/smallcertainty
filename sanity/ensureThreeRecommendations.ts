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
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

type CatalogItem={
  _id:string;
  label:string;
  productName:string;
  outboundUrl?:string;
  recommendations?:Array<{_key?:string; rank?:number}>;
};
type RecommendationPatch={
  _key:string;
  _type:"recommendation";
  rank:number;
  badge:string;
  product:{_type:"reference"; _ref:string};
  editorialNote:string;
  published:boolean;
};

async function ensureThreeRecommendations(){
  const items=await client.fetch<CatalogItem[]>(`*[_type == "catalogItem" && published == true]{
    _id,
    label,
    productName,
    outboundUrl,
    recommendations[]{_key,rank}
  }`);

  let tx=client.transaction();
  let createdProducts=0;
  let addedRecommendations=0;

  items.forEach(item=>{
    const itemSlug=slugify(item.label||item.productName||item._id);
    const baseProductSlug=slugify(item.productName||item.label||item._id);
    const existingRanks=new Set((item.recommendations||[]).map(recommendation=>recommendation.rank).filter((rank):rank is number=>typeof rank==="number"));
    const additions:RecommendationPatch[]=[];

    for(const rank of [1,2,3]) {
      if(existingRanks.has(rank)) continue;
      const suffix=rank===1?"pick":rank===2?"runner-up":"third-pick";
      const productId=rank===1?`product-${baseProductSlug}`:`product-${itemSlug}-${suffix}`;
      const productName=rank===1?item.productName:`${item.productName} ${rank}`;
      const productSlug=productId.replace(/^product-/,"");

      tx=tx.createIfNotExists({
        _id:productId,
        _type:"product",
        name:productName,
        slug:{_type:"slug",current:productSlug},
        description:note,
        outboundUrl:rank===1&&item.outboundUrl?item.outboundUrl:`https://example.com/products/${productSlug}`,
        published:true,
      });
      createdProducts++;

      additions.push({
        _key:`pick-${rank}-${productSlug}`,
        _type:"recommendation",
        rank,
        badge:rank===1?"Best overall":rank===2?"Runner up":"Also good",
        product:{_type:"reference",_ref:productId},
        editorialNote:note,
        published:true,
      });
    }

    if(additions.length) {
      tx=tx.patch(item._id,patch=>patch.setIfMissing({recommendations:[]}).append("recommendations",additions));
      addedRecommendations+=additions.length;
    }
  });

  if(!addedRecommendations) {
    console.log(`All ${items.length} catalog items already have ranks 1–3.`);
    return;
  }

  await tx.commit();
  console.log(`Checked ${items.length} catalog items. Added ${addedRecommendations} recommendations and prepared ${createdProducts} products.`);
}

ensureThreeRecommendations().catch(error=>{console.error(error);process.exit(1);});
