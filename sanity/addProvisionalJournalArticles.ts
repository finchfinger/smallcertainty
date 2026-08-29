import { createClient } from "@sanity/client";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"8luodcfj";
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;

if(!token) throw new Error("Set SANITY_API_WRITE_TOKEN before adding provisional Journal articles.");

const client=createClient({projectId,dataset,token,apiVersion:"2025-01-01",useCdn:false});

const articles=[
  {
    title:"The Last Good Hardware Store",
    slug:"the-last-good-hardware-store",
    date:"2026-05-31",
    summary:"A provisional field note on the independent hardware shop as a working archive of parts, advice and objects that can still be repaired.",
    paragraphs:[
      "The good hardware store does not begin with display. It begins with memory: which hinge carries an old cabinet door, which screw will bite into crumbling plaster and which seal can be replaced without discarding the tap around it. Its stock appears miscellaneous only to the visitor. Behind the counter, each small drawer belongs to a practical map of how buildings fail and how they can be returned to use.",
      "This article will eventually visit one particular shop and learn its shelves properly. For now, the proposition is simple. A place that can identify a fifty-cent part may prevent the purchase of an entire new object. The environmental value of the shop lies less in what it sells than in the unnecessary replacement it quietly refuses, one measured washer and unglamorous repair at a time.",
    ],
  },
  {
    title:"A Better Umbrella",
    slug:"a-better-umbrella",
    date:"2026-05-29",
    summary:"A provisional inquiry into an ordinary object that should survive weather, crowded pavements and more than one season.",
    paragraphs:[
      "An umbrella is a modest structure asked to negotiate unreasonable conditions. It must open in a doorway, resist a gust, clear another person’s shoulder and disappear into a hall stand without leaving a performance behind. Most fail at the joints because they are engineered for the point of purchase rather than the tenth wet walk home. The better umbrella begins by treating wind as a normal event rather than an exception.",
      "We will replace this note with a proper comparison of ribs, cloth, handles and repair. The standard is already evident. A good umbrella should be narrow enough to carry, calm enough to use and durable enough to acquire familiarity. Its environmental argument is not a claim printed on a sleeve. It is the simple fact that, after years of rain, the owner still reaches for the same one.",
    ],
  },
  {
    title:"The Public Bench Test",
    slug:"the-public-bench-test",
    date:"2026-05-27",
    summary:"A provisional study of the benches that make a street hospitable by allowing people to stop without purchasing anything.",
    paragraphs:[
      "A public bench is a small declaration about who may remain in a place. Its dimensions decide whether a tired person can rest, two strangers can share space and an older neighbour can walk a little farther from home. The best examples are neither sculptural obstacles nor furniture stranded outdoors. They provide a back, shed rain, tolerate bags and leave enough room for an unplanned conversation.",
      "A later version of this article will measure specific benches and the streets around them. The useful test will not be novelty. It will be occupancy across a day: who sits, for how long, in sun or shade, alone or together. A bench succeeds when the city ceases to feel like a corridor and becomes, briefly, a room that belongs to everybody.",
    ],
  },
  {
    title:"Notes on a Proper Thermos",
    slug:"notes-on-a-proper-thermos",
    date:"2026-05-25",
    summary:"A provisional appreciation of the flask that pours cleanly, holds its temperature and asks for no replacement parts it cannot supply.",
    paragraphs:[
      "The proper vacuum flask performs one transformation and otherwise keeps quiet. Coffee poured before dawn should remain recognisably hot at noon; cold water should emerge without tasting of lid or lining. The cap must turn with gloved hands, the mouth admit a brush and the seal be ordinary enough to replace. These details are less photogenic than colour, but they determine whether the object joins a household or merely passes through it.",
      "We will test examples before naming a winner. The eventual choice should withstand dents without surrendering its vacuum and pour without sending a brown crescent down the outside. Longevity depends as much on the availability of a gasket as on the strength of the steel. The best thermos is therefore not sealed as a product. It remains open to maintenance and to another decade of mornings.",
    ],
  },
  {
    title:"The Quiet Repair Shop",
    slug:"the-quiet-repair-shop",
    date:"2026-05-23",
    summary:"A provisional visit to the small workshops where shoes, lamps and domestic machines are allowed a second working life.",
    paragraphs:[
      "Repair shops are among the few places where an object arrives with its history still attached. The worn heel reveals a gait, the frayed cable a favourite reading chair and the polished switch a habit repeated each evening. A competent repairer reads these marks without sentimentality. The task is to preserve what remains sound, replace only what has failed and return the object without disguising the fact that it has been used.",
      "This piece will eventually follow one repair from counter to collection. Its larger subject is the intelligence stored in such rooms: obsolete screws kept because they will be needed, manuals remembered, improvised tools and an instinct for whether a repair will hold. The quiet shop is not opposed to design. It is where design receives its longest and most honest review.",
    ],
  },
  {
    title:"One Useful Pocket",
    slug:"one-useful-pocket",
    date:"2026-05-21",
    summary:"A provisional design note on the pocket that holds the right things without turning a garment into equipment theatre.",
    paragraphs:[
      "A pocket should begin with the hand and the object, not with a line added to animate a drawing. Its opening must be found without looking, its depth must secure a key while sitting and its cloth must tolerate the repeated weight of a phone or notebook. Too many pockets make a garment anxious. One well-positioned pocket can make it indispensable.",
      "We will develop this article through examples from workwear, tailoring and outdoor clothing. The point will not be that utility requires a military arrangement of compartments. Good utility is selective. It anticipates the object most likely to be carried and gives that object a settled place, leaving the rest of the garment free to move, age and remain recognisably clothing.",
    ],
  },
  {
    title:"The Case for Wool Blankets",
    slug:"the-case-for-wool-blankets",
    date:"2026-05-19",
    summary:"A provisional account of a household textile that regulates warmth, survives hard use and improves with familiarity.",
    paragraphs:[
      "A wool blanket is useful before it is luxurious. It warms without sealing the sleeper away from the room, tolerates an open window and remains serviceable on a bed, sofa or cold train. The fibre can hold a surprising amount of moisture without feeling wet, yet the success of the blanket depends on less technical judgements too: the correct weight, an edge that does not unravel and a surface that softens rather than pills.",
      "A later draft will compare mills, breeds and weaves. The best candidate should not require delicate behaviour from an ordinary household. It should accept airing in place of constant washing, withstand an occasional repair and become easier to recognise after years of use. A good blanket is not seasonal decoration. It is a quiet piece of domestic infrastructure.",
    ],
  },
  {
    title:"A Pencil Worth Finishing",
    slug:"a-pencil-worth-finishing",
    date:"2026-05-17",
    summary:"A provisional examination of graphite, cedar, paint and the small satisfaction of using an object completely.",
    paragraphs:[
      "The pencil is nearly all consequence. A fraction of a millimetre in the graphite changes the line; dry cedar splinters under the sharpener; thick paint interrupts the grip and a poor bond sends the core sliding from its case. The object is inexpensive, but that should make precision more interesting rather than less. Millions are made, used briefly and lost. One worth finishing earns attention through consistency.",
      "We will sharpen and write with a proper group before choosing. Darkness alone will not decide it. The point should hold, erase reasonably and travel across cheap paper without becoming waxy or brittle. The final centimetres matter most. A pencil that remains pleasant when its lettering has disappeared and its balance has changed has passed from branded object to useful tool.",
    ],
  },
  {
    title:"The Small Hotel Breakfast",
    slug:"the-small-hotel-breakfast",
    date:"2026-05-15",
    summary:"A provisional travel note on the restrained breakfast that understands place, appetite and the day ahead.",
    paragraphs:[
      "The small hotel breakfast should not imitate abundance. It should establish the morning with a few things presented at their proper scale: good bread, butter that has not been chilled into masonry, coffee made for the number of people in the room and one local detail that belongs there without costume. A buffet becomes wasteful when choice replaces attention.",
      "This article will eventually report from a particular dining room. Its test will be proportion. Can one eat well without assembling a survey of international breakfast habits? Does the service allow an early departure and a slow second cup with equal grace? The best hotel breakfast sends the guest into the street alert, satisfied and curious about where they have awakened.",
    ],
  },
  {
    title:"The Door Handle Report",
    slug:"the-door-handle-report",
    date:"2026-05-13",
    summary:"A provisional report on the piece of architecture touched by everybody and properly noticed only when it fails.",
    paragraphs:[
      "A door handle introduces a building through the hand. Its temperature, resistance and return spring are understood before the room beyond it. The good handle communicates weight without requiring effort, clears the knuckles and tells the user whether to push or pull. The bad one may be expensive and still leave a daily record of uncertainty.",
      "We will replace this draft with examples drawn from houses, schools, stations and shops. The report will consider maintenance as closely as form because a loose spindle changes even an elegant handle into an annoyance. Hardware succeeds when its mechanism and gesture agree. One presses, the latch withdraws, and the architecture permits entry without asking to be admired.",
    ],
  },
  {
    title:"The Well Made Raincoat",
    slug:"the-well-made-raincoat",
    date:"2026-05-11",
    summary:"A provisional guide to the coat that handles sustained rain without turning the wearer into packaged cargo.",
    paragraphs:[
      "A raincoat negotiates between water outside and heat within. Absolute impermeability is easy if comfort is abandoned; breathability is easy until the weather becomes serious. The well-made version manages openings, seams, cuffs and movement as a single system. Its hood should turn with the head, its pockets remain accessible under rain and its hem keep weather away without interfering with the stride.",
      "The final article will test fabric, construction and repair rather than repeat laboratory numbers. A coat becomes convincing after several wet seasons, when its fasteners still align and worn areas can be restored without replacing the whole garment. The useful environmental claim is longevity under actual weather. A raincoat should make rain ordinary and ownership uneventful.",
    ],
  },
  {
    title:"A Shop That Knows Its Stock",
    slug:"a-shop-that-knows-its-stock",
    date:"2026-05-09",
    summary:"A provisional portrait of specialist retail built on selection, memory and the confidence to carry fewer things.",
    paragraphs:[
      "The specialist shop earns its space by knowing why each object is there. Stock is not an accumulation of available brands but a sequence of decisions, revised by returns, repairs and conversations at the counter. The proprietor remembers which kettle developed a fault, which shirt changed its cloth and which manufacturer still answers the telephone. This knowledge is a service that no infinite shelf can reproduce.",
      "A later version will examine one such shop in detail. The central virtue is refusal. A shop with a point of view must decline products that are fashionable, profitable or almost good enough. Fewer choices can then carry more information. The customer leaves not merely with an object but with a reason for preferring it and a place to return when use produces a better question.",
    ],
  },
  {
    title:"The Everyday Glass",
    slug:"the-everyday-glass",
    date:"2026-05-07",
    summary:"A provisional consideration of the drinking glass that serves water, wine and the ordinary table without fuss.",
    paragraphs:[
      "The everyday glass should make few demands on its contents. It must be thin enough at the rim to disappear during a drink, sturdy enough for an ordinary sink and broad enough to clean by hand. A slight taper improves grip and stacking; excessive weight mistakes durability for reassurance. The object should serve water at breakfast and wine at dinner without seeming incorrectly dressed for either.",
      "We will test actual glasses for the finished piece, including what happens after repeated washing and the inevitable knock against a tap. The best one will not be precious, but it should not feel disposable. Its achievement is continuity across occasions. Set on the table each day, it becomes part of the room’s rhythm rather than an accessory selected for the photograph.",
    ],
  },
];

function block(key:string,text:string){
  return {
    _key:key,
    _type:"block",
    style:"normal",
    markDefs:[],
    children:[{_key:`${key}-span`,_type:"span",text,marks:[]}],
  };
}

async function main(){
  let transaction=client.transaction();
  for(const article of articles){
    transaction=transaction.createOrReplace({
      _id:`article-provisional-${article.slug}`,
      _type:"article",
      title:article.title,
      slug:{_type:"slug",current:article.slug},
      dek:article.summary,
      publishedAt:article.date,
      author:"Small Certainty",
      content:article.paragraphs.map((paragraph,index)=>block(`${article.slug}-${index+1}`,paragraph)),
    });
  }
  const result=await transaction.commit();
  console.log(`Published ${result.results.length} provisional Journal articles to ${projectId}/${dataset}.`);
}

main().catch(error=>{
  console.error(error instanceof Error?error.message:error);
  process.exitCode=1;
});
