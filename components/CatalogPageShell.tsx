import { Header } from "./Header";
import { CatalogSection } from "./CatalogSection";
import type { CatalogSectionData } from "./types";

export function CatalogPageShell({ sections }:{ sections:CatalogSectionData[] }) {
  const searchItems=sections.flatMap(section=>section.items.filter(item=>!item.disabled).map(item=>({...item,section:section.title})));
  return <><Header activeNav="Catalog" searchItems={searchItems}/><main className="page-grid page-pad w-full pb-28 pt-12 lg:pt-20"><div className="space-y-[52px] min-[700px]:space-y-12 lg:col-span-full">
    {sections.map(section=><CatalogSection key={section.title} {...section} showStatus/>)}
  </div></main></>;
}
