import type { CatalogItemData } from "@/components/types";
import { client,sanityConfigured } from "@/sanity/lib/client";

type SanityCollaborator={
  role:string;
  name:string;
  url?:string;
};

export async function getCollaborators():Promise<CatalogItemData[]> {
  if(!sanityConfigured) return [];
  try{
    const collaborators=await client.fetch<SanityCollaborator[]>(
      `*[_type=="collaborator" && published==true] | order(sortOrder asc){role,name,url}`,
      {},
      {cache:"no-store",next:{revalidate:0}},
    );
    return collaborators.map(collaborator=>({
      label:collaborator.role,
      productName:collaborator.name,
      href:"/profile",
      productHref:collaborator.url,
      wrapProductName:true,
    }));
  }catch(error){
    console.warn("Sanity collaborator fetch failed.",error);
    return [];
  }
}
