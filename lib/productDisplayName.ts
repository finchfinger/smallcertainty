function normalizeName(value:string){
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
}

export function productDisplayName(productName:string,brand?:string){
  if(!brand) return productName;
  const normalizedProduct=normalizeName(productName);
  const normalizedBrand=normalizeName(brand);
  if(normalizedBrand&&(` ${normalizedProduct} `).includes(` ${normalizedBrand} `)) return productName;
  return `${productName} from ${brand}`;
}
