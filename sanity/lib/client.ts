import { createClient } from "next-sanity";

export const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
export const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
export const sanityConfigured=Boolean(projectId);
export const client=createClient({ projectId:projectId||"8luodcfj",dataset,apiVersion,useCdn:false,perspective:"published" });
