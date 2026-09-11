import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if(!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-01-01",useCdn:false});
const expected=["home","bedroom","bath","kitchen","office","tech","garden","mens-clothing","mens-accessories","womens-clothing","womens-accessories","accessories","body","sport","children","culture","travel"];
type Row={_id:string;label:string;slug:string;section:string;sectionOrder:number;sortOrder:number;recommendations:Array<{rank:number;name:string;brand?:string;url?:string;description?:string;note?:string}>};

const words=(value="")=>value.trim().split(/\s+/).filter(Boolean).length;
const validUrl=(value?:string)=>{try{return Boolean(value&&["http:","https:"].includes(new URL(value).protocol));}catch{return false;}};

async function main(){
  const rows=await client.fetch<Row[]>(`*[_type=="catalogItem"&&published==true]|order(section->sortOrder asc,sortOrder asc){_id,label,"slug":slug.current,"section":section->slug.current,"sectionOrder":section->sortOrder,sortOrder,"recommendations":recommendations[published!=false]|order(rank asc){rank,"name":product->name,"brand":product->brand,"url":coalesce(outboundUrlOverride,product->outboundUrl),"description":product->description,"note":editorialNote}}`);
  const issues:string[]=[];
  const sections=[...new Map(rows.map(row=>[row.section,row.sectionOrder])).entries()].sort((a,b)=>a[1]-b[1]).map(([slug])=>slug);
  if(sections.slice(0,expected.length).join("|")!==expected.join("|")) issues.push(`Core section order: ${sections.join(", ")}`);
  const duplicateSlugs=[...new Set(rows.filter((row,index)=>rows.findIndex(other=>other.section===row.section&&other.slug===row.slug)!==index).map(row=>`${row.section}/${row.slug}`))];
  if(duplicateSlugs.length) issues.push(`Duplicate slugs: ${duplicateSlugs.join(", ")}`);
  for(const row of rows){
    if(row.recommendations.length!==3) issues.push(`${row.label}: ${row.recommendations.length} recommendations`);
    const winner=row.recommendations[0];
    if(!winner){continue;}
    const description=winner.note||winner.description||"";
    const count=words(description);
    if(!description) issues.push(`${row.label}: missing winner description`);
    else if(count<150||count>400) issues.push(`${row.label}: winner description is ${count} words`);
    for(const recommendation of row.recommendations){
      if(!validUrl(recommendation.url)) issues.push(`${row.label} #${recommendation.rank}: missing or malformed URL`);
      if(recommendation.brand&&recommendation.name.toLowerCase()===recommendation.brand.toLowerCase()) issues.push(`${row.label} #${recommendation.rank}: repeated product/company ${recommendation.name}`);
      if(recommendation.brand&&recommendation.name.length>3&&normalize(recommendation.brand).endsWith(normalize(recommendation.name))) issues.push(`${row.label} #${recommendation.rank}: suspicious split ${recommendation.name} from ${recommendation.brand}`);
    }
  }
  console.log(`Catalog audit: ${rows.length} pages, ${rows.reduce((sum,row)=>sum+row.recommendations.length,0)} recommendations, ${sections.length} sections.`);
  console.log(`Section order: ${sections.join(" → ")}`);
  console.log(issues.length?`Issues (${issues.length}):\n${issues.join("\n")}`:"No structural, description, or URL-format issues found.");
}
function normalize(value:string){return value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");}
main().catch(error=>{console.error(error);process.exit(1);});
