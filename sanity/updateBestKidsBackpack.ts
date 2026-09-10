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
    note:`Most children’s backpacks are designed as though childhood requires decoration. They arrive covered in cartoon characters, glitter, racing cars, dinosaurs and an unnecessary number of pockets. The Kånken Mini is different. It is cheerful without trying too hard and practical without looking like hiking equipment. More than anything, it feels like a real object rather than a novelty made for children.

The shape is a large part of the appeal. The Kånken is almost perfectly rectangular, which makes it much easier to pack than the soft, rounded backpacks that collapse around their contents. A lunch box sits flat at the bottom. Books slide neatly against the back. A jumper can be pushed on top. The zip runs far enough around the bag that a child can actually see what is inside instead of digging through a dark pocket for a missing mitten.

It is also extremely light. That matters with a children’s bag: there is little sense in making the container heavy before anything has been put inside it. The narrow straps are simple and adjustable, while the two handles at the top make it easy to pick up from the floor, carry by hand or hang from a hook. There are few components and almost nothing feels unnecessary.

The fabric is tough enough to survive the ordinary indignities of childhood without feeling overly technical. Dirt can be dealt with. Rain is not a crisis. A scuff does not ruin it. In fact, the bag tends to become more convincing with use. One that has been to school, the park, the airport and the back seat of the car begins to feel properly owned.

That durability gives the Kånken Mini a longer life than most children’s things. It can begin as a nursery bag, become a school or weekend bag and later be used for holidays, day trips or carrying toys to a friend’s house. When a child outgrows it, there is a reasonable chance that a younger sibling will want it.

The Kånken Mini is not the most elaborate backpack available. It does not have thick ergonomic padding or a dozen specialized compartments. That is precisely the point. Most children need somewhere comfortable to carry a few essential things, not a piece of expedition equipment.

What Fjällräven gets right is proportion. The bag is small without feeling toy-like, simple without being dull and sturdy without becoming cumbersome. It gives children an object that works properly and leaves the personality to them.

It is a proper piece of design, simply made smaller.`,
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
