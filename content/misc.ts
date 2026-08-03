export type MiscPage = {
  slug:string;
  title:string;
  value:string;
  description:string;
  href?:string;
  actionLabel?:string;
  recommendations?:{
    rank:number;
    productName:string;
    productHref?:string;
    note:string;
  }[];
};

export const miscPages:MiscPage[]=[
  {
    slug:"contact-info",
    title:"Best Contact Info",
    value:"Email",
    description:"The cleanest way to reach Small Certainty is still the old, durable one: a short note, a clear subject line, and enough room to say what you mean. Send pitches, corrections, quiet endorsements, and unusually strong opinions about towels.",
    href:"mailto:hello@smallcertainty.com",
    actionLabel:"Email us",
    recommendations:[
      {
        rank:1,
        productName:"Email",
        productHref:"mailto:hello@smallcertainty.com",
        note:"The cleanest way to reach Small Certainty is still the old, durable one: a short note, a clear subject line, and enough room to say what you mean. Send pitches, corrections, quiet endorsements, and unusually strong opinions about towels.",
      },
      {
        rank:2,
        productName:"Instagram DM",
        productHref:"https://www.instagram.com/smallcertainty",
        note:"Useful for visual things: a shopfront, a chair, a label, a room, or something that would lose its point if translated too quickly into prose. It is not the official desk, but it is a good side door.",
      },
      {
        rank:3,
        productName:"X Reply",
        productHref:"https://x.com/smallcertainty",
        note:"Best for quick corrections, small arguments, and public nudges. If the note needs a receipt, a link, or only twelve words of pressure, this is probably the right channel.",
      },
    ],
  },
  {
    slug:"instagram",
    title:"Best Instagram",
    value:"@smallcertainty",
    description:"A place for the visual margin notes: shelf corners, hotel lamps, jacket fabric, tiny bits of signage, and the occasional product that explains itself better in a square than in a paragraph.",
    href:"https://www.instagram.com/smallcertainty",
    actionLabel:"Open Instagram",
    recommendations:[
      {
        rank:1,
        productName:"@smallcertainty",
        productHref:"https://www.instagram.com/smallcertainty",
        note:"The main visual notebook: shelf corners, hotel lamps, jacket fabric, tiny bits of signage, and the occasional product that explains itself better in a square than in a paragraph.",
      },
      {
        rank:2,
        productName:"Stories",
        productHref:"https://www.instagram.com/smallcertainty",
        note:"The less permanent layer: quick comparisons, temporary enthusiasms, and small field notes that may later become rows. Good for things that are still earning their place.",
      },
      {
        rank:3,
        productName:"Saved Highlights",
        productHref:"https://www.instagram.com/smallcertainty",
        note:"A light archive of recurring themes: travel, home, clothes, work, and the small ceremonies that make objects matter. Less feed, more filing cabinet.",
      },
    ],
  },
  {
    slug:"twitter",
    title:"Best Twitter",
    value:"@smallcertainty",
    description:"Short updates from the catalog desk: new rows, revised picks, links worth keeping, and the kind of small editorial arguments that are better made before they become essays.",
    href:"https://x.com/smallcertainty",
    actionLabel:"Open X",
    recommendations:[
      {
        rank:1,
        productName:"@smallcertainty",
        productHref:"https://x.com/smallcertainty",
        note:"Short updates from the catalog desk: new rows, revised picks, links worth keeping, and the kind of small editorial arguments that are better made before they become essays.",
      },
      {
        rank:2,
        productName:"New Pick Notes",
        productHref:"https://x.com/smallcertainty",
        note:"A running place for new additions and small changes. If a row improves, a product falls out, or a strange new certainty appears, it can be named here first.",
      },
      {
        rank:3,
        productName:"Corrections",
        productHref:"https://x.com/smallcertainty",
        note:"The public errata channel. Small Certainty should be opinionated, not stubborn; a good correction is a useful form of maintenance.",
      },
    ],
  },
  {
    slug:"tiktok",
    title:"Best TikTok",
    value:"@smallcertainty",
    description:"If the catalog ever learns to move, this is where it will happen: fast comparisons, tiny field reports, and product notes that benefit from a hand, a table, or thirty seconds of evidence.",
    href:"https://www.tiktok.com/@smallcertainty",
    actionLabel:"Open TikTok",
    recommendations:[
      {
        rank:1,
        productName:"@smallcertainty",
        productHref:"https://www.tiktok.com/@smallcertainty",
        note:"If the catalog ever learns to move, this is where it will happen: fast comparisons, tiny field reports, and product notes that benefit from a hand, a table, or thirty seconds of evidence.",
      },
      {
        rank:2,
        productName:"Object Tests",
        productHref:"https://www.tiktok.com/@smallcertainty",
        note:"Short demonstrations for things that need motion: folds, pours, switches, zippers, handles, hinges, and the little behaviors that separate a good object from a merely photogenic one.",
      },
      {
        rank:3,
        productName:"Field Reports",
        productHref:"https://www.tiktok.com/@smallcertainty",
        note:"Quick notes from shops, hotels, airports, kitchens, cafés, and other places where taste has to survive contact with daily use.",
      },
    ],
  },
  {
    slug:"copyright",
    title:"Best Copyright",
    value:"2026",
    description:"Small Certainty is edited, designed, and maintained as a living catalog. The words, structure, and original interface decisions belong here; the products, brands, and outside works belong to their respective makers.",
    href:"https://time.gov/",
    actionLabel:"Check the time",
    recommendations:[
      {
        rank:1,
        productName:"2026",
        productHref:"https://time.gov/",
        note:"Small Certainty is edited, designed, and maintained as a living catalog. The words, structure, and original interface decisions belong here; the products, brands, and outside works belong to their respective makers.",
      },
      {
        rank:2,
        productName:"Editorial Standard",
        note:"Recommendations should be useful before they are profitable. Affiliate potential can help keep the lights on, but it should never be the reason a thing appears in the catalog.",
      },
      {
        rank:3,
        productName:"Attribution",
        note:"Brands, products, venues, artworks, typefaces, platforms, and publications are named as references and recommendations. Ownership remains with their respective makers.",
      },
    ],
  },
];

export function getMiscPage(slug:string) {
  return miscPages.find(page=>page.slug===slug);
}
