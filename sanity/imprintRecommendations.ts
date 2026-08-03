export type ImprintRecommendationSet={
  slug:string;
  label:string;
  recommendations:{ productName:string; productHref?:string; note:string }[];
};

export const imprintRecommendations:ImprintRecommendationSet[]=[
  {
    slug:"contact-method",
    label:"Best Contact Method",
    recommendations:[
      {
        productName:"Email",
        productHref:"mailto:hello@smallcertainty.com",
        note:"Email remains the useful default: private enough for a correction, roomy enough for a proposal and pleasantly indifferent to office hours. A clear subject line and a few considered sentences will reach the Small Certainty desk without ceremony.",
      },
      {
        productName:"Instagram DM",
        productHref:"https://www.instagram.com/smallcertainty/",
        note:"The side door for visual evidence. Send the odd shopfront, the convincing chair or the hotel lamp that has quietly solved a problem; anything that would lose its point if translated too quickly into prose.",
      },
      {
        productName:"X Reply",
        productHref:"https://x.com/smallcertainty",
        note:"Best reserved for a quick correction, a useful link or a compact public disagreement. If the entire case fits into a few lines, there is no need to build it a conference room.",
      },
    ],
  },
  {
    slug:"instagram-account",
    label:"Best Instagram Account",
    recommendations:[
      {
        productName:"Small Certainty",
        productHref:"https://www.instagram.com/smallcertainty/",
        note:"The visual notebook for the catalog: materials, rooms, labels, useful corners and objects that explain themselves better in a square than in a paragraph.",
      },
      {
        productName:"Subway Hands",
        productHref:"https://www.instagram.com/subwayhands/",
        note:"New York commuters reduced to their most expressive detail. Hannah La Follette Ryan photographs hands gripping poles, holding books, resting on knees and revealing far more than their owners probably intended. It is street photography with the faces removed and the humanity left in.",
      },
      {
        productName:"Depths of Wikipedia",
        productHref:"https://www.instagram.com/depthsofwikipedia/",
        note:"Annie Rauwerda retrieves the encyclopedia’s best footnotes, improbable biographies and wonderfully specific disputes. The result is less a feed than a guided tour through everything humanity considered important enough to document and strange enough to forget.",
      },
    ],
  },
  {
    slug:"x-account",
    label:"Best X Account",
    recommendations:[
      {
        productName:"Small Certainty",
        productHref:"https://x.com/smallcertainty",
        note:"Short notes from the catalog desk: new rows, revised picks, links worth keeping and small editorial arguments that do not yet require an essay.",
      },
      {
        productName:"Monocle",
        productHref:"https://x.com/monoclemagazine",
        note:"A measured stream of international affairs, design, business and travel from Monocle’s editors and correspondents.",
      },
      {
        productName:"Financial Times",
        productHref:"https://x.com/FinancialTimes",
        note:"Clear reporting on business, markets and public life, presented with the discipline of an established international newspaper.",
      },
    ],
  },
  {
    slug:"tiktok-account",
    label:"Best TikTok Account",
    recommendations:[
      {
        productName:"Small Certainty",
        productHref:"https://www.tiktok.com/@smallcertainty",
        note:"The moving version of the catalog: fast comparisons, object tests and small field reports that benefit from a hand, a table or thirty seconds of evidence.",
      },
      {
        productName:"NOWNESS",
        productHref:"https://www.tiktok.com/@nowness",
        note:"Short films that remember short does not have to mean hurried. Architecture, dance, fashion and art are given enough atmosphere to feel discovered rather than processed.",
      },
      {
        productName:"Letterboxd",
        productHref:"https://www.tiktok.com/@letterboxd",
        note:"Cinema culture without the velvet rope. Interviews, lists and festival encounters are delivered with enthusiasm, good timing and a refreshing willingness to admit that taste can also be fun.",
      },
    ],
  },
  {
    slug:"disclaimer",
    label:"Best Disclaimer",
    recommendations:[
      {
        productName:"Copyright 2026. All rights reserved.",
        note:"Small Certainty is edited, designed and maintained as a living catalog. Its original writing, photography, structure and interface may not be reproduced without permission. Product names, trademarks and outside works remain the property of their respective owners. Inclusion is editorial, never an assertion of ownership; a link may earn us a commission, but payment never determines what we select or how we rank it.",
      },
      {
        productName:"Monocle Terms & Conditions",
        productHref:"https://monocle.com/terms-and-conditions/",
        note:"Monocle’s terms identify the company, explain the agreement in plain sections and set out the practical rights of both reader and publisher without confusing the purpose of the document.",
      },
      {
        productName:"Penguin Random House Terms of Use",
        productHref:"https://global.penguinrandomhouse.com/terms-of-use/",
        note:"A conventional publishing notice that clearly separates copyright, trademarks, permitted personal use and third-party material. It is thorough, direct and written for an international catalogue of protected work.",
      },
    ],
  },
];
