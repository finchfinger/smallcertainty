import { Header } from "./Header";
import Link from "next/link";
import {ActionLink} from "./ActionButton";
import type { SearchItem } from "./SearchOverlay";
import {ShareButton} from "./ShareButton";
import { absoluteUrl,siteName } from "@/lib/seo";
import type { CatalogItemData,RecommendationData } from "./types";

type DetailPageShellProps = {
  item:CatalogItemData & { sectionTitle?:string };
  searchItems:SearchItem[];
  activeNav?:"Catalog"|"Journal"|"Profile";
  counterStyle?:"icon"|"hash";
};

const fallbackNote="Through workshops, illustration systems and careful typographic choices, Hymn has built something that operates at human scale within technological infrastructure. The mascot guides without lecturing. The colours signal without shouting. The sub-brands distinguish themselves without fragmenting. In an industry that often designs for buildings first and people second, Shareman reverses the priority, a benevolent companion that happens to automate your laundry payments.";
function noteParagraphs(note:string){
  return note.split(/\n+/).map(paragraph=>paragraph.trim()).filter(Boolean);
}

export function DetailPageShell({ item,searchItems,activeNav="Catalog",counterStyle="hash" }:DetailPageShellProps) {
  const recommendations:RecommendationData[]=item.recommendations?.length?item.recommendations:[1,2,3].map(rank=>({rank,productName:item.productName,productHref:item.productHref,note:item.intro||fallbackNote}));
  const best=recommendations[0];
  const honorableMentions=recommendations.slice(1);
  const url=absoluteUrl(item.href);
  const structuredData=[
    {
      "@context":"https://schema.org",
      "@type":"BreadcrumbList",
      itemListElement:[
        { "@type":"ListItem",position:1,name:siteName,item:absoluteUrl("/") },
        item.sectionTitle?{ "@type":"ListItem",position:2,name:item.sectionTitle,item:absoluteUrl("/") }:undefined,
        { "@type":"ListItem",position:item.sectionTitle?3:2,name:item.label,item:url },
      ].filter(Boolean),
    },
    {
      "@context":"https://schema.org",
      "@type":"ItemList",
      name:item.label,
      description:item.intro||recommendations[0]?.note,
      url,
      numberOfItems:recommendations.length,
      itemListOrder:"https://schema.org/ItemListOrderAscending",
      itemListElement:recommendations.map((recommendation,index)=>({
        "@type":"ListItem",
        position:recommendation.rank||index+1,
        name:recommendation.productName,
        url:recommendation.productHref,
        item:{
          "@type":"Product",
          name:recommendation.productName,
          description:recommendation.note,
          url:recommendation.productHref,
        },
      })),
    },
    {
      "@context":"https://schema.org",
      "@type":"WebPage",
      name:item.label,
      description:item.intro||recommendations[0]?.note,
      url,
      isPartOf:{ "@type":"WebSite",name:siteName,url:absoluteUrl("/") },
    },
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
    <Header activeNav={activeNav} searchItems={searchItems}/>
    <main className="page-grid page-pad w-full pb-28 pt-12 lg:pt-20">
      <article className="col-span-full text-[14px] leading-[20px] tracking-[-0.01em] lg:col-start-3 lg:col-end-11">
        <h1 className="font-normal">{item.label}</h1>

        {best&&<>
          <h2 className="mt-10 font-normal">{best.productName}{best.brand?` from ${best.brand}`:""}</h2>

          <div className="font-simon-mono mt-4 max-w-[900px] space-y-5">
            {noteParagraphs(best.note||item.intro||fallbackNote).map((paragraph,index)=><p key={index}>{paragraph}</p>)}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {best.productHref&&<ActionLink href={best.productHref} target="_blank" rel="noreferrer" variant="outline">Visit site</ActionLink>}
            <ShareButton category={item.label} title={best.productName} path={item.href} triggerVariant="text"/>
          </div>
        </>}

        {honorableMentions.length>0&&<section className="mt-16" aria-labelledby="honorable-mentions-title">
          <h2 id="honorable-mentions-title" className="mb-5 font-normal">Honorable Mentions</h2>
          <ul className="border-t border-ink">
            {honorableMentions.map(recommendation=><li key={`${recommendation.rank}-${recommendation.productName}`} className="border-b border-ink">
              {recommendation.productHref
                ?<Link href={recommendation.productHref} target="_blank" rel="noreferrer" className="best-page-link -mx-3 grid min-h-[52px] items-center rounded-md px-3 py-3 focus-visible:bg-black/[.04] focus-visible:outline-none">
                  <span>{recommendation.productName}{recommendation.brand?` from ${recommendation.brand}`:""}</span>
                </Link>
                :<div className="grid min-h-[52px] items-center py-3">{recommendation.productName}{recommendation.brand?` from ${recommendation.brand}`:""}</div>}
            </li>)}
          </ul>
        </section>}
      </article>
    </main>
  </>;
}
