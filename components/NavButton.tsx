import { ButtonBase } from "./ButtonBase";

type NavButtonProps = {
  href: string;
  children: string;
  mobileLabel?: string;
  active?: boolean;
};

export function NavButton({ href, children, mobileLabel,active = false }: NavButtonProps) {
  return (
    <ButtonBase
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative shrink-0 !px-2 text-ink lg:!px-4 ${active ? "after:absolute after:inset-x-2 after:bottom-[-5px] after:border-b after:border-ink lg:after:inset-x-4" : ""}`}
    >
      {mobileLabel&&<span className="lg:hidden">{mobileLabel}</span>}
      <span className={mobileLabel?"hidden lg:inline":undefined}>{children}</span>
    </ButtonBase>
  );
}
