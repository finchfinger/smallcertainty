import { getCatalogSections } from "@/lib/catalogData";

export const dynamic="force-dynamic";
export const revalidate=0;

const aliases:Record<string,string[]>={
  jacket:["jacket","coat","blazer","trench","outerwear","houdini","bedale"],
  couch:["couch","sofa"],
  bag:["bag","luggage","carry-on","backpack","tote","weekender"],
  bags:["bag","luggage","carry-on","backpack","tote","weekender"],
  pants:["pants","jeans","chinos"],
  shirt:["shirt","t-shirt","tee","oxford"],
  cms:["cms","content","management","sanity"],
  font:["font","typeface","typography"],
};

function normalize(value:string){
  return value.toLowerCase().replace(/[’']/g,"").trim();
}

function queryTerms(query:string){
  const base=normalize(query).split(/[^a-z0-9-]+/).filter(Boolean);
  return Array.from(new Set(base.flatMap(term=>aliases[term] ?? [term])));
}

function scoreResult(haystack:string,terms:string[]){
  if(!terms.length) return 0;
  return terms.reduce((score,term)=>score+(haystack.includes(term) ? 1 : 0),0);
}

export async function GET(request:Request){
  const { searchParams }=new URL(request.url);
  const query=searchParams.get("q") ?? "";
  const terms=queryTerms(query);
  const sections=await getCatalogSections();

  const rows=sections.flatMap((section,sectionIndex)=>{
    const sectionSlug=section.slug ?? section.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    return section.items.filter(item=>!item.disabled).map((item,itemIndex)=>{
      const recommendations=item.recommendations?.map(recommendation=>recommendation.productName).join(" ") ?? "";
      const haystack=normalize(`${section.title} ${item.label} ${item.productName} ${recommendations}`);
      return {
        score:scoreResult(haystack,terms),
        order:(sectionIndex*1000)+itemIndex,
        label:item.label,
        section:section.title,
        sectionSlug,
        topPick:item.productName,
        pagePath:item.href,
        outboundUrl:item.productHref ?? null,
        updated:Boolean(item.updated),
      };
    });
  });

  const results=(terms.length ? rows.filter(row=>row.score>0) : rows)
    .sort((a,b)=>(b.score-a.score)||(a.order-b.order))
    .slice(0,20)
    .map(({ score,order,...result })=>result);

  return Response.json({
    query,
    count:results.length,
    results,
  });
}
