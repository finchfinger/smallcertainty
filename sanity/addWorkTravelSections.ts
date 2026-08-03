import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding sections.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const note="A Small Certainty pick chosen for usefulness, atmosphere and the faint feeling that somebody civilized has already done the hard thinking.";

const sections=[
  {
    title:"Travel",
    icon:"travel",
    sortOrder:5,
    rows:[
      ["Best Hotel","Hotel Il Pellicano"],
      ["Best Restaurant","St. John"],
      ["Best Bar","Bar Basso"],
      ["Best Café","Café de Flore"],
      ["Best Bookshop","Daunt Books Marylebone"],
      ["Best Neighborhood","Naka-Meguro"],
      ["Best Airport","Zurich Airport"],
      ["Best Train Station","Antwerp Centraal"],
    ],
  },
  {
    title:"Work",
    icon:"work",
    sortOrder:7,
    rows:[
      ["Best Desk","USM Haller Table"],
      ["Best Chair","Herman Miller Aeron"],
      ["Best Calendar","Stendig Calendar"],
      ["Best Email App","Superhuman"],
      ["Best Briefcase","Porter Tanker 3Way Briefcase"],
      ["Best Work Bag","Filson Original Briefcase"],
    ],
  },
] as const;

async function addWorkTravelSections(){
  const oldItems=await client.fetch<{_id:string}[]>(`*[_type == "catalogItem" && section->slug.current in ["travel","work"]]{_id}`);
  let tx=client.transaction();

  oldItems.forEach(item=>{
    tx=tx.patch(item._id,patch=>patch.set({published:false}));
  });

  tx=tx
    .patch("catalogSection-office",patch=>patch.set({sortOrder:6,published:true}))
    .patch("catalogSection-culture",patch=>patch.set({sortOrder:8,published:true}))
    .patch("catalogSection-miscellaneous",patch=>patch.set({sortOrder:9,published:true}));

  sections.forEach(section=>{
    const sectionSlug=slugify(section.title);
    const sectionId=`catalogSection-${sectionSlug}`;

    tx=tx.createOrReplace({
      _id:sectionId,
      _type:"catalogSection",
      title:section.title,
      slug:{_type:"slug",current:sectionSlug},
      icon:section.icon,
      sortOrder:section.sortOrder,
      published:true,
    });

    section.rows.forEach(([label,productName],index)=>{
      const itemSlug=slugify(label);
      const productSlug=slugify(productName);
      const productId=`product-${productSlug}`;
      const itemId=`catalogItem-${sectionSlug}-${itemSlug}`;
      const outboundUrl=`https://example.com/${sectionSlug}/${productSlug}`;

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
  });

  await tx.commit();
  console.log("Added Work and updated Travel sections.");
}

addWorkTravelSections().catch(error=>{console.error(error);process.exit(1);});
