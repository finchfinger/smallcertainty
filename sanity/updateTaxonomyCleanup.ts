import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import {
  gardenRecommendations,
  menRecommendations,
  petsRecommendations,
  slugify,
  wellnessRecommendations,
  womenRecommendations,
} from "./seedData";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before updating taxonomy cleanup.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

type RecommendationRow={
  label:string;
  recommendations:readonly {
    productName:string;
    productHref:string;
    note:string;
  }[];
};

const colophonRecommendations:RecommendationRow[]=[
  {
    label:"Best Design Firm",
    recommendations:[{
      productName:"Golden Hymn",
      productHref:"https://goldenhymn.com",
      note:"The design credit belongs in the colophon: the small printed line that explains who shaped the thing without turning the whole page into a credit roll.",
    }],
  },
  {
    label:"Best Typeface",
    recommendations:[{
      productName:"ABC Favorit",
      productHref:"https://abcdinamo.com/typefaces/favorit",
      note:"The typeface is part tool, part tone of voice. It should make the catalog feel edited without making every row feel overdesigned.",
    }],
  },
  {
    label:"Best Content Management System",
    recommendations:[{
      productName:"Sanity",
      productHref:"https://www.sanity.io",
      note:"Sanity keeps the list as a living editorial object: structured enough for agents and feeds, loose enough for judgment to remain in charge.",
    }],
  },
  {
    label:"Best Framework",
    recommendations:[{
      productName:"Next.js",
      productHref:"https://nextjs.org",
      note:"Next.js is the frame underneath the catalog: fast enough for a small site, flexible enough for the odd ideas that keep arriving.",
    }],
  },
  {
    label:"Best Contact Info",
    recommendations:[{
      productName:"Email",
      productHref:"mailto:hello@smallcertainty.com",
      note:"The cleanest way to reach Small Certainty is still the old, durable one: a short note, a clear subject line, and enough room to say what you mean.",
    }],
  },
  {
    label:"Best Instagram",
    recommendations:[{
      productName:"@smallcertainty",
      productHref:"https://www.instagram.com/smallcertainty",
      note:"A place for the visual margin notes: shelf corners, hotel lamps, jacket fabric, tiny bits of signage, and the occasional product that explains itself better in a square than in a paragraph.",
    }],
  },
  {
    label:"Best Twitter",
    recommendations:[{
      productName:"@smallcertainty",
      productHref:"https://x.com/smallcertainty",
      note:"Short updates from the catalog desk: new rows, revised picks, links worth keeping, and the kind of small editorial arguments that are better made before they become essays.",
    }],
  },
  {
    label:"Best TikTok",
    recommendations:[{
      productName:"@smallcertainty",
      productHref:"https://www.tiktok.com/@smallcertainty",
      note:"If the catalog ever learns to move, this is where it will happen: fast comparisons, tiny field reports, and product notes that benefit from a hand, a table, or thirty seconds of evidence.",
    }],
  },
  {
    label:"Best Copyright",
    recommendations:[{
      productName:"2026",
      productHref:"https://time.gov/",
      note:"Small Certainty is edited, designed, and maintained as a living catalog. The words, structure, and original interface decisions belong here; outside works belong to their respective makers.",
    }],
  },
];

type PublishedCatalogItem={
  _id:string;
  label?:string;
  _updatedAt:string;
  section?:{
    _id:string;
    title?:string;
    slug?:string;
  }|null;
};

function preferredCatalogItemId(item:PublishedCatalogItem){
  const sectionSlug=item.section?.slug;
  const label=item.label;
  if(!sectionSlug||!label) return null;
  const itemSlug=slugify(label);

  if(sectionSlug==="colophon") return `catalogItem-miscellaneous-${itemSlug}`;
  if(sectionSlug==="body"||sectionSlug==="wellness") return `catalogItem-body-${itemSlug}`;
  if(sectionSlug==="women-s-clothing"||sectionSlug==="womens-clothing") return `catalogItem-womens-clothing-${itemSlug}`;

  return `catalogItem-${sectionSlug}-${itemSlug}`;
}

