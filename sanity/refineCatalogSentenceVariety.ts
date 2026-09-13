import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token=process.env.SANITY_API_WRITE_TOKEN;
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",token,apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01",useCdn:false});

const openings:Record<string,string>={
  "home/best-coffee-table":"A seating group often fails at its center, where a useful surface becomes a block of cabinetry.",
  "home/best-stool":"Few pieces of furniture accept as many assignments as Artek’s Stool 60.",
  "bedroom/best-sheets":"Frette's Hotel Classic sheets bring the visual composure of a well-run hotel room into ordinary domestic use.",
  "bedroom/best-nightstand":"The objects beside a bed are rarely composed, which is why the USM Haller Bedside Table’s calm, practical storage matters.",
  "kitchen/best-chef-s-knife":"Nearly every serious home kitchen would benefit from the MAC Professional MTH-80.",
  "kitchen/best-cutting-board":"Preparation becomes easier when the work surface has the scale and stability of the Boardsmith’s maple end-grain board.",
  "kitchen/best-frying-pan":"Most kitchens need one responsive stainless-steel pan more than they need a cupboard of specialized cookware.",
  "kitchen/best-colander":"A perforated bowl expected to last as long as the kitchen should look and behave like Rösle’s stainless-steel colander.",
  "kitchen/best-pepper-mill":"Inside the familiar outline of the Peugeot Paris u’Select is a mechanism of uncommon precision.",
  "kitchen/best-blender":"Power matters in a blender, but the Vitamix 5200’s greater achievement is controlling that power through the shape of its container.",
  "kitchen/best-toaster":"Toast deserves an appliance designed around bread rather than an ever-growing menu of settings.",
  "kitchen/best-coffee-maker":"Excellent drip coffee should not require breakfast to become a laboratory session.",
  "kitchen/best-coffee-grinder":"Baratza’s Encore ESP makes competent coffee across several brewing methods without bringing workshop equipment into the kitchen.",
  "kitchen/best-espresso-machine":"Daily espresso, approached as a practice rather than a performance, justifies the La Marzocco Linea Mini.",
  "kitchen/best-moka-pot":"Bialetti resolved the stovetop coffee pot with such economy that improvement now feels largely beside the point.",
  "kitchen/best-dinnerware":"One cupboard can serve breakfast, family supper, and a properly set table when it contains Iittala’s Teema.",
  "kitchen/best-drinking-glass":"Duralex turns durability into an appealing shape instead of asking the household to accept an institutional compromise.",
  "kitchen/best-wine-glass":"A cupboard divided by grape variety is less useful than a set of Zalto Denk’Art Universal glasses.",
  "kitchen/best-corkscrew":"Pulltap’s Classic opens a bottle cleanly, then returns to a pocket or drawer without ceremony.",
  "kitchen/best-apron":"A cook needs equipment rather than costume, and the Hedley & Bennett Essential Apron understands the distinction.",
  "office/best-desk-chair":"Long sitting is an engineering problem, not an invitation to build a padded executive throne.",
  "office/best-desk-lamp":"On the Original 1227, expression and function are inseparable.",
  "office/best-pen":"Gerd A. Müller made the potentially theatrical fountain pen feel like ordinary modern equipment.",
  "office/best-pencil":"Blackwing makes an elementary writing tool unusually capable without mistaking it for jewelry.",
  "office/best-scissors":"Orange handles gave a universal household tool a clear, durable form at a democratic price.",
  "tech/best-computer":"Unless a specialized task dictates otherwise, the 13-inch MacBook Air covers the practical territory of personal computing with unusual ease.",
  "tech/best-mouse":"Documents, browsers, timelines, and large canvases all make different demands of the hand, and the Logitech MX Master 4 accommodates them.",
  "tech/best-portable-speaker":"Portability entails straps, water, imperfect surfaces, and careless placement, all of which the JBL Charge 6 accepts.",
  "garden/best-watering-can":"Two gallons is a genuinely useful capacity only when the vessel makes the load controllable.",
  "garden/best-wheelbarrow":"Soil, stone, compost, and debris require a tool designed for work rather than garden theater.",
  "accessories/best-umbrella":"Fox treats bad weather as an ordinary condition rather than an emergency.",
  "accessories/best-everyday-backpack":"Porter-Yoshida carries the necessary things without giving its Tanker Daypack the rigid, over-equipped manner of outdoor luggage.",
  "accessories/best-tote-bag":"An object originally made to haul ice has little trouble with groceries, books, laundry, or a day at the beach.",
  "accessories/best-suitcase":"Frequent travel is repeated physical work, a fact the Rimowa Original Cabin acknowledges in every moving part.",
  "accessories/best-key-ring":"Adding or removing a key should not require levering a fingernail against split steel.",
};

