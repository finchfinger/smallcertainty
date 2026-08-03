type ResponsiveSectionLabelProps = {
  title:string;
  mobileUppercase?:boolean;
  stackMode?:"characters"|"word-columns";
};

export function ResponsiveSectionLabel({ title,mobileUppercase=false,stackMode="characters" }:ResponsiveSectionLabelProps) {
  const stackedTitle=title.split("").map((letter,index)=>(
    <span key={`${letter}-${index}`} className={letter===" "?"h-[26px]":"flex h-[26px] items-center justify-start leading-[20px]"}>
      {letter===" "?"":letter}
    </span>
  ));
  const stackedWords=title.split(/\s+/).map((word,wordIndex)=>(
    <span key={`${word}-${wordIndex}`} className="flex flex-col items-start">
      {word.split("").map((letter,letterIndex)=>(
        <span key={`${letter}-${letterIndex}`} className="flex h-[26px] items-center justify-start leading-[20px]">
          {letter}
        </span>
      ))}
    </span>
  ));

  return <>
    <span className={`min-[700px]:hidden xl:inline ${mobileUppercase?"uppercase xl:normal-case":""}`}>{title}</span>
    <span aria-hidden="true" className={`hidden min-[700px]:flex min-[700px]:items-start xl:hidden ${stackMode==="word-columns"?"min-[700px]:flex-row min-[700px]:gap-[1ch]":"min-[700px]:flex-col"}`}>
      {stackMode==="word-columns"?stackedWords:stackedTitle}
    </span>
  </>;
}
