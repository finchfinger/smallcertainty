import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding the section.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const note="A culture pick from Small Certainty: less definitive canon than useful signal, chosen because it keeps returning something new.";

const rows=[
  ["Best Film","The Third Man"],
  ["Best Television Series","The Sopranos"],
  ["Best Novel","Middlemarch"],
  ["Best Nonfiction Book","The Power Broker"],
  ["Best Album","Songs in the Key of Life"],
  ["Best Song","This Must Be the Place (Naive Melody)"],
  ["Best Magazine","Monocle"],
  ["Best Podcast","How Long Gone"],
  ["Best Cookbook","The Zuni Cafe Cookbook"],
  ["Best Children’s Book","Where the Wild Things Are"],
  ["Best Photographer","William Eggleston"],
  ["Best Architect","Alvar Aalto"],
  ["Best Museum","Louisiana Museum of Modern Art"],
] as const;

async function addCultureSection(){
  const existingSortOrder=await client.fetch<number | null>(`*[_type == "catalogSection" && slug.current == "culture"][0].sortOrder`);
  const maxSortOrder=await client.fetch<number | null>(`*[_type == "catalogSection"] | order(sortOrder desc)[0].sortOrder`);
  const sectionId="catalogSection-culture";
  const sectionSortOrder=existingSortOrder ?? Math.max((maxSortOrder||0),6)+1;

  let tx=client.transaction().createOrReplace({
    _id:sectionId,
    _type:"catalogSection",
    title:"Culture",
    slug:{_type:"slug",current:"culture"},
    icon:"culture",
    sortOrder:sectionSortOrder,
    published:true,
  });

  rows.forEach(([label,productName],index)=>{
    const itemSlug=slugify(label);
    const productSlug=slugify(productName);
    const productId=`product-${productSlug}`;
    const itemId=`catalogItem-culture-${itemSlug}`;
    const outboundUrl=`https://example.com/culture/${productSlug}`;

    tx=tx.createIfNotExists({
      _id:productId,
      _type:"product",
      name:productName,
      slug:{_type:"slug",current:productSlug},
      description:note,
      outboundUrl,
      published:true,
    });

    tx=tx.createOrReplace({
      _id:itemId,
      _type:"catalogItem",
      label,
      slug:{_type:"slug",current:itemSlug},
      productName,
      outboundUrl,
      section:{_type:"reference",_ref:sectionId},
      sortOrder:index+1,
      updated:false,
      published:true,
      intro:note,
      lastReviewed:new Date().toISOString().slice(0,10),
      recommendations:[1,2,3].map(rank=>({
        _key:`pick-${rank}-${productSlug}`,
        _type:"recommendation",
        rank,
        badge:rank===1?"Best overall":rank===2?"Runner up":"Also good",
        product:{_type:"reference",_ref:productId},
        editorialNote:note,
        published:true,
      })),
    });
  });

  await tx.commit();
  console.log(`Added Culture section with ${rows.length} rows.`);
}

addCultureSection().catch(error=>{console.error(error);process.exit(1);});
