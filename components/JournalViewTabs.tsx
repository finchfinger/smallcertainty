type JournalViewTabsProps = {
  active:"list"|"tiles";
};

export function JournalViewTabs({ active }:JournalViewTabsProps) {
  const tabs=[
    { label:"List",href:"/journal",key:"list" },
    { label:"Tiles",href:"/journal/tiles",key:"tiles" },
  ] as const;

  return <nav aria-label="Journal view" className="flex items-center justify-end gap-1 font-simon-mono text-[14px] leading-[20px] tracking-[-0.01em]">
    {tabs.map(tab=><a key={tab.key} href={tab.href} aria-current={active===tab.key?"page":undefined} className={`rounded px-3 py-2 transition-colors duration-150 hover:bg-white focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${active===tab.key?"bg-white text-ink":"text-muted"}`}>{tab.label}</a>)}
  </nav>;
}
