import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",token,apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01",useCdn:false});

const fixes:Record<string,{name:string;brand:string;url?:string}>={
  "kitchen/best-apron/3":{name:"White Cotton Apron",brand:"Maison Empereur",url:"https://empereur.fr/en/workwear/5398-white-cotton-apron-maison-empereur-9999993603996.html"},
  "office/best-notebook/2":{name:"Classic Hardcover Notebook",brand:"Leuchtturm1917"},
  "mens-clothing/best-polo/3":{name:"Zero Organic Cotton Piqué Polo",brand:"Fedeli"},
  "mens-clothing/best-chinos/2":{name:"Slim-Fit Chinos",brand:"Incotex"},
  "mens-accessories/best-gloves/3":{name:"Cashmere-Lined Leather Gloves",brand:"Merola"},
  "womens-accessories/best-gloves/3":{name:"Leather Gloves",brand:"Sermoneta"},
  "body/best-nail-clippers/3":{name:"Stainless Steel Fingernail Clipper",brand:"Tweezerman"},
  "children/best-high-chair/2":{name:"High Chair",brand:"Nomi"},
  "children/best-lunchbox/2":{name:"Insulated Bento Box",brand:"OmieLife"},
  "children/best-building-toy/2":{name:"Classic 100-Piece Set",brand:"Magna-Tiles"},
  "children/best-building-toy/3":{name:"200 Box",brand:"KAPLA"},
};

type Item={base:string;recommendations:Array<{rank:number;productId:string;recommendationKey:string}>};
async function main(){
  const items=await client.fetch<Item[]>(`*[_type=="catalogItem"&&published==true]{"base":section->slug.current+"/"+slug.current,"recommendations":recommendations[published!=false]|order(rank asc){rank,"recommendationKey":_key,"productId":product._ref}}`);
  const rows=items.flatMap(item=>item.recommendations.map(recommendation=>({key:`${item.base}/${recommendation.rank}`,...recommendation})));
  const byKey=new Map(rows.map(row=>[row.key,row]));
  let tx=client.transaction();
  for(const [key,fix] of Object.entries(fixes)){
    const row=byKey.get(key);
    if(!row?.productId||!row.recommendationKey) throw new Error(`Missing recommendation ${key}`);
    tx=tx.patch(row.productId,patch=>patch.set({name:fix.name,brand:fix.brand,...(fix.url?{outboundUrl:fix.url}:{})}));
    if(fix.url){
      const [section,slug]=key.split("/");
      const item=await client.fetch<{_id:string}|null>(`*[_type=="catalogItem"&&section->slug.current==$section&&slug.current==$slug][0]{_id}`,{section,slug});
      if(item) tx=tx.patch(item._id,patch=>patch.set({[`recommendations[_key=="${row.recommendationKey}"].outboundUrlOverride`]:fix.url}));
    }
  }
  await tx.commit();
  console.log(`Separated product and company fields for ${Object.keys(fixes).length} recommendations.`);
}

main().catch(error=>{console.error(error);process.exit(1);});
