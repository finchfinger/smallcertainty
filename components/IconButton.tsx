"use client";

export type IconButtonProps = { icon:React.ReactNode; label:string; variant?:"ghost"|"circle"|"plain"; size?:"sm"|"md"|"lg"; disabled?:boolean; onClick?:()=>void; className?:string; style?:React.CSSProperties };
const sizes = { sm:"h-10 w-10", md:"h-10 w-10", lg:"h-10 w-10" };
const variants = { ghost:"rounded hover:bg-[#f9f9f9]", circle:"rounded hover:bg-[#f9f9f9]", plain:"rounded hover:bg-[#f9f9f9]" };
export function IconButton({ icon,label,variant="ghost",size="md",disabled=false,onClick,className="",style }:IconButtonProps) {
  return <button type="button" aria-label={label} disabled={disabled} onClick={onClick} style={style} className={`inline-flex shrink-0 items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-30 ${sizes[size]} ${variants[variant]} ${className}`}>{icon}</button>;
}
