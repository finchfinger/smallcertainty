import {readFileSync,writeFileSync} from "node:fs";

const files=process.argv.slice(2);
if(files.length===0) throw new Error("Pass one or more catalog draft Markdown files.");

const patterns=[
  /^(?<subject>.+?) is the .+? Small Certainty (?:chooses|would choose) because (?<reason>.+?)\./,
  /^(?<subject>.+?) (?:is|are) the .+? we choose(?: for [^ ]+(?: [^ ]+){0,5})? because (?<reason>.+?)\./,
  /^(?<subject>.+?) is the one we choose because (?<reason>.+?)\./,
  /^(?<subject>.+?) is our choice because (?<reason>.+?)\./,
];

function possessive(subject){
  return /[sS]$/.test(subject)?`${subject}’`:`${subject}’s`;
}

function directOpening(subject,reason){
  if(/^it\s+/i.test(reason)) return `${subject} ${reason.replace(/^it\s+/i,"")}.`;
  if(/^they\s+/i.test(reason)) return `${subject} ${reason.replace(/^they\s+/i,"")}.`;
  if(/^its\s+/i.test(reason)) return `${possessive(subject)} ${reason.replace(/^its\s+/i,"")}.`;
  if(/^their\s+/i.test(reason)) return `${possessive(subject)} ${reason.replace(/^their\s+/i,"")}.`;
  return `${reason[0].toUpperCase()}${reason.slice(1)}.`;
}

let changed=0;
for(const file of files){
  const source=readFileSync(file,"utf8");
  const output=source.replace(/(?<=\*\*\n\n)([^\n]+\.)/g,opening=>{
    for(const pattern of patterns){
      const match=opening.match(pattern);
      if(!match?.groups) continue;
      changed+=1;
      return directOpening(match.groups.subject,match.groups.reason)+opening.slice(match[0].length);
    }
    return opening;
  });
  writeFileSync(file,output);
}

console.log(`Rewrote ${changed} catalog openings.`);
