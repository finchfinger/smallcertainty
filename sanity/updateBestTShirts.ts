import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before updating Best T-Shirt.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

const recommendations=[
  {
    rank:1,
    productId:"product-velva-sheen-2-pack-short-sleeve-crew-neck-t-shirts",
    name:"Velva Sheen 2-Pack Short Sleeve Crew Neck T-Shirts",
    brand:"Velva Sheen",
    url:"https://www.velvasheen.com/products/short-sleeve-crew-neck-t-shirt-2-shirts-pac-black",
    note:"Velva Sheen understands that the useful T-shirt began as an undergarment and should retain some of that plainspoken economy. Its two-pack crew neck is made in the United States from tubular cotton jersey, leaving the body free of side seams and unnecessary complication. The cut is trim, the hand is soft and the old blue label supplies just enough history without turning the shirt into costume. Worn alone, it has the compact proportions of a good mid-century athletic tee. Under an Oxford or a chore coat, it disappears exactly as it should. The pair encourages rotation, which is kinder to the fabric and more sensible than treating a white or black T-shirt as a precious singular object. Expect a closer fit than the contemporary oversized standard, and buy accordingly. This is the drawer staple restored to its proper level: modest, well made and ready most mornings before the wearer is.",
  },
  {
    rank:2,
    productId:"product-lady-white-co-our-t-shirt",
    name:"Lady White Co. Our T-Shirt",
    brand:"Lady White Co.",
    url:"https://ladywhiteco.com/collections/our-t-shirt",
    note:"Lady White Co. makes the T-shirt as a finished garment rather than an upgraded undershirt. The six-ounce tubular jersey uses North Carolina cotton and is cut and sewn in Los Angeles, giving the shirt a pleasingly local chain of custody. Its dry, crisp hand softens with washing while the bound collar keeps the neckline composed. The shape is slightly shorter and wider than Velva Sheen’s, so it sits particularly well with higher-waisted trousers or straight denim. There is enough body to wear it on its own without the fabric clinging or turning translucent. At the same time, the surface remains clean enough to slip beneath an unstructured jacket. The appeal becomes clearer after several weeks, when the cotton relaxes and the shirt begins to feel less purchased than adopted. It is a considered T-shirt, but never a fussy one, and that distinction earns it the second position.",
  },
  {
    rank:3,
    productId:"product-the-real-mccoys-2pcs-pack-tee",
    name:"The Real McCoy’s McCOY’S 2pcs Pack Tee",
    brand:"The Real McCoy’s",
    url:"https://therealmccoys.com/products/mccoys-2pcs-pack-tee-2",
    note:"The Real McCoy’s approaches the everyday T-shirt with the seriousness usually reserved for a flight jacket. Its Joe McCoy two-pack is made in Japan from cotton jersey with a tubular body and a reinforced ribbed neckline. The reference point is the packaged American tee of the late 1940s, recreated with more care than the original mass-market object was ever likely to receive. The result feels compact, sturdy and unmistakably deliberate. It works best when the rest of the clothes are equally straightforward: washed denim, fatigues, a grey sweatshirt or a leather jacket. There is pleasure in the packaging and the historical accuracy, but the useful detail is how confidently the collar and body hold their shape. The price makes this the least democratic choice here, and the pre-packed shirts cannot be returned once opened, so sizing deserves attention. For the wearer who wants an ordinary white or black tee executed with extraordinary discipline, it is difficult to improve upon.",
  },
] as const;

async function updateBestTShirts(){
  const item=await client.fetch<{_id:string}|null>(
    `*[_type == "catalogItem" && label == "Best T-Shirt" && section->slug.current in ["men", "mens-clothing"]][0]{_id}`
  );

  if(!item) throw new Error("Could not find Men / Best T-Shirt.");

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
  console.log("Updated Men / Best T-Shirt with three ranked recommendations.");
}

updateBestTShirts().catch(error=>{console.error(error);process.exit(1);});
