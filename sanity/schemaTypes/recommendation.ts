import { defineField,defineType } from "sanity";

export const recommendation=defineType({
  name:"recommendation",
  title:"Recommendation",
  type:"object",
  fields:[
    defineField({name:"rank",type:"number",validation:rule=>rule.required().integer().min(1)}),
    defineField({name:"product",type:"reference",to:[{type:"product"}],validation:rule=>rule.required()}),
    defineField({name:"badge",type:"string",description:"Optional label such as Best overall or Best value."}),
    defineField({name:"editorialNote",type:"text",rows:5}),
    defineField({name:"outboundUrlOverride",title:"Product URL override",type:"url"}),
    defineField({name:"published",type:"boolean",initialValue:true}),
  ],
  preview:{
    select:{title:"product.name",rank:"rank",subtitle:"badge",media:"product.image"},
    prepare:({title,rank,subtitle,media})=>({title:`${rank||"–"}. ${title||"Choose a product"}`,subtitle,media}),
  },
});
