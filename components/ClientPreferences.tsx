"use client";

import { useEffect } from "react";

const fontKeys=[
  ["--site-font","small-certainty-font"],
  ["--site-font-stretch","small-certainty-font-stretch"],
  ["--site-font-variation","small-certainty-font-variation"],
] as const;

const themeKeys=[
  ["--paper","small-certainty-theme-paper"],
  ["--ink","small-certainty-theme-ink"],
  ["--line","small-certainty-theme-line"],
  ["--muted","small-certainty-theme-muted"],
  ["--accent","small-certainty-theme-accent"],
] as const;

export function ClientPreferences() {
  useEffect(()=>{
    const fontPreferenceVersion=window.localStorage.getItem("small-certainty-font-version");
    if(fontPreferenceVersion!=="2"){
      fontKeys.forEach(([,key])=>window.localStorage.removeItem(key));
      window.localStorage.setItem("small-certainty-font-version","2");
    }
    [...fontKeys,...themeKeys].forEach(([property,key])=>{
      const value=window.localStorage.getItem(key);
      if(value) document.documentElement.style.setProperty(property,value);
    });
  },[]);

  return null;
}
