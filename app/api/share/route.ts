const WINDOW_MS=60_000;
const MAX_REQUESTS=5;
const attempts=new Map<string,{ count:number; expiresAt:number }>();

function escapeHtml(value:string){
  return value
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function isEmail(value:string){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(request:Request){
  const forwarded=request.headers.get("x-forwarded-for");
  const key=forwarded?.split(",")[0]?.trim()||"local";
  const now=Date.now();
  const current=attempts.get(key);
  if(!current||current.expiresAt<=now) {
    attempts.set(key,{ count:1,expiresAt:now+WINDOW_MS });
    return false;
  }
  current.count+=1;
  return current.count>MAX_REQUESTS;
}

export async function POST(request:Request){
  if(isRateLimited(request)) {
    return Response.json({ error:"Please wait a moment before sharing again." },{ status:429 });
  }

  let body:unknown;
  try {
    body=await request.json();
  } catch {
    return Response.json({ error:"The share request was not valid." },{ status:400 });
  }

  if(!body||typeof body!=="object") {
    return Response.json({ error:"The share request was not valid." },{ status:400 });
  }

  const data=body as Record<string,unknown>;
  if(typeof data.website==="string"&&data.website) {
    return Response.json({ ok:true });
  }

  const email=typeof data.email==="string"?data.email.trim():"";
  const message=typeof data.message==="string"?data.message.trim():"";
  const category=typeof data.category==="string"?data.category.trim():"";
  const title=typeof data.title==="string"?data.title.trim():"";
  const path=typeof data.path==="string"?data.path.trim():"";

  if(!isEmail(email)||email.length>254) {
    return Response.json({ error:"Please enter a valid recipient email." },{ status:400 });
  }
  if(!category||category.length>100||!title||title.length>160||!message||message.length>500||!path.startsWith("/")||path.startsWith("//")||path.length>2048) {
    return Response.json({ error:"Please check the recommendation and message." },{ status:400 });
  }

  const apiKey=process.env.RESEND_API_KEY;
  const configuredFrom=process.env.RESEND_FROM_EMAIL;
  if(!apiKey||!configuredFrom) {
    return Response.json({ error:"Email delivery is not configured yet." },{ status:503 });
  }
  const fromAddress=configuredFrom.match(/<([^>]+)>/)?.[1]??configuredFrom;
  const from=`"Small Certainty" <${fromAddress.trim()}>`;

  const requestOrigin=new URL(request.url).origin;
  const configuredOrigin=process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const origin=configuredOrigin?new URL(configuredOrigin).origin:requestOrigin;
  const shareUrl=new URL(path,origin).toString();
  const safeTitle=escapeHtml(title);
  const safeMessage=escapeHtml(message).replaceAll("\n","<br>");
  const safeUrl=escapeHtml(shareUrl);
  const isDefaultMessage=message===`This is worth a look: ${title}`;
  const textBody=isDefaultMessage
    ?`This is worth a look: ${title}\n${shareUrl}`
    :`${message}\n\n${title}: ${shareUrl}`;
  const htmlBody=isDefaultMessage
    ?`<div style="font-family:monospace;font-size:16px;line-height:1.5;color:#1f1a17"><p>This is worth a look: <a href="${safeUrl}" style="color:#1f1a17">${safeTitle}</a></p></div>`
    :`<div style="font-family:monospace;font-size:16px;line-height:1.5;color:#1f1a17"><p>${safeMessage}</p><p><a href="${safeUrl}" style="color:#1f1a17">${safeTitle}</a></p></div>`;

  try {
    const resendResponse=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{
        Authorization:`Bearer ${apiKey}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        from,
        to:[email],
        subject:`${category}: ${title}`,
        text:textBody,
        html:htmlBody,
      }),
    });

    if(!resendResponse.ok) {
      return Response.json({ error:"The email could not be sent. Please try again." },{ status:502 });
    }
  } catch {
    return Response.json({ error:"The email service could not be reached. Please try again." },{ status:502 });
  }

  return Response.json({ ok:true });
}
