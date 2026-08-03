import { defineField,defineType } from "sanity";
export const catalogSection=defineType({ name:"catalogSection",title:"Catalog Section",type:"document",fields:[
  defineField({name:"title",type:"string",validation:r=>r.required()}), defineField({name:"slug",type:"slug",options:{source:"title"},validation:r=>r.required()}), defineField({name:"sortOrder",type:"number",validation:r=>r.required()}), defineField({name:"icon",type:"string",options:{list:["home","clothing","menswear","kitchen","children","pets","body","wellness","sport","travel","office","work","culture","miscellaneous"]}}), defineField({name:"published",type:"boolean",initialValue:true})
]});
