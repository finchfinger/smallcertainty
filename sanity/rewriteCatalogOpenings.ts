import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const patterns=[
  /^(.+?) is the .+? Small Certainty (?:chooses|would choose) because (.+?)\./,
  /^(.+?) (?:is|are) the .+? we choose(?: for .+?)? because (.+?)\./,
  /^(.+?) is the one we choose because (.+?)\./,
  /^(.+?) is our choice because (.+?)\./,
];

function possessive(subject:string){
  return /[sS]$/.test(subject)?`${subject}’`:`${subject}’s`;
}

function rewriteOpening(note:string){
  const end=note.search(/\.(?:\s|$)/);
  if(end<0) return note;
  const opening=note.slice(0,end+1);
  for(const pattern of patterns){
    const match=opening.match(pattern);
    if(!match) continue;
    const [,subject,reason]=match;
    let replacement:string;
    if(/^it\s+/i.test(reason)) replacement=`${subject} ${reason.replace(/^it\s+/i,"")}.`;
    else if(/^they\s+/i.test(reason)) replacement=`${subject} ${reason.replace(/^they\s+/i,"")}.`;
    else if(/^its\s+/i.test(reason)) replacement=`${possessive(subject)} ${reason.replace(/^its\s+/i,"")}.`;
    else if(/^their\s+/i.test(reason)) replacement=`${possessive(subject)} ${reason.replace(/^their\s+/i,"")}.`;
    else replacement=`${reason[0].toUpperCase()}${reason.slice(1)}.`;
    return replacement+note.slice(end+1);
  }
  return note;
}

type Row={_id:string;label:string;recommendations?:Array<{_key:string;editorialNote?:string}>};
async function main(){
  const rows=await client.fetch<Row[]>(`*[_type=="catalogItem"&&defined(recommendations[].editorialNote)]{_id,label,recommendations[]{_key,editorialNote}}`);
  let changed=0;
  let transaction=client.transaction();
  for(const row of rows){
    for(const recommendation of row.recommendations||[]){
      if(!recommendation.editorialNote) continue;
      const rewritten=rewriteOpening(recommendation.editorialNote);
      if(rewritten===recommendation.editorialNote) continue;
      transaction=transaction.patch(row._id,patch=>patch.set({[`recommendations[_key=="${recommendation._key}"].editorialNote`]:rewritten}));
      changed+=1;
    }
  }
  if(changed) await transaction.commit();

  const leftovers=await client.fetch<Array<{label:string;note:string}>>(`*[_type=="catalogItem"]{label,"note":recommendations[rank==1][0].editorialNote}[defined(note)]`);
  const formula=/\b(?:we (?:choose|chose|picked|select(?:ed)?)|our (?:choice|pick|selection)|Small Certainty (?:choose|chooses|chose|picked|select(?:s|ed)?))\b/i;
  const hits=leftovers.filter(item=>formula.test(item.note));
  console.log(JSON.stringify({changed,winnerDescriptionsChecked:leftovers.length,formulaHits:hits.map(item=>item.label)},null,2));
  if(hits.length) process.exitCode=1;
}

main().catch(error=>{console.error(error);process.exitCode=1;});
