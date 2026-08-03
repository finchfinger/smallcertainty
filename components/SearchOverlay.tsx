"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ActionButton } from "./ActionButton";
import { buttonBaseClass } from "./ButtonBase";

export type SearchItem = {
  label:string;
  productName:string;
  href:string;
  section:string;
  external?:boolean;
};

export function SearchOverlay({ items }:{ items:SearchItem[] }) {
  const [open,setOpen]=useState(false);
  const [query,setQuery]=useState("");
  const [recent,setRecent]=useState<SearchItem[]>([]);
  const inputRef=useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(!open) return;
    try {
      const stored=window.localStorage.getItem("small-certainty-recent-searches");
      const parsed=stored?JSON.parse(stored):[];
      if(Array.isArray(parsed)) setRecent(parsed.slice(0,8));
    } catch {
      setRecent([]);
    }
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    inputRef.current?.focus();
    const onKeyDown=(event:KeyboardEvent)=>{ if(event.key==="Escape") setOpen(false); };
    window.addEventListener("keydown",onKeyDown);
    return ()=>{ document.body.style.overflow=previousOverflow; window.removeEventListener("keydown",onKeyDown); };
  },[open]);

  const results=useMemo(()=>{
    const term=query.trim().toLocaleLowerCase();
    if(!term) return [];
    return items.filter(item=>`${item.label} ${item.productName} ${item.section}`.toLocaleLowerCase().includes(term)).slice(0,12);
  },[items,query]);

  function close(){ setOpen(false); setQuery(""); }
  const popular=items.slice(0,8);
  const suggestions=recent.length?recent:popular;

  function remember(item:SearchItem) {
    const next=[item,...recent.filter(recentItem=>recentItem.href!==item.href)].slice(0,8);
    setRecent(next);
    try {
      window.localStorage.setItem("small-certainty-recent-searches",JSON.stringify(next));
    } catch {}
  }

  function removeRecent(item:SearchItem) {
    const next=recent.filter(recentItem=>recentItem.href!==item.href);
    setRecent(next);
    try {
      if(next.length) {
        window.localStorage.setItem("small-certainty-recent-searches",JSON.stringify(next));
      } else {
        window.localStorage.removeItem("small-certainty-recent-searches");
      }
    } catch {}
  }

  return <>
    <button type="button" aria-label="Open search" onClick={()=>setOpen(true)} className={`${buttonBaseClass} -mr-2 w-fit justify-self-end justify-end !px-2 lg:-mr-4 lg:!px-4`}><span className="lg:hidden">(◔_◔)</span><span className="hidden lg:inline">Reconnaissances</span></button>
    {open&&<div className="fixed inset-0 z-[100] overflow-y-auto bg-black/20 px-5 pb-10 pt-[7vh] sm:px-8" onMouseDown={event=>{if(event.target===event.currentTarget) close();}}>
      <section role="dialog" aria-modal="true" aria-labelledby="search-title" className="mx-auto w-full max-w-[680px] rounded-[24px] bg-paper p-6 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:p-8">
        <h2 id="search-title" className="sr-only">Search the catalog</h2>
        <div className="flex h-[52px] items-center gap-4">
          <input ref={inputRef} type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search for anything" aria-label="Search the catalog" className="min-w-0 flex-1 bg-transparent text-[14px] font-normal leading-[20px] tracking-[-0.01em] outline-none placeholder:text-ink"/>
          <button type="button" onClick={close} className="inline-flex h-[52px] shrink-0 items-center rounded px-3 text-[14px] font-normal leading-[20px] transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none">Close</button>
        </div>
        <div className="mt-8">
          {!query.trim()&&<>
            <div className="relative mb-4 flex h-[20px] items-center justify-center">
              <p className="text-center text-[14px] font-normal leading-[20px]">{recent.length?"*** RECENT SEARCHES ***":"*** POPULAR SEARCHES ***"}</p>
            </div>
            <div className="grid">
              {suggestions.map(item=><div key={`${item.section}-${item.label}`} className="group relative -mx-[var(--row-hover-overhang)]">
                <a href={item.href} target={item.external===false?undefined:"_blank"} rel={item.external===false?undefined:"noreferrer"} onClick={()=>remember(item)} className="relative flex min-h-[52px] items-center rounded-lg px-[var(--row-hover-overhang)] pr-16 text-[14px] font-normal leading-[20px] tracking-[-0.01em] transition-colors duration-150 before:absolute before:inset-x-[var(--row-hover-overhang)] before:top-0 before:border-t before:border-ink hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none">
                  <span className="min-w-0 truncate">{item.label}</span>
                </a>
                {recent.length>0&&<button type="button" onClick={()=>removeRecent(item)} aria-label={`Clear ${item.label} from recent searches`} className="absolute right-[var(--row-hover-overhang)] top-1/2 inline-flex h-[36px] -translate-y-1/2 items-center rounded px-2 text-[14px] font-normal leading-[20px] opacity-0 transition-[background-color,opacity] duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100 group-focus-within:opacity-100">Clear</button>}
              </div>)}
            </div>
          </>}
          {query.trim()&&results.length===0&&<div className="flex min-h-[156px] flex-col items-center justify-center gap-4 text-center text-[14px] font-normal leading-[20px]">
            <p aria-hidden="true">¯\_(⊙︿⊙)_/¯</p>
            <p>No certainties found.</p>
            <ActionButton type="button" onClick={()=>setQuery("")}>Clear search</ActionButton>
          </div>}
          {query.trim()&&<div className="grid">
            {results.map(item=><a key={`${item.section}-${item.label}`} href={item.href} target={item.external===false?undefined:"_blank"} rel={item.external===false?undefined:"noreferrer"} onClick={()=>remember(item)} className="relative -mx-[var(--row-hover-overhang)] flex min-h-[52px] items-center rounded-lg px-[var(--row-hover-overhang)] text-[14px] font-normal leading-[20px] tracking-[-0.01em] transition-colors duration-150 before:absolute before:inset-x-[var(--row-hover-overhang)] before:top-0 before:border-t before:border-ink hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none">
              <span className="min-w-0 truncate">{item.label}</span>
            </a>)}
          </div>}
        </div>
      </section>
    </div>}
  </>;
}
