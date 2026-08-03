import { getCatalogSections } from "@/lib/catalogData";

export const dynamic="force-dynamic";
export const revalidate=0;

function toKeywords(values:string[]){
  return Array.from(new Set(values.flatMap(value=>value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean))));
}

export async function GET(){
  const sections=await getCatalogSections();
  const generatedAt=new Date().toISOString();

  const agentSections=sections.map(section=>{
    const sectionSlug=section.slug ?? section.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

    return {
      title:section.title,
      slug:sectionSlug,
      icon:section.icon ?? null,
      items:section.items.filter(item=>!item.disabled).map((item,index)=>({
        label:item.label,
        section:section.title,
        sectionSlug,
        rank:index+1,
        topPick:item.productName,
        pagePath:item.href,
        outboundUrl:item.productHref ?? null,
        updated:Boolean(item.updated),
        recommendations:item.recommendations?.map(recommendation=>({
          rank:recommendation.rank,
          name:recommendation.productName,
          url:recommendation.productHref ?? null,
          note:recommendation.note ?? null,
          badge:recommendation.badge ?? null,
        })) ?? [],
        keywords:toKeywords([section.title,item.label,item.productName,...(item.recommendations?.map(recommendation=>recommendation.productName) ?? [])]),
      })),
    };
  });

  const items=agentSections.flatMap(section=>section.items);

  return Response.json({
    site:"Small Certainty",
    description:"An edited catalog of best-list recommendations.",
    generatedAt,
    endpoints:{
      catalog:"/api/catalog",
      search:"/api/search?q=best%20jacket",
      guide:"/llms.txt",
    },
    sections:agentSections,
    items,
  });
}
