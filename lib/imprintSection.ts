import type { CatalogSectionData } from "@/components/types";

export const imprintSection:CatalogSectionData={
  title:"Imprint",
  icon:"miscellaneous",
  items:[
    {
      label:"Best Email Address",
      productName:"hello@smallcertainty.com",
      href:"/catalog/imprint/contact-method",
      productHref:"mailto:hello@smallcertainty.com",
    },
    {
      label:"Best Instagram Account",
      productName:"@smallcertainty",
      href:"/catalog/imprint/instagram-account",
      productHref:"https://www.instagram.com/smallcertainty/",
    },
    {
      label:"Best X Account",
      productName:"@smallcertainty",
      href:"https://x.com/smallcertainty",
      productHref:"https://x.com/smallcertainty",
      external:true,
    },
    {
      label:"Best TikTok Account",
      productName:"@smallcertainty",
      href:"https://www.tiktok.com/@smallcertainty",
      productHref:"https://www.tiktok.com/@smallcertainty",
      external:true,
    },
    {
      label:"Best Disclaimer",
      productName:"Copyright 2026. All rights reserved.",
      href:"/catalog/imprint/disclaimer",
    },
  ],
};
