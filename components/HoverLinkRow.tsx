import Link from "next/link";
import type {ReactNode} from "react";

export function HoverLinkRow({href,children,className=""}:{href:string;children:ReactNode;className?:string}){
  return <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`best-page-link -mx-3 grid min-h-[52px] items-center rounded-md px-3 py-3 focus-visible:bg-black/[.04] focus-visible:outline-none ${className}`}
  >{children}</Link>;
}
