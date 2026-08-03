import { LogoLink } from "./LogoLink";
import { NavButton } from "./NavButton";
import { SearchOverlay,type SearchItem } from "./SearchOverlay";

export type HeaderProps = { activeNav?:"Catalog"|"Journal"|"Profile"; showNav?:boolean; searchItems?:SearchItem[] };
export function Header({ activeNav="Catalog",showNav=true,searchItems=[] }:HeaderProps) {
  const nav=["Catalog","Journal","Profile"] as const;
  const hrefs={Catalog:"/",Journal:"/journal",Profile:"/profile"} as const;
  const mobileLabels={Catalog:"-\\★/-",Journal:"==|==",Profile:"⌐■_■¬"} as const;
  return <header className="h-16 w-full">
    <div className="page-grid page-pad grid h-full w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1">
      <div className="flex min-w-0 items-center justify-start lg:col-span-2"><LogoLink className="-ml-2 !px-2 lg:-ml-4 lg:!px-4"/></div>
      <div className="min-w-0 overflow-hidden lg:col-span-8">{showNav && <nav aria-label="Main navigation" className="flex min-w-0 items-center justify-center gap-3 whitespace-nowrap font-normal lg:gap-1">{nav.map(item=><NavButton key={item} href={hrefs[item]} mobileLabel={mobileLabels[item]} active={item===activeNav}>{item}</NavButton>)}</nav>}</div>
      <div className="flex min-w-0 items-center justify-end gap-1.5 lg:col-span-2"><SearchOverlay items={searchItems}/></div>
    </div>
  </header>;
}
