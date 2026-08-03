"use client";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion,dataset,projectId } from "./sanity/lib/client";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name:"default",
  title:"Small Certainty",
  basePath:"/studio",
  projectId:projectId||"demo-project",
  dataset,
  plugins:[structureTool({structure}),visionTool({defaultApiVersion:apiVersion})],
  schema:{
    types:schemaTypes,
    templates:previous=>[
      ...previous,
      {
        id:"catalog-item-by-section",
        title:"Catalog item for section",
        schemaType:"catalogItem",
        parameters:[{name:"sectionId",type:"string"}],
        value:({sectionId}:{sectionId:string})=>({
          section:{_type:"reference",_ref:sectionId},
          published:true,
          updated:false,
        }),
      },
    ],
  },
});
