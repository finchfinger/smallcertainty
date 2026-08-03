import Link from "next/link";
import type { CatalogItemData } from "./types";

export type CatalogRowProps = CatalogItemData & { flushTop?:boolean; textClassName?:string; monoClassName?:string; rowHeight?:52; hoverInset?:0|8|12|16; tone?:"default"|"inverted"; showStatus?:boolean };
export function CatalogRow({ label,productName,href,productHref,status,wrapLabel=false,wrapProductName=false,disabled=false,flushTop=false,textClassName="text-[14px] sm:text-[14px]",monoClassName="",rowHeight=52,hoverInset=12,tone="default",showStatus=false }:CatalogRowProps) {
  const showHoverArrow=label==="Best Towels";
  const bestTowelsRadius=label==="Best Towels"?"rounded-[8px]":"";
  const itemRadius=label==="Best Towels"?"rounded-[8px]":"rounded";
  const desktopHeightClass=rowHeight===52?"sm:min-h-[52px]":"sm:min-h-[52px]";
  const hoverShell={
    16:"-mx-4 rounded-lg px-4 before:inset-x-4",
    12:"-mx-[var(--row-hover-overhang)] rounded-lg px-[var(--row-hover-overhang)] before:inset-x-[var(--row-hover-overhang)]",
    8:"-mx-2 rounded px-2 before:inset-x-2",
    0:"mx-0 rounded-none px-0 before:inset-x-0",
  }[hoverInset];
  const isInverted=tone==="inverted";
  const ruleClass=isInverted?"before:border-paper":"before:border-ink";
  const textTone=isInverted?"text-paper":"text-ink";
  const groupHoverText=isInverted?"group-hover:text-paper":"group-hover:text-ink";
  const hoverBg=isInverted?"hover:bg-paper/[0.10]":"hover:bg-black/[0.04]";
  const itemHoverBg=isInverted?"hover:bg-paper/[0.10] focus-visible:bg-paper/[0.10]":"hover:bg-black/[0.04] focus-visible:bg-black/[0.04]";
  const ringOffset=isInverted?"focus-visible:ring-offset-ink":"focus-visible:ring-offset-paper";
  const cls=`rainbow-hover group relative grid min-h-[62px] ${showStatus?"grid-cols-[minmax(0,1fr)_auto]":"grid-cols-1"} gap-1 py-4 transition-colors duration-150 before:absolute before:top-0 before:border-t ${ruleClass} ${hoverBg} ${hoverShell} ${bestTowelsRadius} ${desktopHeightClass} sm:grid-cols-9 sm:items-center sm:gap-x-4 sm:py-0 xl:gap-x-6 ${flushTop?"before:hidden":""}`;
  const plainProductClass=wrapProductName
    ?"inline-block max-w-[920px] whitespace-normal sm:px-2"
    :"inline-block max-w-full truncate sm:px-2";
  const labelClass=wrapLabel
    ?"min-w-0 whitespace-normal sm:truncate-none"
    :"min-w-0 sm:truncate";
  const labelColumnClass=wrapLabel
    ?"sm:col-span-9"
    :"sm:col-span-3";
  const productColumnClass=showStatus
    ?"col-span-2 sm:col-span-5"
    :"sm:col-span-6";
  const statusLabel=status==="new"?"New":status==="updated"?"Updated":null;
  const statusColor=status==="new"?"text-[#ff2b2b]":"text-[#ff27ff]";
  const body=<>
    <span className={`pointer-events-none relative z-10 flex min-w-0 items-center font-normal leading-[20px] tracking-[-0.01em] transition-colors duration-150 ${groupHoverText} ${labelColumnClass} sm:h-full ${textClassName} ${monoClassName}`}><span className={labelClass}>{label}</span></span>
    {productName&&<span className={`pointer-events-none relative z-20 min-w-0 overflow-hidden leading-[20px] ${textTone} transition-colors duration-150 ${productColumnClass} sm:flex sm:h-full sm:items-center ${textClassName} ${monoClassName}`}>{productHref?<><span className="inline-block max-w-full truncate sm:hidden">{productName}</span><a href={productHref} target="_blank" rel="noreferrer" className={`group/item pointer-events-auto hidden h-9 min-w-0 max-w-full items-center truncate ${itemRadius} px-2 leading-[20px] ${textTone} transition-colors duration-150 ${itemHoverBg} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${ringOffset} sm:inline-flex`}><span className="min-w-0 truncate">{productName}</span>{showHoverArrow&&<span aria-hidden="true" className="hidden shrink-0 group-hover/item:inline group-focus-visible/item:inline">&nbsp;→</span>}</a></>:<span className={plainProductClass}>{productName}</span>}</span>}
    {showStatus&&statusLabel&&<span className={`pointer-events-none relative z-20 col-start-2 row-start-1 justify-self-end whitespace-nowrap font-normal leading-[20px] tracking-[-0.01em] sm:col-start-9 sm:row-start-auto ${statusColor} ${textClassName} ${monoClassName}`}>{statusLabel}</span>}
  </>;
  if(disabled) return <div aria-disabled="true" className={`${cls} cursor-not-allowed opacity-35`}>{body}</div>;
  return <div className={cls}>
    <Link href={href} aria-label={`${label}: view recommendations`} className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"/>
    {body}
  </div>;
}
