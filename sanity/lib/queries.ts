import { groq } from "next-sanity";

export const catalogQuery=groq`*[_type == "catalogSection" && published == true] | order(sortOrder asc) {
  title,
  icon,
  "slug": slug.current,
  "items": *[_type == "catalogItem" && published == true && references(^._id)] | order(sortOrder asc) {
    label,
    "productName": coalesce(recommendations[published != false][0].product->name, productName),
    "brand": recommendations[published != false][0].product->brand,
    "href": select(
      directLink == true => coalesce(recommendations[published != false][0].outboundUrlOverride, recommendations[published != false][0].product->outboundUrl, outboundUrl),
      "/catalog/" + ^.slug.current + "/" + slug.current
    ),
    "productHref": coalesce(recommendations[published != false][0].outboundUrlOverride, recommendations[published != false][0].product->outboundUrl, outboundUrl),
    "status": select(
      rowStatus in ["new", "updated"] && (!defined(statusUntil) || dateTime(statusUntil) > dateTime(now())) => rowStatus,
      null
    ),
    "external": directLink == true
  }
}`;

export const catalogItemDetailQuery=groq`*[_type == "catalogItem" && published == true && slug.current == $slug && section->slug.current == $section][0] {
  label,
  intro,
  "sectionTitle": section->title,
  "href": "/catalog/" + section->slug.current + "/" + slug.current,
  "productName": coalesce(recommendations[published != false][0].product->name, productName),
  "productHref": coalesce(recommendations[published != false][0].outboundUrlOverride, recommendations[published != false][0].product->outboundUrl, outboundUrl),
  "external": directLink == true,
  "recommendations": recommendations[published != false] | order(rank asc) {
    rank,
    badge,
    "productName": product->name,
    "brand": product->brand,
    "productHref": coalesce(outboundUrlOverride, product->outboundUrl),
    "note": coalesce(editorialNote, product->description)
  }
}`;
