import { defineArrayMember,defineField,defineType } from "sanity";

export const furtherReading=defineType({
  name:"furtherReading",
  title:"Further reading",
  type:"object",
  fields:[
    defineField({
      name:"entries",
      title:"Reading list",
      type:"array",
      of:[
        defineArrayMember({
          name:"furtherReadingEntry",
          title:"Reading",
          type:"object",
          fields:[
            defineField({
              name:"citation",
              title:"Citation or title",
              type:"text",
              rows:3,
              validation:rule=>rule.required(),
            }),
            defineField({
              name:"url",
              title:"Link",
              type:"url",
              description:"Optional link to the book, article, paper or source.",
              validation:rule=>rule.uri({scheme:["http","https"]}),
            }),
            defineField({
              name:"note",
              title:"Editorial note",
              type:"text",
              rows:3,
              description:"Optional explanation of why it is worth reading.",
            }),
          ],
          preview:{
            select:{title:"citation",subtitle:"note"},
          },
        }),
      ],
      validation:rule=>rule.required().min(1),
    }),
  ],
  preview:{
    select:{entries:"entries"},
    prepare:({entries})=>({
      title:"Further reading",
      subtitle:`${entries?.length||0} item${entries?.length===1?"":"s"}`,
    }),
  },
});
