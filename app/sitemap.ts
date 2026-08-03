import type { MetadataRoute } from "next";
import { journalArticles } from "@/content/journal";
import { miscPages } from "@/content/misc";
import { getCatalogSections } from "@/lib/catalogData";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  const sections=await getCatalogSections();
  const now=new Date();
  const catalogPages=sections.flatMap(section=>section.items
    .filter(item=>!item.disabled)
    .map(item=>({
      url:absoluteUrl(item.href),
      lastModified:item.updated?now:undefined,
      changeFrequency:"weekly" as const,
      priority:0.8,
    })));
  const journalPages=journalArticles.map(article=>({
    url:absoluteUrl(`/journal/${article.slug}`),
    lastModified:new Date(article.date),
    changeFrequency:"monthly" as const,
    priority:0.6,
  }));
  const miscSitemapPages=miscPages.map(page=>({
    url:absoluteUrl(`/misc/${page.slug}`),
    lastModified:now,
    changeFrequency:"monthly" as const,
    priority:0.4,
  }));

  return [
    { url:absoluteUrl("/"),lastModified:now,changeFrequency:"daily",priority:1 },
    { url:absoluteUrl("/journal"),lastModified:now,changeFrequency:"weekly",priority:0.7 },
    { url:absoluteUrl("/profile"),lastModified:now,changeFrequency:"monthly",priority:0.5 },
    { url:absoluteUrl("/llms.txt"),lastModified:now,changeFrequency:"weekly",priority:0.4 },
    ...catalogPages,
    ...journalPages,
    ...miscSitemapPages,
  ];
}
