import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before updating Best Sunscreen.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const recommendations=[
  {
    rank:1,
    productId:"product-standard-procedure-spf-50-plus",
    name:"Standard Procedure SPF 50+",
    brand:"Standard Procedure",
    url:"https://standardprocedure.com/products/spf-50-sunscreen-8-5-fl-oz",
    note:"Standard Procedure begins with the conditions rather than the cosmetics. Developed on Australia’s Sunshine Coast and refined through a family sunscreen business, its SPF 50+ lotion is broad-spectrum, fast-absorbing and made for long hours outside, with four hours of water resistance. The generous 250 ml bottle belongs near the door, in a beach bag or on the shelf of a surf club; it encourages liberal application instead of treating sunscreen as a precious facial product. Australian superfruit extracts soften the formula, but the appeal is more direct: serious protection, useful volume and packaging with the confidence of equipment.",
  },
  {
    rank:2,
    productId:"product-mara-algae-zinc-sea-kale-sunscreen-serum-spf-30",
    name:"MARA Algae + Zinc Sea Kale Sunscreen Serum SPF 30",
    brand:"MARA",
    url:"https://themarabeauty.com/products/algae-zinc-sea-kale-sunscreen-serum",
    note:"MARA turns daily mineral sunscreen into a piece of skincare without disguising the protection. The fluid formula uses 13.2 per cent non-nano zinc oxide for broad-spectrum SPF 30, then adds algae, sea kale and plant oils for a distinctly dewy, face-oil finish. Gwyneth Paltrow’s endorsement brought it attention, but the object earns its place independently: a compact blue bottle, a measured two-pump application and a formula designed to sit comfortably beneath makeup. It is the refined city option in this group, best for someone who wants sunscreen to live alongside serums rather than beach supplies.",
  },
  {
    rank:3,
    productId:"product-vacation-classic-lotion-spf-30",
    name:"Vacation Classic Lotion SPF 30",
    brand:"Vacation",
    url:"https://vacation.inc/products/classic-lotion-spf-30",
    note:"Vacation’s Classic Lotion understands that sunscreen is easier to use when the occasion feels desirable. The broad-spectrum SPF 30 lotion is water-resistant for 80 minutes, rubs in quickly and comes in a straightforward 100 ml tube. Its signature fragrance, developed with ARQUISTE, assembles coconut, banana, pool water and even swimsuit fabric into a remarkably precise memory of a resort afternoon. The tone is playful, but the product is not a prop: it is practical body sunscreen for swimming, a long lunch outdoors or any day improved by remembering to leave the house.",
  },
] as const;

async function updateBestSunscreen(){
  const items=await client.fetch<Array<{_id:string}>>(
    `*[_type == "catalogItem" && slug.current == "best-sunscreen" && section->slug.current == "body"]{_id}`
  );

  if(!items.length) throw new Error("Could not find Body / Best Sunscreen (best-sunscreen).");

  let tx=client.transaction();
  recommendations.forEach(recommendation=>{
    tx=tx.createIfNotExists({
      _id:recommendation.productId,
      _type:"product",
      name:recommendation.name,
      slug:{_type:"slug",current:recommendation.productId.replace(/^product-/,"")},
      brand:recommendation.brand,
      description:recommendation.note,
      outboundUrl:recommendation.url,
      published:true,
    }).patch(recommendation.productId,patch=>patch.set({
      name:recommendation.name,
      brand:recommendation.brand,
      description:recommendation.note,
      outboundUrl:recommendation.url,
      published:true,
    }));
  });

  items.forEach(item=>{
    tx=tx.patch(item._id,patch=>patch.set({
      label:"Best Sunscreen",
      published:true,
      productName:recommendations[0].name,
      outboundUrl:recommendations[0].url,
      lastReviewed:new Date().toISOString().slice(0,10),
      recommendations:recommendations.map(recommendation=>({
        _key:`pick-${recommendation.rank}-${recommendation.productId.replace(/^product-/,"")}`,
        _type:"recommendation",
        rank:recommendation.rank,
        product:{_type:"reference",_ref:recommendation.productId},
        editorialNote:recommendation.note,
        outboundUrlOverride:recommendation.url,
        published:true,
      })),
    }));
  });

  await tx.commit();
  console.log(`Updated ${items.length} Body / Best Sunscreen record${items.length===1?"":"s"} with three ranked recommendations.`);
}

updateBestSunscreen().catch(error=>{console.error(error);process.exit(1);});