async function dedupePublishedCatalogItems(){
  const publishedItems=await client.fetch<PublishedCatalogItem[]>(
    `*[_type == "catalogItem" && published == true]{
      _id,
      label,
      _updatedAt,
      "section":section->{_id,title,"slug":slug.current}
    }`,
  );

  const groups=new Map<string,PublishedCatalogItem[]>();
  publishedItems.forEach(item=>{
    if(!item.label||!item.section?._id) return;
    const key=`${item.section._id}::${item.label}`;
    groups.set(key,[...(groups.get(key)||[]),item]);
  });

  let tx=client.transaction();
  let unpublishedCount=0;

  groups.forEach(items=>{
    if(items.length<2) return;

    const expectedId=preferredCatalogItemId(items[0]);
    const newest=[...items].sort((a,b)=>Date.parse(b._updatedAt)-Date.parse(a._updatedAt))[0];
    const keeper=items.find(item=>item._id===expectedId)||newest;

    items.forEach(item=>{
      if(item._id===keeper._id) return;
      tx=tx.patch(item._id,patch=>patch.set({published:false}));
      unpublishedCount+=1;
    });
  });

  if(unpublishedCount>0) await tx.commit();
  return unpublishedCount;
}

async function upsertRows(
  tx:ReturnType<typeof client.transaction>,
  sectionId:string,
  sectionSlug:string,
  rows:readonly RecommendationRow[],
  itemIdSectionSlug=sectionSlug,
){
  const today=new Date().toISOString().slice(0,10);
  rows.forEach((row,rowIndex)=>{
    const itemSlug=slugify(row.label);
    const itemId=`catalogItem-${itemIdSectionSlug}-${itemSlug}`;
    const topPick=row.recommendations[0];

    row.recommendations.forEach(recommendation=>{
      const productSlug=slugify(recommendation.productName);
      tx=tx.createOrReplace({
        _id:`product-${productSlug}`,
        _type:"product",
        name:recommendation.productName,
        slug:{_type:"slug",current:productSlug},
        description:recommendation.note,
        outboundUrl:recommendation.productHref,
        published:true,
      });
    });

    tx=tx.createIfNotExists({
      _id:itemId,
      _type:"catalogItem",
      label:row.label,
      slug:{_type:"slug",current:itemSlug},
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      section:{_type:"reference",_ref:sectionId},
      sortOrder:rowIndex+1,
      updated:false,
      published:true,
      intro:topPick.note,
      lastReviewed:today,
      recommendations:[],
    });

    tx=tx.patch(itemId,patch=>patch.set({
      label:row.label,
      slug:{_type:"slug",current:itemSlug},
      productName:topPick.productName,
      outboundUrl:topPick.productHref,
      section:{_type:"reference",_ref:sectionId},
      sortOrder:rowIndex+1,
      updated:false,
      published:true,
      intro:topPick.note,
      lastReviewed:today,
      recommendations:row.recommendations.map((recommendation,recommendationIndex)=>{
        const rank=recommendationIndex+1;
        const productSlug=slugify(recommendation.productName);
        return {
          _key:`pick-${rank}-${productSlug}`,
          _type:"recommendation",
          rank,
          badge:rank===1?"Best overall":rank===2?"Runner up":"Also good",
          product:{_type:"reference",_ref:`product-${productSlug}`},
          editorialNote:recommendation.note,
          outboundUrlOverride:recommendation.productHref,
          published:true,
        };
      }),
    }));
  });
  return tx;
}

