import type { CatalogSectionData } from "@/components/types";

export const imprintSection:CatalogSectionData={
  title:"Imprint",
  icon:"miscellaneous",
  items:[
    {
      label:"Best Contact Method",
      productName:"hello@smallcertainty.com",
      href:"mailto:hello@smallcertainty.com",
      productHref:"mailto:hello@smallcertainty.com",
      external:true,
    },
    {
      label:"Best Instagram Account",
      productName:"@smallcertainty",
      href:"https://www.instagram.com/smallcertainty/",
      productHref:"https://www.instagram.com/smallcertainty/",
      external:true,
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
