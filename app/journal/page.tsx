import { Header } from "@/components/Header";
import type { JournalArticle } from "@/content/journal";
import { getCatalogSections,getSearchItems } from "@/lib/catalogData";
import { getJournalArticles } from "@/lib/journalData";
import type { Metadata } from "next";

export const dynamic="force-dynamic";
export const revalidate=0;
export const metadata:Metadata={
  title:"Small Certainty",
  description:"Dispatches from Small Certainty: weekly best lists, notes on taste, and small editorial commitments.",
  alternates:{ canonical:"/journal" },
  openGraph:{
    title:"Journal — Small Certainty",
    description:"Weekly best lists, notes on taste, and small editorial commitments.",
    url:"/journal",
  },
};

function formatTileDate(date:string) {
  const value=new Date(`${date}T00:00:00`);
  return `${value.getDate()} ${value.toLocaleDateString("en-US",{month:"long"})} ${value.getFullYear()}`;
}

function tileImageStyle(article:JournalArticle) {
  return article.imageSrc?{backgroundImage:`url(${article.imageSrc})`}:{background:article.imageTone};
}

function JournalTileStrip({ articles }:{articles:JournalArticle[]}) {
  return <section className="col-span-full mb-12 grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
    {articles.map((article,index)=>{
      const hoverRadiusClass=index===0?"rounded-[8px]":"rounded-lg";
      return <a
        key={`top-tile-${article.slug}-${index}`}
        href={`/journal/${article.slug}`}
        className={`-mx-3 ${hoverRadiusClass} px-3 py-0 transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
      >
        <span aria-hidden="true" className="block border-t border-ink"/>
        <time dateTime={article.date} className="mt-4 block font-simon-mono text-[14px] leading-[20px] tracking-[-0.01em]">
          {formatTileDate(article.date)}
        </time>
        <span
          aria-hidden="true"
          style={tileImageStyle(article)}
          className="mt-4 block h-[260px] w-full rounded-lg bg-cover bg-center sm:h-[300px] lg:h-[352px]"
        />
        <span className="mb-4 mt-4 block h-[40px] overflow-hidden font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {article.title}
        </span>
      </a>;
    })}
  </section>;
}

function JournalSimpleRows({ articles }:{articles:JournalArticle[]}) {
  return <section className="col-span-full">
    <div className="border-t border-ink">
      {articles.map((article,index)=>{
        return <div key={`simple-row-${article.slug}-${index}`}>
          <a
            href={`/journal/${article.slug}`}
            className="-mx-3 grid min-h-[52px] grid-cols-1 gap-1 rounded-lg px-3 py-4 transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:grid-cols-12 sm:items-center sm:gap-x-6 sm:py-0"
          >
            <time dateTime={article.date} className="font-simon-mono text-[14px] leading-[20px] tracking-[-0.01em] sm:col-span-2">
              {formatTileDate(article.date)}
            </time>
            <span className="min-w-0 truncate font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] sm:col-span-10">
              {article.title}
            </span>
          </a>
          <span aria-hidden="true" className="block border-t border-ink"/>
        </div>;
      })}
    </div>
  </section>;
}

export default async function JournalPage(){
  const sections=await getCatalogSections();
  const searchItems=getSearchItems(sections);
  const journalArticles=await getJournalArticles();
  const sortedArticles=[...journalArticles].sort((a,b)=>new Date(`${b.date}T00:00:00`).getTime()-new Date(`${a.date}T00:00:00`).getTime());
  const tileArticles=sortedArticles.slice(0,4);
  const simpleArticles=sortedArticles.slice(4);

  return <div className="min-h-screen bg-paper">
    <Header activeNav="Journal" searchItems={searchItems}/>
    <main className="page-grid page-pad w-full pb-28 pt-12 lg:pt-20">
      <JournalTileStrip articles={tileArticles}/>
      <JournalSimpleRows articles={simpleArticles}/>
    </main>
  </div>;
}
