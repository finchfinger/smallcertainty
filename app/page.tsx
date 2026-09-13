import { CatalogPageShell } from "@/components/CatalogPageShell";
import { getCatalogSections } from "@/lib/catalogData";
import { absoluteUrl,defaultSocialImage,defaultSocialImageAlt,siteDescription } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic="force-dynamic";
export const revalidate=0;
export const metadata:Metadata={
  title:"Small Certainty",
  description:siteDescription,
  alternates:{ canonical:"/" },
  openGraph:{
    title:"Small Certainty",
    description:siteDescription,
    url:"/",
    images:[{
      url:absoluteUrl(defaultSocialImage),
      alt:defaultSocialImageAlt,
    }],
  },
};

export default async function CatalogPage(){
  const sections=await getCatalogSections();
  return <CatalogPageShell sections={sections}/>;
}
