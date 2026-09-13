import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if(!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",useCdn:false});
type Row={label:string;slug:string;section:string;recommendations:Array<{name:string;note?:string;description?:string}>};
const wc=(text:string)=>text.trim().split(/\s+/).filter(Boolean).length;
const firstSentence=(text:string)=>(text.trim().match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0]||text.trim()).replace(/\s+/g," ");
async function main(){
const rows=await client.fetch<Row[]>(`*[_type=="catalogItem"&&published==true]|order(section->sortOrder asc,sortOrder asc){label,"slug":slug.current,"section":section->slug.current,"recommendations":recommendations[published!=false]|order(rank asc){"name":product->name,"description":product->description,"note":editorialNote}}`);
const rowsToAudit=rows.filter(row=>row.section!=="colophon");
const short=rowsToAudit.map(row=>({row,text:row.recommendations[0]?.note||row.recommendations[0]?.description||""})).filter(entry=>wc(entry.text)<180).sort((a,b)=>wc(a.text)-wc(b.text));
console.log(`SHORT UNDER 180 (${short.length})`);
for(const {row,text} of short) console.log(`${row.section}/${row.slug}\t${wc(text)}\t${firstSentence(text)}`);

const openingVerbs=new Map<string,Array<{row:Row;first:string}>>();
for(const row of rowsToAudit){
  const text=row.recommendations[0]?.note||row.recommendations[0]?.description||"";
  let first=firstSentence(text);
  const name=row.recommendations[0]?.name||"";
  if(name&&first.toLowerCase().startsWith(name.toLowerCase())) first=`[NAME]${first.slice(name.length)}`;
  const verb=first.toLowerCase().replace(/[’']/g,"'").replace(/^\[name\]'s\s+/,"[name] ").match(/^\[name\]\s+(is|are|has|brings|makes|offers|gives|takes|treats|approaches|understands|remains|begins|looks|feels|works|keeps|turns|puts|uses|comes|belongs|provides|does|gets|carries|starts|sits|moves|builds|handles|solves|manages|finds|pairs|returns|delivers|seems|wears|sets|adds|combines|avoids|rewards|proves|holds|occupies|arrives|organizes|shows|asks|admits|replaces|survives|earns|serves)\b/)?.[1]||"other";
  const values=openingVerbs.get(verb)||[];
  values.push({row,first});
  openingVerbs.set(verb,values);
}
console.log("\nOPENING VERBS");
for(const [verb,items] of [...openingVerbs].sort((a,b)=>b[1].length-a[1].length)) console.log(`${verb}\t${items.length}`);
for(const [verb,items] of [...openingVerbs].filter(([verb,values])=>verb!=="other"&&values.length>=4).sort((a,b)=>b[1].length-a[1].length)){
  console.log(`\nPATTERN ${verb.toUpperCase()} (${items.length})`);
  for(const {row,first} of items) console.log(`${row.section}/${row.slug}\t${first}`);
}
const formula=/\b(?:choice|choose|recommend)\b[^.!?]{0,45}\bbecause\b|\bis the [^.!?]{0,45}\b(?:to choose|we recommend)\b/i;
const formulaHits=rowsToAudit.flatMap(row=>{
  const text=row.recommendations[0]?.note||row.recommendations[0]?.description||"";
  return text.split(/(?<=[.!?])\s+/).filter(value=>formula.test(value)).map(value=>`${row.section}/${row.slug}\t${value}`);
});
console.log(`\nFORMULA HITS (${formulaHits.length})`);
for(const hit of formulaHits) console.log(hit);
console.log("\nALL OPENINGS");
for(const row of rowsToAudit){
  const text=row.recommendations[0]?.note||row.recommendations[0]?.description||"";
  console.log(`${row.section}/${row.slug}\t${firstSentence(text)}`);
}
}
main().catch(error=>{console.error(error);process.exit(1);});
