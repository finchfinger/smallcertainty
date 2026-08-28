import { createClient } from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"8luodcfj";
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;

if(!token) throw new Error("Set SANITY_API_WRITE_TOKEN before updating the Patagonia article.");

const client=createClient({projectId,dataset,token,apiVersion:"2025-01-01",useCdn:false});
const documentId="article-the-patagonia-test";

type Segment={text:string;href?:string};
type PortableBlock={
  _key:string;
  _type:"block";
  style:"normal"|"h2";
  children:Array<{_key:string;_type:"span";text:string;marks:string[]}>;
  markDefs:Array<{_key:string;_type:"link";href:string}>;
};

function block(key:string,style:"normal"|"h2",segments:string|Segment[]):PortableBlock {
  const parts=typeof segments==="string"?[{text:segments}]:segments;
  const markDefs:PortableBlock["markDefs"]=[];
  const children=parts.map((part,index)=>{
    const markKey=part.href?`${key}-link-${index}`:undefined;
    if(markKey&&part.href) markDefs.push({_key:markKey,_type:"link",href:part.href});
    return {_key:`${key}-span-${index}`,_type:"span" as const,text:part.text,marks:markKey?[markKey]:[]};
  });
  return {_key:key,_type:"block",style,children,markDefs};
}

const textBlocks:PortableBlock[]=[
  block("patagonia-history-intro-1","normal",[
    {text:"Before Patagonia became a case study in responsible business, Yvon Chouinard was a blacksmith trying to make a better piton. The distinction matters. The company did not begin with a theory of branding, nor with the discovery that virtue could be advertised. It began with an object whose failure might kill a friend, made by a climber who disliked the available version enough to teach himself how to forge another. "},
    {text:"“I never wanted to be a businessman. I started as a craftsman,”",href:"https://www.patagonia.com/ownership/"},
    {text:" he wrote decades later. The sentence is modest, but it contains the operating system of the company that followed."},
  ]),
  block("patagonia-history-intro-2","normal","For Chouinard, environmental responsibility began with product quality. The best thing was never simply the most expensive, the newest or the most technically crowded. It was the thing most completely fitted to its use: strong enough to trust, simple enough to understand, repairable when possible and made with the least damaging material that could still do the job. A product that failed early wasted everything taken from the earth to make, package and transport it. Each enlargement of Patagonia made this standard harder to maintain, and each newly visible harm forced the company to enlarge its definition of quality."),

  block("patagonia-history-blacksmith-heading","h2","THE BLACKSMITH"),
  block("patagonia-history-blacksmith-1","normal","Chouinard began forging climbing hardware in the late 1950s, working with chrome-molybdenum steel rather than the softer European pitons then commonly available in America. He made them for himself, then for friends, then sold them from the back of his car in Yosemite. Production was small and physical: heat the steel, strike it into shape, inspect the result. The work encouraged an intolerance of decorative improvement. A piton was better because it entered the crack properly, survived repeated use and came back out without deforming, not because the catalogue had found a more persuasive adjective for it."),
  block("patagonia-history-blacksmith-2","normal",[
    {text:"Chouinard Equipment grew from this severe little standard. In the company’s later account, climbing hardware required a "},
    {text:"“life-or-death standard of product quality,”",href:"https://www.patagonia.com/stories/planet/our-footprint/what-we-do-for-a-living-an-excerpt-from-the-responsible-company/story-18397.html"},
    {text:" with every ice axe examined for faults before it left the shop. That discipline outlived the forge. Patagonia’s designers would later apply industrial questions to fleece jackets, shorts and even swimwear: what must this object do, which failure matters, and what can be removed without making it worse? The method explains why the company’s best products often feel resolved rather than styled."},
  ]),

  block("patagonia-history-clean-heading","h2","THE PRODUCT HE STOPPED SELLING"),
  block("patagonia-history-clean-1","normal","The first important test of Chouinard’s pursuit of quality came when his best product proved too effective. Hardened-steel pitons could be driven and removed repeatedly, but their growing use scarred the most popular climbs. By 1970, Chouinard Equipment was the leading American climbing-hardware maker and pitons were its principal seller. Chouinard and his partner Tom Frost could see the damage accumulating in Yosemite. The correct commercial decision was obvious: sell more of the thing the company made exceptionally well. The correct product decision was the opposite."),
  block("patagonia-history-clean-2","normal",[
    {text:"The 1972 Chouinard Equipment catalogue urged climbers to replace pitons with removable aluminium chocks and devoted fourteen pages to the technique and ethics of clean climbing. The new equipment demanded more judgement from the climber and left less evidence on the rock. Its quiet hope was printed in the catalogue: "},
    {text:"“Hopefully, these piton scars need not grow.”",href:"https://www.patagonia.com/clean-climbing/"},
    {text:" The episode became Patagonia’s founding parable because it joined design, use and consequence. When the best-made object damages the world in which it operates, making it better is no longer enough. One must be prepared to make something else."},
  ]),

  block("patagonia-history-clothes-heading","h2","CLOTHES FOR THE WORK"),
  block("patagonia-history-clothes-1","normal","Clothing entered almost sideways. Chouinard brought back a sturdy rugby shirt whose collar protected a climber’s neck from hardware slings; friends wanted one, and an apparel business began to support the less profitable equipment workshop. Patagonia was established in 1973 as the clothing side of the enterprise, its name chosen because it suggested a distant and severe landscape rather than a single sport. The early garments were not conceived as lifestyle costumes. They were working answers borrowed, adapted and tested by the people who needed them."),
  block("patagonia-history-clothes-2","normal","This produced a useful sort of eccentricity. Shorts were made stiff enough to tolerate granite. Thick pile, developed for fishermen and industrial use, became insulation for damp mountain conditions. Colour entered outdoor clothing at a moment when much of it still resembled military surplus. Chouinard’s contribution was less the invention of every material than the insistence that a found material be taken into the field and judged there. A good idea had to survive weather, abrasion, sweat and the unflattering duration of ownership. A garment that remained useful for years was not only a better possession; it postponed the extraction, energy and waste required to replace it."),

  block("patagonia-history-quality-heading","h2","QUALITY IS THE ENVIRONMENTAL POLICY"),
  block("patagonia-history-quality-1","normal",[
    {text:"As Patagonia grew, durability became its most practical environmental policy. A jacket kept in service for fifteen years asks less of the world than three jackets discarded in five, even if none of them can be made without cost. The company began treating quality as something that could be scored rather than praised. Its criteria included function, durability, repairability, simplicity and environmental harm; weak products could be delayed or dropped. The questions remained recognisably those of the forge: "},
    {text:"“Is it useful, aesthetically pleasing, long-lasting?”",href:"https://www.patagonia.com/stories/planet/our-footprint/quality-is-an-environmental-issue/story-93237.html"},
    {text:" The vocabulary had expanded, but the product still had to justify its existence."},
  ]),
  block("patagonia-history-quality-2","normal","This is the most convincing part of Patagonia’s environmental position because it does not pretend that a perfect material or an innocent supply chain exists. It asks whether the object earns the resources already spent on it and whether the maker remains responsible after the sale. Field testing, the Ironclad Guarantee, repair technicians and Worn Wear extend design beyond launch day. A torn sleeve is information about construction, an invitation to repair and, if the company is paying attention, a correction for the next pattern. Making a good thing and making a thing that is good for the earth become the same assignment: use less, waste less and keep the product working."),

  block("patagonia-history-cotton-heading","h2","THE COTTON ULTIMATUM"),
  block("patagonia-history-cotton-1","normal",[
    {text:"Clothing also forced Patagonia to confront harms that could not be found by wearing a prototype. After employees at its Boston shop became ill from fumes released by garments, the company investigated the fibres in its line and examined conventional cotton agriculture. In 1994 Chouinard ordered the entire sportswear range—166 products—to move to organic cotton within eighteen months. If the conversion failed, "},
    {text:"the company would stop selling sportswear",href:"https://www.patagonia.com/stories/planet/our-footprint/how-we-got-here-organic-cotton/story-97024.html"},
    {text:", then roughly thirty per cent of its business. The instruction was unreasonable in precisely the way a real standard sometimes must be."},
  ]),
  block("patagonia-history-cotton-2","normal","Patagonia had to build relationships among farmers, spinners, mills and factories where an adequate supply chain scarcely existed. The sportswear line contracted from 166 products to 66, margins tightened and sales took two years to recover. The result was not the purification of cotton; agriculture and manufacturing remained complicated. Its importance was institutional. Patagonia learned that discovering a material’s damage creates an obligation to redesign the system around it, even when customers have not asked, competitors are not following and the first consequence of doing better is to sell less."),

  block("patagonia-history-business-heading","h2","A BETTER MATERIAL MUST STILL MAKE A BETTER PRODUCT"),
  block("patagonia-history-business-1","normal","Patagonia’s material experiments were governed by a stubborn qualification: a lower-impact fibre still had to make equipment worth owning. Recycled polyester reduced dependence on virgin petroleum, but it also had to wick moisture, retain warmth and survive abrasion. Organic cotton avoided the pesticides of conventional agriculture, but the finished cloth still had to wash well and endure repeated use. Environmental intent could sharpen the choice of fibre, construction and finish; it could not excuse a poor zip, a confused pocket or a fabric that wore out before its time."),
  block("patagonia-history-business-2","normal","This protected the products from becoming mere carriers of a cause. A Patagonia jacket had to be a very good jacket before its environmental story mattered. Chouinard’s achievement was to make product quality and responsibility progressively more difficult to separate. Longevity reduced replacement. Simplicity improved repair. Field performance discouraged useless features and excess material. The company’s activism gained credibility from objects that people trusted, maintained and were reluctant to throw away. The label’s promise was strongest when it could be felt in an old garment rather than read on a new hangtag."),

  block("patagonia-history-ownership-heading","h2","THE LAST PRODUCT WAS THE COMPANY"),
  block("patagonia-history-ownership-1","normal","By 2022 the unresolved object was Patagonia itself. A sale could expose the company’s product standards to an owner more interested in volume, margin and fashion cycles; a public offering could reward short-term growth at the expense of durability, repair and difficult material choices. Chouinard, his wife Malinda and their children transferred the voting stock to the Patagonia Purpose Trust and the nonvoting stock to the Holdfast Collective. Patagonia remained a profit-making manufacturer, but its control was placed with a trust charged with protecting its purpose, while money left after reinvestment would support environmental work."),
  block("patagonia-history-ownership-2","normal",[
    {text:"Chouinard described the arrangement with characteristic impatience: "},
    {text:"“Instead of ‘going public,’ you could say we’re ‘going purpose.’”",href:"https://www.patagonia.com/ownership/"},
    {text:" It was not a donation that allowed the machinery to disappear. The company still had to design, source, sell and repair products well enough to remain useful. The ownership structure simply made the business itself answer the question Chouinard had asked of pitons and parkas: what is this thing for, how long should it last, and what damage follows from the way it is made? After half a century, the best thing he could make was a company designed to resist becoming somebody else’s extraction."},
  ]),

  block("patagonia-history-conclusion-heading","h2","BETTER, THEN BETTER AGAIN"),
  block("patagonia-history-conclusion-1","normal","Patagonia’s history is often told as the story of an ethical company. It is more useful as the story of a demanding maker who came to understand the earth as part of every product specification. The piton that once improved safety later damaged the rock. The natural fibre later revealed an industrial agriculture. The durable jacket still carried the costs of manufacture. At each stage, quality became a larger and less comfortable idea. The object had to perform for its owner, but also had to account for the field it came from, the factory that assembled it, the energy used to move it and the years before it became waste."),
  block("patagonia-history-conclusion-2","normal","That approach offers no final certification and Patagonia should not be granted one. Making any new product consumes material and energy, and the company remains inside the contradictions of production and growth. Its example lies in treating those contradictions as design requirements. Chouinard kept trying to make the best thing possible, then allowed the meaning of best to be corrected by the earth around it. A good product should work beautifully, last a long time and leave less behind. The ambition was not perfection. It was to make quality carry the full weight of consequence."),
];

async function main(){
  const published=await client.getDocument<{content?:Array<{_type:string;[key:string]:unknown}>}>(documentId);
  if(!published) throw new Error(`Could not find ${documentId}.`);
  const imageArrangement=published.content?.find(item=>item._type==="imageArrangement");
  const content=imageArrangement
    ?[...textBlocks.slice(0,2),imageArrangement,...textBlocks.slice(2)]
    :textBlocks;
  const patch={
    title:"The Best Thing He Could Make",
    dek:"Yvon Chouinard built Patagonia around a demanding proposition: the best product should work beautifully, last for years and take less from the earth. Its history is the record of how that definition of quality kept expanding.",
    content,
  };
  let transaction=client.transaction().patch(documentId,operation=>operation.set(patch));
  const draftId=`drafts.${documentId}`;
  const draft=await client.getDocument(draftId);
  if(draft) transaction=transaction.patch(draftId,operation=>operation.set(patch));
  const result=await transaction.commit();
  console.log(`Updated ${result.results.map(item=>item.id).join(", ")} in ${projectId}/${dataset}.`);
}

main().catch(error=>{
  console.error(error);
  process.exitCode=1;
});
