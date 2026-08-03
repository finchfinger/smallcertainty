import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before fixing the Women’s Clothing slug.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function fixWomensSlug(){
  const section=await client.fetch<{_id:string; slug?:{current?:string}}|null>(
    `*[_type == "catalogSection" && slug.current in ["women-s-clothing","womens-clothing"]][0]{_id,slug}`,
  );

  if(!section) throw new Error("Could not find Women’s Clothing section.");

  await client
    .patch(section._id)
    .set({slug:{_type:"slug",current:"womens-clothing"}})
    .commit();

  console.log(`Women’s Clothing slug is now womens-clothing. Previous slug: ${section.slug?.current||"none"}.`);
}

fixWomensSlug().catch(error=>{console.error(error);process.exit(1);});
