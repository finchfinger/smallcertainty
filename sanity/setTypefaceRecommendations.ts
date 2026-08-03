import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before setting typeface recommendations.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

const typefaces=[
  {
    name:"ABC Favorit",
    url:"https://abcdinamo.com/typefaces/favorit",
    note:"A plainspoken grotesk with just enough personality. This is the current reference point for the site.",
  },
  {
    name:"Space Mono",
    url:"https://fonts.google.com/specimen/Space+Mono",
    note:"A monospaced option with a technical, editorial edge. Crisp, literal, and pleasantly strange for a catalog.",
  },
  {
    name:"Google Sans Flex",
    url:"https://fonts.google.com",
    note:"A wide, product-system sans direction. The preview uses a wide width setting when the font is available.",
  },
];

async function setTypefaceRecommendations(){
  const item=await client.fetch<{_id:string}|null>(`*[_type == "catalogItem" && slug.current == "best-typeface" && section->slug.current == "miscellaneous"][0]{_id}`);
  if(!item) throw new Error("Could not find Colophon / Best Typeface.");

  let tx=client.transaction();

  typefaces.forEach(typeface=>{
    const slug=slugify(typeface.name);
    tx=tx.createOrReplace({
      _id:`product-${slug}`,
      _type:"product",
      name:typeface.name,
      slug:{_type:"slug",current:slug},
      description:typeface.note,
      outboundUrl:typeface.url,
      published:true,
    });
  });

  tx=tx.patch(item._id,patch=>patch.set({
    recommendations:typefaces.map((typeface,index)=>{
      const slug=slugify(typeface.name);
      return {
        _key:`typeface-${slug}`,
        _type:"recommendation",
        rank:index+1,
        badge:index===0?"Current pick":undefined,
        product:{_type:"reference",_ref:`product-${slug}`},
        editorialNote:typeface.note,
        published:true,
      };
    }),
  }));

  await tx.commit();
  console.log(`Set ${typefaces.length} typeface recommendations.`);
}

setTypefaceRecommendations().catch(error=>{console.error(error);process.exit(1);});
