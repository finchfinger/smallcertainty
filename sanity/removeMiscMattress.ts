import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before removing the row.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function removeMiscMattress(){
  const itemId="catalogItem-miscellaneous-best-mattress";
  await client.delete(itemId);
  console.log("Removed Best Mattress from Colophon.");
}

removeMiscMattress().catch(error=>{console.error(error);process.exit(1);});
