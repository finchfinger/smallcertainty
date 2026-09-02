import { createClient } from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"8luodcfj";
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;

if(!token) throw new Error("Set SANITY_API_WRITE_TOKEN before migrating Further reading sections.");

const client=createClient({projectId,dataset,token,apiVersion:"2025-01-01",useCdn:false,perspective:"raw"});

type ContentBlock={
  _key:string;
  _type:string;
  children?:Array<{_key?:string;_type?:string;text?:string;marks?:string[]}>;
  markDefs?:Array<{_key:string;_type:string;href?:string}>;
  entries?:Array<{_key:string;citation?:string;url?:string;note?:string}>;
};
type ArticleDocument={_id:string;content?:ContentBlock[]};

function portableTextBlock(key:string,text:string,url?:string):ContentBlock {
  const markKey=url?`${key}-link`:undefined;
  return {
    _key:key,
    _type:"block",
    markDefs:markKey?[{_key:markKey,_type:"link",href:url}]:[],
    children:[{
      _key:`${key}-span`,
      _type:"span",
      marks:markKey?[markKey]:[],
      text,
    }],
  };
}

async function main(){
  const articles=await client.fetch<ArticleDocument[]>(`*[_type=="article"]{_id,content}`);
  let transaction=client.transaction();
  let updateCount=0;
  for(const article of articles){
    const content=article.content||[];
    const blockIndex=content.findIndex(block=>block._type==="furtherReading");
    if(blockIndex<0) continue;
    const block=content[blockIndex];
    const furtherReading=(block.entries||[])
      .filter(entry=>entry.citation)
      .map(entry=>portableTextBlock(
        entry._key,
        [entry.citation,entry.note].filter(Boolean).join(" "),
        entry.url,
      ));
    transaction=transaction.patch(article._id,patch=>patch.set({
      content:content.filter((_,index)=>index!==blockIndex),
      furtherReading,
    }));
    updateCount+=1;
  }
  if(!updateCount){
    console.log("No nested Further reading blocks needed migration.");
    return;
  }
  await transaction.commit();
  console.log(`Moved Further reading into one text field in ${updateCount} Sanity document${updateCount===1?"":"s"}.`);
}

main().catch(error=>{
  console.error(error instanceof Error?error.message:error);
  process.exitCode=1;
});
