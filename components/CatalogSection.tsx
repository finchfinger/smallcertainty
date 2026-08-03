import { CatalogRow } from "./CatalogRow";
import { ResponsiveSectionLabel } from "./ResponsiveSectionLabel";
import type { CatalogSectionData } from "./types";

export type CatalogSectionProps = CatalogSectionData & { tone?:"default"|"inverted"; showStatus?:boolean };
export function CatalogSection({ title="",items=[],tone="default",showStatus=false }:CatalogSectionProps) {
  const safeTitle=title || "Untitled";
  const headingId=`section-${safeTitle.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;
  const lowerTitle=safeTitle.toLowerCase();
  const textClassName=lowerTitle.startsWith("men")?"text-[14px] sm:text-[14px]":"text-[14px] sm:text-[14px]";
  const sectionMonoClass="font-simon-mono";
  const rowMonoClass="font-simon-mono";
  const rowHeight=52;
  const hoverInset=12;
  const ruleClass=tone==="inverted"?"border-paper":"border-ink";
  return <section aria-labelledby={headingId} className={`scroll-mt-8 min-[700px]:grid min-[700px]:grid-cols-12 min-[700px]:gap-x-6 min-[700px]:border-t ${ruleClass}`}>
    <div className="mb-4 min-[700px]:col-span-2 min-[700px]:mb-0">
      <h2 id={headingId} className={`${sectionMonoClass} flex h-5 items-center font-normal leading-[20px] tracking-[-0.01em] min-[700px]:h-auto min-[700px]:min-h-12 min-[700px]:w-auto min-[700px]:flex-col min-[700px]:items-start min-[700px]:justify-start min-[700px]:pt-[13px] min-[700px]:leading-none xl:w-auto xl:flex-row xl:items-center xl:justify-start xl:pt-0 xl:leading-snug ${textClassName}`}>
        <ResponsiveSectionLabel title={safeTitle} mobileUppercase/>
      </h2>
    </div>
    <div className="min-[700px]:col-span-10">
      {items.length?<div>{items.map((item,i)=><CatalogRow key={`${item.label || "item"}-${i}`} {...item} flushTop={i===0} textClassName={textClassName} monoClassName={rowMonoClass} rowHeight={rowHeight} hoverInset={hoverInset} tone={tone} showStatus={showStatus}/>)}</div>:<p className="rounded bg-accent px-3 py-6 text-[14px] leading-[20px] text-muted">Recommendations coming soon.</p>}
    </div>
  </section>;
}
