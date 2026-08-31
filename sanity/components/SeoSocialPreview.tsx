"use client";

import imageUrlBuilder from "@sanity/image-url";
import { useFormValue,type StringInputProps } from "sanity";
import { client } from "../lib/client";

const imageBuilder=imageUrlBuilder(client);

type ImageValue={image?:Parameters<typeof imageBuilder.image>[0]};

function textValue(value:unknown) {
  return typeof value==="string"?value.trim():"";
}

export function SeoSocialPreview(_props:StringInputProps) {
  const title=textValue(useFormValue(["title"]));
  const summary=textValue(useFormValue(["dek"]));
  const seoTitle=textValue(useFormValue(["seo","seoTitle"]));
  const metaDescription=textValue(useFormValue(["seo","metaDescription"]));
  const ogTitle=textValue(useFormValue(["seo","ogTitle"]));
  const ogDescription=textValue(useFormValue(["seo","ogDescription"]));
  const ogImage=useFormValue(["seo","ogImage"]) as ImageValue|undefined;
  const coverImage=useFormValue(["coverImage"]) as ImageValue|undefined;
  const image=ogImage?.image||coverImage?.image;
  const imageUrl=image?imageBuilder.image(image).width(1200).height(630).fit("crop").url():undefined;
  const previewTitle=ogTitle||seoTitle||title||"Article title";
  const previewDescription=ogDescription||metaDescription||summary||"Article summary";

  return <div style={{border:"1px solid var(--card-border-color)",borderRadius:6,overflow:"hidden",background:"var(--card-bg-color)"}}>
    {imageUrl
      ? <img src={imageUrl} alt="" style={{display:"block",width:"100%",aspectRatio:"1.91 / 1",objectFit:"cover"}}/>
      : <div style={{display:"grid",placeItems:"center",width:"100%",aspectRatio:"1.91 / 1",background:"var(--card-muted-bg-color)",color:"var(--card-muted-fg-color)"}}>Cover image preview</div>}
    <div style={{padding:16}}>
      <div style={{fontSize:12,color:"var(--card-muted-fg-color)",marginBottom:6}}>smallcertainty.com</div>
      <div style={{fontSize:17,fontWeight:600,lineHeight:1.3,marginBottom:6}}>{previewTitle}</div>
      <div style={{fontSize:14,lineHeight:1.4,color:"var(--card-muted-fg-color)"}}>{previewDescription}</div>
    </div>
  </div>;
}