async function updateTaxonomyCleanup(){
  const existingSections=await client.fetch<{_id:string; title:string; slug?:{current?:string}}[]>(
    `*[_type == "catalogSection" && slug.current in $slugs]{_id,title,slug}`,
    {slugs:["womens-clothing","women-s-clothing","mens-clothing","men-s-clothing","garden","pets","body","wellness","office","culture","miscellaneous","colophon"]},
  );
  const sectionIdBySlug=new Map(existingSections.map(section=>[section.slug?.current,section._id]));
  const womensSectionId=sectionIdBySlug.get("womens-clothing")||sectionIdBySlug.get("women-s-clothing");
  const bodySectionId=sectionIdBySlug.get("body")||sectionIdBySlug.get("wellness");
  const petsSectionId=sectionIdBySlug.get("pets");
  const menSectionId=sectionIdBySlug.get("mens-clothing")||sectionIdBySlug.get("men-s-clothing");
  const gardenSectionId=sectionIdBySlug.get("garden")||"catalogSection-garden";
  const officeSectionId=sectionIdBySlug.get("office");
  const cultureSectionId=sectionIdBySlug.get("culture");
  const colophonSectionId=sectionIdBySlug.get("colophon")||sectionIdBySlug.get("miscellaneous");

  if(!womensSectionId||!menSectionId||!petsSectionId||!bodySectionId) throw new Error("Could not find one of Women’s, Men’s, Pets, or Body sections.");

  const staleBodyItems=await client.fetch<{_id:string}[]>(
    `*[_type == "catalogItem" && label == "Best Water Bottle" && section->slug.current in ["body","wellness"]]{_id}`,
  );

  let tx=client.transaction();

  tx=await upsertRows(tx,womensSectionId,"womens-clothing",womenRecommendations);
  tx=await upsertRows(tx,menSectionId,"mens-clothing",menRecommendations);
  tx=tx.createIfNotExists({
    _id:gardenSectionId,
    _type:"catalogSection",
    title:"Garden",
    slug:{_type:"slug",current:"garden"},
    icon:"garden",
    sortOrder:4.5,
    published:true,
  });
  tx=tx.patch(gardenSectionId,patch=>patch.set({
    title:"Garden",
    slug:{_type:"slug",current:"garden"},
    icon:"garden",
    sortOrder:4.5,
    published:true,
  }));
  tx=await upsertRows(tx,gardenSectionId,"garden",gardenRecommendations);
  tx=await upsertRows(tx,petsSectionId,"pets",petsRecommendations);
  tx=await upsertRows(tx,bodySectionId,"body",wellnessRecommendations);

  staleBodyItems.forEach(item=>{
    tx=tx.patch(item._id,patch=>patch.set({published:false}));
  });

  if(colophonSectionId){
    tx=tx.patch(colophonSectionId,patch=>patch.set({
      title:"Colophon",
      slug:{_type:"slug",current:"colophon"},
      published:true,
    }));
    tx=await upsertRows(tx,colophonSectionId,"colophon",colophonRecommendations,"miscellaneous");
  }

  if(officeSectionId){
    tx=tx.patch(`catalogItem-office-best-monitor`,patch=>patch.set({
      productName:"Apple Studio Display",
      outboundUrl:"https://www.apple.com/studio-display/",
      intro:"Apple’s Studio Display is the office monitor that behaves less like a peripheral and more like furniture for the desktop: bright, quiet, visually calm and exactly sized for the Mac world around it.",
    }));
  }

  if(cultureSectionId){
    tx=tx.patch(`catalogItem-culture-best-magazine`,patch=>patch.set({
      productName:"Monocle",
      outboundUrl:"https://monocle.com/",
      intro:"Monocle remains the magazine for people who like cities, shops, airlines, diplomacy, stationery and sandwiches with equal seriousness. It treats taste as infrastructure, which is more useful than treating it as decoration.",
    }));
  }

  const result=await tx.commit();
  const dedupedCount=await dedupePublishedCatalogItems();
  console.log(`Updated taxonomy cleanup in ${projectId}/${dataset}: ${result.results.length} mutations. Unpublished ${dedupedCount} duplicate catalog row(s).`);
}

updateTaxonomyCleanup().catch(error=>{console.error(error);process.exit(1);});
