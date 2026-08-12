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

async function addFeatures() {
  const features=journalArticles;
  let transaction=client.transaction();

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
        content.push(block);
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
      coverImage:firstImage
        ?await uploadImage(firstImage.primaryImage)
        :localCover
          ?await uploadImage(localCover)
          :undefined,
      content,
    });
  }

  const result=await transaction.commit();
  console.log(`Added ${result.results.length} Journal features to ${projectId}/${dataset}.`);
}

addFeatures().catch(error=>{
  const message=error instanceof Error?error.message:"Unknown feature migration error";
  console.error(`Journal feature migration failed: ${message}`);
  process.exitCode=1;
});
