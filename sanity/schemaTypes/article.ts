import { defineField,defineType } from "sanity";

export const article=defineType({
  name:"article",
  title:"Article",
  type:"document",
  fields:[
    defineField({name:"title",type:"string",validation:rule=>rule.required()}),
    defineField({
      name:"slug",
      type:"slug",
      options:{source:"title",maxLength:96},
      validation:rule=>rule.required(),
    }),
    defineField({name:"dek",title:"Summary",type:"text",rows:4,validation:rule=>rule.required()}),
    defineField({name:"publishedAt",title:"Published date",type:"date",validation:rule=>rule.required()}),
    defineField({name:"author",type:"string",initialValue:"Small Certainty"}),
    defineField({
      name:"coverImage",
      title:"Journal cover image",
      type:"articleImage",
      description:"Used on Journal index cards. It is not inserted into the article body.",
    }),
    defineField({
      name:"content",
      title:"Article content",
      type:"array",
      description:"Add and reorder text sections and image arrangements.",
      of:[
        {type:"articleTextSection"},
        {type:"imageArrangement"},
      ],
      validation:rule=>rule.required().min(1),
    }),
  ],
  preview:{
    select:{title:"title",subtitle:"publishedAt"},
  },
});
