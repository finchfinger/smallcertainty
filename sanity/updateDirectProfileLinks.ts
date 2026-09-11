import {createClient} from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";

if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const updates=[
  {id:"catalogItem-imprint-contact-method",name:"hello@smallcertainty.com",url:"mailto:hello@smallcertainty.com"},
  {id:"catalogItem-imprint-instagram-account",name:"@smallcertainty",url:"https://www.instagram.com/smallcertainty/"},
  {id:"catalogItem-imprint-x-account",name:"@smallcertainty",url:"https://x.com/smallcertainty"},
  {id:"catalogItem-imprint-tiktok-account",name:"@smallcertainty",url:"https://www.tiktok.com/@smallcertainty"},
];

async function main() {
const rows=await client.fetch<{_id:string;recommendations?:{_key:string;productId?:string}[]}[]>(
  `*[_id in $ids]{_id,recommendations[]{_key,"productId":product._ref}}`,
  {ids:updates.map(update=>update.id)},
);

if(rows.length!==updates.length) throw new Error(`Expected ${updates.length} profile rows, found ${rows.length}.`);

let transaction=client.transaction();
for(const update of updates) {
  const row=rows.find(entry=>entry._id===update.id);
  const first=row?.recommendations?.[0];
  if(!first?.productId) throw new Error(`Missing first recommendation for ${update.id}.`);
  transaction=transaction
    .patch(update.id,patch=>patch
      .set({directLink:true,productName:update.name,outboundUrl:update.url})
      .set({[`recommendations[_key=="${first._key}"].outboundUrlOverride`]:update.url}))
    .patch(first.productId,patch=>patch.set({name:update.name,outboundUrl:update.url}));
}

await transaction.commit();

const verified=await client.fetch(
  `*[_id in $ids] | order(label asc){label,directLink,"name":recommendations[0].product->name,"url":recommendations[0].outboundUrlOverride}`,
  {ids:updates.map(update=>update.id)},
);
console.log(JSON.stringify(verified,null,2));
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});
