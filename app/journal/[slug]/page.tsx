import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/ArticleContent";
import { Header } from "@/components/Header";
import { journalArticles,type JournalContentBlock } from "@/content/journal";
import { getCatalogSections,getSearchItems } from "@/lib/catalogData";
import { getJournalArticle } from "@/lib/journalData";
import { absoluteUrl,pageTitle } from "@/lib/seo";

type JournalArticlePageProps = {
  params:Promise<{slug:string}>;
};

export function generateStaticParams(){
  return journalArticles.map(article=>({slug:article.slug}));
}

export async function generateMetadata({ params }:JournalArticlePageProps):Promise<Metadata> {
  const { slug }=await params;
  const article=await getJournalArticle(slug);
  if(!article) return { title:"Small Certainty" };
  const url=absoluteUrl(`/journal/${article.slug}`);
  const seoTitle=article.seo?.seoTitle||article.title;
  const description=article.seo?.metaDescription||article.dek;
  const socialTitle=article.seo?.ogTitle||seoTitle;
  const socialDescription=article.seo?.ogDescription||description;
  const socialImage=article.seo?.ogImage||article.imageSrc
    ? article.seo?.ogImage||{url:article.imageSrc as string,alt:article.title}
    : undefined;
  const images=socialImage?[{
    url:absoluteUrl(socialImage.url),
    alt:socialImage.alt,
  }]:undefined;
  return {
    title:pageTitle(seoTitle),
    description,
    alternates:{ canonical:url },
    openGraph:{
      type:"article",
      siteName:"Small Certainty",
      title:pageTitle(socialTitle),
      description:socialDescription,
      url,
      publishedTime:article.date,
      images,
    },
    twitter:{
      card:images?"summary_large_image":"summary",
      title:pageTitle(socialTitle),
      description:socialDescription,
      images:images?.map(image=>image.url),
    },
  };
}

function formatArticleDate(date:string) {
  const value=new Date(`${date}T00:00:00`);
  return `${value.getDate()} ${value.toLocaleDateString("en-US",{month:"long"})} ${value.getFullYear()}`;
}

export default async function JournalArticlePage({ params }:JournalArticlePageProps){
  const { slug }=await params;
  const article=await getJournalArticle(slug);
  if(!article) notFound();

  const sections=await getCatalogSections();
  const searchItems=getSearchItems(sections);
  const paragraphs=article.sections.flatMap(section=>section.body);
  const bodyCopy=paragraphs.length>0?paragraphs:[article.dek];
  const content:JournalContentBlock[]=article.content?.length?article.content:[{
    _key:"local-article-body",
    _type:"articleTextSection",
    body:bodyCopy,
  }];

  return <>
    <Header activeNav="Journal" searchItems={searchItems}/>
    <main className="page-grid page-pad w-full pb-40 pt-12 lg:pt-16">
      <article className="col-span-2 lg:col-span-full">
        <div className="border-t border-ink pt-4 lg:grid lg:grid-cols-12 lg:gap-x-6">
          <time dateTime={article.date} className="block font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] lg:col-span-2">
            {formatArticleDate(article.date)}
          </time>

          <div className="mt-8 max-w-[680px] font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] lg:col-span-6 lg:col-start-4 lg:mt-0">
            <header className="mb-5 grid gap-5">
              <h1 className="font-normal">{article.title}</h1>
              {article.author?<p>By: {article.author}</p>:null}
            </header>
          </div>
          <ArticleContent blocks={content}/>
        </div>
      </article>
    </main>
  </>;
}
