import Link from "next/link";
import { buttonBaseClass } from "./ButtonBase";

export type LogoLinkProps = { ariaLabel?:string; href?:string; children?:React.ReactNode; className?:string };
export function LogoLink({ ariaLabel="Small Certainty — home", href="/", children, className="" }:LogoLinkProps) {
  return <Link href={href} aria-label={ariaLabel} className={`${buttonBaseClass} whitespace-nowrap justify-start ${className}`}>
    {children ?? <>
      <span className="lg:hidden">S. C.</span>
      <span className="hidden lg:inline">Small Certainty</span>
    </>}
  </Link>;
}
