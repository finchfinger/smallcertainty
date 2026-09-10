import {createClient,type SanityClient} from "@sanity/client";

type CatalogSource={
  _id:string;
  label?:string;
  path?:string;
  recommendations?:Array<{rank?:number;productName?:string;url?:string}>;
};

type ArticleSource={_id:string;title?:string;path?:string;summary?:string;hasCover?:boolean};
type LinkCandidate={label:string;sourceId:string;sourcePath:string;url:string};

const reportId="siteHealthReport-current";

const isoDate=(daysAgo:number)=>{
  const value=new Date();
  value.setUTCDate(value.getUTCDate()-daysAgo);
  return value.toISOString().slice(0,10);
};

function isSafePublicUrl(value:string){
  try{
    const url=new URL(value);
    if(!["http:","https:"].includes(url.protocol)) return false;
    const host=url.hostname.toLowerCase();
    return !(
      host==="localhost" || host.endsWith(".local") || host==="0.0.0.0" ||
      /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
      host==="::1"
    );
  }catch{return false;}
}

async function checkLink(candidate:LinkCandidate){
  if(!isSafePublicUrl(candidate.url)) return {...candidate,status:"broken",message:"Invalid or non-public URL"};
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),12000);
  try{
    const response=await fetch(candidate.url,{
      redirect:"follow",
      signal:controller.signal,
      headers:{"User-Agent":"Small Certainty link monitor/1.0","Accept":"text/html,application/xhtml+xml"},
    });
    const finalUrl=response.url||candidate.url;
    const redirected=finalUrl!==candidate.url;
    const restricted=[401,403,405,429].includes(response.status);
    const broken=response.status>=400&&!restricted;
    return {
      ...candidate,
      status:broken?"broken":restricted?"restricted":redirected?"redirected":"healthy",
      httpStatus:response.status,
      ...(redirected?{finalUrl}:{}),
      ...(broken?{message:`HTTP ${response.status}`}:restricted?{message:`HTTP ${response.status} · the site blocked the automated check`}:{}),
    };
  }catch(error){
    return {...candidate,status:"broken",message:error instanceof Error&&error.name==="AbortError"?"Timed out after 12 seconds":error instanceof Error?error.message:"Request failed"};
  }finally{clearTimeout(timeout);}
}

async function inBatches<T,R>(items:T[],size:number,run:(item:T)=>Promise<R>){
  const output:R[]=[];
  for(let index=0;index<items.length;index+=size) output.push(...await Promise.all(items.slice(index,index+size).map(run)));
  return output;
}

async function vercelQuery(path:string,params:Record<string,string>){
  const token=process.env.VERCEL_TOKEN;
  const projectId=process.env.VERCEL_PROJECT_ID;
  if(!token||!projectId) throw new Error("Add VERCEL_TOKEN and VERCEL_PROJECT_ID to enable traffic reporting.");
  const query=new URLSearchParams({projectId,...params});
  if(process.env.VERCEL_TEAM_ID) query.set("teamId",process.env.VERCEL_TEAM_ID);
  const response=await fetch(`https://api.vercel.com/v1/query/web-analytics/${path}?${query}`,{headers:{Authorization:`Bearer ${token}`}});
  const body=await response.json();
  if(!response.ok) throw new Error(body?.error?.message||body?.message||`Vercel returned HTTP ${response.status}`);
  return body.data;
}

