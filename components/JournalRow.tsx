import Link from "next/link";

type JournalRowProps = {
  href:string;
  title:string;
  summary:string;
  date:string;
  tags?:string[];
  imageTone?:string;
  imageSrc?:string;
  showImage?:boolean;
  variant?:"a"|"b"|"c"|"compact";
  monoClassName?:string;
  monoTextClassName?:string;
  tagVariant?:"purple"|"outline"|"outline-soft";
  continuedDate?:boolean;
  imagePlacement?:"end"|"start";
  compactImagePlacement?:"end"|"before-title";
  imageTextGap?:"16"|"20"|"24";
  titleDescriptionGap?:"16"|"20";
  desktopImageSize?:"96"|"100";
  rowPadding?:"16"|"20";
  hoverInset?:0|8|12|16;
};

function formatDate(date:string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
}

function formatRelativeDate(date:string) {
  const target=new Date(`${date}T00:00:00`).getTime();
  const days=Math.max(1,Math.round(Math.abs(Date.now()-target)/86400000));
  if(days<30) return `${days}D`;
  const months=Math.max(1,Math.round(days/30));
  if(months<12) return `${months}M`;
  return `${Math.max(1,Math.round(months/12))}Y`;
}

function StackedDate({ date,className="" }:{date:string;className?:string}) {
  const fullDate=formatDate(date);
  const relativeDate=formatRelativeDate(date);
  return <time dateTime={date} aria-label={fullDate} className={className}>
    <span className="min-[700px]:hidden lg:inline">{fullDate}</span>
    <span aria-hidden="true" className="hidden w-[40px] flex-col items-center min-[700px]:flex lg:hidden">
      {relativeDate.split("").map((letter,index)=><span key={`${letter}-${index}`} className="flex h-5 items-center justify-center">{letter}</span>)}
    </span>
  </time>;
}

function Chip({ children,variant="purple" }:{children:string;variant?:"purple"|"outline"|"outline-soft"}) {
  const styles={
    purple:"bg-white/45 text-[#5b44ff]",
    outline:"border border-ink bg-transparent text-ink",
    "outline-soft":"border border-ink/35 bg-transparent text-muted",
  } as const;
  return <span className={`inline-flex h-7 items-center px-2 text-[12px] leading-none ${styles[variant]}`}>{children}</span>;
}

function imageStyle(imageSrc?:string,imageTone="linear-gradient(135deg,#ded8c8,#9a9286)") {
  return imageSrc?{backgroundImage:`url(${imageSrc})`}:{background:imageTone};
}

