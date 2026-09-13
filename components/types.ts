export type RecommendationData = {
  rank:number;
  productName:string;
  brand?:string;
  productHref?:string;
  note?:string;
  badge?:string;
};

export type CatalogItemData = {
  label:string;
  productName:string;
  brand?:string;
  href:string;
  productHref?:string;
  wrapLabel?:boolean;
  wrapProductName?:boolean;
  status?:"new"|"updated";
  updated?:boolean;
  disabled?:boolean;
  external?:boolean;
  intro?:string;
  seo?:{
    seoTitle?:string;
    metaDescription?:string;
    ogTitle?:string;
    ogDescription?:string;
  };
  recommendations?:RecommendationData[];
};

export type CatalogSectionData = { title:string; icon?:string; slug?:string; items:CatalogItemData[] };
