import type { Metadata } from "next";
import { notFound,permanentRedirect } from "next/navigation";
import { DetailPageShell } from "@/components/DetailPageShell";
import type { CatalogItemData,CatalogSectionData } from "@/components/types";
import { catalogItemMetadata } from "@/lib/seo";
import { client,sanityConfigured } from "@/sanity/lib/client";
import { catalogItemDetailQuery,catalogQuery } from "@/sanity/lib/queries";
import { fallbackSections } from "@/sanity/seedData";
import { imprintRecommendations } from "@/sanity/imprintRecommendations";

export const dynamic="force-dynamic";

type DetailData = CatalogItemData & { sectionTitle?:string };

function findFallbackItem(sectionSlug:string,itemSlug:string):DetailData|undefined {
  if(sectionSlug==="imprint") {
    const set=imprintRecommendations.find(entry=>entry.slug===itemSlug);
    if(set) return {
      label:set.label,
      productName:set.recommendations[0].productName,
      productHref:set.recommendations[0].productHref,
      href:`/catalog/imprint/${set.slug}`,
      intro:set.recommendations[0].note,
      sectionTitle:"Imprint",
      recommendations:set.recommendations.map((recommendation,index)=>({
        rank:index+1,
        productName:recommendation.productName,
        productHref:recommendation.productHref,
        note:recommendation.note,
      })),
    };
  }
  for(const section of fallbackSections) {
    if(section.slug!==sectionSlug) continue;
    const item=section.items.find(entry=>entry.href===`/catalog/${sectionSlug}/${itemSlug}`);
    if(item) return { ...item,sectionTitle:section.title };
  }
}

async function getCatalogItemDetail(section:string,slug:string) {
  let item:DetailData|undefined=findFallbackItem(section,slug);
  if(sanityConfigured) {
    try {
      const remoteItem=await client.fetch<DetailData|null>(catalogItemDetailQuery,{section,slug},{
        cache:"no-store",
        next:{revalidate:0},
      });
      if(remoteItem) item=remoteItem;
    } catch(error) {
      console.warn("Sanity metadata fetch failed; showing local detail metadata.",error);
    }
  }
  return item;
}

export async function generateMetadata({ params }:{ params:Promise<{ section:string; slug:string }> }):Promise<Metadata> {
  const { section,slug }=await params;
  const item=await getCatalogItemDetail(section,slug);
  if(!item) return { title:"Small Certainty" };
  return catalogItemMetadata(item,`/catalog/${section}/${slug}`);
}

export default async function CatalogItemPage({ params }:{ params:Promise<{ section:string; slug:string }> }) {
  const { section,slug }=await params;
  if(section==="men-s-clothing") permanentRedirect(`/catalog/mens-clothing/${slug}`);
  let sections:CatalogSectionData[]=fallbackSections.map(entry=>({...entry,items:entry.items.map(item=>({...item}))}));
  let item:DetailData|undefined=await getCatalogItemDetail(section,slug);

  if(sanityConfigured) {
    try {
      const remoteSections=await client.fetch<CatalogSectionData[]>(catalogQuery,{}, {
        cache:"no-store",
        next:{revalidate:0},
      });
      if(remoteSections?.length) sections=remoteSections;
    } catch(error) {
      console.warn("Sanity fetch failed; showing local detail preview.",error);
    }
  }

  if(!item) notFound();
  const searchItems=sections.flatMap(entry=>entry.items.filter(row=>!row.disabled).map(row=>({...row,section:entry.title})));
  return <DetailPageShell item={item} searchItems={searchItems} activeNav={section==="imprint"?"Profile":"Catalog"}/>;
}