export function JournalRow({ href,title,summary,date,tags=[],imageTone="linear-gradient(135deg,#ded8c8,#9a9286)",imageSrc,showImage=true,variant="a",monoClassName="font-simon-mono",monoTextClassName="text-[14px]",tagVariant="purple",continuedDate=false,imagePlacement="end",compactImagePlacement="end",imageTextGap="20",titleDescriptionGap="20",desktopImageSize="100",rowPadding="16",hoverInset=12 }:JournalRowProps) {
  const hoverShell={
    16:"-mx-4 rounded-lg px-4",
    12:"-mx-3 rounded-lg px-3",
    8:"-mx-2 rounded px-2",
    0:"mx-0 rounded-none px-0",
  }[hoverInset];
  if(variant==="compact") {
    return <div className="relative -mx-3 grid min-h-[70px] grid-cols-[1fr_auto] items-center gap-4 px-3 py-2 sm:min-h-14 sm:grid-cols-12 sm:gap-x-6 sm:py-0">
      <span aria-hidden="true" className={`pointer-events-none col-span-full border-t border-ink ${continuedDate?"sm:col-span-10 sm:col-start-3":""}`}/>
      {continuedDate?<span aria-hidden="true" className="hidden sm:block sm:col-span-2"/>:<StackedDate date={date} className={`${monoClassName} ${monoTextClassName} leading-[20px] tracking-[-0.01em] sm:col-span-2`}/>}
      <Link href={href} className={`${hoverShell} transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${compactImagePlacement==="before-title"?"flex min-w-0 items-center gap-3 sm:col-span-8 sm:col-start-3 sm:gap-4":"contents sm:block sm:col-span-10 sm:col-start-3"}`}>
        {compactImagePlacement==="before-title"?<>
          <span aria-hidden="true" style={showImage?imageStyle(imageSrc,imageTone):undefined} className={`block aspect-square h-[46px] shrink-0 rounded bg-cover bg-center sm:h-10 ${showImage?"":"invisible"}`}/>
          <span className={`${monoClassName} ${monoTextClassName} min-w-0 truncate font-normal leading-[20px] tracking-[-0.01em]`}>{title}</span>
        </>:<span className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-4 sm:grid-cols-10 sm:gap-x-6">
          <span className={`${monoClassName} ${monoTextClassName} min-w-0 truncate font-normal leading-[20px] tracking-[-0.01em] sm:col-span-7`}>{title}</span>
          <span aria-hidden="true" style={showImage?imageStyle(imageSrc,imageTone):undefined} className={`row-start-1 row-end-3 block aspect-square h-[46px] rounded bg-cover bg-center sm:col-span-2 sm:col-start-9 sm:row-auto sm:h-10 sm:justify-self-end ${showImage?"":"invisible"}`}/>
        </span>}
      </Link>
    </div>;
  }

  if(variant==="b") {
    const isImageFirst=imagePlacement==="start";
    const imageTextGapClass={
      "16":"sm:gap-4",
      "20":"sm:gap-5",
      "24":"sm:gap-6",
    }[imageTextGap];
    const titleDescriptionGapClass={
      "16":"mt-4",
      "20":"mt-5",
    }[titleDescriptionGap];
    const textBlockHeightClass={
      "16":"h-[96px]",
      "20":"h-[100px]",
    }[titleDescriptionGap];
    const desktopImageSizeClass={
      "96":"sm:h-[96px] sm:w-[96px]",
      "100":"sm:h-[100px] sm:w-[100px]",
    }[desktopImageSize];
    const rowPaddingClass={
      "16":"py-4",
      "20":"py-5",
    }[rowPadding];
    const textBlock=<span className={`block ${textBlockHeightClass} min-w-0 overflow-hidden`}>
      <span className={`block ${monoClassName} ${monoTextClassName} font-normal leading-[20px] tracking-[-0.01em]`}>{title}</span>
      <span className={`${monoClassName} ${monoTextClassName} ${titleDescriptionGapClass} block max-w-[900px] overflow-hidden font-normal leading-[20px] tracking-[-0.01em] text-[#8A8A81] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]`}>{summary}</span>
      <span className="mt-4 hidden min-h-7 flex-wrap gap-2">{tags.map(tag=><Chip key={tag} variant={tagVariant}>{tag}</Chip>)}</span>
    </span>;
    return <div className="relative -mx-3 grid min-h-[112px] px-3 sm:grid-cols-12 sm:items-stretch sm:gap-x-6">
      <span aria-hidden="true" className="pointer-events-none col-span-full border-t border-ink"/>
      <Link href={href} className={`${hoverShell} col-span-full grid min-w-0 ${rowPaddingClass} transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:grid-cols-12 sm:gap-x-6`}>
        <StackedDate date={date} className={`${monoClassName} ${monoTextClassName} leading-[20px] tracking-[-0.01em] sm:col-span-2`}/>
        <span className="grid min-w-0 sm:col-span-10 sm:grid-cols-10 sm:gap-x-4">
          {isImageFirst?<>
            <span aria-hidden="true" className={`block aspect-square w-[73px] shrink-0 rounded sm:col-span-1 ${desktopImageSizeClass} ${showImage?"":"invisible"}`}><span style={showImage?imageStyle(imageSrc,imageTone):undefined} className="block h-full w-full rounded bg-cover bg-center"/></span>
            <span className="mt-4 min-w-0 sm:col-span-9 sm:mt-0">{textBlock}</span>
          </>:<>
            <span className="min-w-0 sm:col-span-7">{textBlock}</span>
            <span aria-hidden="true" className={`mt-4 block aspect-square w-[73px] rounded sm:col-span-2 sm:col-start-9 sm:mt-0 ${desktopImageSizeClass} sm:justify-self-end ${showImage?"":"invisible"}`}><span style={showImage?imageStyle(imageSrc,imageTone):undefined} className="block h-full w-full rounded bg-cover bg-center"/></span>
          </>}
        </span>
      </Link>
    </div>;
  }

  if(variant==="c") {
    return <Link href={href} className="grid border-t border-ink py-7 transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:grid-cols-12 sm:gap-x-6 sm:py-8 lg:py-8">
      {showImage&&<span aria-hidden="true" style={imageStyle(imageSrc,imageTone)} className="block aspect-square w-full rounded bg-cover bg-center sm:col-span-2"/>}
      <span className="mt-5 min-w-0 sm:col-span-7 sm:mt-0 lg:self-center">
        <StackedDate date={date} className="block text-[14px] font-normal leading-[20px] text-muted"/>
        <span className="mt-6 block text-[22px] font-normal leading-tight tracking-[-0.02em] lg:text-[22px]">{title}</span>
        <span className="mt-3 block max-w-[760px] text-[17px] font-normal leading-[1.34] tracking-[-0.01em]">{summary}</span>
        {tags.length>0&&<span className="mt-5 flex flex-wrap gap-2">{tags.map(tag=><Chip key={tag} variant={tagVariant}>{tag}</Chip>)}</span>}
      </span>
    </Link>;
  }

  return <Link href={href} className="grid border-t border-ink py-6 transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:grid-cols-12 sm:gap-x-6 sm:py-6">
    <StackedDate date={date} className="font-simon-mono text-[14px] leading-[20px] tracking-[-0.01em] sm:col-span-2"/>
    {showImage&&<span aria-hidden="true" style={imageStyle(imageSrc,imageTone)} className="mt-4 block aspect-square w-full rounded bg-cover bg-center sm:col-span-2 sm:mt-0 sm:w-auto"/>}
    <span className={`mt-4 min-w-0 sm:mt-0 ${showImage?"sm:col-span-7":"sm:col-span-9"}`}>
      <span className="block text-[18px] font-normal leading-tight tracking-[-0.02em] sm:text-[22px]">{title}</span>
      <span className="font-simon-mono mt-3 block max-w-[760px] text-[14px] font-normal leading-[20px] tracking-[-0.01em]">{summary}</span>
      {tags.length>0&&<span className="mt-5 flex flex-wrap gap-2">{tags.map(tag=><Chip key={tag} variant={tagVariant}>{tag}</Chip>)}</span>}
    </span>
  </Link>;
}
