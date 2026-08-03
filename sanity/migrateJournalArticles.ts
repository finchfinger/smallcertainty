import { createReadStream } from "node:fs";
import { basename,join } from "node:path";
import { createClient } from "@sanity/client";
import { journalArticles } from "../content/journal";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token){
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before migrating Journal articles.");
}

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

async function imageReference(publicPath:string|undefined) {
  if(!publicPath) return undefined;
  const filename=basename(publicPath);
  const existingId=await client.fetch<string|null>(
    `*[_type=="sanity.imageAsset" && originalFilename==$filename][0]._id`,
    {filename},
  );
  const assetId=existingId||(
    await client.assets.upload(
      "image",
      createReadStream(join(process.cwd(),"public",publicPath.replace(/^\//,""))),
      {filename},
    )
  )._id;
  return {_type:"image" as const,asset:{_type:"reference" as const,_ref:assetId}};
}

async function migrate() {
  const documents=[];
  for(const article of journalArticles){
    const coverImage=await imageReference(article.imageSrc);
    documents.push({
      _id:`article-${article.slug}`,
      _type:"article",
      title:article.title,
      slug:{_type:"slug",current:article.slug},
      dek:article.dek,
      publishedAt:article.date,
      author:article.author||"Small Certainty",
      coverImage:coverImage?{
        _type:"articleImage",
        image:coverImage,
        alt:`Cover image for ${article.title}`,
      }:undefined,
      content:article.sections.map((section,index)=>({
        _key:`text-${index+1}`,
        _type:"articleTextSection",
        heading:section.heading,
        body:section.body,
      })),
    });
  }

  let transaction=client.transaction();
  for(const document of documents) transaction=transaction.createOrReplace(document);
  const result=await transaction.commit();
  console.log(`Migrated ${result.results.length} Journal articles to ${projectId}/${dataset}.`);
}

migrate().catch(error=>{
  const message=error instanceof Error?error.message:"Unknown migration error";
  console.error(`Journal migration failed: ${message}`);
  process.exitCode=1;
});
