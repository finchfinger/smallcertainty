"use client";

import { useEffect,useMemo,useState } from "react";

type ThemeChoice = {
  paper:string;
  ink:string;
  line:string;
  muted:string;
  accent:string;
};

const themes:Record<string,ThemeChoice>={
  "snooze fest": {paper:"#f2f2f2",ink:"#1f1a17",line:"#ded8cd",muted:"#756d63",accent:"#e9e9e9"},
  "castlevania": {paper:"#16110f",ink:"#f1e6d8",line:"#3a2926",muted:"#a89488",accent:"#251b18"},
  "radioactive milk": {paper:"#eff7d2",ink:"#182012",line:"#d3dfb1",muted:"#697357",accent:"#e4efbf"},
};

const themeKeys=[
  ["--paper","small-certainty-theme-paper","paper"],
  ["--ink","small-certainty-theme-ink","ink"],
  ["--line","small-certainty-theme-line","line"],
  ["--muted","small-certainty-theme-muted","muted"],
  ["--accent","small-certainty-theme-accent","accent"],
] as const;

type ThemeActionsProps = {
  name:string;
};

export function ThemeActions({ name }:ThemeActionsProps) {
  const [activeTheme,setActiveTheme]=useState("");
  const key=name.toLowerCase();
  const theme=useMemo(()=>themes[key]||themes["snooze fest"],[key]);

  useEffect(()=>{
    setActiveTheme(window.localStorage.getItem("small-certainty-theme-name")||"");
  },[]);

  function useTheme(){
    themeKeys.forEach(([property,storageKey,themeKey])=>{
      const value=theme[themeKey];
      document.documentElement.style.setProperty(property,value);
      window.localStorage.setItem(storageKey,value);
    });
    window.localStorage.setItem("small-certainty-theme-name",key);
    setActiveTheme(key);
  }

  const isActive=activeTheme===key;

  return <button type="button" onClick={useTheme} className="inline-flex h-10 w-fit items-center rounded bg-white/50 px-3 text-[14px] font-normal leading-[20px] transition-colors duration-150 hover:bg-white focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper">{isActive?"Using theme":"Use theme"}</button>;
}
