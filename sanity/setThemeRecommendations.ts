import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before setting theme recommendations.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

const themes=[
  {
    name:"Snooze Fest",
    note:"The default: gray room, black ink, deliberately uneventful. Calm enough to let the lists do the talking.",
  },
  {
    name:"Castlevania",
    note:"A dark, warm-black mode with old-stone drama. For browsing recommendations like a haunted inventory screen.",
  },
  {
    name:"Radioactive Milk",
    note:"Pale green, off-white, slightly wrong in a good way. A weird little glow for the catalog.",
  },
];

async function setThemeRecommendations(){
  const item=await client.fetch<{_id:string}|null>(`*[_type == "catalogItem" && slug.current == "best-theme" && section->slug.current == "miscellaneous"][0]{_id}`);
  if(!item) throw new Error("Could not find Colophon / Best Theme. Run npm run add:misc-section first.");

  let tx=client.transaction();

  themes.forEach(theme=>{
    const slug=slugify(theme.name);
    tx=tx.createOrReplace({
      _id:`product-${slug}`,
      _type:"product",
      name:theme.name,
      slug:{_type:"slug",current:slug},
      description:theme.note,
      outboundUrl:`https://example.com/themes/${slug}`,
      published:true,
    });
  });

  tx=tx.patch(item._id,patch=>patch.set({
    recommendations:themes.map((theme,index)=>{
      const slug=slugify(theme.name);
      return {
        _key:`theme-${slug}`,
        _type:"recommendation",
        rank:index+1,
        badge:index===0?"Default":undefined,
        product:{_type:"reference",_ref:`product-${slug}`},
        editorialNote:theme.note,
        published:true,
      };
    }),
  }));

  await tx.commit();
  console.log(`Set ${themes.length} theme recommendations.`);
}

setThemeRecommendations().catch(error=>{console.error(error);process.exit(1);});
