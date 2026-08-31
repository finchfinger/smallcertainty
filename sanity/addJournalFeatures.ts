import {createReadStream} from "node:fs";
import {basename,join} from "node:path";
import {createClient} from "@sanity/client";
import {journalArticles,type JournalImage} from "../content/journal";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token){
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before adding Journal features.");
}

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function uploadImage(figure:JournalImage) {
  const filename=basename(figure.url);
  const existingId=await client.fetch<string|null>(
    `*[_type=="sanity.imageAsset" && originalFilename==$filename][0]._id`,
    {filename},
  );
  const assetId=existingId||(
    await client.assets.upload(
      "image",
      createReadStream(join(process.cwd(),"public",figure.url.replace(/^\//,""))),
      {filename},
    )
  )._id;
  return {
    _type:"articleImage",
    image:{_type:"image",asset:{_type:"reference",_ref:assetId}},
    alt:figure.alt,
    caption:figure.caption,
    credit:figure.credit,
  };
}

function portableTextBlock(key:string,text:string,style:"normal"|"h2"|"pullQuote") {
  return {
    _key:key,
    _type:"block",
    style,
    markDefs:[],
    children:[{
      _key:`${key}-span`,
      _type:"span",
      marks:[],
      text,
    }],
  };
}

async function addFeatures() {
  const requestedSlugs=(process.env.JOURNAL_ARTICLE_SLUGS||"")
    .split(",")
    .map(slug=>slug.trim())
    .filter(Boolean);
  const deletedSlugs=(process.env.JOURNAL_DELETE_SLUGS||"")
    .split(",")
    .map(slug=>slug.trim())
    .filter(Boolean);
  const features=requestedSlugs.length
    ?journalArticles.filter(article=>requestedSlugs.includes(article.slug))
    :journalArticles;
  if(requestedSlugs.length&&features.length!==requestedSlugs.length){
    const found=new Set(features.map(article=>article.slug));
    const missing=requestedSlugs.filter(slug=>!found.has(slug));
    throw new Error(`Unknown Journal article slug${missing.length===1?"":"s"}: ${missing.join(", ")}`);
  }
  let transaction=client.transaction();

  for(const slug of deletedSlugs){
    transaction=transaction.delete(`article-${slug}`);
  }

  for(const article of features){
    const orderedContent=article.content||article.sections.map((section,index)=>({
      _key:`${article.slug}-text-${index+1}`,
      _type:"articleTextSection" as const,
      heading:section.heading,
      body:section.body,
    }));
    const content=[];
    for(const block of orderedContent){
      if(block._type==="articleTextSection"){
        if(block.heading){
          content.push(portableTextBlock(`${block._key}-heading`,block.heading,"h2"));
        }
        block.body.forEach((paragraph,index)=>{
          const text=typeof paragraph==="string"?paragraph:paragraph.spans.map(span=>span.text).join("");
          content.push(portableTextBlock(`${block._key}-paragraph-${index+1}`,text,"normal"));
        });
        continue;
      }
      if(block._type==="pullQuote"){
        content.push(portableTextBlock(block._key,block.text,"pullQuote"));
        continue;
      }
      content.push({
        _key:block._key,
        _type:block._type,
        layout:block.layout,
        primaryImage:await uploadImage(block.primaryImage),
        secondaryImage:block.secondaryImage?await uploadImage(block.secondaryImage):undefined,
      });
    }
    const firstImage=orderedContent.find(block=>block._type==="imageArrangement");
    const localCover=article.imageSrc?{
      url:article.imageSrc,
      alt:`Cover image for ${article.title}`,
    }:undefined;
    transaction=transaction.createOrReplace({
      _id:`article-${article.slug}`,
      _type:"article",
      title:article.title,
      slug:{_type:"slug",current:article.slug},
      dek:article.dek,
      publishedAt:article.date,
      author:article.author||"Small Certainty",
      coverImage:localCover
        ?await uploadImage(localCover)
        :firstImage
          ?await uploadImage(firstImage.primaryImage)
          :undefined,
      content,
    });
  }

  const result=await transaction.commit();
  console.log(`Committed ${result.results.length} Journal feature changes to ${projectId}/${dataset}.`);
}

addFeatures().catch(error=>{
  const message=error instanceof Error?error.message:"Unknown feature migration error";
  console.error(`Journal feature migration failed: ${message}`);
  process.exitCode=1;
});
