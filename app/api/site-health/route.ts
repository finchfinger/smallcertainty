import {NextResponse} from "next/server";
import {createSiteHealthClient,generateSiteHealthReport} from "@/lib/siteHealth";

export const dynamic="force-dynamic";
export const maxDuration=300;

export async function GET(request:Request){
  const secret=process.env.CRON_SECRET;
  if(!secret||request.headers.get("authorization")!==`Bearer ${secret}`){
    return NextResponse.json({error:"Unauthorized"},{status:401});
  }
  try{
    const report=await generateSiteHealthReport(createSiteHealthClient());
    return NextResponse.json({ok:true,checkedAt:report.checkedAt,totalLinks:report.totalLinks,problemLinks:report.problemLinks});
  }catch(error){
    return NextResponse.json({error:error instanceof Error?error.message:"Site health check failed"},{status:500});
  }
}
