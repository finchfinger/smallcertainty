import {createClient} from "@sanity/client";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
const token=process.env.SANITY_API_WRITE_TOKEN;
const apiVersion=process.env.NEXT_PUBLIC_SANITY_API_VERSION||"2025-01-01";
if(!projectId||!token) throw new Error("Sanity project ID and write token are required.");

const client=createClient({projectId,dataset,token,apiVersion,useCdn:false});
const slugify=(value:string)=>value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

type Pick={name:string;url:string;note:string};
type Row={label:string;winner:Pick;mentions:[Pick,Pick]};

const rows:Row[]=[
  {
    label:"Best Magazine",
    winner:{name:"BRUTUS",url:"https://magazineworld.jp/brutus/",note:`A copy of BRUTUS can make an entire subject feel newly available. Since 1980, the Japanese magazine has moved through food, cities, music, architecture, dogs, and domestic life with equal seriousness, treating each theme as a world to enter rather than a content category to service. Its curiosity is broad but never vague, and the physical magazine makes editorial judgment visible before a word is translated.

Published by Magazine House, BRUTUS builds thematic issues through commissioned photography, illustration, maps, interviews, lists, and dense typographic sequences. Covers change character according to the subject rather than obeying a rigid template, while the interiors sustain rhythm across short notices and long features. Japanese text may limit some readers, but captions, images, and information design communicate a remarkable amount through structure alone.

Issues can be difficult and expensive to find outside Japan, and their paper abundance is not easily reconciled with casual consumption. Buy subjects worth keeping, use specialist bookshops, and resist treating the archive as decorative wallpaper. Translation tools help with specific pages, though the magazine rewards slower visual reading. Its breadth means not every issue will matter equally, which is evidence of a publication taking real editorial risks.

Many magazines preserve a house style by repeating the same five subjects and voices. BRUTUS preserves an attitude instead: alert, informed, worldly, and willing to make an entire issue about one good question. It proves that service journalism can be beautiful without becoming empty luxury. Start with a subject already loved, keep the issues that alter how it is seen, and let the rest circulate.`},
    mentions:[
      {name:"Monocle",url:"https://monocle.com/",note:"Monocle joins international affairs, business, design, travel, and hospitality with a recognizable editorial rhythm and unusually durable print production."},
      {name:"Apartamento",url:"https://www.apartamentomagazine.com/",note:"Apartamento made lived-in homes more interesting than staged interiors, pairing intimate photography with interviews that allow taste, work, and domestic life to remain untidy."},
    ],
  },
  {
    label:"Best Newspaper",
    winner:{name:"Financial Times",url:"https://www.ft.com/",note:`The salmon paper is the least important reason to read the Financial Times. Its real distinction is the way it connects money, politics, business, culture, and power across borders, while understanding that companies matter beyond their products. The daily edition provides hierarchy to a noisy world, and the weekend paper makes room for books, travel, food, and private life without losing its intelligence.

Correspondents report from a genuinely global network, supported by specialist desks that understand markets, policy, industry, and institutions. The print paper uses compact typography, clear sectioning, restrained graphics, and data visualization that clarifies rather than decorates. Digital subscriptions add archives, alerts, newsletters, and the Lex column. Opinion is labeled, news remains reported, and corrections are treated as part of the publication rather than an embarrassment.

The subscription is expensive, the financial vocabulary assumes attention, and its institutional perspective should never be mistaken for complete neutrality. Read it alongside local reporting and publications from outside its commercial frame. The app can encourage endless checking, so a daily paper or scheduled briefing often provides the better boundary. Weekend supplements accumulate quickly; retain the pieces worth returning to and recycle the rest.

A newspaper cannot remove uncertainty, but it can make relationships legible and provide a common record against which claims are tested. The FT does this with rigor, economy, and a tone that rarely confuses volume with authority. It is especially useful for readers whose work is not finance, because capital quietly organizes so much else. Subscribe in the format actually read, and make regular attention more valuable than constant updates.`},
    mentions:[
      {name:"Neue Zürcher Zeitung",url:"https://www.nzz.ch/",note:"The Neue Zürcher Zeitung offers disciplined German-language reporting, international reach, and an editorial seriousness that rewards readers willing to give it time."},
      {name:"Le Monde",url:"https://www.lemonde.fr/",note:"Le Monde remains an essential French record, combining national authority with strong foreign reporting, cultural coverage, analysis, and a substantial documentary archive."},
    ],
  },
  {
    label:"Best Cookbook",
    winner:{name:"Essentials of Classic Italian Cooking, Marcella Hazan",url:"https://www.penguinrandomhouse.com/books/77501/essentials-of-classic-italian-cooking-by-marcella-hazan/",note:`Marcella Hazan teaches the cook to notice what the pan is doing. Essentials of Classic Italian Cooking supplies dinners, certainly, but its greater subject is judgment: why heat, fat, time, and sequence change an ingredient, and why regional distinctions matter. The recipes are direct, with no appetite for novelty plating or culinary autobiography. Hazan wants the reader to understand how a sauce becomes itself.

The volume combines Hazan’s two foundational books into a broad course covering pasta, risotto, soups, vegetables, fish, meat, breads, and desserts. Recipes such as tomato sauce with onion and butter demonstrate how few ingredients can produce depth when proportion and cooking are exact. Headnotes provide cultural and technical context, while the index and chapter structure make the heavy book function as a working reference.

The prose can be firm, ingredient assumptions sometimes reflect an earlier American market, and photographs are absent. Those qualities force attention onto method and result. Read a recipe completely, use the specified pan when its shape matters, and resist substitutions during the first attempt. The binding benefits from a stand and clean hands, though stains eventually become a more useful record than pristine pages.

Cookbooks often promise ease by concealing the decisions that make food good. Hazan respects the reader enough to name them, then repeats principles until instinct begins to form. The book can guide a first tomato sauce and still settle an argument after decades of cooking. Buy one durable copy, cook across chapters rather than collecting favorites, and allow technique to reduce the need for further Italian cookbooks.`},
    mentions:[
      {name:"Mastering the Art of French Cooking, Julia Child, Louisette Bertholle, and Simone Beck",url:"https://www.penguinrandomhouse.com/books/352690/mastering-the-art-of-french-cooking-volume-1-by-julia-child-louisette-bertholle-and-simone-beck/",note:"An exacting, generous translation of French technique for the American kitchen, with enough explanation to turn unfamiliar procedures into repeatable practice."},
      {name:"The River Cafe Cookbook, Rose Gray and Ruth Rogers",url:"https://www.penguin.co.uk/books/355168/the-river-cafe-cookbook-by-rose-gray-and-ruth-rogers/",note:"A confident account of ingredient-led Italian cooking whose direct recipes, strong typography, and vivid photography changed the look and appetite of British food publishing."},
    ],
  },
  {
    label:"Best Novel",
    winner:{name:"Moby-Dick, Herman Melville",url:"https://www.penguinrandomhouse.com/books/113152/moby-dick-by-herman-melville/",note:`No other whaling voyage carries quite so much of the world aboard. Moby-Dick is an adventure, a workplace novel, a comedy, a metaphysical argument, and a study of disastrous leadership, often within the same chapter. Herman Melville turns one ship into a complete society, then sends it after an idea that has acquired the dangerous weight of fact.

The structure is famously unruly. Narrative chapters give way to sermons, stage directions, measurements, classifications, histories, and close technical accounts of ships and whales. This is not digression laid around the story; it is the method by which the story becomes enormous. Ishmael’s restless intelligence supplies breadth, while Ahab’s narrowing obsession creates the pressure that draws every voice and piece of knowledge toward the same end.

The book asks for patience, especially when the plot seems to disappear into cetology or equipment. Read those chapters as changes in pace and scale rather than obstacles to be cleared. A well-printed edition helps, as does permission to move slowly. The language can be extravagant, the jokes can be strange, and the nineteenth-century account of whaling requires historical attention rather than easy nostalgia.

Many novels become smaller once their machinery is understood. Moby-Dick becomes larger. Its images and arguments return in politics, work, technology, ecology, friendship, and any institution following certainty toward ruin. It can be read young for the voyage and later for the organization of men aboard it. The novel endures because excess is not a flaw applied to its subject. Excess is the subject, mastered completely.`},
    mentions:[
      {name:"Family Lexicon, Natalia Ginzburg",url:"https://www.nyrb.com/products/a_family_lexicon",note:"Ginzburg reconstructs family life through repeated phrases, private jokes, political upheaval, and the peculiar vocabulary by which memory becomes communal property."},
      {name:"The Man with the Golden Arm, Nelson Algren",url:"https://sevenstories.com/books/3791-the-man-with-the-golden-arm",note:"Algren’s Chicago novel joins streetwise comedy, addiction, love, and institutional cruelty in prose that grants dignity without cleaning up the lives it observes."},
    ],
  },
  {
    label:"Best Nonfiction Book",
    winner:{name:"The Power Broker, Robert Caro",url:"https://www.penguinrandomhouse.com/books/24312/the-power-broker-pulitzer-prize-winner-by-robert-a-caro/",note:`Robert Caro makes power visible in concrete, contracts, parks, tolls, ruined neighborhoods, and hours lost on a bus. The Power Broker takes Robert Moses as its subject, but its larger achievement is an anatomy of how authority escapes public language and embeds itself in systems that appear merely administrative. Few books alter the way a city can be read so completely.

Caro follows Moses from idealistic reformer to unelected master builder, tracing the public authorities, bond agreements, patronage networks, and command of information that made his position durable. The reporting is exhaustive, yet the engineering and finance never float free of consequence. A bridge clearance, highway route, or swimming-pool location is shown as a decision about whose time, land, mobility, and political voice will count.

At more than a thousand pages, the book requires a table, a patient month, and tolerance for Caro’s emphatic repetition. Some judgments are forcefully signaled, and later scholarship has complicated parts of the portrait. None of that diminishes the reporting discipline. Read the notes, keep a map nearby, and notice how biography, municipal history, and institutional analysis reinforce one another rather than competing for space.

The book endures because it explains that power is not simply held by charismatic officeholders. It is accumulated through procedures, budgets, expertise, and structures designed to resist ordinary correction. New York is the case, not the limit. After Caro, roads, parks, housing, and authorities no longer look politically neutral. The reader can stop searching for a clearer account of how grand public works can express both formidable ability and profound contempt.`},
    mentions:[
      {name:"The Death and Life of Great American Cities, Jane Jacobs",url:"https://www.penguinrandomhouse.com/books/86058/the-death-and-life-of-great-american-cities-by-jane-jacobs/",note:"Jacobs begins with the evidence of sidewalks, blocks, shops, and neighbors, then builds a durable argument against planning that mistakes abstraction for urban knowledge."},
      {name:"The Making of the Atomic Bomb, Richard Rhodes",url:"https://www.simonandschuster.com/books/The-Making-of-the-Atomic-Bomb/Richard-Rhodes/9781451677614",note:"Rhodes combines scientific explanation, political history, biography, and moral consequence in a comprehensive account that never treats technical achievement as an excuse to narrow judgment."},
    ],
  },
  {
    label:"Best Film",
    winner:{name:"Tokyo Story, Yasujirō Ozu",url:"https://www.criterion.com/films/284-tokyo-story",note:`An older couple takes the train from Onomichi to visit their grown children in Tokyo, and Yasujirō Ozu finds a whole moral world in the arrangements that follow. Almost nothing conventionally dramatic happens in Tokyo Story, yet every meal, delay, polite sentence, and borrowed room becomes an exact measure of time, obligation, and the quiet injuries produced by decent people.

Ozu places the camera low and usually still, cutting between carefully ordered interiors, streets, railway lines, and transitional views that allow the world to continue beyond the family. Performances remain restrained, particularly Chieko Higashiyama, Chishū Ryū, and Setsuko Hara. The compositions are rigorous without feeling embalmed. Repetition supplies rhythm, while small changes in posture and tone carry emotional information another film might force into speeches.

The pace is deliberate, and viewers trained to wait for conflict may initially mistake its calm for simplicity. Give the film an uninterrupted evening, use a good restoration, and resist reducing it to a lesson about ungrateful children. Every generation is constrained by work, distance, custom, and its own imperfect understanding. The film’s compassion matters because it never cancels the disappointment visible in the same scene.

Tokyo Story endures because it recognizes family life as a structure built from practical acts and missed opportunities. Its sadness arrives without manipulation, and its beauty never asks to be admired separately from experience. Later films have borrowed Ozu’s low camera, pauses, and domestic geometry, but technique alone cannot reproduce his moral balance. This is the rare masterpiece that becomes more generous, not less exacting, with repeated viewing.`},
    mentions:[
      {name:"The Third Man, Carol Reed",url:"https://www.criterion.com/films/236-the-third-man",note:"Carol Reed turns postwar Vienna into a tilted moral landscape, with Graham Greene’s plot, Robert Krasker’s shadows, Anton Karas’s zither, and Orson Welles’s entrance working in perfect accord."},
      {name:"Playtime, Jacques Tati",url:"https://www.criterion.com/films/651-playtime",note:"Tati makes modern Paris a vast comic system in which glass, furniture, traffic, sound, and human improvisation compete across every corner of the frame."},
    ],
  },
  {
    label:"Best Album",
    winner:{name:"Trans-Europe Express, Kraftwerk",url:"https://www.youtube.com/playlist?list=OLAK5uy_nB2fBOEglyYoq8lcZQpeK3QYFd-EEa9Vo",note:`The rhythm of a train becomes a model for modern life on Trans-Europe Express. Released in 1977, Kraftwerk’s album makes movement sound elegant, mechanical, and faintly melancholy, imagining Europe through tailored presentation, multilingual identity, and machines that extend rather than erase human intention. Its future is neither utopian nor menacing. It is a civilized network of cities, compartments, signals, memory, and disciplined forward motion.

The record’s economy is exact. Sequenced electronics, clipped percussion, vocoder, synthesizer, and spare vocals establish motifs that accumulate force through repetition. Europe Endless opens the landscape, The Hall of Mirrors examines image and self-consciousness, and the title sequence converts a train’s motion into an extended pulse. Franz Schubert provides a brief romantic afterimage before Endless Endless dissolves language into rhythm and voice.

Its surfaces can sound cool, particularly through small speakers or inattentive shuffle play. Listen from beginning to end, preferably at a volume that gives the bass sequence physical presence without flattening its detail. The English and German versions shade the record differently, and both are worth knowing. Its brevity is an advantage. Nothing is added to prove abundance, and every recurring phrase gains meaning from placement.

Electronic music did not begin here, but much that followed learned from the album’s control, conceptual unity, and willingness to make technology culturally specific. It influenced dance music, hip-hop, synth-pop, and graphic identity without becoming reducible to any of them. The clothing, cover, typography, and sound describe one complete proposition. Trans-Europe Express remains the clearest proof that an album can be both a transport system and a destination.`},
    mentions:[
      {name:"Avalon, Roxy Music",url:"https://www.roxymusic.co.uk/collections/avalon",note:"Roxy Music’s final studio album turns meticulous production, soft-focus rhythm, and Bryan Ferry’s controlled romanticism into a nocturnal world that remains richer than its polish suggests."},
      {name:"Remain in Light, Talking Heads",url:"https://store.talkingheadsofficial.com/collections/remain-in-light",note:"Talking Heads and Brian Eno build songs from interlocking rhythm, loops, studio assembly, and anxious language, creating a record whose complexity feels bodily before it feels intellectual."},
    ],
  },
  {
    label:"Best Song",
    winner:{name:"The River, Bruce Springsteen",url:"https://brucespringsteen.net/track/the-river/",note:`A marriage, a recession, a pregnancy, a job, and the erosion of possibility fit inside five restrained minutes of The River. Bruce Springsteen begins with recollection and ends with a question the narrator cannot answer. The details are plain enough to feel overheard, but their arrangement gives one working life the scale of an American argument.

The recording resists the triumphal force associated with Springsteen’s band. Harmonica opens an empty space, acoustic guitar maintains the pulse, and the arrangement enters without rescuing the story. The melody rises around the river itself, turning a real place of courtship and escape into memory, evidence, and accusation. Springsteen sings directly, allowing the breaks and hard consonants in the language to provide drama.

Its familiarity can disguise how carefully the song withholds judgment. The narrator neither romanticizes poverty nor explains every choice, and Mary is never converted into a symbol detached from her life. Listen beyond the famous chorus and notice the movement between what happened, what was promised, and what can no longer be recovered. Live versions expand the setting, but the studio recording’s economy remains definitive.

Many narrative songs depend on a twist or a line designed to announce importance. The River works through accumulation. A union card, a courthouse, construction work, unemployment, and a dry reservoir become the material of intimacy. The song endures because private disappointment and public conditions cannot be separated within it. There are louder Springsteen records and easier ones to sing together, but none makes ordinary consequence feel more exact.`},
    mentions:[
      {name:"Waterloo Sunset, The Kinks",url:"https://www.youtube.com/watch?v=N_MqfF0WBsU",note:"Ray Davies watches London from a distance and finds privacy, movement, and tenderness within a city song whose melodic ease conceals remarkably precise observation."},
      {name:"Wichita Lineman, Glen Campbell",url:"https://www.glencampbell.com/video/glen-campbell-wichita-lineman/",note:"Jimmy Webb’s lyric, Glen Campbell’s voice, and an open arrangement turn technical work on a vast landscape into one of popular music’s most convincing expressions of distance and longing."},
    ],
  },
  {
    label:"Best Podcast",
    winner:{name:"99% Invisible",url:"https://99percentinvisible.org/",note:`Bollards, typefaces, building codes, and pieces of infrastructure rarely volunteer their stories. 99% Invisible makes the designed world audible without pretending that every overlooked object is secretly glamorous. Roman Mars and the production team begin with a specific thing or system, then follow it into history, policy, behavior, and unintended consequence. Curiosity supplies momentum, while editing prevents enthusiasm from becoming clutter.

Episodes use reported interviews, archival tape, field recordings, narration, and carefully placed music to explain subjects that often have no obvious sound. The program is particularly good at scale, moving from a handle or sign to the institution that determined its form. Its long archive covers architecture, cities, technology, clothing, disability, standards, memorials, and maintenance without forcing those subjects into one decorative idea of design.

Not every topic requires the same attention, and the expanded episode lengths of podcasting can occasionally soften the early program’s concision. Choose by subject, skip advertisements when necessary, and use the website for images and links that audio cannot carry. The tone is accessible, but the best episodes retain enough uncertainty to show where a neat design story has been complicated by politics, money, or use.

The show endures because it treats design as a public condition rather than a shopping category. It asks who made a system, what assumptions it contains, who can use it, and what happens when it fails. That framework has influenced an entire generation of explanatory audio, yet 99% Invisible remains unusually clear and humane. Begin anywhere in the archive and leave with one ordinary part of the world made newly legible.`},
    mentions:[
      {name:"In Our Time",url:"https://www.bbc.co.uk/programmes/b006qykl",note:"Melvyn Bragg and three scholars make demanding history, science, philosophy, religion, and literature available through serious conversation, disciplined preparation, and a formidable archive."},
      {name:"The Rest Is History",url:"https://therestishistory.com/",note:"Tom Holland and Dominic Sandbrook combine range, narrative confidence, disagreement, and humor in a history program that remains companionable without surrendering intellectual appetite."},
    ],
  },
  {
    label:"Best Television Series",
    winner:{name:"Tinker Tailor Soldier Spy",url:"https://genome.ch.bbc.co.uk/search/0/20?adv=1&media=tv&order=asc&q=%40title+%22Tinker%2C+Tailor%2C+Soldier%2C+Spy%22",note:`Espionage in Tinker Tailor Soldier Spy resides in rooms, faces, paperwork, and silence. The BBC adaptation of John le Carré’s novel follows George Smiley as he searches for a Soviet mole inside British intelligence, trusting the viewer to watch closely. Instead of making secrecy glamorous, it shows an institution shaped by class, memory, professional vanity, and exhausted loyalty.

Alec Guinness gives Smiley extraordinary presence through restraint. A change of glasses, a pause before answering, or the careful arrangement of a chair can redirect a scene. The production builds suspense from interviews, files, corridors, safe houses, and recollections whose details do not immediately align. Arthur Hopcraft’s script clarifies a complicated structure without flattening it, while the patient direction gives every supporting performance room to register.

The opening episodes demand attention. Names, codenames, past operations, and institutional relationships arrive before their significance is explained, and the period video image lacks contemporary gloss. Watch without a second screen, allow the chronology to assemble gradually, and resist consulting a plot summary too early. The slowness is functional. It makes the viewer practice the same observation, doubt, and reconstruction required of Smiley.

Prestige television often signals seriousness through expense, violence, and visible scale. Tinker Tailor achieves it through writing, casting, and control. Its offices feel more dangerous than most action sequences because the betrayals are intellectual and intimate before they become operational. The series remains the best screen account of le Carré’s world and a model of adaptation that understands what television does well. Six episodes are enough; nothing needs inflating.`},
    mentions:[
      {name:"The Singing Detective",url:"https://www.bfi.org.uk/sight-and-sound/video/singing-detective-25-years",note:"Dennis Potter combines illness, memory, pulp fiction, performance, and popular song in television whose formal invention never loses sight of physical pain and moral responsibility."},
      {name:"Fawlty Towers",url:"https://genome.ch.bbc.co.uk/search/0/25?filt=p01ks534",note:"Twelve episodes turn status anxiety, bad service, precise entrances, and escalating concealment into comic engineering of an order rarely sustained for even half an hour."},
    ],
  },
  {
    label:"Best Radio Station",
    winner:{name:"FIP",url:"https://www.radiofrance.fr/fip",note:`Leave FIP playing for an afternoon and the room gradually acquires a better sense of rhythm. Founded in Paris in 1971 and now part of Radio France, the station moves through jazz, chanson, soul, electronic music, classical work, film scores, rock, and music from across the world with remarkable composure. The sequence feels surprising, but never assembled to advertise surprise itself.

Its intelligence lies in programming and transition. Tracks are allowed to finish, voices intervene sparingly, and news appears within a structure that protects the station’s musical continuity. Human selectors create associations that an optimization system would struggle to justify and would probably flatten through repetition. Digital genre streams offer useful alternatives, but the main live channel provides the stronger proposition: one editorial flow whose identity emerges over time.

Listeners looking for constant identification, extended discussion, or control over the next song may find FIP elusive. Keep the website or app nearby for track information, then let the station work without continual inspection. Its range does not mean every selection will please, which is precisely why it remains useful. The occasional unfamiliar or inconvenient track gives the sequence credibility and expands rather than merely confirms taste.

Streaming services promise infinite choice and often return a polished version of what the listener already knows. FIP restores the pleasure of selection made elsewhere, by people with judgment and no need to explain every connection. It works at breakfast, through an afternoon of work, or late at night without becoming functional wallpaper. Turn it on before deciding what mood is required, and allow the station to make the room larger.`},
    mentions:[
      {name:"NTS Radio",url:"https://www.nts.live/",note:"NTS gives specialist hosts real latitude across two live channels and a deep archive, preserving scenes, eccentric expertise, and musical discovery without sanding away difference."},
      {name:"BBC Radio 3",url:"https://www.bbc.co.uk/sounds/play/live:bbc_radio_three",note:"BBC Radio 3 combines classical performance, new music, jazz, drama, criticism, and informed presentation with the resources and continuity of a serious public broadcaster."},
    ],
  },
];

