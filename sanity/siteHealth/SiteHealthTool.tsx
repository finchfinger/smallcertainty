"use client";

import {Box,Button,Card,Container,Flex,Grid,Heading,Label,Spinner,Stack,Text} from "@sanity/ui";
import {LaunchIcon,RefreshIcon} from "@sanity/icons";
import {useCallback,useEffect,useState} from "react";
import {useClient} from "sanity";
import {IntentLink} from "sanity/router";

type LinkResult={_key:string;label:string;sourceId:string;sourcePath:string;url:string;finalUrl?:string;status:string;httpStatus?:number;message?:string};
type ContentIssue={_key:string;label:string;sourceId:string;sourcePath:string;message:string};
type TopPage={_key:string;path:string;pageviews:number;visitors:number};
type HealthReport={
  checkedAt?:string;
  totalLinks?:number;
  healthyLinks?:number;
  problemLinks?:number;
  redirectedLinks?:number;
  restrictedLinks?:number;
  links?:LinkResult[];
  contentIssues?:ContentIssue[];
  analyticsStatus?:string;
  analyticsMessage?:string;
  pageviews7Days?:number;
  visitors7Days?:number;
  pageviews30Days?:number;
  visitors30Days?:number;
  topPages?:TopPage[];
};

const reportQuery=`*[_id=="siteHealthReport-current"][0]{checkedAt,totalLinks,healthyLinks,problemLinks,redirectedLinks,restrictedLinks,links,contentIssues,analyticsStatus,analyticsMessage,pageviews7Days,visitors7Days,pageviews30Days,visitors30Days,topPages}`;
const number=(value?:number)=>typeof value==="number"?new Intl.NumberFormat("en-US").format(value):"—";

function Metric({label,value,tone="default"}:{label:string;value:string;tone?:"default"|"positive"|"critical"|"caution"}){
  return <Card border padding={4} radius={2} tone={tone}><Stack space={3}><Label muted size={1}>{label}</Label><Heading size={4}>{value}</Heading></Stack></Card>;
}

function EditLink({id,children}:{id:string;children:React.ReactNode}){
  return <IntentLink intent="edit" params={{id}} style={{color:"inherit",textDecoration:"none"}}>{children}</IntentLink>;
}

