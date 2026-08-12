import { Header } from "./Header";
import { ActionLink } from "./ActionButton";
import { MaterialIcon } from "./MaterialIcon";
import type { SearchItem } from "./SearchOverlay";
import { ShareButton } from "./ShareButton";
import { ResponsiveSectionLabel } from "./ResponsiveSectionLabel";
import { TypefaceActions } from "./TypefaceActions";
import { absoluteUrl,siteName } from "@/lib/seo";
import type { CatalogItemData,RecommendationData } from "./types";

type DetailPageShellProps = {
  item:CatalogItemData & { sectionTitle?:string };
  searchItems:SearchItem[];
  activeNav?:"Catalog"|"Journal"|"Profile";
  counterStyle?:"icon"|"hash";
};

const fallbackNote="Through workshops, illustration systems and careful typographic choices, Hymn has built something that operates at human scale within technological infrastructure. The mascot guides without lecturing. The colours signal without shouting. The sub-brands distinguish themselves without fragmenting. In an industry that often designs for buildings first and people second, Shareman reverses the priority, a benevolent companion that happens to automate your laundry payments.";
const counterIcons:Record<number,string>={1:"counter_1",2:"counter_2",3:"counter_3",4:"counter_4",5:"counter_5",6:"counter_6",7:"counter_7",8:"counter_8",9:"counter_9"};
const sentencePattern=/[^.!?]+[.!?]+(?:\s+|$)/g;

function noteParagraphs(note:string){
  const sentences=note.match(sentencePattern)?.map(sentence=>sentence.trim())||[note];
  if(sentences.length<8) return [note];
  const midpoint=Math.ceil(sentences.length/2);
  return [
    sentences.slice(0,midpoint).join(" "),
    sentences.slice(midpoint).join(" "),
  ];
}

export function DetailPageShell({ item,searchItems,activeNav="Catalog",counterStyle="hash" }:DetailPageShellProps) {
  const recommendations:RecommendationData[]=item.recommendations?.length?item.recommendations:[1,2,3].map(rank=>({rank,productName:item.productName,productHref:item.productHref,note:item.intro||fallbackNote}));
  const isTypefacePage=item.label.toLowerCase()==="best typeface";
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
    <main className="page-grid page-pad relative isolate w-full pb-28 pt-12 lg:pt-16">
      <article className="relative z-10 lg:col-span-full">
        <ol>
          {recommendations.map((recommendation,index)=>{
            const note=recommendation.note||item.intro||fallbackNote;
            const ruleClass=index===0
              ?"lg:border-t lg:border-ink"
              :"listing-rule-inset border-t border-ink before:hidden lg:border-t-0 lg:before:absolute lg:before:right-0 lg:before:top-0 lg:before:block lg:before:border-t lg:before:border-ink";
            return <li key={`${recommendation.rank}-${recommendation.productName}`} className={`relative grid grid-cols-[1fr_auto] gap-x-5 gap-y-[var(--listing-content-gap)] pb-[var(--listing-actions-rule-gap)] pt-4 min-[700px]:grid-cols-12 min-[700px]:gap-x-6 lg:pt-4 ${ruleClass}`}>
              <div className="col-span-2 font-simon-mono text-[14px] leading-[20px] tracking-[-0.01em] min-[700px]:row-span-3 min-[700px]:col-span-2">
                {index===0?<ResponsiveSectionLabel title={item.label} mobileUppercase stackMode="word-columns"/>:null}
              </div>
              <div className="col-span-2 inline-flex h-6 w-6 items-center justify-center min-[700px]:col-span-1 min-[700px]:col-start-3">{counterStyle==="hash"?<span className="font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em]">#{recommendation.rank||index+1}</span>:counterIcons[recommendation.rank||index+1]?<MaterialIcon name={counterIcons[recommendation.rank||index+1]} size={24}/>:<span className="text-[14px] font-normal leading-[20px]">{recommendation.rank||index+1}</span>}</div>
              <div className="col-span-2 min-[700px]:contents">
                <h2 className="min-w-0 text-[14px] font-normal leading-[20px] tracking-[-0.01em] min-[700px]:col-span-7 min-[700px]:col-start-4">{recommendation.productName}</h2>
              </div>
              <div className="editorial-copy listing-reading-column font-simon-mono col-span-2 max-w-[900px] text-[14px] leading-[20px] tracking-[-0.01em] min-[700px]:col-span-7 min-[700px]:col-start-4">
                {noteParagraphs(note).map((paragraph,paragraphIndex)=><p key={paragraphIndex}>{paragraph}</p>)}
              </div>
              <div className="listing-reading-column -ml-3 -mt-2 col-span-2 flex flex-wrap items-center gap-0 min-[700px]:col-span-7 min-[700px]:col-start-4">
                {isTypefacePage?<TypefaceActions href={recommendation.productHref} variant="text"/>:recommendation.productHref&&<ActionLink href={recommendation.productHref} target="_blank" rel="noreferrer" variant="text">Visit site</ActionLink>}
                <ShareButton category={item.label} title={recommendation.productName} path={item.href} triggerVariant="text"/>
              </div>
            </li>;
          })}
        </ol>
      </article>
    </main>
  </>;
}
