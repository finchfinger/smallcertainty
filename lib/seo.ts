import type { Metadata } from "next";
import type { CatalogItemData } from "@/components/types";

export const siteName="Small Certainty";
export const siteDescription="An edited catalog of things worth choosing.";
export const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||"https://smallcertainty.com").replace(/\/$/,"");

export function absoluteUrl(path="/") {
  if(path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/")?path:`/${path}`}`;
}

export function pageTitle(title?:string) {
  return title?`${title} — ${siteName}`:siteName;
}

export function truncateDescription(text:string,maxLength=155) {
  const normalized=text.replace(/\s+/g," ").trim();
  if(normalized.length<=maxLength) return normalized;
  return `${normalized.slice(0,maxLength-1).replace(/\s+\S*$/,"")}…`;
}

export function defaultMetadata(path="/"):Metadata {
  return {
    metadataBase:new URL(siteUrl),
    title:siteName,
    description:siteDescription,
    alternates:{ canonical:absoluteUrl(path) },
    openGraph:{
      type:"website",
      siteName,
      title:siteName,
      description:siteDescription,
      url:absoluteUrl(path),
    },
    twitter:{
      card:"summary",
      title:siteName,
      description:siteDescription,
    },
  };
}

export function catalogItemDescription(item:CatalogItemData) {
  const firstRecommendation=item.recommendations?.find(recommendation=>recommendation.note);
  const text=firstRecommendation?.note||item.intro||`${item.label}, edited by ${siteName}.`;
  return truncateDescription(text);
}

export function catalogItemMetadata(item:CatalogItemData,path=item.href):Metadata {
  const description=catalogItemDescription(item);
  const url=absoluteUrl(path);
  return {
    title:siteName,
    description,
    alternates:{ canonical:url },
    openGraph:{
      type:"article",
      siteName,
      title:pageTitle(item.label),
      description,
      url,
    },
    twitter:{
      card:"summary",
      title:pageTitle(item.label),
      description,
    },
  };
}
