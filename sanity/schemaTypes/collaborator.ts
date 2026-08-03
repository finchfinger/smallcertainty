import { defineField,defineType } from "sanity";

export const collaborator=defineType({
  name:"collaborator",
  title:"Collaborator",
  type:"document",
  fields:[
    defineField({name:"role",title:"Role",type:"string",validation:rule=>rule.required()}),
    defineField({name:"name",title:"Name",type:"string",validation:rule=>rule.required()}),
    defineField({name:"url",title:"Profile or website",type:"url"}),
    defineField({name:"sortOrder",title:"Order",type:"number",validation:rule=>rule.required()}),
    defineField({name:"published",type:"boolean",initialValue:true}),
  ],
  preview:{select:{title:"name",subtitle:"role"}},
});
