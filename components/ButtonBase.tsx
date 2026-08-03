import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonBaseProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  className?: string;
};

export const buttonBaseClass =
  "inline-flex h-11 items-center rounded-lg px-4 font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

export function ButtonBase({ children, className = "", ...props }: ButtonBaseProps) {
  return (
    <a
      {...props}
      className={`${buttonBaseClass} ${className}`}
    >
      {children}
    </a>
  );
}
