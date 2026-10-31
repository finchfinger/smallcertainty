import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";
import {readFileSync} from "node:fs";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const source=readFileSync("content/catalog-revision/batch-5-mens.md","utf8");
const chunk=source.split("### Best Casual Jacket\n")[1]?.split(/^### /m)[0];
if(!chunk) throw new Error("Best Casual Jacket draft was not found.");
const lines=chunk.trim().split("\n");
lines.shift();
while(lines[0]?.trim()==="") lines.shift();
const linkIndex=lines.findIndex(line=>line.startsWith("[Visit site]"));
if(linkIndex<0) throw new Error("Best Casual Jacket visit link was not found.");
const description=lines.slice(0,linkIndex).join("\n").trim();

const products=[
  {
    _id:"product-paul-jacket-from-samuel-snider",
    name:"Paul Jacket",
    brand:"Samuel Snider",
    slug:"paul-jacket-from-samuel-snider",
    outboundUrl:"https://samuelsnider.com/products/paul-jacket-fw26",
    description,
  },
  {
    _id:"product-valstarino-jacket-from-valstar",
    name:"Valstarino Jacket",
    brand:"Valstar",
    slug:"valstarino-jacket-from-valstar",
    outboundUrl:"https://valstarmilano.com/en-us/collections/valstarino",
  },
  {
    _id:"product-five-pocket-chore-jacket-from-drakes",
    name:"Five-Pocket Chore Jacket",
    brand:"Drake’s",
    slug:"five-pocket-chore-jacket-from-drakes",
    outboundUrl:"https://us.drakes.com/collections/perennial-chore-jackets",
  },
];

async function main(){
  const sectionId=await client.fetch<string|null>(
    `*[_type=="catalogSection"&&slug.current=="mens-clothing"][0]._id`,
  );
  if(!sectionId) throw new Error("Men’s Clothing section was not found.");

  const laterItems=await client.fetch<Array<{_id:string;sortOrder:number}>>(
    `*[_type=="catalogItem"&&section._ref==$sectionId&&published==true&&sortOrder>=6]{_id,sortOrder}`,
    {sectionId},
  );

  let transaction=client.transaction();
  for(const item of laterItems){
    transaction=transaction.patch(item._id,patch=>patch.set({sortOrder:item.sortOrder+1}));
  }
  for(const product of products){
    const data={
      _type:"product",
      name:product.name,
      brand:product.brand,
      slug:{_type:"slug",current:product.slug},
      outboundUrl:product.outboundUrl,
      published:true,
      ...(product.description?{description:product.description}:{}),
    };
    transaction=transaction.createIfNotExists({_id:product._id,...data});
    transaction=transaction.patch(product._id,patch=>patch.set(data));
  }

  const itemId="catalog-item-mens-clothing-best-casual-jacket";
  const recommendations=products.map((product,index)=>({
    _key:`pick-${index+1}-${product.slug}`,
    _type:"recommendation",
    rank:index+1,
    product:{_type:"reference",_ref:product._id},
    ...(index===0?{editorialNote:description}:{}),
    outboundUrlOverride:product.outboundUrl,
    published:true,
  }));
  const item={
    _type:"catalogItem",
    label:"Best Casual Jacket",
    slug:{_type:"slug",current:"best-casual-jacket"},
    productName:"Paul Jacket from Samuel Snider",
    outboundUrl:products[0].outboundUrl,
    section:{_type:"reference",_ref:sectionId},
    sortOrder:6,
    rowStatus:"new",
    statusUntil:"2026-11-30T06:00:00Z",
    published:true,
    recommendations,
    intro:"A casual jacket should provide enough structure to organize what is worn beneath it, enough ease for useful layers, and enough character to remain convincing without a suit.",
    seo:{
      seoTitle:"Best Casual Jacket",
      metaDescription:"The Paul Jacket from Samuel Snider is our best casual jacket, with soft military tailoring and substantial Irish wool-and-alpaca herringbone.",
    },
    lastReviewed:"2026-10-30",
  };
  transaction=transaction.createIfNotExists({_id:itemId,...item});
  transaction=transaction.patch(itemId,patch=>patch.set(item));
  await transaction.commit();

  const verified=await client.fetch(
    `*[_id==$id][0]{_id,label,"slug":slug.current,sortOrder,rowStatus,statusUntil,productName,"picks":recommendations[]{rank,"name":product->name,"brand":product->brand,"url":coalesce(outboundUrlOverride,product->outboundUrl)},"descriptionWords":count(string::split(recommendations[0].editorialNote," "))}`,
    {id:itemId},
  );
  console.log(JSON.stringify(verified,null,2));
}

main().catch(error=>{
  console.error(error);
  process.exit(1);
});
