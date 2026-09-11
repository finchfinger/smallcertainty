import {loadEnvConfig} from "@next/env";
import {createSiteHealthClient,generateSiteHealthReport} from "../lib/siteHealth";

loadEnvConfig(process.cwd());

generateSiteHealthReport(createSiteHealthClient())
  .then(report=>{
    console.log(`Checked ${report.totalLinks} links; ${report.problemLinks} confirmed broken.`);
    report.links.filter(link=>link.status==="broken").forEach(link=>console.log(`${"httpStatus" in link&&link.httpStatus||"ERR"}\t${link.label}\t${link.url}`));
    process.exit(0);
  })
  .catch(error=>{console.error(error);process.exit(1);});
