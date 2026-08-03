import type { CatalogSectionData } from "@/components/types";
import { client,sanityConfigured } from "@/sanity/lib/client";
import { catalogQuery } from "@/sanity/lib/queries";
import { fallbackSections } from "@/sanity/seedData";

const hiddenCatalogSections=new Set(["colophon","infrastructure","imprint"]);

function normalizeSectionSlug(section:CatalogSectionData):CatalogSectionData {
  if(section.slug!=="men-s-clothing") return section;
  return {
    ...section,
    slug:"mens-clothing",
    items:section.items.map(item=>({
      ...item,
      href:item.href.replace("/catalog/men-s-clothing/","/catalog/mens-clothing/"),
    })),
  };
}

export async function getCatalogSections(includeHidden=false){
  let sections:CatalogSectionData[]=fallbackSections.map(section=>({...section,items:section.items.map(item=>({...item}))}));
  if(sanityConfigured){
    try {
      const data=await client.fetch<CatalogSectionData[]>(catalogQuery,{},{
        cache:"no-store",
        next:{ revalidate:0 },
      });
      if(data?.length) sections=data;
    } catch(error) {
      console.warn("Sanity fetch failed; showing local seed preview.",error);
    }
  }
  return sections
    .filter(section=>includeHidden||!hiddenCatalogSections.has(section.title.trim().toLowerCase()))
    .map(normalizeSectionSlug);
}

export function getSearchItems(sections:CatalogSectionData[]) {
  return sections.flatMap(section=>section.items.filter(item=>!item.disabled).map(item=>({...item,section:section.title})));
}
