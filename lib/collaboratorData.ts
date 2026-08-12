import type { CatalogItemData } from "@/components/types";
import { client,sanityConfigured } from "@/sanity/lib/client";

type SanityCollaborator={
  role:string;
  name:string;
  url?:string;
};

const fallbackCollaborators:SanityCollaborator[]=[
  {role:"Best Editor",name:"Eleanor Vale",url:"https://example.com/eleanor-vale"},
  {role:"Best Contributing Writer",name:"Miles Hart",url:"https://example.com/miles-hart"},
  {role:"Best Foreign Correspondent",name:"Anika Sato",url:"https://example.com/anika-sato"},
  {role:"Best Photographer",name:"Leo Mercer",url:"https://example.com/leo-mercer"},
  {role:"Best Researcher",name:"Clara Finch",url:"https://example.com/clara-finch"},
];

function formatCollaborators(collaborators:SanityCollaborator[]):CatalogItemData[] {
  return collaborators.map(collaborator=>({
    label:collaborator.role,
    productName:collaborator.name,
    href:"/profile",
    productHref:collaborator.url,
    wrapProductName:true,
  }));
}

export async function getCollaborators():Promise<CatalogItemData[]> {
  if(!sanityConfigured) return formatCollaborators(fallbackCollaborators);
  try{
    const collaborators=await client.fetch<SanityCollaborator[]>(
      `*[_type=="collaborator" && published==true] | order(sortOrder asc){role,name,url}`,
      {},
      {cache:"no-store",next:{revalidate:0}},
    );
    return formatCollaborators(collaborators.length?collaborators:fallbackCollaborators);
  }catch(error){
    console.warn("Sanity collaborator fetch failed.",error);
    return formatCollaborators(fallbackCollaborators);
  }
}
