import { AboutSection } from "@/components/AboutSection";
import { CatalogSection } from "@/components/CatalogSection";
import { Header } from "@/components/Header";
import type { CatalogSectionData } from "@/components/types";
import { getCatalogSections,getSearchItems } from "@/lib/catalogData";
import { getCollaborators } from "@/lib/collaboratorData";
import type { Metadata } from "next";

export const revalidate=60;

const fallbackInfrastructureSection:CatalogSectionData={
  title:"Infrastructure",
  icon:"miscellaneous",
  items:[
    {
      label:"Best Design Firm",
      productName:"Golden Hymn",
      href:"/catalog/infrastructure/best-design-firm",
      productHref:"https://goldenhymn.com",
    },
    {
      label:"Best Typeface",
      productName:"ABC Favorit",
      href:"/catalog/infrastructure/best-typeface",
      productHref:"https://abcdinamo.com/typefaces/favorit",
    },
    {
      label:"Best Content Management System",
      productName:"Sanity",
      href:"/catalog/infrastructure/best-content-management-system",
      productHref:"https://www.sanity.io",
    },
    {
      label:"Best Framework",
      productName:"Next.js",
      href:"/catalog/infrastructure/best-framework",
      productHref:"https://nextjs.org",
    },
    {
      label:"Best Consultant",
      productName:"Finchfinger",
      href:"/catalog/infrastructure/best-consultant",
      productHref:"https://www.finchfinger.com/",
    },
    {
      label:"Best Email Service",
      productName:"Resend",
      href:"/catalog/infrastructure/best-email-service",
      productHref:"https://resend.com",
    },
  ],
};

export const metadata:Metadata={
  title:"Small Certainty",
  description:"Small Certainty is an edited catalog of best lists: fewer options, better reasons, and a gentle end to the search.",
  alternates:{ canonical:"/profile" },
  openGraph:{
    title:"Profile — Small Certainty",
    description:"An edited catalog of best lists: fewer options, better reasons, and a gentle end to the search.",
    url:"/profile",
  },
};

export default async function ProfilePage(){
  const allSections=await getCatalogSections(true);
  const sections=allSections.filter(section=>!["colophon","infrastructure","imprint"].includes((section.slug||section.title).toLowerCase()));
  const searchItems=getSearchItems(sections);
  const collaborators=await getCollaborators();
  const infrastructureSection=allSections.find(section=>section.slug==="infrastructure")||fallbackInfrastructureSection;

  return <>
    <Header activeNav="Profile" searchItems={searchItems}/>
    <main className="page-grid page-pad w-full pb-28 pt-12 lg:pt-16">
      <div className="col-span-2 lg:col-span-full">
        <AboutSection>Small Certainty is an edited catalog of things worth choosing. We pick what’s best and stop there. No clutter. No hedging. Just the thing, and why it holds. Some links may earn Small Certainty a commission. Payment never determines what we select or how we rank it.</AboutSection>
      </div>
      <section className="col-span-2 mt-[52px] min-[700px]:mt-12 lg:col-span-full">
        <CatalogSection {...infrastructureSection} showStatus/>
      </section>
      <section className="col-span-2 mt-[52px] min-[700px]:mt-12 lg:col-span-full">
        <CatalogSection title="Collaborators" items={collaborators}/>
      </section>
    </main>
  </>;
}
