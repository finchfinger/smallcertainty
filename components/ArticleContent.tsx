import type { JournalContentBlock,JournalImage } from "@/content/journal";

function Figure({ image,className="",imageClassName="" }:{image:JournalImage;className?:string;imageClassName?:string}) {
  const note=[image.caption,image.credit].filter(Boolean).join(" — ");
  return <figure className={className}>
    <div className={`overflow-hidden ${imageClassName}`}>
      {/* Sanity supplies the source; the arrangement controls its editorial crop. */}
      <img src={image.url} alt={image.alt} className="h-full w-full object-cover"/>
    </div>
    {note&&<figcaption className="border-b border-ink py-2 font-simon-mono text-[14px] leading-[20px] tracking-[-0.01em]">{note}</figcaption>}
  </figure>;
}

function TextSection({ block }:{block:Extract<JournalContentBlock,{_type:"articleTextSection"}>}) {
  return <section className="col-span-2 font-simon-mono text-[14px] font-normal leading-[20px] tracking-[-0.01em] lg:col-span-6 lg:col-start-4">
    {block.heading&&<h2 className="mb-5 font-normal">{block.heading.toUpperCase()}</h2>}
    {block.body.map((paragraph,index)=><p key={`${block._key}-${index}`} className={index>0?"editorial-indent":undefined}>
      {typeof paragraph==="string"?paragraph:paragraph.spans.map((span,spanIndex)=>span.href
        ?<a key={spanIndex} href={span.href} className="journal-text-link">{span.text}</a>
        :span.text
      )}
    </p>)}
  </section>;
}

function Images({ block }:{block:Extract<JournalContentBlock,{_type:"imageArrangement"}>}) {
  if(block.layout==="split"&&block.secondaryImage){
    return <section className="col-span-2 grid grid-cols-1 gap-6 lg:col-span-12 lg:grid-cols-12">
      <Figure image={block.primaryImage} className="lg:col-span-4" imageClassName="aspect-[2/3]"/>
      <Figure image={block.secondaryImage} className="self-start lg:col-span-8" imageClassName="aspect-[3/2]"/>
    </section>;
  }

  if(block.layout==="centered"){
    return <section className="col-span-2 lg:col-span-6 lg:col-start-4">
      <Figure image={block.primaryImage} imageClassName="aspect-[3/2]"/>
    </section>;
  }

  return <section className="col-span-2 lg:col-span-12">
    <Figure image={block.primaryImage} imageClassName="aspect-[2/1]"/>
  </section>;
}

function PullQuote({ block }:{block:Extract<JournalContentBlock,{_type:"pullQuote"}>}) {
  return <blockquote className="col-span-2 whitespace-pre-wrap font-simon-mono text-[28px] font-normal leading-[40px] lg:col-span-6 lg:col-start-4">
    {block.text}
  </blockquote>;
}

export function ArticleContent({ blocks }:{blocks:JournalContentBlock[]}) {
  return <div className="grid grid-cols-2 gap-x-5 gap-y-[52px] lg:col-span-12 lg:grid-cols-12 lg:gap-x-6">
    {blocks.map(block=>{
      if(block._type==="articleTextSection") return <TextSection key={block._key} block={block}/>;
      if(block._type==="pullQuote") return <PullQuote key={block._key} block={block}/>;
      return <Images key={block._key} block={block}/>;
    })}
  </div>;
}
