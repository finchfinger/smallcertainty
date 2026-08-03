import type { StructureResolver } from "sanity/structure";

export const structure:StructureResolver=(S)=>S.list().title("Content").items([
  S.listItem()
    .title("Catalog by section")
    .schemaType("catalogSection")
    .child(
      S.documentTypeList("catalogSection")
        .title("Sections")
        .defaultOrdering([{field:"sortOrder",direction:"asc"}])
        .child(sectionId=>
          S.documentList()
            .title("Items")
            .schemaType("catalogItem")
            .filter('_type == "catalogItem" && section._ref == $sectionId')
            .params({sectionId})
            .defaultOrdering([{field:"sortOrder",direction:"asc"}])
            .initialValueTemplates([S.initialValueTemplateItem("catalog-item-by-section",{sectionId})])
        )
    ),
  S.divider(),
  S.documentTypeListItem("catalogSection").title("Manage sections"),
  S.documentTypeListItem("catalogItem").title("All catalog items"),
  S.documentTypeListItem("product").title("Product library"),
  S.divider(),
  S.documentTypeListItem("collaborator").title("Collaborators"),
  S.documentTypeListItem("article").title("Journal articles"),
]);
