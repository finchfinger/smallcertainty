import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before removing rows.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function removeMiscThemeBackground(){
  await client.transaction()
    .delete("catalogItem-miscellaneous-best-theme")
    .delete("catalogItem-miscellaneous-best-background")
    .commit();
  console.log("Removed Best Theme and Best Background from Colophon.");
}

removeMiscThemeBackground().catch(error=>{console.error(error);process.exit(1);});
