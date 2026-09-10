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
    note:`Most children’s backpacks are designed as though childhood requires decoration. They arrive covered in cartoon characters, glitter and an unnecessary number of pockets. The Kånken Mini is cheerful without trying too hard and practical without looking like hiking equipment. It feels like a real object rather than a novelty made for children.

Its almost rectangular shape makes it easier to pack than the soft, rounded bags that collapse around their contents. A lunch box sits flat at the bottom, books slide against the back and a jumper can be pushed on top. The zip opens far enough for a child to see what is inside instead of digging through a dark pocket for a missing mitten.

It is extremely light, which matters when the container is carried by a child. The narrow straps are adjustable; two handles make it easy to pick up, carry by hand or hang from a hook. Almost nothing feels unnecessary.

The hard-wearing fabric survives the ordinary indignities of childhood without feeling overly technical. Dirt can be dealt with, rain is not a crisis and a scuff does not ruin it. A bag that has been to school, the park, the airport and the back seat of the car soon feels properly owned.

That durability gives the Kånken Mini a longer life than most children’s things. It can begin as a nursery bag, become a school or weekend bag, then pass to a younger sibling. It has no thick padding or specialized compartments. Children need somewhere to carry a few essential things, not expedition equipment.

What Fjällräven gets right is proportion. The bag is small without feeling toy-like, simple without being dull and sturdy without becoming cumbersome. It gives children an object that works properly and leaves the personality to them. It is a proper piece of design, simply made smaller.`,
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
