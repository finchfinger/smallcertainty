import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageShell } from "@/components/DetailPageShell";
import { getMiscPage,miscPages } from "@/content/misc";
import { getCatalogSections,getSearchItems } from "@/lib/catalogData";

type MiscPageProps = {
  params:Promise<{slug:string}>;
};

export function generateStaticParams(){
  return miscPages.map(page=>({slug:page.slug}));
}

export async function generateMetadata({ params }:MiscPageProps):Promise<Metadata> {
  const { slug }=await params;
  const page=getMiscPage(slug);
  if(!page) return { title:"Small Certainty" };
  return {
    title:"Small Certainty",
    description:page.description,
    alternates:{ canonical:`/misc/${page.slug}` },
    openGraph:{
      title:`${page.title} — Small Certainty`,
      description:page.description,
      url:`/misc/${page.slug}`,
    },
  };
}

export default async function MiscDetailPage({ params }:MiscPageProps){
  const { slug }=await params;
  const page=getMiscPage(slug);
  if(!page) notFound();

  const sections=await getCatalogSections();
  const searchItems=getSearchItems(sections);
  const detailItem={
    label:page.title,
    productName:page.value,
    href:`/misc/${page.slug}`,
    productHref:page.href,
    intro:page.description,
    sectionTitle:"Imprint",
    recommendations:page.recommendations||[{
      rank:1,
      productName:page.value,
      productHref:page.href,
      note:page.description,
    }],
  };

  return <DetailPageShell item={detailItem} searchItems={searchItems} activeNav="Profile" counterStyle="hash"/>;
}
