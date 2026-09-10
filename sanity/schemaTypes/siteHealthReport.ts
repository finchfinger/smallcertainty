import {defineField,defineType} from "sanity";

export const siteHealthReport=defineType({
  name:"siteHealthReport",
  title:"Site health report",
  type:"document",
  fields:[
    defineField({name:"checkedAt",title:"Checked at",type:"datetime"}),
    defineField({name:"totalLinks",title:"Links checked",type:"number"}),
    defineField({name:"healthyLinks",title:"Healthy links",type:"number"}),
    defineField({name:"problemLinks",title:"Problem links",type:"number"}),
    defineField({name:"redirectedLinks",title:"Redirected links",type:"number"}),
    defineField({name:"restrictedLinks",title:"Unverified links",type:"number"}),
    defineField({name:"links",title:"Link results",type:"array",of:[{type:"object",fields:[
      {name:"label",type:"string"},
      {name:"sourceId",type:"string"},
      {name:"sourcePath",type:"string"},
      {name:"url",type:"url"},
      {name:"finalUrl",type:"url"},
      {name:"status",type:"string"},
      {name:"httpStatus",type:"number"},
      {name:"message",type:"string"},
    ]}]}),
    defineField({name:"contentIssues",title:"Content issues",type:"array",of:[{type:"object",fields:[
      {name:"label",type:"string"},
      {name:"sourceId",type:"string"},
      {name:"sourcePath",type:"string"},
      {name:"message",type:"string"},
    ]}]}),
    defineField({name:"analyticsStatus",title:"Analytics status",type:"string"}),
    defineField({name:"analyticsMessage",title:"Analytics message",type:"string"}),
    defineField({name:"pageviews7Days",title:"Pageviews · 7 days",type:"number"}),
    defineField({name:"visitors7Days",title:"Visitors · 7 days",type:"number"}),
    defineField({name:"pageviews30Days",title:"Pageviews · 30 days",type:"number"}),
    defineField({name:"visitors30Days",title:"Visitors · 30 days",type:"number"}),
    defineField({name:"topPages",title:"Top pages",type:"array",of:[{type:"object",fields:[
      {name:"path",type:"string"},
      {name:"pageviews",type:"number"},
      {name:"visitors",type:"number"},
    ]}]}),
  ],
});
