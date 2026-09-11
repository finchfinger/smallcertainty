import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apply=process.argv.includes("--apply");
const verbose=process.argv.includes("--verbose");
if(!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
if(apply&&!token) throw new Error("SANITY_API_WRITE_TOKEN is required with --apply.");

const client=createClient({projectId,dataset,token,apiVersion:"2025-01-01",useCdn:false});
const editorialSectionSlugs=["culture","travel"];
const catalogSectionSlugs=["home","bedroom","bath","kitchen","office","tech","garden","mens-clothing","mens-accessories","womens-clothing","womens-accessories","accessories","body","sport","children"];

const companyNames=[
  "A.P.C.","All-Clad","Andersen-Andersen","B&B Italia","BabyBjörn","Baratza","Beauty of Joseon","Big Green Egg","Bill’s Khakis","Black Diamond","Bormioli Rocco","Bowers & Wilkins","Briggs & Riley","Burgon & Ball","Carl Hansen & Søn","Caran d’Ache","Comme des Garçons","Crescent Down Works","Crockett & Jones","Darn Tough","David Mellor","De Buyer","De’Longhi","Dusen Dusen","Early Rider","Edward Green","Ettinger","Feathered Friends","Fellow","Filson","Fjällräven","FontanaArte","Frank Clegg","Fritz Hansen","Georg Jensen","G.H. Bass","Globe-Trotter","Herman Miller","Il Bussetto","Inis Meáin","J.M. Weston","John Smedley","Johnstons of Elgin","Klean Kanteen","La Roche-Posay","Lady White Co.","Le Bonnet","Le Creuset","Le Labo","L.L.Bean","Loro Piana","Louis Poulsen","Mackintosh","Maison Empereur","Margaret Howell","Maria La Rosa","Master-Piece","Max Mara","Merz b. Schwanen","Miele","Mitsubishi","New Balance","New Era","Oliver Peoples","Onitsuka Tiger","Orlebar Brown","Petit Bateau","Pilot","Polo Ralph Lauren","Porter-Yoshida","R.M. Williams","Ray-Ban","Ring Jacket","Santa & Cole","Sea to Summit","Simonnot-Godard","Solid & Striped","Standard Procedure","St Geneve","Städter","Stokke","Stutterheim","Tanner Goods","The Laundress","Therm-a-Rest","Tom Dixon","Uncle Goose","Universal Works","William Lockie","With Nothing Underneath","Yamazaki Home"
].sort((a,b)=>b.length-a.length);

companyNames.push("Arne Jacobsen","Barlow Tyrie","Bette","Church’s","Rivendell","Røros Tweed","Schönbuch","Technivorm");
companyNames.sort((a,b)=>b.length-a.length);

const hostCompanies:Record<string,string>={
  "agapedesign":"Agape","andtradition":"&Tradition","artek":"Artek","bebitalia":"B&B Italia","carlhansen":"Carl Hansen & Søn","davekny":"Davek","dwr":"Herman Miller","fieldcompany":"Field Company","flos":"Flos","gardena":"Gardena","ghbass":"G.H. Bass","hay":"HAY","heathceramics":"Heath Ceramics","hermanmiller":"Herman Miller","johnboos":"John Boos","kaldewei":"Kaldewei","ladywhiteco":"Lady White Co.","llbean":"L.L.Bean","mmf":"Märta Måås-Fjetterström","muji":"Muji","myhenry":"Numatic","nanamica":"Nanamica","nanimarquina":"Nanimarquina","neweracap":"New Era","okeeffescompany":"O’Keeffe’s","orslow":"OrSlow","oxo":"OXO","patagonia":"Patagonia","pkgrills":"PK Grills","project-audio":"Pro-Ject","ratiocoffee":"Ratio","rmwilliams":"R.M. Williams","roesle":"Rösle","santacole":"Santa & Cole","seikoclocksusa":"Seiko","slowear":"Incotex","smythson":"Smythson","solostove":"Solo Stove","specialized":"Specialized","store.hermanmiller":"Herman Miller","teklafabrics":"Tekla","thelaundress":"The Laundress","thermos":"Thermos","thuma":"Thuma","usm":"USM","vitamix":"Vitamix","vitra":"Vitra","vitsoe":"Vitsœ","williamlockie":"William Lockie","wusthof":"Wüsthof","yoshidakaban":"Porter-Yoshida","zwilling":"Zwilling"
};

Object.assign(hostCompanies,{
  "cycles-alex-singer":"Alex Singer",
  "arnejacobsenclocks":"Arne Jacobsen",
  "graf-schlitten":"Graf",
  "swisspearl":"Swisspearl",
  "stokke":"Stokke"
});

const normalize=(value:string)=>value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");
function hostnameKey(url?:string){
  if(!url) return "";
  try {
    const host=new URL(url).hostname.toLowerCase().replace(/^www\./,"");
    if(hostCompanies[host]) return host;
    const parts=host.split(".");
    return parts.length>1?parts[parts.length-2]:parts[0];
  } catch { return ""; }
}

function inferCompany(name:string,url?:string){
  const explicit=companyNames.find(company=>normalize(name).startsWith(normalize(company))&&normalize(name)!==normalize(company));
  if(explicit) return explicit;
  const host=hostnameKey(url);
  const hostCompany=hostCompanies[host];
  if(hostCompany&&normalize(name)!==normalize(hostCompany)) return hostCompany;
  const core=normalize(hostCompany||host);
  if(!core) return undefined;
  const words=name.split(/\s+/);
  for(let count=Math.min(5,words.length-1);count>=1;count--){
    const prefix=words.slice(0,count).join(" ");
    const normalized=normalize(prefix);
    if(normalized===core) return prefix;
  }
  const first=words[0];
  return words.length>1&&normalize(url||"").includes(normalize(first))?first:undefined;
}

function stripCompany(name:string,company:string){
  if(name.toLowerCase().startsWith(company.toLowerCase())) return name.slice(company.length).replace(/^[\s,–—:;-]+/,"").trim();
  const normalizedCompany=normalize(company);
  const words=name.split(/\s+/);
  for(let count=Math.min(5,words.length-1);count>=1;count--){
    if(normalize(words.slice(0,count).join(" "))===normalizedCompany) return words.slice(count).join(" ");
  }
  return name;
}

type Product={_id:string;name:string;brand?:string;outboundUrl?:string;sections:string[]};
async function main(){
  const products=await client.fetch<Product[]>(`*[_type=="product"&&count(*[_type=="catalogItem"&&published==true&&references(^._id)&&section->slug.current in $sectionSlugs])>0]{_id,name,brand,outboundUrl,"sections":*[_type=="catalogItem"&&published==true&&references(^._id)].section->slug.current}`,{sectionSlugs:catalogSectionSlugs});
  const changes=products.map(product=>{
    if(product.brand) return {...product,status:"complete" as const};
    const company=inferCompany(product.name,product.outboundUrl);
    if(!company) return {...product,status:"unresolved" as const};
    const productName=stripCompany(product.name,company);
    if(!productName||normalize(productName)===normalize(company)) return {...product,status:"unresolved" as const};
    return {...product,company,productName,status:"ready" as const};
  });
  const ready=changes.filter((change):change is typeof change&{company:string;productName:string;status:"ready"}=>change.status==="ready");
  const unresolved=changes.filter(change=>change.status==="unresolved");
  console.log(`${apply?"APPLY":"DRY RUN"}: ${ready.length} product/company splits; ${unresolved.length} unresolved; ${editorialSectionSlugs.length} editorial sections intentionally excluded.`);
  unresolved.slice(0,100).forEach(product=>console.log(`UNRESOLVED ${product.name} | ${product.outboundUrl||"no URL"}`));
  ready.slice(0,verbose?ready.length:40).forEach(product=>console.log(`${product.name} -> ${product.productName} from ${product.company}`));
  if(!apply) return;
  let tx=client.transaction();
  ready.forEach(product=>{tx=tx.patch(product._id,patch=>patch.set({name:product.productName,brand:product.company}));});
  const result=await tx.commit();
  console.log(`Committed product/company migration: ${result.documentIds.length} products updated.`);
}

main().catch(error=>{console.error(error);process.exit(1);});