async function getAnalytics(){
  const until=isoDate(0);
  const aggregate=async(days:number)=>{
    const rows=await vercelQuery("visits/aggregate",{since:isoDate(days),until,by:"day"}) as Array<{pageviews?:number;visitors?:number}>;
    return rows.reduce<{pageviews:number;visitors:number}>((total,row)=>({pageviews:total.pageviews+(row.pageviews||0),visitors:total.visitors+(row.visitors||0)}),{pageviews:0,visitors:0});
  };
  const [seven,thirty,topPages]=await Promise.all([
    aggregate(7),
    aggregate(30),
    vercelQuery("visits/aggregate",{since:isoDate(30),until,by:"requestPath",limit:"8"}) as Promise<Array<{requestPath?:string;pageviews?:number;visitors?:number}>>,
  ]);
  return {
    analyticsStatus:"ready",
    pageviews7Days:seven.pageviews,
    visitors7Days:seven.visitors,
    pageviews30Days:thirty.pageviews,
    visitors30Days:thirty.visitors,
    topPages:topPages.map((page,index)=>({_key:`page-${index}`,_type:"siteHealthTopPage",path:page.requestPath||"/",pageviews:page.pageviews||0,visitors:page.visitors||0})),
  };
}

export async function generateSiteHealthReport(client:SanityClient){
  const [catalog,articles]=await Promise.all([
    client.fetch<CatalogSource[]>(`*[_type=="catalogItem"&&published==true]{_id,label,"path":"/catalog/"+section->slug.current+"/"+slug.current,"recommendations":recommendations[published!=false]{rank,"productName":product->name,"url":coalesce(outboundUrlOverride,product->outboundUrl)}}`),
    client.fetch<ArticleSource[]>(`*[_type=="article"&&published==true]{_id,title,"path":"/journal/"+slug.current,summary,"hasCover":defined(coverImage.asset)}`),
  ]);
  const candidates=catalog.flatMap(item=>(item.recommendations||[]).filter(pick=>pick.url).map(pick=>({
    label:`${item.label||"Catalog item"} · ${pick.productName||`pick ${pick.rank||""}`}`,
    sourceId:item._id,
    sourcePath:item.path||"/catalog",
    url:pick.url!,
  })));
  const links=(await inBatches(candidates,8,checkLink)).map((link,index)=>({_key:`link-${index}`,_type:"siteHealthLink",...link}));
  const contentIssues=[
    ...catalog.flatMap(item=>[
      ...(!item.label?["Missing title"]:[]),
      ...(!item.path||item.path.includes("null")?["Missing slug or section"]:[]),
      ...(!(item.recommendations||[]).length?["No published recommendations"]:[]),
    ].map((message,index)=>({_key:`catalog-${item._id}-${index}`,_type:"siteHealthIssue",label:item.label||"Untitled catalog item",sourceId:item._id,sourcePath:item.path||"/catalog",message}))),
    ...articles.flatMap(article=>[
      ...(!article.title?["Missing title"]:[]),
      ...(!article.path||article.path.includes("null")?["Missing slug"]:[]),
      ...(!article.summary?["Missing summary"]:[]),
      ...(!article.hasCover?["Missing cover image"]:[]),
    ].map((message,index)=>({_key:`article-${article._id}-${index}`,_type:"siteHealthIssue",label:article.title||"Untitled article",sourceId:article._id,sourcePath:article.path||"/journal",message}))),
  ];
  let analytics:Record<string,unknown>;
  try{analytics=await getAnalytics();}
  catch(error){analytics={analyticsStatus:"setup",analyticsMessage:error instanceof Error?error.message:"Traffic reporting is unavailable."};}

  const problemLinks=links.filter(link=>link.status==="broken").length;
  const redirectedLinks=links.filter(link=>link.status==="redirected").length;
  const restrictedLinks=links.filter(link=>link.status==="restricted").length;
  const report={
    _id:reportId,
    _type:"siteHealthReport",
    checkedAt:new Date().toISOString(),
    totalLinks:links.length,
    healthyLinks:links.filter(link=>link.status==="healthy").length,
    problemLinks,
    redirectedLinks,
    restrictedLinks,
    links,
    contentIssues,
    ...analytics,
  };
  await client.createOrReplace(report);
  return report;
}

export function createSiteHealthClient(){
  const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token=process.env.SANITY_API_WRITE_TOKEN;
  if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");
  return createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01",token,useCdn:false});
}