function wordCount(value:string){return value.trim().split(/\s+/).length;}

async function main(){
  for(const row of rows){
    const count=wordCount(row.winner.note);
    if(count<225||count>275) throw new Error(`${row.label} has ${count} words; expected 225 to 275.`);
  }

  const sectionId="catalogSection-culture";
  const labels=rows.map(row=>row.label);
  const additionalRows=await client.fetch<{_id:string}[]>(
    `*[_type=="catalogItem"&&section._ref==$sectionId&&!(label in $labels)]|order(sortOrder asc){_id}`,
    {sectionId,labels},
  );
  let tx=client.transaction().createIfNotExists({_id:sectionId,_type:"catalogSection",title:"Culture",slug:{_type:"slug",current:"culture"},icon:"culture",sortOrder:16,published:true});
  rows.forEach((row,index)=>{
    const itemSlug=slugify(row.label);
    tx=tx.delete(`catalog-item-culture-${itemSlug}`);
    const picks=[row.winner,...row.mentions];
    const recommendations=picks.map((pick,pickIndex)=>{
      const productId=`product-culture-${itemSlug}-${pickIndex+1}`;
      tx=tx.createOrReplace({_id:productId,_type:"product",name:pick.name,slug:{_type:"slug",current:slugify(pick.name)},description:pick.note,outboundUrl:pick.url,published:true});
      return {_key:`culture-${itemSlug}-${pickIndex+1}`,_type:"recommendation",rank:pickIndex+1,badge:pickIndex===0?"Best overall":pickIndex===1?"Runner up":"Also good",product:{_type:"reference",_ref:productId},outboundUrlOverride:pick.url,editorialNote:pick.note,published:true};
    });
    tx=tx.createOrReplace({_id:`catalogItem-culture-${itemSlug}`,_type:"catalogItem",label:row.label,slug:{_type:"slug",current:itemSlug},productName:row.winner.name,outboundUrl:row.winner.url,section:{_type:"reference",_ref:sectionId},sortOrder:index+1,rowStatus:"updated",published:true,recommendations,intro:row.winner.note,lastReviewed:new Date().toISOString().slice(0,10)});
  });
  additionalRows.forEach((row,index)=>{tx=tx.patch(row._id,patch=>patch.set({sortOrder:rows.length+index+1}));});
  await tx.commit();
  const verified=await client.fetch(`*[_type=="catalogItem"&&section._ref==$sectionId&&label in $labels]|order(sortOrder asc){label,"winner":recommendations[0].product->name,"count":count(recommendations),sortOrder}`,{sectionId,labels});
  console.log(JSON.stringify(verified,null,2));
}

main().catch(error=>{console.error(error);process.exitCode=1;});
