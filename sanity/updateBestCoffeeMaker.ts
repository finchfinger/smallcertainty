import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const productId="product-ratio-eight-series-2";
const productName="Ratio Eight Series 2";
const brand="Ratio";
const url="https://ratiocoffee.com/products/ratio-eight-series-2-coffee-maker?srsltid=AU7gw4Xxjai7afbewvbZMD_P0YikUA8WId1Rkyz6GgTyw6OSyAzVfXYM";
const description=`The Ratio Eight Series 2 is the coffee maker for a household that values pour-over clarity but does not wish to stage a small performance before breakfast. It automates bloom, water delivery, and timing while leaving the consequential choices with the person making the coffee: beans, grind, dose, and freshness. The result is unusually good filter coffee from a machine that feels composed rather than over-equipped.

Its hot-water path combines borosilicate glass, stainless steel, a compact aluminum heating element, and minimal silicone connections. A stainless flat-bottom basket distributes extraction evenly, while two brew programs adjust pulsing and bloom for full or smaller batches. The 40-ounce capacity serves a table without becoming commercial equipment, and the open architecture makes the brewing process legible instead of concealing it behind molded plastic.

Living with it is straightforward, though not entirely effortless. The carafe and dripper need rinsing after use, neither belongs in the dishwasher, and the glass version rewards prompt serving because there is no hot plate slowly cooking the pot. At 14 pounds and 14 inches high, it also asks for permanent counter space. In return, operation is immediate, with no app, clock, or menu to negotiate.

The price is considerable, and cheaper brewers can meet the same temperature standards. What distinguishes the Ratio is the completeness of the object: sound brewing engineering, repairable-looking construction, tactile materials, and controls that respect a half-awake user. It turns a technically demanding method into a dependable domestic routine without making the coffee anonymous. For daily filter coffee made in serious quantities, this is where the search can stop.`;

type Recommendation={_key:string;_type?:string;rank:number;badge?:string;product:{_type:string;_ref:string};editorialNote?:string;outboundUrlOverride?:string;published?:boolean};
type CatalogItem={_id:string;recommendations:Recommendation[]};

async function main(){
  const items=await client.fetch<CatalogItem[]>(`*[_type=="catalogItem" && label=="Best Coffee Maker"]{_id,recommendations}`);
  if(items.length===0) throw new Error("Could not find Best Coffee Maker.");

  let tx=client.transaction().createIfNotExists({
    _id:productId,
    _type:"product",
    name:productName,
    brand,
    slug:{_type:"slug",current:"ratio-eight-series-2"},
    description,
    outboundUrl:url,
    published:true,
  }).patch(productId,patch=>patch.set({name:productName,brand,description,outboundUrl:url,published:true}));

  for(const item of items){
    const otherRecommendations=(item.recommendations||[]).filter(recommendation=>recommendation.rank!==1);
    const recommendations:Recommendation[]=[{
      _key:"pick-1-ratio-eight-series-2",
      _type:"recommendation",
      rank:1,
      badge:"Best overall",
      product:{_type:"reference",_ref:productId},
      editorialNote:description,
      outboundUrlOverride:url,
      published:true,
    },...otherRecommendations].sort((a,b)=>a.rank-b.rank);

    tx=tx.patch(item._id,patch=>patch.set({
      productName,
      outboundUrl:url,
      intro:description,
      recommendations,
      lastReviewed:new Date().toISOString().slice(0,10),
      published:true,
    }));
  }

  await tx.commit();

  const saved=await client.fetch<Array<{_id:string;productName:string;outboundUrl:string;description:string;recommendationNames:string[]}>>(
    `*[_type=="catalogItem" && label=="Best Coffee Maker"]{_id,productName,outboundUrl,"description":intro,"recommendationNames":recommendations[published!=false]|order(rank asc).product->name}`
  );
  const invalid=saved.filter(item=>item.productName!==productName||item.outboundUrl!==url||item.description!==description||item.recommendationNames[0]!==productName);
  if(saved.length!==items.length||invalid.length>0) throw new Error("Sanity verification failed for Best Coffee Maker.");

  console.log(`Updated and verified ${saved.length} Best Coffee Maker document(s): ${saved[0].recommendationNames.join(" / ")}.`);
}

main().catch(error=>{console.error(error);process.exit(1);});
