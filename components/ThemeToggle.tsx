"use client";
import { useEffect, useState } from "react";
import { IconButton } from "./IconButton";
import { MaterialIcon } from "./MaterialIcon";

export function ThemeToggle() {
  const [dark,setDark]=useState(false);
  useEffect(()=>setDark(document.documentElement.classList.contains("dark")),[]);
  function toggle(){ const next=!dark; setDark(next); document.documentElement.classList.toggle("dark",next); localStorage.setItem("theme",next?"dark":"light"); }
  return <IconButton label={dark?"Use light theme":"Use dark theme"} icon={<MaterialIcon name={dark?"dark_mode":"light_mode"} size={22}/>} variant="ghost" onClick={toggle}/>;
}
