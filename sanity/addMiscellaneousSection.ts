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
const note="A small colophon note for Small Certainty: the things behind the things, listed with the same unreasonable certainty as the rest of the catalog.";

const rows=[
  {label:"Best Design Firm",productName:"Golden Hymn",url:"https://goldenhymn.com"},
  {label:"Best Typeface",productName:"ABC Favorit",url:"https://abcdinamo.com/typefaces/favorit"},
  {label:"Best Content Management System",productName:"Sanity",url:"https://www.sanity.io"},
  {label:"Best Framework",productName:"Next.js",url:"https://nextjs.org"},
  {label:"Best Contact Info",productName:"Email",url:"mailto:hello@smallcertainty.com"},
  {label:"Best Instagram",productName:"@smallcertainty",url:"https://www.instagram.com/smallcertainty"},
  {label:"Best Twitter",productName:"@smallcertainty",url:"https://x.com/smallcertainty"},
  {label:"Best TikTok",productName:"@smallcertainty",url:"https://www.tiktok.com/@smallcertainty"},
  {label:"Best Copyright",productName:"2026",url:"https://time.gov/"},
];

async function addMiscellaneousSection(){
  const maxSortOrder=await client.fetch<number | null>(`*[_type == "catalogSection"] | order(sortOrder desc)[0].sortOrder`);
  const sectionId="catalogSection-miscellaneous";
  const sectionSortOrder=(maxSortOrder||0)+1;

  let tx=client.transaction().createOrReplace({
    _id:sectionId,
    _type:"catalogSection",
    title:"Colophon",
    slug:{_type:"slug",current:"miscellaneous"},
    icon:"miscellaneous",
    sortOrder:sectionSortOrder,
    published:true,
  });

  rows.forEach((row,index)=>{
    const itemSlug=slugify(row.label);
    const productSlug=slugify(row.productName);
    const productId=`product-${productSlug}`;
    const itemId=`catalogItem-miscellaneous-${itemSlug}`;

    tx=tx.createIfNotExists({
      _id:productId,
      _type:"product",
      name:row.productName,
      slug:{_type:"slug",current:productSlug},
      description:note,
      outboundUrl:row.url,
      published:true,
    });

    tx=tx.createOrReplace({
      _id:itemId,
      _type:"catalogItem",
      label:row.label,
      slug:{_type:"slug",current:itemSlug},
      productName:row.productName,
      outboundUrl:row.url,
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
  console.log(`Added Colophon section with ${rows.length} colophon rows.`);
}

addMiscellaneousSection().catch(error=>{console.error(error);process.exit(1);});
