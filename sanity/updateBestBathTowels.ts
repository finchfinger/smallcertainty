import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before updating Best Bath Towels.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const recommendations=[
  {
    rank:1,
    productId:"product-dusen-dusen-bug-stripe-towels",
    name:"Dusen Dusen Bug Stripe Towels",
    brand:"Dusen Dusen",
    url:"https://www.dusendusen.com/products/bug-stripe-towels?variant=47907624747229",
    note:"Dusen Dusen treats the bathroom as a place where colour is allowed to do some work. The Bug Stripe towels are substantial Portuguese terry, but the real pleasure is graphic: each scale receives its own insect, palette and rhythm. A bath towel becomes less anonymous without becoming novelty merchandise. At 700 GSM it still performs the ordinary assignment properly, absorbing generously and recovering its shape without feeling like hotel equipment. Buy the mixed set rather than forcing a match; the slight disorder is the point. Different stripes hanging together give an ordinary bathroom the relaxed intelligence of a room assembled over time rather than purchased in an afternoon. The pattern is lively enough to carry white tile and plain fittings, while the weight keeps the object grounded and useful. This is decoration with a job to do, and it earns its place on the rail by making the whole room look awake.",
  },
  {
    rank:2,
    productId:"product-shinto-2-5-ply-gauze-bath-towel-l",
    name:"Shinto Towel 2.5-ply Gauze Bath Towel",
    brand:"Shinto Towel",
    url:"https://store.shinto-towel.jp/products/2-5-ply-gauze-bath-towel-l",
    note:"Shinto Towel makes a convincing case against the swollen hotel towel. Its unusual two-and-a-half-layer gauze is woven from organic cotton to stay absorbent while remaining light, quick to dry and easy to pack. The large size is generous enough for the bath, a summer blanket or a day outdoors, yet it occupies surprisingly little space on a shelf. The muted yarn-dyed colours and softly irregular surface give it the quiet authority of a good Japanese household tool: technically considered, visually calm and improved by use.",
  },
  {
    rank:3,
    productId:"product-waterworks-gotham-bath-towels",
    name:"Waterworks Gotham Bath Towels",
    brand:"Waterworks",
    url:"https://www.waterworks.com/us_en/gotham-cotton-bath-towels-gobt01",
    note:"Waterworks approaches the bath towel with the restraint of a good tailor. Gotham is woven in the United States from long-staple cotton, then finished with narrow cotton binding borrowed from the language of fine men’s shirting. The detail is subtle but decisive, giving an otherwise orthodox white towel a clean architectural edge. Choose navy, black or slate piping and allow the trim to do the work. Gotham provides the conventional luxury towel this group needs, but avoids the swollen anonymity of resort terry. It feels considered rather than decorated, and looks particularly convincing against marble, unlacquered brass or plain white tile.",
  },
] as const;

async function updateBestBathTowels(){
  const item=await client.fetch<{_id:string}|null>(
    `*[_type == "catalogItem" && slug.current == "best-towels" && section->slug.current == "home"][0]{_id}`
  );

  if(!item) throw new Error("Could not find Home / Best Towels (best-towels).");

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

  tx=tx.patch(item._id,patch=>patch.set({
    label:"Best Bath Towels",
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

  await tx.commit();
  console.log("Updated Home / Best Bath Towels with three ranked recommendations.");
}

updateBestBathTowels().catch(error=>{console.error(error);process.exit(1);});
