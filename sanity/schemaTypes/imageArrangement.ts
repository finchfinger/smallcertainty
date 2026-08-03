import { defineField,defineType } from "sanity";

export const imageArrangement=defineType({
  name:"imageArrangement",
  title:"Image arrangement",
  type:"object",
  fields:[
    defineField({
      name:"layout",
      type:"string",
      initialValue:"full",
      options:{
        layout:"radio",
        list:[
          {title:"Split — portrait + landscape",value:"split"},
          {title:"Full width",value:"full"},
          {title:"Centered",value:"centered"},
        ],
      },
      validation:rule=>rule.required(),
    }),
    defineField({
      name:"primaryImage",
      title:"Image",
      type:"articleImage",
      validation:rule=>rule.required(),
    }),
    defineField({
      name:"secondaryImage",
      title:"Second image",
      type:"articleImage",
      description:"Shown to the right of the portrait image.",
      hidden:({parent})=>parent?.layout!=="split",
      validation:rule=>rule.custom((value,context)=>{
        const parent=context.parent as {layout?:string}|undefined;
        return parent?.layout==="split"&&!value?"A split arrangement needs two images.":true;
      }),
    }),
  ],
  preview:{
    select:{layout:"layout",media:"primaryImage.image"},
    prepare:({layout,media})=>({
      title:`Image arrangement — ${layout||"full"}`,
      media,
    }),
  },
});