export function SiteHealthTool(){
  const client=useClient({apiVersion:"2025-01-01"});
  const [report,setReport]=useState<HealthReport|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string>();
  const load=useCallback(async()=>{
    setLoading(true);
    try{setReport(await client.fetch(reportQuery));setError(undefined);}
    catch(reason){setError(reason instanceof Error?reason.message:"Could not load the report.");}
    finally{setLoading(false);}
  },[client]);
  useEffect(()=>{void load();},[load]);

  if(loading&&!report) return <Flex align="center" justify="center" style={{height:"100%"}}><Spinner muted/></Flex>;
  const problems=(report?.links||[]).filter(link=>link.status==="broken");
  const redirects=(report?.links||[]).filter(link=>link.status==="redirected");
  const restricted=(report?.links||[]).filter(link=>link.status==="restricted");

  return <Box padding={[3,4,5]} style={{overflow:"auto",height:"100%"}}>
    <Container width={4}>
      <Stack space={5}>
        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Stack space={2}>
            <Heading size={4}>Site Health</Heading>
            <Text muted size={1}>{report?.checkedAt?`Last checked ${new Date(report.checkedAt).toLocaleString()}`:"No health check has run yet."}</Text>
          </Stack>
          <Button icon={RefreshIcon} mode="ghost" text="Refresh report" onClick={()=>void load()} loading={loading}/>
        </Flex>

        {error&&<Card padding={4} radius={2} tone="critical"><Text>{error}</Text></Card>}
        {!report&&<Card padding={5} radius={2} tone="caution"><Stack space={3}><Heading size={2}>Waiting for the first report</Heading><Text>Deploy the site and run the Site Health endpoint once, or run <code>npm run check:site-health</code> locally.</Text></Stack></Card>}

        <Stack space={3}>
          <Heading size={2}>Traffic</Heading>
          <Grid columns={[1,2,4]} gap={3}>
            <Metric label="PAGEVIEWS · 7 DAYS" value={number(report?.pageviews7Days)}/>
            <Metric label="VISITORS · 7 DAYS" value={number(report?.visitors7Days)}/>
            <Metric label="PAGEVIEWS · 30 DAYS" value={number(report?.pageviews30Days)}/>
            <Metric label="VISITORS · 30 DAYS" value={number(report?.visitors30Days)}/>
          </Grid>
          {report?.analyticsStatus!=="ready"&&<Card padding={4} radius={2} tone="caution"><Stack space={3}><Heading size={1}>Traffic setup required</Heading><Text size={1}>{report?.analyticsMessage||"Enable Vercel Web Analytics and add the Vercel API credentials to the project."}</Text></Stack></Card>}
          {!!report?.topPages?.length&&<Card border radius={2}>
            <Box padding={4}><Label size={1}>TOP PAGES · 30 DAYS</Label></Box>
            <Stack>
              {report.topPages.map(page=><Flex key={page._key} align="center" justify="space-between" gap={4} padding={4} style={{borderTop:"1px solid var(--card-border-color)"}}>
                <Text size={1} textOverflow="ellipsis">{page.path}</Text>
                <Text muted size={1}>{number(page.pageviews)} views</Text>
              </Flex>)}
            </Stack>
          </Card>}
        </Stack>

        <Stack space={3}>
          <Heading size={2}>Links</Heading>
          <Grid columns={[1,2,5]} gap={3}>
            <Metric label="CHECKED" value={number(report?.totalLinks)}/>
            <Metric label="HEALTHY" value={number(report?.healthyLinks)} tone="positive"/>
            <Metric label="BROKEN" value={number(report?.problemLinks)} tone={problems.length?"critical":"positive"}/>
            <Metric label="REDIRECTED" value={number(report?.redirectedLinks)} tone={redirects.length?"caution":"default"}/>
            <Metric label="COULDN'T VERIFY" value={number(report?.restrictedLinks)}/>
          </Grid>
          {!problems.length&&report&&<Card padding={4} radius={2} tone="positive"><Text size={1}>No confirmed broken links found.</Text></Card>}
          {problems.map(link=><Card key={link._key} border padding={4} radius={2} tone={link.status==="broken"?"critical":"caution"}>
            <Flex align="flex-start" justify="space-between" gap={4} wrap="wrap">
              <Stack space={3} style={{minWidth:0}}>
                <EditLink id={link.sourceId}><Text weight="semibold">{link.label}</Text></EditLink>
                <Text size={1}>{link.status==="redirected"?"Redirected":"Broken"}{link.httpStatus?` · HTTP ${link.httpStatus}`:""}{link.message?` · ${link.message}`:""}</Text>
                <Text muted size={1} textOverflow="ellipsis">{link.url}</Text>
                {link.finalUrl&&<Text muted size={1} textOverflow="ellipsis">Now goes to {link.finalUrl}</Text>}
              </Stack>
              <Flex gap={2}>
                <EditLink id={link.sourceId}><Button mode="ghost" text="Edit"/></EditLink>
                <Button as="a" href={link.url} target="_blank" rel="noreferrer" icon={LaunchIcon} mode="ghost" text="Open"/>
              </Flex>
            </Flex>
          </Card>)}
          {!!redirects.length&&<Card border padding={4} radius={2} tone="caution"><Text size={1}>{redirects.length} working link{redirects.length===1?"":"s"} redirected to a new address. These are lower priority than confirmed failures.</Text></Card>}
          {!!restricted.length&&<Text muted size={1}>{restricted.length} site{restricted.length===1?"":"s"} blocked the automated checker but did not return a confirmed broken link.</Text>}
        </Stack>

        <Stack space={3} paddingBottom={6}>
          <Heading size={2}>Content checks</Heading>
          {!report?.contentIssues?.length&&report&&<Card padding={4} radius={2} tone="positive"><Text size={1}>No missing titles, slugs, summaries, cover images or recommendations.</Text></Card>}
          {report?.contentIssues?.map(issue=><Card key={issue._key} border padding={4} radius={2} tone="caution">
            <EditLink id={issue.sourceId}><Stack space={2}><Text weight="semibold">{issue.label}</Text><Text size={1}>{issue.message}</Text></Stack></EditLink>
          </Card>)}
        </Stack>
      </Stack>
    </Container>
  </Box>;
}
