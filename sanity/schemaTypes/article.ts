import { defineField,defineType } from "sanity";
import { SeoSocialPreview } from "../components/SeoSocialPreview";

const noColons=(value:string|undefined)=>value?.includes(":")?"Journal titles do not use colons.":true;

export const article=defineType({
  name:"article",
  title:"Article",
  type:"document",
  fields:[
    defineField({
      name:"title",
      type:"string",
      validation:rule=>rule.required().custom(noColons),
    }),
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
      description:"Write the article as one continuous document. Insert image arrangements between paragraphs where needed.",
      of:[
        {
          type:"block",
          styles:[
            {title:"Normal",value:"normal"},
            {title:"Section heading",value:"h2"},
            {title:"Pull quote",value:"pullQuote"},
          ],
          lists:[],
          marks:{
            decorators:[],
            annotations:[
              {
                name:"link",
                title:"Link",
                type:"object",
                fields:[
                  defineField({
                    name:"href",
                    title:"URL",
                    type:"string",
                    validation:rule=>rule.required().custom(value=>{
                      if(!value||/^(https?:\/\/|mailto:|\/)/.test(value)) return true;
                      return "Enter a full web address, email link, or internal path.";
                    }),
                  }),
                ],
              },
            ],
          },
        },
        {type:"imageArrangement"},
      ],
      validation:rule=>rule.required().min(1),
    }),
    defineField({
      name:"furtherReading",
      title:"Further reading",
      type:"array",
      description:"Add multiple citations as separate paragraphs in this one text box. Select text and use Link when a source has a URL.",
      of:[{
        type:"block",
        styles:[{title:"Normal",value:"normal"}],
        lists:[],
        marks:{
          decorators:[],
          annotations:[{
            name:"link",
            title:"Link",
            type:"object",
            fields:[defineField({
              name:"href",
              title:"URL",
              type:"url",
              validation:rule=>rule.required().uri({scheme:["http","https"]}),
            })],
          }],
        },
      }],
    }),
    defineField({
      name:"seo",
      title:"SEO and social",
      type:"object",
      description:"Optional overrides. Leave these blank to use the article title, Summary and cover image automatically.",
      options:{collapsible:true,collapsed:true},
      fields:[
        defineField({
          name:"seoTitle",
          title:"SEO title",
          type:"string",
          description:"Browser and search-result title. Falls back to the article title.",
          validation:rule=>rule.max(60).warning("Search results may truncate titles longer than 60 characters.").custom(noColons),
        }),
        defineField({
          name:"metaDescription",
          title:"Meta description",
          type:"text",
          rows:3,
          description:"Search-result description. Falls back to Summary.",
          validation:rule=>rule.max(160).warning("Search results may truncate descriptions longer than 160 characters."),
        }),
        defineField({
          name:"ogTitle",
          title:"Open Graph title",
          type:"string",
          description:"Optional title for shared links. Falls back to SEO title, then article title.",
          validation:rule=>rule.max(90).warning("Long social titles may be truncated.").custom(noColons),
        }),
        defineField({
          name:"ogDescription",
          title:"Open Graph description",
          type:"text",
          rows:3,
          description:"Optional description for shared links. Falls back to meta description, then Summary.",
          validation:rule=>rule.max(200).warning("Long social descriptions may be truncated."),
        }),
        defineField({
          name:"ogImage",
          title:"Open Graph image",
          type:"articleImage",
          description:"Optional image for shared links. Falls back to the Journal cover image.",
        }),
        defineField({
          name:"socialPreview",
          title:"Social preview",
          type:"string",
          readOnly:true,
          components:{input:SeoSocialPreview},
        }),
      ],
    }),
  ],
  preview:{
    select:{title:"title",subtitle:"publishedAt"},
  },
});
