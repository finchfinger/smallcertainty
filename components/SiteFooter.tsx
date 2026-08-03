"use client";

import { usePathname } from "next/navigation";
import { CatalogSection } from "./CatalogSection";
import { imprintSection } from "@/lib/imprintSection";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;

  return (
    <footer className="mt-[52px] bg-black/5 py-[52px] text-ink">
      <div className="page-grid page-pad w-full">
        <div className="col-span-2 lg:col-span-full">
          <CatalogSection {...imprintSection} />
        </div>
      </div>
    </footer>
  );
}