const sentenceReplacements:Record<string,Array<[string,string]>>={
  "kitchen/best-cast-iron-skillet":[["Lodge remains the choice because it preserves the democratic logic of the material.","Lodge preserves the democratic logic of the material better than its more precious competitors."]],
  "kitchen/best-espresso-machine":[["It is the choice because it brings commercial discipline home without turning the kitchen into a café set.","Its case rests on bringing commercial discipline home without turning the kitchen into a café set."]],
  "body/best-hair-dryer":[["Supersonic Nural earns the choice because airflow, temperature, balance, and controls have been treated as one system.","What distinguishes Supersonic Nural is the treatment of airflow, temperature, balance, and controls as one system."]],
  "body/best-sunscreen":[["UVMune 400 is the best supporting product because its coverage is broad and its texture removes common excuses for underuse.","UVMune 400 supports those measures with broad coverage and a texture that removes common excuses for underuse."]],
};

function replaceFirstSentence(note:string,replacement:string){
  const end=note.search(/\.(?:\s|$)/);
  if(end<0) throw new Error("Description has no complete opening sentence.");
  return replacement+note.slice(end+1);
}

type Row={_id:string;key:string;recommendationKey:string;note:string;productId:string};
async function main(){
  const rows=await client.fetch<Row[]>(`*[_type=="catalogItem"&&published==true]{_id,"key":section->slug.current+"/"+slug.current,"recommendationKey":recommendations[published!=false]|order(rank asc)[0]._key,"note":coalesce(recommendations[published!=false]|order(rank asc)[0].editorialNote,recommendations[published!=false]|order(rank asc)[0].product->description),"productId":recommendations[published!=false]|order(rank asc)[0].product._ref}`);
  const byKey=new Map(rows.map(row=>[row.key,row]));
  let tx=client.transaction();
  for(const [key,opening] of Object.entries(openings)){
    const row=byKey.get(key);
    if(!row?.note||!row.recommendationKey||!row.productId) throw new Error(`Missing winner data for ${key}`);
    let note=replaceFirstSentence(row.note,opening);
    for(const [before,after] of sentenceReplacements[key]||[]) note=note.replace(before,after);
    tx=tx.patch(row._id,patch=>patch.set({[`recommendations[_key=="${row.recommendationKey}"].editorialNote`]:note}));
    tx=tx.patch(row.productId,patch=>patch.set({description:note}));
  }
  for(const [key,replacements] of Object.entries(sentenceReplacements)){
    if(key in openings) continue;
    const row=byKey.get(key);
    if(!row?.note||!row.recommendationKey||!row.productId) throw new Error(`Missing winner data for ${key}`);
    let note=row.note;
    for(const [before,after] of replacements) note=note.replace(before,after);
    tx=tx.patch(row._id,patch=>patch.set({[`recommendations[_key=="${row.recommendationKey}"].editorialNote`]:note}));
    tx=tx.patch(row.productId,patch=>patch.set({description:note}));
  }
  const legacyIds=await client.fetch<string[]>(`*[_type=="catalogItem"&&section->slug.current=="colophon"&&published==true]._id`);
  for(const id of legacyIds) tx=tx.patch(id,patch=>patch.set({published:false}));
  const legacySectionIds=await client.fetch<string[]>(`*[_type=="catalogSection"&&slug.current=="colophon"&&published==true]._id`);
  for(const id of legacySectionIds) tx=tx.patch(id,patch=>patch.set({published:false}));
  await tx.commit();
  console.log(`Rewrote ${Object.keys(openings).length} repetitive catalog openings and retired ${legacyIds.length} obsolete Colophon rows.`);
}

main().catch(error=>{console.error(error);process.exit(1);});
