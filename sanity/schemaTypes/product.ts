import { defineField,defineType } from "sanity";

export const product=defineType({
  name:"product",
  title:"Product",
  type:"document",
  fields:[
    defineField({name:"name",title:"Product name",type:"string",validation:rule=>rule.required()}),
    defineField({name:"slug",type:"slug",options:{source:"name"}}),
    defineField({name:"brand",type:"string"}),
    defineField({name:"description",type:"text",rows:5}),
    defineField({name:"image",type:"image",options:{hotspot:true}}),
    defineField({name:"outboundUrl",title:"Primary product URL",type:"url"}),
    defineField({
      name:"retailerLinks",
      type:"array",
      of:[{type:"object",fields:[
        defineField({name:"label",type:"string",validation:rule=>rule.required()}),
        defineField({name:"url",type:"url",validation:rule=>rule.required()}),
      ]}],
    }),
    defineField({name:"published",type:"boolean",initialValue:true}),
    defineField({name:"internalNote",type:"text",rows:3}),
  ],
  preview:{select:{title:"name",subtitle:"brand",media:"image"}},
});
