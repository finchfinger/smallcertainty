import type { Metadata } from "next";
import type { CatalogItemData } from "@/components/types";

export const siteName="Small Certainty";
export const siteDescription="Small Certainty is a guide to the best things worth buying, keeping, reading, and using, chosen for design, usefulness, and lasting quality.";
export const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||"https://smallcertainty.com").replace(/\/$/,"");
export const defaultSocialImage="/journal/features/kluane-icefield.jpg";
export const defaultSocialImageAlt="The Kluane Icefield and Mount Augusta in Yukon";

export function absoluteUrl(path="/") {
  if(path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/")?path:`/${path}`}`;
}

export function pageTitle(title?:string) {
  return title?`${title} | ${siteName}`:siteName;
}

export function truncateDescription(text:string,maxLength=155) {
  const normalized=text.replace(/\s+/g," ").trim();
  if(normalized.length<=maxLength) return normalized;
  return `${normalized.slice(0,maxLength-1).replace(/\s+\S*$/,"")}…`;
}

export function defaultMetadata(path="/"):Metadata {
  const socialImage={url:absoluteUrl(defaultSocialImage),alt:defaultSocialImageAlt};
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
      images:[socialImage],
    },
    twitter:{
      card:"summary_large_image",
      title:siteName,
      description:siteDescription,
      images:[socialImage.url],
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION?{verification:{google:process.env.GOOGLE_SITE_VERIFICATION}}:{}),
  };
}

export function catalogItemDescription(item:CatalogItemData) {
  const firstRecommendation=item.recommendations?.find(recommendation=>recommendation.note);
  const text=firstRecommendation?.note||item.intro||`${item.label}, edited by ${siteName}.`;
  return truncateDescription(text);
}

export function catalogItemMetadata(item:CatalogItemData,path=item.href):Metadata {
  const description=truncateDescription(item.seo?.metaDescription||catalogItemDescription(item));
  const title=item.seo?.seoTitle||item.label;
  const socialTitle=item.seo?.ogTitle||title;
  const socialDescription=truncateDescription(item.seo?.ogDescription||description,200);
  const url=absoluteUrl(path);
  const socialImage={url:absoluteUrl(defaultSocialImage),alt:defaultSocialImageAlt};
  return {
    title:pageTitle(title),
    description,
    alternates:{ canonical:url },
    openGraph:{
      type:"article",
      siteName,
      title:pageTitle(socialTitle),
      description:socialDescription,
      url,
      images:[socialImage],
    },
    twitter:{
      card:"summary_large_image",
      title:pageTitle(socialTitle),
      description:socialDescription,
      images:[socialImage.url],
    },
  };
}
