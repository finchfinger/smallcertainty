import {createClient} from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token){
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before migrating Journal content.");
}

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});

type LegacyTextSection={
  _key:string;
  _type:"articleTextSection";
  heading?:string;
  body?:string[];
};
type ExistingBlock={_key:string;_type:string;[key:string]:unknown};

function portableTextBlock(key:string,text:string,style:"normal"|"h2") {
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

async function migrate() {
  const articles=await client.fetch<Array<{_id:string;title?:string;content?:ExistingBlock[]}>>(
    `*[_type=="article" && count(content[_type=="articleTextSection"])>0]{_id,title,content}`,
  );
  if(!articles.length){
    console.log("Journal content is already Portable Text; nothing to migrate.");
    return;
  }

  let transaction=client.transaction();
  for(const article of articles){
    const content=(article.content||[]).flatMap(block=>{
      if(block._type!=="articleTextSection") return [block];
      const section=block as LegacyTextSection;
      const converted=[];
      if(section.heading){
        converted.push(portableTextBlock(`${section._key}-heading`,section.heading,"h2"));
      }
      (section.body||[]).forEach((paragraph,index)=>{
        converted.push(portableTextBlock(`${section._key}-paragraph-${index+1}`,paragraph,"normal"));
      });
      return converted;
    });
    transaction=transaction.patch(article._id,{set:{content}});
    console.log(`Prepared ${article.title||article._id}`);
  }

  const result=await transaction.commit();
  console.log(`Migrated ${result.results.length} Journal articles to Portable Text in ${projectId}/${dataset}.`);
}

migrate().catch(error=>{
  const message=error instanceof Error?error.message:"Unknown Portable Text migration error";
  console.error(`Journal Portable Text migration failed: ${message}`);
  process.exitCode=1;
});
