import { defineField,defineType } from "sanity";

export const catalogItem=defineType({
  name:"catalogItem",
  title:"Catalog Item",
  type:"document",
  groups:[
    {name:"row",title:"Catalog row",default:true},
    {name:"detail",title:"Recommendations"},
    {name:"editorial",title:"Editorial"},
  ],
  fields:[
    defineField({name:"label",type:"string",group:"row",validation:rule=>rule.required()}),
    defineField({name:"slug",type:"slug",group:"row",options:{source:"label"},description:"Reserved for a future internal detail-page URL."}),
    defineField({name:"productName",title:"Row product name (legacy)",type:"string",group:"row",validation:rule=>rule.required(),description:"Kept for the current outbound-row experience. The first ranked recommendation will eventually replace this."}),
    defineField({name:"outboundUrl",title:"Row product URL (legacy)",type:"url",group:"row",validation:rule=>rule.required()}),
    defineField({name:"section",type:"reference",group:"row",to:[{type:"catalogSection"}],validation:rule=>rule.required()}),
    defineField({name:"sortOrder",type:"number",group:"row",validation:rule=>rule.required()}),
    defineField({
      name:"rowStatus",
      title:"Status",
      type:"string",
      group:"row",
      initialValue:"none",
      options:{
        layout:"radio",
        list:[
          {title:"None",value:"none"},
          {title:"New",value:"new"},
          {title:"Updated",value:"updated"},
        ],
      },
    }),
    defineField({
      name:"statusUntil",
      title:"Show status until",
      type:"datetime",
      group:"row",
      description:"Optional. The status disappears automatically after this date and time. Leave blank to show it until manually cleared.",
      hidden:({parent})=>!parent?.rowStatus||parent.rowStatus==="none",
    }),
    defineField({
      name:"updated",
      title:"Updated (legacy)",
      type:"boolean",
      group:"row",
      hidden:true,
      description:"Legacy compatibility field. Use Status instead.",
    }),
    defineField({name:"published",type:"boolean",group:"row",initialValue:true}),
    defineField({
      name:"recommendations",
      title:"Ranked recommendations",
      type:"array",
      group:"detail",
      of:[{type:"recommendation"}],
      validation:rule=>rule.unique(),
    }),
    defineField({name:"intro",title:"Page introduction",type:"text",rows:5,group:"editorial"}),
    defineField({name:"internalNote",type:"text",rows:3,group:"editorial"}),
    defineField({name:"lastReviewed",type:"date",group:"editorial"}),
  ],
  preview:{select:{title:"label",subtitle:"productName"}},
});
