import { journalArticles,type JournalArticle,type JournalContentBlock } from "@/content/journal";
import { client,sanityConfigured } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder=imageUrlBuilder(client);
type SanityImageSource=Parameters<typeof imageBuilder.image>[0];
type SanityFigure={
  image:SanityImageSource;
  alt:string;
  caption?:string;
  credit?:string;
};
type SanityContentBlock =
  | {
      _key:string;
      _type:"block";
      style?:"normal"|"h2";
      children?:Array<{_type:"span";text?:string}>;
    }
  | {
      _key:string;
      _type:"imageArrangement";
      layout:"split"|"full"|"centered";
      primaryImage:SanityFigure;
      secondaryImage?:SanityFigure;
    };
type SanityArticle = {
  slug:string;
  title:string;
  dek:string;
  date:string;
  author?:string;
  coverImage?:SanityFigure;
  content?:SanityContentBlock[];
};

const articleProjection=`{
  title,
  "slug":slug.current,
  dek,
  "date":publishedAt,
  author,
  coverImage{
    image,
    alt,
    caption,
    credit
  },
  content[]{
    _key,
    _type,
    style,
    children[]{
      _key,
      _type,
      text
    },
    layout,
    primaryImage{
      image,
      alt,
      caption,
      credit
    },
    secondaryImage{
      image,
      alt,
      caption,
      credit
    }
  }
}`;

function normalizeFigure(figure:SanityFigure) {
  return {
    url:imageBuilder.image(figure.image).width(2400).quality(90).url(),
    alt:figure.alt,
    caption:figure.caption,
    credit:figure.credit,
  };
}

function normalizeArticle(article:SanityArticle):JournalArticle {
  const content:JournalContentBlock[]=[];
  let pendingText:Extract<JournalContentBlock,{_type:"articleTextSection"}>|undefined;
  const flushText=()=>{
    if(pendingText?.body.length) content.push(pendingText);
    pendingText=undefined;
  };
  for(const block of article.content||[]){
    if(block._type==="block"){
      const text=(block.children||[]).map(child=>child.text||"").join("");
      if(!text) continue;
      if(block.style==="h2"){
        flushText();
        pendingText={_key:block._key,_type:"articleTextSection",heading:text,body:[]};
      }else{
        pendingText||={_key:`${block._key}-section`,_type:"articleTextSection",body:[]};
        pendingText.body.push(text);
      }
      continue;
    }
    flushText();
    content.push({
      ...block,
      primaryImage:normalizeFigure(block.primaryImage),
      secondaryImage:block.secondaryImage?normalizeFigure(block.secondaryImage):undefined,
    });
  }
  flushText();
  const textSections=content
    .filter((block):block is Extract<JournalContentBlock,{_type:"articleTextSection"}>=>block._type==="articleTextSection")
    .map(block=>({heading:block.heading,body:block.body}));
  const leadImage=article.coverImage
    ?normalizeFigure(article.coverImage).url
    :content.find((block):block is Extract<JournalContentBlock,{_type:"imageArrangement"}>=>block._type==="imageArrangement")?.primaryImage.url;

  return {
    ...article,
    sections:textSections,
    content,
    imageSrc:leadImage,
  };
}

export async function getJournalArticle(slug:string):Promise<JournalArticle|undefined> {
  if(sanityConfigured){
    try{
      const article=await client.fetch<SanityArticle|null>(
        `*[_type=="article" && slug.current==$slug][0]${articleProjection}`,
        {slug},
        {next:{revalidate:60}},
      );
      if(article) return normalizeArticle(article);
    }catch(error){
      console.warn("Sanity article fetch failed; using local journal content.",error);
    }
  }
  return journalArticles.find(article=>article.slug===slug);
}

export async function getJournalArticles():Promise<JournalArticle[]> {
  if(!sanityConfigured) return journalArticles;
  try{
    const articles=await client.fetch<SanityArticle[]>(
      `*[_type=="article" && defined(slug.current)] | order(publishedAt desc)${articleProjection}`,
      {},
      {next:{revalidate:60}},
    );
    const sanityArticles=articles.map(normalizeArticle);
    const sanitySlugs=new Set(sanityArticles.map(article=>article.slug));
    return [
      ...sanityArticles,
      ...journalArticles.filter(article=>!sanitySlugs.has(article.slug)),
    ];
  }catch(error){
    console.warn("Sanity article list fetch failed; using local journal content.",error);
    return journalArticles;
  }
}
