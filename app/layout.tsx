import type { Metadata } from "next";
import { FastPointerRainbow } from "@/components/FastPointerRainbow";
import { SiteFooter } from "@/components/SiteFooter";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = defaultMetadata("/");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><FastPointerRainbow/>{children}<SiteFooter/></body></html>;
}
