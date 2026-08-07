import type { Metadata } from "next";
import { FastPointerRainbow } from "@/components/FastPointerRainbow";
import { SiteFooter } from "@/components/SiteFooter";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = defaultMetadata("/");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="impact-site-verification"
          {...{ value: "2234f842-3095-4ddb-9262-6807be6c9a16" }}
        />
      </head>
      <body>
        <FastPointerRainbow />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
