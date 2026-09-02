import { createClient } from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"8luodcfj";
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;

if(!token) throw new Error("Set SANITY_API_WRITE_TOKEN before migrating Further reading sections.");

const client=createClient({projectId,dataset,token,apiVersion:"2025-01-01",useCdn:false,perspective:"raw"});

type PortableTextBlock={
  _key:string;
  _type:string;
  style?:string;
  children?:Array<{text?:string}>;
};
type ArticleDocument={_id:string;content?:PortableTextBlock[]};

function blockText(block:PortableTextBlock) {
  return (block.children||[]).map(child=>child.text||"").join("").trim();
}

function migrateContent(content:PortableTextBlock[]) {
  if(content.some(block=>block._type==="furtherReading")) return content;
  const headingIndex=content.findIndex(block=>
    block._type==="block"&&
    block.style==="h2"&&
    blockText(block).toLowerCase()==="further reading"
  );
  if(headingIndex<0) return content;

  let endIndex=headingIndex+1;
  const entries=[];
  while(endIndex<content.length){
    const block=content[endIndex];
    if(block._type!=="block"||block.style!=="normal") break;
    const citation=blockText(block);
    if(citation) entries.push({
      _key:`${block._key}-reading`,
      _type:"furtherReadingEntry",
      citation,
    });
    endIndex+=1;
  }
  if(!entries.length) return content;
  return [
    ...content.slice(0,headingIndex),
    {
      _key:`${content[headingIndex]._key}-section`,
      _type:"furtherReading",
      entries,
    },
    ...content.slice(endIndex),
  ];
}

async function main(){
  const articles=await client.fetch<ArticleDocument[]>(`*[_type=="article"]{_id,content}`);
  let transaction=client.transaction();
  let updateCount=0;
  for(const article of articles){
    const content=article.content||[];
    const migrated=migrateContent(content);
    if(migrated===content) continue;
    transaction=transaction.patch(article._id,patch=>patch.set({content:migrated}));
    updateCount+=1;
  }
  if(!updateCount){
    console.log("No Further reading text sections needed migration.");
    return;
  }
  await transaction.commit();
  console.log(`Migrated Further reading sections in ${updateCount} Sanity document${updateCount===1?"":"s"}.`);
}

main().catch(error=>{
  console.error(error instanceof Error?error.message:error);
  process.exitCode=1;
});
