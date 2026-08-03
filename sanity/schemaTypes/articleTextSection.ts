import { defineField,defineType } from "sanity";

export const articleTextSection=defineType({
  name:"articleTextSection",
  title:"Text section",
  type:"object",
  fields:[
    defineField({name:"heading",type:"string"}),
    defineField({
      name:"body",
      title:"Paragraphs",
      type:"array",
      of:[{type:"text",rows:6}],
      validation:rule=>rule.required().min(1),
    }),
  ],
  preview:{
    select:{title:"heading",body:"body"},
    prepare:({title,body})=>({
      title:title||"Text section",
      subtitle:Array.isArray(body)&&body[0]?body[0].slice(0,80):undefined,
    }),
  },
});
