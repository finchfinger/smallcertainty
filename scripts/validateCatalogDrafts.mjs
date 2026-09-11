import {readFileSync} from "node:fs";

const files=process.argv.slice(2);
if(files.length===0){
  console.error("Pass one or more catalog draft Markdown files.");
  process.exit(1);
}

const failures=[];
let itemCount=0;

for(const file of files){
  const source=readFileSync(file,"utf8");
  const entries=[...source.matchAll(/^### (.+?)\n\n\*\*(.+?)\*\*\n\n([\s\S]*?)(?=\n\[Visit site\]\((https?:\/\/[^)]+)\))/gm)];

  for(const [,label,productName,body,url] of entries){
    itemCount+=1;
    const paragraphs=body.trim().split(/\n\n+/);
    const words=body.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g)?.length||0;
    const prefix=`${file}: ${label} / ${productName}`;

    if(paragraphs.length!==4) failures.push(`${prefix} has ${paragraphs.length} paragraphs; expected 4.`);
    if(words<225||words>275) failures.push(`${prefix} has ${words} words; expected 225-275.`);
    if(body.includes("—")) failures.push(`${prefix} contains an em dash.`);
    if(!URL.canParse(url)) failures.push(`${prefix} has an invalid winner URL.`);
  }
}

console.log(`Checked ${itemCount} catalog winner drafts.`);
if(failures.length){
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("All drafts satisfy paragraph, word-count, punctuation, and URL-format rules.");
