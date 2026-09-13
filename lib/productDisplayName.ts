function normalizeName(value:string){
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
}

export function productDisplayName(productName:string,brand?:string){
  if(!brand) return productName;
  const normalizedProduct=normalizeName(productName);
  const normalizedBrand=normalizeName(brand);
  if(!normalizedBrand||normalizedProduct===normalizedBrand) return productName;

  const productWords=productName.trim().split(/\s+/);
  const brandWordCount=brand.trim().split(/\s+/).length;
  const leadingWords=productWords.slice(0,brandWordCount).join(" ");
  if(normalizeName(leadingWords)===normalizedBrand){
    const nameWithoutBrand=productWords.slice(brandWordCount).join(" ");
    if(nameWithoutBrand) return `${nameWithoutBrand} from ${brand}`;
  }

  const trailingWords=productWords.slice(-brandWordCount).join(" ");
  if(normalizeName(trailingWords)===normalizedBrand){
    const nameWithoutBrand=productWords.slice(0,-brandWordCount).join(" ");
    if(nameWithoutBrand) return `${nameWithoutBrand} from ${brand}`;
  }

  return `${productName} from ${brand}`;
}
