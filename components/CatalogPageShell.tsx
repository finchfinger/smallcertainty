import { Header } from "./Header";
import { CatalogSection } from "./CatalogSection";
import type { CatalogSectionData } from "./types";
import {absoluteUrl,siteDescription,siteName} from "@/lib/seo";

export function CatalogPageShell({ sections }:{ sections:CatalogSectionData[] }) {
  const searchItems=sections.flatMap(section=>section.items.filter(item=>!item.disabled).map(item=>({...item,section:section.title})));
  const structuredData={
    "@context":"https://schema.org",
    "@type":"ItemList",
    name:`${siteName} catalog`,
    description:siteDescription,
    url:absoluteUrl("/"),
    numberOfItems:searchItems.length,
    itemListElement:searchItems.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.label,url:absoluteUrl(item.href)})),
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><Header activeNav="Catalog" searchItems={searchItems}/><main className="page-grid page-pad w-full pb-28 pt-12 lg:pt-20"><h1 className="sr-only">Small Certainty catalog</h1><div className="space-y-[52px] min-[700px]:space-y-12 lg:col-span-full">
    {sections.map(section=><CatalogSection key={section.title} {...section} showStatus/>)}
  </div></main></>;
}
