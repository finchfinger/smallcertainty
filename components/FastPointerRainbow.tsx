"use client";

import { useEffect } from "react";

const SPEED_THRESHOLD=7.5;
const FADE_DELAY_MS=360;
const REMOVE_DELAY_MS=1600;
const ROW_REPAINT_COOLDOWN_MS=260;
const SAMPLE_SPACING=6;
const TRAIL_STAGGER_MS=42;
const COLORS=["#ffe8e8","#fff0c7","#f5ffd2","#ddffe4","#d9f8ff","#e5eaff","#f6e1ff"];

export function FastPointerRainbow() {
  useEffect(()=>{
    let lastX=0;
    let lastY=0;
    let lastTime=0;
    let colorIndex=0;

    function paintRow(row:HTMLElement) {
      const now=performance.now();
      const lastPaint=Number(row.dataset.rainbowLastPaint||0);
      if(now-lastPaint<ROW_REPAINT_COOLDOWN_MS) return;
      row.dataset.rainbowLastPaint=String(now);

      const color=COLORS[colorIndex%COLORS.length];
      colorIndex+=1;
      row.style.setProperty("--wonder-row-color",color);
      row.style.backgroundColor=color;
      row.style.transition="background-color 80ms ease";
      row.classList.remove("rainbow-trail-fade");
      row.classList.add("rainbow-trail");

      const existingFade=Number(row.dataset.rainbowFade||0);
      const existingRemove=Number(row.dataset.rainbowRemove||0);
      if(existingFade) window.clearTimeout(existingFade);
      if(existingRemove) window.clearTimeout(existingRemove);

      const fadeId=window.setTimeout(()=>{
        row.classList.add("rainbow-trail-fade");
        row.style.backgroundColor="transparent";
        row.style.transition="background-color 980ms ease";
      },FADE_DELAY_MS);
      const removeId=window.setTimeout(()=>{
        row.classList.remove("rainbow-trail","rainbow-trail-fade");
        row.style.removeProperty("--wonder-row-color");
        row.style.removeProperty("background-color");
        row.style.removeProperty("transition");
        delete row.dataset.rainbowFade;
        delete row.dataset.rainbowRemove;
        delete row.dataset.rainbowLastPaint;
      },REMOVE_DELAY_MS);

      row.dataset.rainbowFade=String(fadeId);
      row.dataset.rainbowRemove=String(removeId);
    }

    function findRowAtPoint(x:number,y:number) {
      const hit=document.elementFromPoint(x,y);
      const hitRow=hit?.closest?.(".rainbow-hover") as HTMLElement|null;
      if(hitRow) return hitRow;
      const rows=Array.from(document.querySelectorAll<HTMLElement>(".rainbow-hover"));
      return rows.find(row=>{
        const rect=row.getBoundingClientRect();
        return x>=rect.left&&x<=rect.right&&y>=rect.top&&y<=rect.bottom;
      })||null;
    }

    function findRowsAlongPath(startX:number,startY:number,endX:number,endY:number) {
      const minY=Math.min(startY,endY);
      const maxY=Math.max(startY,endY);
      const minX=Math.min(startX,endX);
      const maxX=Math.max(startX,endX);
      const rows=Array.from(document.querySelectorAll<HTMLElement>(".rainbow-hover"));
      return rows.filter(row=>{
        const rect=row.getBoundingClientRect();
        const verticalHit=rect.bottom>=minY&&rect.top<=maxY;
        const horizontalHit=rect.right>=minX&&rect.left<=maxX;
        return verticalHit&&horizontalHit;
      }).sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
    }

    function onMouseMove(event:MouseEvent) {
      const now=performance.now();
      if(lastTime) {
        const distance=Math.hypot(event.clientX-lastX,event.clientY-lastY);
        const elapsed=Math.max(now-lastTime,1);
        const speed=distance/elapsed;
        if(speed>=SPEED_THRESHOLD) {
          const paintedRows=new Set<HTMLElement>();
          const direction=event.clientY>=lastY?1:-1;
          findRowsAlongPath(lastX,lastY,event.clientX,event.clientY).forEach((row,index)=>{
            paintedRows.add(row);
            window.setTimeout(()=>paintRow(row),index*TRAIL_STAGGER_MS);
          });
          const sampleCount=Math.max(1,Math.ceil(distance/SAMPLE_SPACING));
          for(let i=1;i<=sampleCount;i+=1) {
            const progress=i/sampleCount;
            const x=lastX+(event.clientX-lastX)*progress;
            const y=lastY+(event.clientY-lastY)*progress;
            const row=findRowAtPoint(x,y);
            if(row&&!paintedRows.has(row)) {
              paintedRows.add(row);
              const rect=row.getBoundingClientRect();
              const pathPosition=direction>=0?rect.top:rect.bottom;
              const progress=Math.min(1,Math.max(0,(pathPosition-Math.min(lastY,event.clientY))/Math.max(Math.abs(event.clientY-lastY),1)));
              window.setTimeout(()=>paintRow(row),progress*TRAIL_STAGGER_MS*4);
            }
          }
        }
      }
      lastX=event.clientX;
      lastY=event.clientY;
      lastTime=now;
    }

    function onKeyDown(event:KeyboardEvent) {
      if(event.key.toLowerCase()!=="r") return;
      document.querySelectorAll<HTMLElement>(".rainbow-hover").forEach((row,index)=>{
        if(index<8) window.setTimeout(()=>paintRow(row),index*65);
      });
    }

    window.addEventListener("mousemove",onMouseMove,{capture:true,passive:true});
    window.addEventListener("keydown",onKeyDown);
    return ()=>{
      window.removeEventListener("mousemove",onMouseMove,{capture:true});
      window.removeEventListener("keydown",onKeyDown);
    };
  },[]);

  return null;
}
