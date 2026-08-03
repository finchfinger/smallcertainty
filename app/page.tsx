import { CatalogPageShell } from "@/components/CatalogPageShell";
import { getCatalogSections } from "@/lib/catalogData";
import type { Metadata } from "next";

export const dynamic="force-dynamic";
export const revalidate=0;
export const metadata:Metadata={
  title:"Small Certainty",
  description:"Small Certainty is a catalog of best lists: home, clothing, culture, travel, work, and the quiet choices that keep winning.",
  alternates:{ canonical:"/" },
  openGraph:{
    title:"Small Certainty",
    description:"An edited catalog of things worth choosing.",
    url:"/",
  },
};

export default async function CatalogPage(){
  const sections=await getCatalogSections();
  return <CatalogPageShell sections={sections}/>;
}
