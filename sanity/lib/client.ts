import { createClient } from "next-sanity";

export const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"8luodcfj";
export const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
export const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
export const sanityConfigured=true;
export const client=createClient({ projectId,dataset,apiVersion,useCdn:false,perspective:"published" });
