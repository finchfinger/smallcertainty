import { forwardRef } from "react";
import type { AnchorHTMLAttributes,ButtonHTMLAttributes,ReactNode } from "react";

const actionButtonBaseClass="inline-flex h-[52px] w-fit items-center justify-center rounded px-3 text-[14px] font-normal leading-[20px] tracking-[-0.01em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper";
export const actionButtonClass=`${actionButtonBaseClass} bg-black/[0.05] hover:bg-black/[0.10] focus-visible:bg-black/[0.10]`;
export const primaryActionButtonClass=`${actionButtonBaseClass} action-button--primary`;
export const bareActionButtonClass=`${actionButtonBaseClass} action-button--bare`;
export const ghostActionButtonClass=`${actionButtonBaseClass} bg-transparent hover:bg-black/[0.05] focus-visible:bg-black/[0.05]`;
export const outlineActionButtonClass=`${actionButtonBaseClass} border border-ink bg-transparent hover:bg-black/[0.05] focus-visible:bg-black/[0.05]`;
export const textActionButtonClass="inline-flex h-11 w-fit items-center justify-center rounded px-3 text-[14px] font-normal leading-[20px] tracking-[-0.01em] transition-colors duration-150 bg-transparent hover:bg-black/[0.05] focus-visible:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

type ActionLinkProps=AnchorHTMLAttributes<HTMLAnchorElement> & {
  children:ReactNode;
  className?:string;
  variant?:"default"|"primary"|"outline"|"text";
};

export function ActionLink({ children,className="",variant="default",...props }:ActionLinkProps) {
  const variantClass=variant==="primary"?primaryActionButtonClass:variant==="outline"?outlineActionButtonClass:variant==="text"?textActionButtonClass:actionButtonClass;
  return <a {...props} className={`${variantClass} ${className}`}>{children}</a>;
}

type ActionButtonProps=ButtonHTMLAttributes<HTMLButtonElement> & {
  children:ReactNode;
  className?:string;
  variant?:"default"|"primary"|"bare"|"ghost"|"outline"|"text";
};

export const ActionButton=forwardRef<HTMLButtonElement,ActionButtonProps>(function ActionButton({ children,className="",type="button",variant="default",...props },ref) {
  const variantClass=variant==="primary"?primaryActionButtonClass:variant==="bare"?bareActionButtonClass:variant==="ghost"?ghostActionButtonClass:variant==="outline"?outlineActionButtonClass:variant==="text"?textActionButtonClass:actionButtonClass;
  return <button ref={ref} {...props} type={type} className={`${variantClass} ${className}`}>{children}</button>;
});
