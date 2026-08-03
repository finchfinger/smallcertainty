import { defineField,defineType } from "sanity";

export const articleImage=defineType({
  name:"articleImage",
  title:"Article image",
  type:"object",
  fields:[
    defineField({
      name:"image",
      type:"image",
      options:{hotspot:true},
      validation:rule=>rule.required(),
    }),
    defineField({
      name:"alt",
      title:"Alt text",
      type:"string",
      description:"Describe the image for readers who cannot see it.",
      validation:rule=>rule.required(),
    }),
    defineField({name:"caption",type:"string"}),
    defineField({name:"credit",title:"Photographer or source",type:"string"}),
  ],
  preview:{
    select:{title:"caption",subtitle:"credit",media:"image"},
    prepare:({title,subtitle,media})=>({
      title:title||"Article image",
      subtitle,
      media,
    }),
  },
});
