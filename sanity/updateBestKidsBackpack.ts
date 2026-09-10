import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before updating Best Kids Backpack.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const recommendations=[
  {
    rank:1,
    productId:"product-fjallraven-kanken-mini",
    url:"https://www.fjallraven.com/us/en-us/bags-gear/kanken/kanken-bags/kanken-mini/",
    note:`The children’s backpack is an object too often surrendered to cartoon licensing and fussy invention. Fjällräven’s Kånken Mini offers a welcome correction. Its colour is confident, its construction legible and its appearance notably free of condescension. This is not an adult bag made cute, nor a toy pretending to be equipment. It is a useful object drawn at the right scale.

The boxy profile is more than a piece of graphic shorthand. It gives the seven-litre interior a useful order: lunch rests flat, books sit upright and a spare jumper occupies the space that remains. A zip opening carried generously around the bag lets its owner see the contents at once—a modest piece of independence for anyone still prone to misplacing a mitten.

At 220 grams, the Kånken Mini contributes very little to the load itself. Slender adjustable straps keep the arrangement uncomplicated, while the paired top handles prove their worth on school pegs, train seats and hurried departures. There is a front pocket, two slim side pockets and a removable seat pad, but no attempt to turn the bag into a portable filing system.

Vinylon F supplies the necessary resilience. It tolerates damp pavements, dusty playgrounds and the back seat of a car without acquiring the over-engineered manner of technical outdoor gear. Marks become part of the bag rather than grounds for retirement, and cleaning requires little more than a soft brush and lukewarm water.

That composure gives the Mini a life beyond a single school year. It can move from nursery to day trips and holidays, then on to a younger sibling, without looking tied to a particular age or season. Its limitations are equally sensible: this is not the choice for a heavy textbook load or a long hike. It is for the small daily cargo that children actually carry.

Fjällräven’s achievement is one of proportion and restraint. The Kånken Mini is compact but not toy-like, cheerful but not clamorous, durable but never cumbersome. Children supply the personality; the bag simply does its job.`,
  },
  {
    rank:2,
    productId:"product-patagonia-refugito-day-pack-12l",
    url:"https://www.patagonia.com/product/kids-refugito-daypack-12-liters/47891.html?cgid=luggage-backpacks",
  },
  {
    rank:3,
    productId:"product-state-kane-kids-backpack",
    url:"https://statebags.com/collections/kids-backpacks-1/products/kane-backpack-bright-blue",
  },
] as const;

async function updateBestKidsBackpack(){
  const item=await client.fetch<{_id:string;recommendations:Array<Record<string,unknown>>} | null>(
    `*[_type == "catalogItem" && slug.current == "best-kids-backpack" && section->slug.current == "children"][0]{_id,recommendations}`
  );

  if(!item) throw new Error("Could not find Children / Best Kids Backpack.");
  if(!item.recommendations || item.recommendations.length < 3) throw new Error("Best Kids Backpack does not have three recommendations.");

  const updatedRecommendations=item.recommendations.map((recommendation,index)=>{
    const update=recommendations[index];
    if(!update) return recommendation;
    return {
      ...recommendation,
      editorialNote:"note" in update ? update.note : recommendation.editorialNote,
      outboundUrlOverride:update.url,
    };
  });

  let tx=client.transaction();
  recommendations.forEach(recommendation=>{
    tx=tx.patch(recommendation.productId,patch=>patch.set({
      ...(recommendation.rank===1 ? {description:recommendation.note} : {}),
      outboundUrl:recommendation.url,
      published:true,
    }));
  });

  tx=tx.patch(item._id,patch=>patch.set({
    productName:"Fjällräven Kånken Mini",
    outboundUrl:recommendations[0].url,
    lastReviewed:new Date().toISOString().slice(0,10),
    recommendations:updatedRecommendations,
  }));

  await tx.commit();
  console.log("Updated Children / Best Kids Backpack description and all three product links.");
}

updateBestKidsBackpack().catch(error=>{console.error(error);process.exit(1);});
