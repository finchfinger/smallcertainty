import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { FastPointerRainbow } from "@/components/FastPointerRainbow";
import { SiteFooter } from "@/components/SiteFooter";
import { absoluteUrl,defaultMetadata,siteDescription,siteName } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = defaultMetadata("/");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData=[
    {"@context":"https://schema.org","@type":"WebSite",name:siteName,url:absoluteUrl("/"),description:siteDescription},
    {"@context":"https://schema.org","@type":"Organization",name:siteName,url:absoluteUrl("/"),email:"hello@smallcertainty.com"},
  ];
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="impact-site-verification"
          {...{ value: "2234f842-3095-4ddb-9262-6807be6c9a16" }}
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
        <FastPointerRainbow />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
