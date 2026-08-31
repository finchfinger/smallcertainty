export type JournalImage = {
  url:string;
  alt:string;
  caption?:string;
  credit?:string;
};

export type JournalTextParagraph =
  | string
  | {
      spans:Array<{text:string;href?:string}>;
    };

export type JournalContentBlock =
  | {
      _key:string;
      _type:"articleTextSection";
      heading?:string;
      body:JournalTextParagraph[];
    }
  | {
      _key:string;
      _type:"imageArrangement";
      layout:"split"|"full"|"centered";
      primaryImage:JournalImage;
      secondaryImage?:JournalImage;
    };

export type JournalArticle = {
  slug:string;
  title:string;
  dek:string;
  date:string;
  tags?:string[];
  imageTone?:string;
  imageSrc?:string;
  sections:Array<{heading?:string;body:string[]}>;
  author?:string;
  content?:JournalContentBlock[];
  seo?:{
    seoTitle?:string;
    metaDescription?:string;
    ogTitle?:string;
    ogDescription?:string;
    ogImage?:JournalImage;
  };
};

const johnMorganSections:Array<{heading?:string;body:string[]}>= [
  {body:[
    "John Morgan died on 2 September 2025, aged 52, in his library in Oxfordshire. His work ranged widely, but was united by the same precision and judgement. It includes the Church of England’s Common Worship, books made with artists, identities for architects and galleries, the lettering of HMS Victory, the graphics of the 2012 Venice Architecture Biennale, the art direction of AA Files and ArtReview, and a generation of students taught to regard typography as both exacting craft and cultural argument.",
    "An Eye profile published in 2012 caught the practice at a revealing point. Morgan was already known as a careful, even-tempered typographer, yet the work could also be theatrical, disruptive and very large. He refused the choice between those positions. Typographic detail and the grand gesture belonged to the same task: establishing an atmosphere appropriate to the material. The years that followed confirmed the strength of that idea, extending it across ships, museums, magazines, typefaces and books of his own."
  ]},
  {heading:"The useful severity of Reading",body:[
    "Morgan was born in Galgate, Lancashire, in 1973. His father was a biochemist with an interest in stationery, and the family home encouraged open criticism. At the University of Reading, where Morgan enrolled in 1992, typography was taught through history, theory and the practical consequences of every decision. Michael Twyman, James Mosley and Paul Stiff made the subject intellectually serious; Stiff’s severe criticism made it difficult for a neat arrangement to pass as a considered one.",
    "After graduating in 1995, Morgan joined Derek Birdsall’s Omnific studio. Birdsall supplied a second education, built around authors, printers, deadlines and the physical intelligence of a page. Morgan later described the ideal succinctly: settle the details, then introduce one beautiful thing that makes the object particular. When he established John Morgan studio in 2000, he carried forward both halves of his training—the historical scrutiny of Reading and the direct, editorial judgement of the atelier."
  ]},
  {heading:"A prayer book for use",body:[
    "Common Worship was the first project to make the scale of Morgan’s ability widely visible. Begun with Birdsall and taken into Morgan’s new studio with his mentor’s blessing, the commission replaced the density associated with a traditional prayer book with generous space, warm ivory paper and a clear hierarchy in Gill Sans. Its beauty came from practical questions: the paper had to be durable but light, the text readable in poor church lighting, and prayers kept on a single page so that a congregation would not rustle through a recitation.",
    "The bishops were exacting clients, and Morgan treated their requirements as material rather than interference. That response became characteristic. A constraint was not something to disguise after the design had been imagined; it was where the design began. Common Worship would be handled weekly by more than a million people, so its authority could not depend on an arresting cover or a designer’s signature. It had to emerge through repeated use, in the weight of the volume, the sequence of a service and the ease with which a reader found the next line."
  ]},
  {heading:"Good design is a branch of editing",body:[
    "Books remained central to Morgan because they joined language, sequence, material and time. For Four Corners Books he designed the Familiars series, allowing each artist’s response to a classic text to alter the form of the volume. For the Architectural Association he recast AA Files as a quieter and more literary journal, using Fred Smeijers’ Arnhem Blond for extended reading while permitting display typography to change from issue to issue. The system held, but it never became a cage.",
    "Morgan’s observation that good design is a branch of editing explains the apparent ease of these publications. Editing is not merely subtraction. It is the establishment of relationships: deciding when a caption should interrupt an image, how a typeface changes the temperature of an argument, and which historical reference can remain alive rather than becoming pastiche. His 2012 account of the studio repeatedly returned to content and relevance. A publication deserved design only when there was something worth reading, and the design had to belong to its own moment."
  ]},
  {heading:"From the page into the building",body:[
    "Morgan aimed for atmosphere—the sensation of entering a building and feeling that the conditions have changed. He believed a book could produce the same effect. This made the movement from page to architecture less abrupt than it might appear. Identities for David Chipperfield Architects, 6a architects and Raven Row, lettering for Tate Britain, and graphics for exhibitions turned typography into something encountered at walking speed and across distance, without severing it from the habits of close reading.",
    "The 2012 Venice Architecture Biennale demonstrated the method at civic scale. Morgan’s studio drew on Venice’s stencilled street signs, making a letterform native to the city carry the exhibition through rooms, publications and public space. The result won the Design Museum’s graphic design award in 2013. Morgan called his relationship with architects critical compliance: support the larger project, understand its discipline, but retain enough independence to question it. Chipperfield’s description was plainer. When everyone shouts, whisper; Morgan was a very good whisperer."
  ]},
  {heading:"History as working material",body:[
    "Morgan’s historical knowledge did not make him nostalgic. For the 2015 repainting of HMS Victory, he and Adrien Vasquez replaced an anachronistic stern treatment with lettering informed by contemporary naval paintings. Two years later they founded the digital type foundry Abyme. The projects belong together: both treat historical forms as evidence to be examined, reconstructed and made useful in the present, rather than as a decorative style waiting to be borrowed.",
    "That attitude also animated his teaching. Morgan taught book design at Reading and, from 2016, served as professor of Design, Typography and Book Art at the Kunstakademie Düsseldorf. He wanted students to combine the typographer’s command of negligible details with the artist’s ability to see the whole situation. The standard was exact without being obedient. A designer should know why a convention exists, what it permits, and when the project has earned the right to depart from it."
  ]},
  {heading:"The books at the end",body:[
    "In 2021 Morgan published Usylessly, an examination of the first 1922 edition of James Joyce’s Ulysses as a physical object rather than a literary text alone. In 2025 he established Ten Thousand Angels Press and completed a second edition shortly before his death. He also finished Baskerville’s Teardrop Explodes: A Selection of Books as Muses, a final account of books as objects that carry accidents, histories, marginalia and private attachments alongside their printed words.",
    "Morgan’s death makes the restraint of his work feel more, not less, consequential. The pages and signs were never quiet because he lacked appetite for a gesture. They were quiet because he knew precisely where a gesture would matter. His legacy is present in celebrated commissions, but also in a more durable standard of attention: read before arranging, understand the object before styling it, respect the people who will use it, and leave enough life in the system for one unexpected thing to occur."
  ]}
];

export const journalArticles:JournalArticle[]=[
  {
    slug:"the-patagonia-test",
    title:"The Patagonia Test",
    dek:"Patagonia has spent decades making an unusually detailed case for responsible business. The useful question is not whether the company is good, but whether its factories, repair rooms and ownership structure make its promises inspectable.",
    date:"2026-08-12",
    tags:["Business","Clothing","Responsibility"],
    imageSrc:"/journal/features/patagonia-repair-center.webp",
    author:"Small Certainty",
    sections:[
      {body:[
        "An ethical claim is most persuasive when it becomes inconvenient. It should complicate sourcing, slow a launch, reveal an unfinished wage programme and require a company to repair the coat it would be easier to replace. Patagonia has been making this argument longer and more publicly than most clothing businesses. Its example is useful not because it offers innocence — no company that manufactures new things can do that — but because it turns several of its contradictions into work that can be examined.",
        "The company still sells technical clothing made in factories it does not own, using materials, freight and energy with real environmental and human costs. It also publishes factory information, supports Fair Trade premiums, operates a large repair programme, resells used garments and has placed its voting control and future profits into an unusual ownership structure. These actions do not cancel one another into virtue. Taken together, they form a better test: can a business expose enough of its machinery for customers, workers and critics to see where responsibility ends and the next obligation begins?"
      ]},
      {heading:"The factory question",body:[
        "Patagonia does not own the factories that make its products. Like much of the apparel industry, it works through a global supply chain, which means that its standards depend on relationships with suppliers and on the quality of inspection, remediation and worker participation inside buildings controlled by other companies. Patagonia says that more than 90 per cent of its products are made in Fair Trade Certified factories and that more than 90,000 workers benefit from the programme. The premium paid on each certified item goes into a fund directed by workers rather than becoming another line in a brand campaign.",
        "Fair Trade certification is meaningful, but it is not the same as a living wage, collective bargaining or ownership of the conditions in which every garment is made. Patagonia’s own social-responsibility material treats wages as continuing work rather than a completed achievement. That distinction matters. The strongest part of the company’s position is not the percentage printed at the top of the page; it is the willingness to describe a supply chain as a set of specific factories, standards and unresolved gaps. Responsibility begins to be credible when its boundaries are named rather than concealed behind a general promise of care."
      ]},
      {heading:"Repair before replacement",body:[
        "At Patagonia’s repair centre in Reno, Nevada, a worn jacket does not return as a generic unit. A failed zip, torn baffle or delaminating seam arrives with a particular history and requires a particular decision. Technicians train for months, progress from simple repairs to specialised work and reuse matching trims and fabric where they can. Worn Wear, launched in 2012, extends that practice through trade-ins, used sales and repair guidance. The programme makes durability operational: a garment’s long life is supported by people, parts, logistics and a place to send it when ordinary use finally leaves a mark.",
        "Repair is not an escape from production. A company can mend thousands of jackets while continuing to introduce and sell new ones, and the environmental cost of the original garment remains. Yet repair changes the commercial relationship in a way that a recycled hangtag cannot. It asks the manufacturer to remain responsible after the transaction and gives the customer a reason not to replace an object merely because it no longer looks untouched. The patched sleeve becomes evidence of service rather than a failure of presentation, and the most persuasive product photograph may be the one taken after ten winters."
      ]},
      {heading:"Ownership after the founder",body:[
        "In 2022, Yvon Chouinard and his family transferred the company into two entities. The Patagonia Purpose Trust holds the voting stock and protects the company’s stated mission; the Holdfast Collective, a nonprofit organisation, holds the nonvoting stock and receives the money that remains after the business has been reinvested in. The arrangement was designed to keep Patagonia private, resist a conventional sale and direct future value towards environmental work without turning the company into a public corporation obliged to maximise quarterly returns.",
        "The transfer was also a sophisticated estate and tax structure, and critics were right to examine it as such. A durable institution should survive that examination. The relevant merit is not that an ownership document transforms commerce into philanthropy, but that it establishes enforceable control beyond the preferences of one charismatic founder. Patagonia must still make good products, pay people fairly and earn profits from consumption. The structure simply narrows what those profits can ultimately be for. It is a constraint, not absolution, which is precisely why it is more interesting than a pledge."
      ]},
      {heading:"A report should contain bad news",body:[
        "Corporate responsibility reports are often designed as rooms without shadows. The photographs are warm, the verbs continuous and every difficulty appears one initiative away from resolution. A useful report should do something less flattering. It should reveal which materials remain dependent on fossil fuel, which suppliers fall short, how many workers receive a living wage and what happens when an audit finds a problem. Patagonia’s modern-slavery statements, factory disclosures and footprint material are valuable to the extent that they allow those questions to become more precise.",
        "Disclosure does not guarantee improvement, and the company still controls the categories and timing of what it publishes. Independent accreditation, reporting by workers and outside scrutiny remain necessary. But an incomplete public record is preferable to a perfect private claim because it gives criticism somewhere to land. A customer should be able to move from the jacket to the factory, from the factory to the standard and from the standard to the shortfall. The ethical business is not the one that has stopped producing problems; it is the one that makes evasion progressively more difficult."
      ]},
      {heading:"Better is a direction",body:[
        "Patagonia’s most defensible practices share a quality: they are difficult to compress into a label. Repair requires skilled technicians and an inventory of old components. Fair Trade requires worker committees and premiums. Supplier oversight requires repeated visits, documentation and correction. Mission ownership requires lawyers, governance and a willingness to surrender the ordinary rewards of a sale. None of this is as tidy as declaring a fabric sustainable or printing the planet on a shop window, but it creates systems that can continue after attention moves elsewhere.",
        "The Patagonia test should therefore be applied beyond Patagonia. Does a company disclose where the work happens? Can its product be repaired, and has it built the capacity to do so? Do workers have a material role in the benefits attached to their labour? What prevents the next owner from discarding every promise? The answers will rarely be complete. That is not a reason to abandon the questions. It is a reason to prefer companies that leave enough evidence for the questions to become sharper with time."
      ]}
    ],
    content:[
      {_key:"patagonia-opening",_type:"articleTextSection",body:[
        "An ethical claim is most persuasive when it becomes inconvenient. It should complicate sourcing, slow a launch, reveal an unfinished wage programme and require a company to repair the coat it would be easier to replace. Patagonia has been making this argument longer and more publicly than most clothing businesses. Its example is useful not because it offers innocence — no company that manufactures new things can do that — but because it turns several of its contradictions into work that can be examined.",
        "The company still sells technical clothing made in factories it does not own, using materials, freight and energy with real environmental and human costs. It also publishes factory information, supports Fair Trade premiums, operates a large repair programme, resells used garments and has placed its voting control and future profits into an unusual ownership structure. These actions do not cancel one another into virtue. Taken together, they form a better test: can a business expose enough of its machinery for customers, workers and critics to see where responsibility ends and the next obligation begins?"
      ]},
      {_key:"patagonia-repair-images",_type:"imageArrangement",layout:"split",primaryImage:{url:"/journal/features/patagonia-repair-center.webp",alt:"Susan Baker repairing a worn Patagonia jacket at the Reno repair centre",caption:"Susan Baker repairs a jacket at Patagonia’s Reno repair centre",credit:"Ken Etzel / Patagonia"},secondaryImage:{url:"/journal/features/patagonia-susan-baker-repair.webp",alt:"Susan Baker mending a well-used garment at an industrial sewing machine",caption:"A garment returned to service rather than replaced",credit:"Ken Etzel / Patagonia"}},
      {_key:"patagonia-factories",_type:"articleTextSection",heading:"The factory question",body:[
        "Patagonia does not own the factories that make its products. Like much of the apparel industry, it works through a global supply chain, which means that its standards depend on relationships with suppliers and on the quality of inspection, remediation and worker participation inside buildings controlled by other companies. Patagonia says that more than 90 per cent of its products are made in Fair Trade Certified factories and that more than 90,000 workers benefit from the programme. The premium paid on each certified item goes into a fund directed by workers rather than becoming another line in a brand campaign.",
        "Fair Trade certification is meaningful, but it is not the same as a living wage, collective bargaining or ownership of the conditions in which every garment is made. Patagonia’s own social-responsibility material treats wages as continuing work rather than a completed achievement. That distinction matters. The strongest part of the company’s position is not the percentage printed at the top of the page; it is the willingness to describe a supply chain as a set of specific factories, standards and unresolved gaps. Responsibility begins to be credible when its boundaries are named rather than concealed behind a general promise of care."
      ]},
      {_key:"patagonia-repair",_type:"articleTextSection",heading:"Repair before replacement",body:[
        "At Patagonia’s repair centre in Reno, Nevada, a worn jacket does not return as a generic unit. A failed zip, torn baffle or delaminating seam arrives with a particular history and requires a particular decision. Technicians train for months, progress from simple repairs to specialised work and reuse matching trims and fabric where they can. Worn Wear, launched in 2012, extends that practice through trade-ins, used sales and repair guidance. The programme makes durability operational: a garment’s long life is supported by people, parts, logistics and a place to send it when ordinary use finally leaves a mark.",
        "Repair is not an escape from production. A company can mend thousands of jackets while continuing to introduce and sell new ones, and the environmental cost of the original garment remains. Yet repair changes the commercial relationship in a way that a recycled hangtag cannot. It asks the manufacturer to remain responsible after the transaction and gives the customer a reason not to replace an object merely because it no longer looks untouched. The patched sleeve becomes evidence of service rather than a failure of presentation, and the most persuasive product photograph may be the one taken after ten winters."
      ]},
      {_key:"patagonia-ownership",_type:"articleTextSection",heading:"Ownership after the founder",body:[
        "In 2022, Yvon Chouinard and his family transferred the company into two entities. The Patagonia Purpose Trust holds the voting stock and protects the company’s stated mission; the Holdfast Collective, a nonprofit organisation, holds the nonvoting stock and receives the money that remains after the business has been reinvested in. The arrangement was designed to keep Patagonia private, resist a conventional sale and direct future value towards environmental work without turning the company into a public corporation obliged to maximise quarterly returns.",
        "The transfer was also a sophisticated estate and tax structure, and critics were right to examine it as such. A durable institution should survive that examination. The relevant merit is not that an ownership document transforms commerce into philanthropy, but that it establishes enforceable control beyond the preferences of one charismatic founder. Patagonia must still make good products, pay people fairly and earn profits from consumption. The structure simply narrows what those profits can ultimately be for. It is a constraint, not absolution, which is precisely why it is more interesting than a pledge."
      ]},
      {_key:"patagonia-reporting",_type:"articleTextSection",heading:"A report should contain bad news",body:[
        "Corporate responsibility reports are often designed as rooms without shadows. The photographs are warm, the verbs continuous and every difficulty appears one initiative away from resolution. A useful report should do something less flattering. It should reveal which materials remain dependent on fossil fuel, which suppliers fall short, how many workers receive a living wage and what happens when an audit finds a problem. Patagonia’s modern-slavery statements, factory disclosures and footprint material are valuable to the extent that they allow those questions to become more precise.",
        "Disclosure does not guarantee improvement, and the company still controls the categories and timing of what it publishes. Independent accreditation, reporting by workers and outside scrutiny remain necessary. But an incomplete public record is preferable to a perfect private claim because it gives criticism somewhere to land. A customer should be able to move from the jacket to the factory, from the factory to the standard and from the standard to the shortfall. The ethical business is not the one that has stopped producing problems; it is the one that makes evasion progressively more difficult."
      ]},
      {_key:"patagonia-conclusion",_type:"articleTextSection",heading:"Better is a direction",body:[
        "Patagonia’s most defensible practices share a quality: they are difficult to compress into a label. Repair requires skilled technicians and an inventory of old components. Fair Trade requires worker committees and premiums. Supplier oversight requires repeated visits, documentation and correction. Mission ownership requires lawyers, governance and a willingness to surrender the ordinary rewards of a sale. None of this is as tidy as declaring a fabric sustainable or printing the planet on a shop window, but it creates systems that can continue after attention moves elsewhere.",
        "The Patagonia test should therefore be applied beyond Patagonia. Does a company disclose where the work happens? Can its product be repaired, and has it built the capacity to do so? Do workers have a material role in the benefits attached to their labour? What prevents the next owner from discarding every promise? The answers will rarely be complete. That is not a reason to abandon the questions. It is a reason to prefer companies that leave enough evidence for the questions to become sharper with time."
      ]}
    ]
  },
  {
    slug:"the-chair-seat-that-grows-in-a-river",
    title:"The Chair Seat That Grows in a River",
    dek:"At Marchmont Workshop in the Scottish Borders, Richard Platt and Sam Cooper make chairs from local hardwood and common river rush. The work begins in woodland and water, passes from hand to hand and ends in a seat that can serve for decades before being woven again.",
    date:"2026-08-12",
    tags:["Craft","Furniture","Scotland"],
    imageSrc:"/journal/features/marchmont-rush-weaving.webp",
    author:"Small Certainty",
    sections:[
      {body:[
        "A rush-seated chair is easy to underestimate. Its frame is open, its weight modest and its seat made from a plant that spends the first part of its life standing in water. There is no upholstery to suggest comfort and little surface on which a manufacturer can perform expense. Yet a good one can remain at a kitchen table for decades, acquiring the polish of use while asking only that, eventually, somebody weave the seat again.",
        "At Marchmont Workshop, on an estate near Greenlaw in the Scottish Borders, Richard Platt and Sam Cooper make this apparent simplicity exact. They select local hardwood, turn and steam-bend the components by hand, harvest common river rush in summer and weave each seat in the workshop. The chair is designed from tree to home, but its real distinction is continuity: woodland, river, maker, owner and repairer remain close enough to understand one another."
      ]},
      {heading:"Six generations between two hands",body:[
        "The workshop’s lineage runs through the English Arts and Crafts tradition. In 2018, Platt and Cooper apprenticed with Lawrence Neal, inheriting techniques passed through six generations and associated with makers including Ernest Gimson and Phillip Clissett. When they founded Marchmont Workshop in 2020, rush-chair making in Britain had contracted to a few practitioners. What survived was not simply a historic silhouette but a working system of judgements: how wet ash will bend, how a rung should meet a leg and how much tension a green strand can take before it bruises or breaks.",
        "An endangered craft is often presented as a collection of gestures preserved from change. This one is more practical. The knowledge matters because it continues to solve the chair. A side chair must be light enough to move, strong enough to tolerate a person leaning back and comfortable without foam, springs or a concealed sheet of plywood. The inherited methods are not ceremony around the object; they are the shortest route to its performance."
      ]},
      {heading:"The harvest",body:[
        "Common rush grows in fresh water, sending dark-green stems upwards from spring until they are ready to cut between late June and early August. The Marchmont makers harvest theirs from the rivers Wansbeck and Avon, working in waders with long slashing hooks. Around a thousand bundles are tied and left to dry in the summer sun. Once dry, the rush will keep indefinitely; before weaving, it is wetted again so that the stems recover their suppleness.",
        "This seasonal work gives the finished chair a material honesty that sourcing language rarely achieves. The makers can identify the woodlands around the workshop and the rivers that supplied the seat. More importantly, they understand variation before it becomes a production problem. Rush is not an extruded cord. Stems narrow, thicken and carry the record of weather. Selection is part of weaving: two or three compatible lengths are twisted into an even strand, and weak or inconsistent pieces are discarded before they become a weak place in the seat."
      ]},
      {heading:"A few hundred repetitions",body:[
        "The weave is straightforward enough to describe. The twisted strand passes over a seat rail, up through the frame and over itself to hold its position. The action is repeated a few hundred times, moving towards the centre as four triangular planes take shape. Description, however, removes the difficult part. Every pass changes the available space and the tension of the passes already made. The maker has to keep the surface level, the corners clean and the strand sufficiently taut without exhausting the material.",
        "This is why a rush seat looks calm. Its pattern is the visible record of problems resolved at the moment they appeared. There are no fasteners and no adhesive holding the woven surface together; geometry and friction do the work. Stuffing inserted as the seat closes gives support without concealing the construction. The result is firm at first, then increasingly accommodating as use presses the rush into a surface particular to the people who sit on it."
      ]},
      {heading:"Repair is part of the design",body:[
        "Daily use should give a well-made rush seat several decades. When it finally wears through, the frame need not be discarded. The old weave can be removed and a new one put in its place, restoring the chair without pretending that nothing has happened. Marchmont Workshop reseats older chairs as well as its own and teaches the process in small two-day courses, carrying the knowledge beyond the objects it can make itself.",
        "The course is as consequential as the chair. Four students learn to select and prepare rush, control the weave, trim the ends and stuff the finished seat. Some arrive with a chair from home; others leave with a new frame. Either way, repair becomes less mysterious and the craft gains another possible practitioner. Preservation works best in this form: not as reverence for an untouchable example, but as enough distributed competence to keep ordinary good things in use."
      ]},
      {heading:"A chair without an alibi",body:[
        "Marchmont Workshop also makes contemporary pieces, including a chair developed with the veteran maker Mike Abbott and a Canopy chair whose back rail follows the form of an ash branch. These designs do not need to disguise their ancestry. The useful inheritance is structural rather than stylistic: local timber, greenwood construction, a renewable woven seat and proportions refined by people who expect the chair to be used rather than merely discussed.",
        "The rush chair offers no technological surprise and requires none. It makes a narrower, more demanding promise: that the materials can be known, the joints understood, the seat renewed and the whole object kept in service long enough for fashion to lose interest several times. In a room full of furniture making larger claims, the light chair with the river-grown seat may be the one with the least to explain."
      ]}
    ],
    content:[
      {_key:"marchmont-opening",_type:"articleTextSection",body:[
        "A rush-seated chair is easy to underestimate. Its frame is open, its weight modest and its seat made from a plant that spends the first part of its life standing in water. There is no upholstery to suggest comfort and little surface on which a manufacturer can perform expense. Yet a good one can remain at a kitchen table for decades, acquiring the polish of use while asking only that, eventually, somebody weave the seat again.",
        "At Marchmont Workshop, on an estate near Greenlaw in the Scottish Borders, Richard Platt and Sam Cooper make this apparent simplicity exact. They select local hardwood, turn and steam-bend the components by hand, harvest common river rush in summer and weave each seat in the workshop. The chair is designed from tree to home, but its real distinction is continuity: woodland, river, maker, owner and repairer remain close enough to understand one another."
      ]},
      {_key:"marchmont-weaving",_type:"imageArrangement",layout:"split",primaryImage:{url:"/journal/features/marchmont-rush-weaving.webp",alt:"Sam Cooper weaving a rush seat onto a wooden chair frame at Marchmont Workshop",caption:"Sam Cooper weaving a Bedales side chair",credit:"The Marchmont Workshop"},secondaryImage:{url:"/journal/features/marchmont-reseating-chair.webp",alt:"Richard Platt weaving a new rush seat onto a wooden rocking chair",caption:"Richard Platt reseating a rocking chair",credit:"The Marchmont Workshop"}},
      {_key:"marchmont-lineage",_type:"articleTextSection",heading:"Six generations between two hands",body:[
        "The workshop’s lineage runs through the English Arts and Crafts tradition. In 2018, Platt and Cooper apprenticed with Lawrence Neal, inheriting techniques passed through six generations and associated with makers including Ernest Gimson and Phillip Clissett. When they founded Marchmont Workshop in 2020, rush-chair making in Britain had contracted to a few practitioners. What survived was not simply a historic silhouette but a working system of judgements: how wet ash will bend, how a rung should meet a leg and how much tension a green strand can take before it bruises or breaks.",
        "An endangered craft is often presented as a collection of gestures preserved from change. This one is more practical. The knowledge matters because it continues to solve the chair. A side chair must be light enough to move, strong enough to tolerate a person leaning back and comfortable without foam, springs or a concealed sheet of plywood. The inherited methods are not ceremony around the object; they are the shortest route to its performance."
      ]},
      {_key:"marchmont-harvest",_type:"articleTextSection",heading:"The harvest",body:[
        "Common rush grows in fresh water, sending dark-green stems upwards from spring until they are ready to cut between late June and early August. The Marchmont makers harvest theirs from the rivers Wansbeck and Avon, working in waders with long slashing hooks. Around a thousand bundles are tied and left to dry in the summer sun. Once dry, the rush will keep indefinitely; before weaving, it is wetted again so that the stems recover their suppleness.",
        "This seasonal work gives the finished chair a material honesty that sourcing language rarely achieves. The makers can identify the woodlands around the workshop and the rivers that supplied the seat. More importantly, they understand variation before it becomes a production problem. Rush is not an extruded cord. Stems narrow, thicken and carry the record of weather. Selection is part of weaving: two or three compatible lengths are twisted into an even strand, and weak or inconsistent pieces are discarded before they become a weak place in the seat."
      ]},
      {_key:"marchmont-repetition",_type:"articleTextSection",heading:"A few hundred repetitions",body:[
        "The weave is straightforward enough to describe. The twisted strand passes over a seat rail, up through the frame and over itself to hold its position. The action is repeated a few hundred times, moving towards the centre as four triangular planes take shape. Description, however, removes the difficult part. Every pass changes the available space and the tension of the passes already made. The maker has to keep the surface level, the corners clean and the strand sufficiently taut without exhausting the material.",
        "This is why a rush seat looks calm. Its pattern is the visible record of problems resolved at the moment they appeared. There are no fasteners and no adhesive holding the woven surface together; geometry and friction do the work. Stuffing inserted as the seat closes gives support without concealing the construction. The result is firm at first, then increasingly accommodating as use presses the rush into a surface particular to the people who sit on it."
      ]},
      {_key:"marchmont-repair",_type:"articleTextSection",heading:"Repair is part of the design",body:[
        "Daily use should give a well-made rush seat several decades. When it finally wears through, the frame need not be discarded. The old weave can be removed and a new one put in its place, restoring the chair without pretending that nothing has happened. Marchmont Workshop reseats older chairs as well as its own and teaches the process in small two-day courses, carrying the knowledge beyond the objects it can make itself.",
        "The course is as consequential as the chair. Four students learn to select and prepare rush, control the weave, trim the ends and stuff the finished seat. Some arrive with a chair from home; others leave with a new frame. Either way, repair becomes less mysterious and the craft gains another possible practitioner. Preservation works best in this form: not as reverence for an untouchable example, but as enough distributed competence to keep ordinary good things in use."
      ]},
      {_key:"marchmont-conclusion",_type:"articleTextSection",heading:"A chair without an alibi",body:[
        "Marchmont Workshop also makes contemporary pieces, including a chair developed with the veteran maker Mike Abbott and a Canopy chair whose back rail follows the form of an ash branch. These designs do not need to disguise their ancestry. The useful inheritance is structural rather than stylistic: local timber, greenwood construction, a renewable woven seat and proportions refined by people who expect the chair to be used rather than merely discussed.",
        "The rush chair offers no technological surprise and requires none. It makes a narrower, more demanding promise: that the materials can be known, the joints understood, the seat renewed and the whole object kept in service long enough for fashion to lose interest several times. In a room full of furniture making larger claims, the light chair with the river-grown seat may be the one with the least to explain."
      ]}
    ]
  },
  {
    slug:"john-morgan-the-grand-detail",
    title:"The Very Good Whisperer",
    dek:"John Morgan, 1973–2025, made books, identities and public lettering with the same exacting intelligence. His work joined typographic detail to the grand gesture—and left British design with a more generous definition of restraint.",
    date:"2026-08-28",
    tags:["Design","Publishing","Typography"],
    imageSrc:"/journal/features/john-morgan-dracula-cover.webp",
    author:"Small Certainty",
    sections:johnMorganSections,
    content:[
      {_key:"morgan-opening",_type:"articleTextSection",body:johnMorganSections[0].body},
      {_key:"morgan-portrait",_type:"imageArrangement",layout:"centered",primaryImage:{url:"/journal/features/john-morgan-cover.webp",alt:"Black-and-white portrait of John Morgan surrounded by overlapping hands"}},
      {_key:"morgan-reading",_type:"articleTextSection",heading:johnMorganSections[1].heading,body:johnMorganSections[1].body},
      {_key:"morgan-common-worship",_type:"articleTextSection",heading:johnMorganSections[2].heading,body:johnMorganSections[2].body},
      {_key:"morgan-editing",_type:"articleTextSection",heading:johnMorganSections[3].heading,body:johnMorganSections[3].body},
      {_key:"morgan-books",_type:"imageArrangement",layout:"centered",primaryImage:{url:"/journal/features/john-morgan-books.webp",alt:"A stack of books including Never Modern and Dracula with a perfume bottle resting on top",caption:"Books as working objects: read, handled and kept close"}},
      {_key:"morgan-building",_type:"articleTextSection",heading:johnMorganSections[4].heading,body:johnMorganSections[4].body},
      {_key:"morgan-history",_type:"articleTextSection",heading:johnMorganSections[5].heading,body:johnMorganSections[5].body},
      {_key:"morgan-victory",_type:"imageArrangement",layout:"full",primaryImage:{url:"/journal/features/john-morgan-hms-victory.webp",alt:"A painter applying large serif lettering to the stern of HMS Victory during restoration",caption:"Lettering for HMS Victory being applied during the 2015 repainting"}},
      {_key:"morgan-abyme",_type:"imageArrangement",layout:"split",primaryImage:{url:"/journal/features/john-morgan-yes-no-spirit.webp",alt:"Hands moving above a spirit board assembled from typographic characters",caption:"Letterforms treated as material rather than historical ornament"},secondaryImage:{url:"/journal/features/john-morgan-abyme-window.webp",alt:"The Abyme type foundry window with colourful ABC We Print Anything lettering and printed sweatshirts",caption:"Abyme: type moving between foundry, publication and street"}},
      {_key:"morgan-final-books",_type:"articleTextSection",heading:johnMorganSections[6].heading,body:johnMorganSections[6].body}
    ]
  },
  {
    slug:"kluane-mountaineering-made-for-the-long-cold",
    title:"Kluane Mountaineering — Made for the Long Cold",
    dek:"An Edmonton workshop that began with two students, one unaffordable sleeping bag and the useful conviction that serious outdoor equipment could be made closer to home. More than half a century later, Kluane Mountaineering still treats warmth as a matter of materials, judgement and patient construction.",
    date:"2026-08-12",
    tags:["Canada","Outdoors","Manufacturing"],
    imageSrc:"/journal/features/kluane-icefield.jpg",
    author:"Small Certainty",
    sections:[
      {body:[
        "Outdoor equipment has become exceptionally good at describing itself. Jackets arrive with diagrams, sleeping bags with temperature tables and almost everything with a name that suggests an expedition before breakfast. Kluane Mountaineering belongs to an earlier and more useful tradition. The Edmonton company makes down equipment for people who need warmth to work, not warmth to perform a personality.",
        "Its story begins in 1971, when University of Alberta law students John Faulkner and Jim Brown wanted sleeping bags they could not afford. They made their own in the basement of Brown’s mother’s house and discovered that insulation rewards care more than spectacle. The company was incorporated in 1973, named for the immense national park and reserve in Yukon, and gradually sent its bags and clothing far beyond Alberta. The origin is modest, but the principle was already complete: make the thing properly, understand what is inside it and let the cold conduct the final review."
      ]},
      {heading:"A bag before a brand",body:[
        "The sleeping bag is a good object on which to build a company because it is difficult to bluff. Too little down leaves cold channels. Too much fabric adds weight without comfort. Poorly considered baffles allow the insulation to migrate precisely when it is needed most. The maker has to balance loft, cut, shell, zip and the sleeping habits of a person who will be tired, damp and a long way from the nearest radiator.",
        "Kluane’s early advantage was not scale but proximity to the work. A small workshop can notice how a pattern sits, where a seam carries strain and whether a repair reveals a weakness worth correcting in the next piece. That knowledge accumulates at the cutting table and the sewing machine rather than in a campaign. By the late 1980s, the company’s equipment had travelled around the world, but its authority still came from the same close sequence of measuring, filling, stitching and checking."
      ]},
      {heading:"Loft without theatre",body:[
        "Down is an old material with a modern public-relations department. Its numbers matter — fill power, weight and the ratio between insulation and everything holding it in place — but the useful result is simpler. A well-made down piece should create warmth without bulk becoming its only idea. It should pack down when asked, recover its loft and place insulation where the body loses heat rather than where a photograph wants volume.",
        "Kluane has long worked with light ripstop shells and high-loft insulation, but specification is only the beginning. The enduring attraction is the possibility of an object being adjusted to its owner and intended use. Length, warmth and detail can be treated as practical questions rather than fixed decisions made for an imaginary average customer. The outcome is equipment with fewer excuses: lighter when weight matters, warmer when exposure demands it and personal only in the sense that it fits the life it has been asked to join."
      ]},
      {heading:"Stewardship, not reinvention",body:[
        "Dylan Lynch acquired Kluane Mountaineering in 2024 and has described his role as stewardship. It is the correct word for a company whose value sits partly in patterns, partly in hands and largely in the continuity between them. A new owner can improve the workshop, clarify the offer and bring the name to another generation without pretending that fifty years of accumulated judgement requires a dramatic rescue.",
        "That restraint matters because small manufacturers are often praised most enthusiastically at the moment they are encouraged to stop behaving like small manufacturers. Growth brings useful stability, but it can also separate the person specifying the object from the person sewing it. Kluane’s more interesting opportunity is not to become a broad outdoor lifestyle proposition. It is to remain recognisably a place where somebody can discuss the cold, choose an appropriate piece and know that the answer will be made rather than merely retrieved."
      ]},
      {heading:"The northern name",body:[
        "Kluane National Park and Reserve contains icefields, glaciers and some of Canada’s highest country. The company is based in Edmonton, not Yukon, and the distinction is worth keeping clear. The landscape lends the brand a name and a standard, not a false address. It represents conditions in which warmth, weight and repairability stop being preferences and become facts.",
        "Kluane Mountaineering is compelling because the product and the organisation share a sensible shape. Both are compact, layered and built to endure pressure without unnecessary display. The lesson is not that every object should be handmade or every company should remain tiny. It is that some knowledge only survives when making stays close enough to use. A sleeping bag begun in a basement can travel remarkably far, provided nobody mistakes distance for a reason to forget how it was made."
      ]}
    ],
    content:[
      {_key:"kluane-opening",_type:"articleTextSection",body:[
        "Outdoor equipment has become exceptionally good at describing itself. Jackets arrive with diagrams, sleeping bags with temperature tables and almost everything with a name that suggests an expedition before breakfast. Kluane Mountaineering belongs to an earlier and more useful tradition. The Edmonton company makes down equipment for people who need warmth to work, not warmth to perform a personality.",
        "Its story begins in 1971, when University of Alberta law students John Faulkner and Jim Brown wanted sleeping bags they could not afford. They made their own in the basement of Brown’s mother’s house and discovered that insulation rewards care more than spectacle. The company was incorporated in 1973, named for the immense national park and reserve in Yukon, and gradually sent its bags and clothing far beyond Alberta. The origin is modest, but the principle was already complete: make the thing properly, understand what is inside it and let the cold conduct the final review."
      ]},
      {_key:"kluane-landscape",_type:"imageArrangement",layout:"full",primaryImage:{url:"/journal/features/kluane-icefield.jpg",alt:"The Kluane Icefield and Mount Augusta in Yukon",caption:"Kluane Icefield, Yukon — the landscape that lends the Edmonton company its name",credit:"Steffen Schreyer / Wikimedia Commons / CC BY-SA 2.0 DE"}},
      {_key:"kluane-bag",_type:"articleTextSection",heading:"A bag before a brand",body:[
        "The sleeping bag is a good object on which to build a company because it is difficult to bluff. Too little down leaves cold channels. Too much fabric adds weight without comfort. Poorly considered baffles allow the insulation to migrate precisely when it is needed most. The maker has to balance loft, cut, shell, zip and the sleeping habits of a person who will be tired, damp and a long way from the nearest radiator.",
        "Kluane’s early advantage was not scale but proximity to the work. A small workshop can notice how a pattern sits, where a seam carries strain and whether a repair reveals a weakness worth correcting in the next piece. That knowledge accumulates at the cutting table and the sewing machine rather than in a campaign. By the late 1980s, the company’s equipment had travelled around the world, but its authority still came from the same close sequence of measuring, filling, stitching and checking."
      ]},
      {_key:"kluane-workshop",_type:"imageArrangement",layout:"centered",primaryImage:{url:"/journal/features/kluane-sewing-room.jpg",alt:"An archival Canadian sewing-machine workshop",caption:"The workshop model: knowledge kept close to the machines",credit:"Provincial Archives of Alberta / Hines Studio Collection / Public domain"}},
      {_key:"kluane-loft",_type:"articleTextSection",heading:"Loft without theatre",body:[
        "Down is an old material with a modern public-relations department. Its numbers matter — fill power, weight and the ratio between insulation and everything holding it in place — but the useful result is simpler. A well-made down piece should create warmth without bulk becoming its only idea. It should pack down when asked, recover its loft and place insulation where the body loses heat rather than where a photograph wants volume.",
        "Kluane has long worked with light ripstop shells and high-loft insulation, but specification is only the beginning. The enduring attraction is the possibility of an object being adjusted to its owner and intended use. Length, warmth and detail can be treated as practical questions rather than fixed decisions made for an imaginary average customer. The outcome is equipment with fewer excuses: lighter when weight matters, warmer when exposure demands it and personal only in the sense that it fits the life it has been asked to join."
      ]},
      {_key:"kluane-stewardship",_type:"articleTextSection",heading:"Stewardship, not reinvention",body:[
        "Dylan Lynch acquired Kluane Mountaineering in 2024 and has described his role as stewardship. It is the correct word for a company whose value sits partly in patterns, partly in hands and largely in the continuity between them. A new owner can improve the workshop, clarify the offer and bring the name to another generation without pretending that fifty years of accumulated judgement requires a dramatic rescue.",
        "That restraint matters because small manufacturers are often praised most enthusiastically at the moment they are encouraged to stop behaving like small manufacturers. Growth brings useful stability, but it can also separate the person specifying the object from the person sewing it. Kluane’s more interesting opportunity is not to become a broad outdoor lifestyle proposition. It is to remain recognisably a place where somebody can discuss the cold, choose an appropriate piece and know that the answer will be made rather than merely retrieved."
      ]},
      {_key:"kluane-name",_type:"articleTextSection",heading:"The northern name",body:[
        "Kluane National Park and Reserve contains icefields, glaciers and some of Canada’s highest country. The company is based in Edmonton, not Yukon, and the distinction is worth keeping clear. The landscape lends the brand a name and a standard, not a false address. It represents conditions in which warmth, weight and repairability stop being preferences and become facts.",
        "Kluane Mountaineering is compelling because the product and the organisation share a sensible shape. Both are compact, layered and built to endure pressure without unnecessary display. The lesson is not that every object should be handmade or every company should remain tiny. It is that some knowledge only survives when making stays close enough to use. A sleeping bag begun in a basement can travel remarkably far, provided nobody mistakes distance for a reason to forget how it was made."
      ]}
    ]
  },
  {
    slug:"one-good-street-jaegersborggade",
    title:"One Good Street — Jægersborggade, Copenhagen",
    dek:"A short Copenhagen street that manages to hold coffee, ceramics, food, books and ordinary residential life without turning itself into a district. Jægersborggade is useful not because every address is essential, but because the whole street still behaves like a street.",
    date:"2026-08-12",
    tags:["Cities","Copenhagen","Streets"],
    imageSrc:"/journal/features/jaegersborggade-copenhagen.jpg",
    author:"Small Certainty",
    sections:[
      {body:[
        "A good street is a compact civic institution. It gives you reasons to arrive, reasons to linger and enough ordinary life to prevent the whole performance from feeling staged. Jægersborggade, a short residential street in Copenhagen’s Nørrebro district, gets this balance unusually right. Workshops, cafés and small shops occupy the ground floor while bicycles, front doors and upstairs windows preserve the useful impression that people actually live here.",
        "The street is often described by its inventory — ceramics, natural wine, coffee, food and independent retail — but the inventory is less important than its scale. Frontages are narrow, the walk is brief and no single address is asked to carry the destination. You can come for one thing and notice three others without feeling that a commercial precinct has been arranged around you. The result is busy enough to reward attention and calm enough to remain legible."
      ]},
      {heading:"Begin with the useful things",body:[
        "Coffee Collective is the obvious marker, not because a good street requires a celebrated coffee bar but because a precise daily habit gives the neighbourhood a dependable pulse. Around it, food counters, wine, clothing and ceramics make a sequence of modest invitations. Most can be understood from the pavement. The doors are close together, the rooms are small and the transactions remain human in scale.",
        "This is where Jægersborggade differs from a shopping street assembled from destinations. Its shops do not need theatrical façades or enormous signs to announce themselves. A window, a bench, a bicycle against the wall and a few people deciding whether to go in are sufficient. Commerce remains visible, but it does not erase the building or the weather. Even an excellent shop is still one room on a Copenhagen street."
      ]},
      {heading:"The middle is the point",body:[
        "There is no monument waiting halfway along Jægersborggade, which is part of its intelligence. The reward is cumulative: a ceramic cup, a loaf, a conversation at a doorway, a well-used bicycle and the changing rhythm of people who are shopping, working or simply going home. The street does not climax; it acquires character by repetition and proximity.",
        "That quality is difficult to reproduce with branding because it depends on mixture. Residents provide continuity, independent businesses provide variation and the narrow street lets each borrow a little atmosphere from the other. A visitor gets enough novelty for an afternoon, while a neighbour can still cross the same pavement carrying groceries without becoming part of somebody else’s city break."
      ]},
      {heading:"What another city can borrow",body:[
        "The lesson is not to import Copenhagen furniture or commission a district identity. It is to protect the conditions in which many small decisions can sit beside one another: short frontages, adaptable rooms, a comfortable walking pace and enough housing to keep the street useful after the last coffee is poured. Variety is stronger when it is spatial as well as commercial.",
        "One good street does not need to represent an entire city. It needs to be specific enough that the city becomes visible through it. Jægersborggade offers Copenhagen in miniature — design-minded but practical, sociable without becoming loud and confident enough to leave several things unresolved. Walk it slowly, buy one useful object and allow the rest of the street to remain for another day."
      ]}
    ],
    content:[
      {_key:"street-opening",_type:"articleTextSection",body:[
        "A good street is a compact civic institution. It gives you reasons to arrive, reasons to linger and enough ordinary life to prevent the whole performance from feeling staged. Jægersborggade, a short residential street in Copenhagen’s Nørrebro district, gets this balance unusually right. Workshops, cafés and small shops occupy the ground floor while bicycles, front doors and upstairs windows preserve the useful impression that people actually live here.",
        "The street is often described by its inventory — ceramics, natural wine, coffee, food and independent retail — but the inventory is less important than its scale. Frontages are narrow, the walk is brief and no single address is asked to carry the destination. You can come for one thing and notice three others without feeling that a commercial precinct has been arranged around you. The result is busy enough to reward attention and calm enough to remain legible."
      ]},
      {_key:"street-images",_type:"imageArrangement",layout:"split",primaryImage:{url:"/journal/features/jaegersborggade-copenhagen.jpg",alt:"Cyclists and pedestrians moving along Jægersborggade in Copenhagen",caption:"Jægersborggade, Nørrebro, Copenhagen",credit:"Fred Romero / Wikimedia Commons / CC BY 2.0"},secondaryImage:{url:"/journal/features/jaegersborggade-street.jpg",alt:"Shopfronts, bicycles and residents on Jægersborggade",caption:"The street’s small shopfronts and residential scale",credit:"jareed / Wikimedia Commons / CC BY 2.0"}},
      {_key:"street-useful",_type:"articleTextSection",heading:"Begin with the useful things",body:[
        "Coffee Collective is the obvious marker, not because a good street requires a celebrated coffee bar but because a precise daily habit gives the neighbourhood a dependable pulse. Around it, food counters, wine, clothing and ceramics make a sequence of modest invitations. Most can be understood from the pavement. The doors are close together, the rooms are small and the transactions remain human in scale.",
        "This is where Jægersborggade differs from a shopping street assembled from destinations. Its shops do not need theatrical façades or enormous signs to announce themselves. A window, a bench, a bicycle against the wall and a few people deciding whether to go in are sufficient. Commerce remains visible, but it does not erase the building or the weather. Even an excellent shop is still one room on a Copenhagen street."
      ]},
      {_key:"street-middle",_type:"articleTextSection",heading:"The middle is the point",body:[
        "There is no monument waiting halfway along Jægersborggade, which is part of its intelligence. The reward is cumulative: a ceramic cup, a loaf, a conversation at a doorway, a well-used bicycle and the changing rhythm of people who are shopping, working or simply going home. The street does not climax; it acquires character by repetition and proximity.",
        "That quality is difficult to reproduce with branding because it depends on mixture. Residents provide continuity, independent businesses provide variation and the narrow street lets each borrow a little atmosphere from the other. A visitor gets enough novelty for an afternoon, while a neighbour can still cross the same pavement carrying groceries without becoming part of somebody else’s city break."
      ]},
      {_key:"street-lesson",_type:"articleTextSection",heading:"What another city can borrow",body:[
        "The lesson is not to import Copenhagen furniture or commission a district identity. It is to protect the conditions in which many small decisions can sit beside one another: short frontages, adaptable rooms, a comfortable walking pace and enough housing to keep the street useful after the last coffee is poured. Variety is stronger when it is spatial as well as commercial.",
        "One good street does not need to represent an entire city. It needs to be specific enough that the city becomes visible through it. Jægersborggade offers Copenhagen in miniature — design-minded but practical, sociable without becoming loud and confident enough to leave several things unresolved. Walk it slowly, buy one useful object and allow the rest of the street to remain for another day."
      ]}
    ]
  },
  {
    slug:"people-who-fix-good-things",
    title:"The People Who Fix Good Things",
    dek:"The cobblers, watch repairers and bicycle mechanics who keep useful objects in circulation. Their work is precise, local and economically modest, but a city without it becomes noticeably more disposable.",
    date:"2026-08-11",
    tags:["Repair","Craft","Cities"],
    imageSrc:"/journal/features/repair-cobbler.jpeg",
    author:"Small Certainty",
    sections:[
      {body:[
        "The people who fix good things begin where the product description ends. They meet the shoe after rain has found the seam, the watch after its owner has stopped pretending the lost minutes are charming and the bicycle after a winter of salt, potholes and insufficient attention. Their work is not restoration in the museum sense. It is the more useful art of returning an object to ordinary life.",
        "Repair requires a particular form of confidence. The first act is diagnosis: deciding what failed, what can wait and whether the object deserves more labour. A good repairer is not sentimental about every possession, but neither are they hypnotised by replacement. They understand materials after wear has made them honest. This knowledge is practical, cumulative and difficult to package, which may explain why it remains more valuable than its shopfront often suggests."
      ]},
      {heading:"The cobbler’s judgement",body:[
        "A cobbler reads a shoe from the ground upward. The sole records gait, weather and neglect; the upper reveals whether the leather was worth caring for in the first place. The useful intervention might be a new heel, a stitched seam or a quiet refusal to perform an expensive rescue on a shoe built to fail. Good judgement saves both object and owner from needless theatre.",
        "The best result does not look newly manufactured. It looks ready. The polish is restored, the structure is sound and the familiar crease remains because it belongs to the foot as much as the shoe. Repair preserves evidence of use while removing the part that has become an impediment. It is a modest distinction, but one that separates maintenance from disguise."
      ]},
      {heading:"Time, tension and tolerances",body:[
        "A watch repairer works at a scale where a speck of dust can become an event. A bicycle mechanic works with larger forces — cable tension, bearing play, wheels that must remain true under weight — but the disciplines share an ethic. Both make tiny adjustments whose success is measured by the disappearance of friction. The machine returns to the wrist or the street and begins to feel inevitable again.",
        "Owners often arrive describing a symptom rather than a fault: it loses time, it clicks uphill, it feels wrong when turning left. Translating this imprecise account into a precise correction is part of the craft. The repairer listens to the person, then listens again to the object. The tools matter, but so does the practiced ability to separate a harmless noise from the beginning of a failure."
      ]},
      {heading:"A city’s second layer",body:[
        "Repair shops form a second layer of urban infrastructure. They are smaller than the businesses that sell new things and more consequential than their square footage suggests. A neighbourhood cobbler, tailor, bicycle mechanic or electronics technician gives residents an alternative to the bin and gives good objects a longer economic life. The service is environmental almost by accident; its immediate promise is simply that Tuesday can continue as planned.",
        "These places deserve attention, but not romantic preservation as decorative relics. They need customers, workable rents, apprentices and objects designed with enough material honesty to be opened and repaired. The future of repair will not be secured by admiring old workbenches. It will be secured when manufacturers, cities and owners once again treat maintenance as a normal part of ownership — and when the person who can fix the thing is still close enough to visit before work."
      ]}
    ],
    content:[
      {_key:"repair-opening",_type:"articleTextSection",body:[
        "The people who fix good things begin where the product description ends. They meet the shoe after rain has found the seam, the watch after its owner has stopped pretending the lost minutes are charming and the bicycle after a winter of salt, potholes and insufficient attention. Their work is not restoration in the museum sense. It is the more useful art of returning an object to ordinary life.",
        "Repair requires a particular form of confidence. The first act is diagnosis: deciding what failed, what can wait and whether the object deserves more labour. A good repairer is not sentimental about every possession, but neither are they hypnotised by replacement. They understand materials after wear has made them honest. This knowledge is practical, cumulative and difficult to package, which may explain why it remains more valuable than its shopfront often suggests."
      ]},
      {_key:"repair-split",_type:"imageArrangement",layout:"split",primaryImage:{url:"/journal/features/repair-cobbler.jpeg",alt:"A cobbler repairing a damaged shoe by hand",caption:"A repair begins with a close reading of wear",credit:"Clinton Ugboke / Wikimedia Commons / Public domain"},secondaryImage:{url:"/journal/features/repair-bicycle.jpg",alt:"A mechanic adjusting bicycle handlebars and components at a workshop bench",caption:"Bicycle repair: larger forces, similarly fine tolerances",credit:"Shixart1985 / Wikimedia Commons / CC BY 4.0"}},
      {_key:"repair-cobbler",_type:"articleTextSection",heading:"The cobbler’s judgement",body:[
        "A cobbler reads a shoe from the ground upward. The sole records gait, weather and neglect; the upper reveals whether the leather was worth caring for in the first place. The useful intervention might be a new heel, a stitched seam or a quiet refusal to perform an expensive rescue on a shoe built to fail. Good judgement saves both object and owner from needless theatre.",
        "The best result does not look newly manufactured. It looks ready. The polish is restored, the structure is sound and the familiar crease remains because it belongs to the foot as much as the shoe. Repair preserves evidence of use while removing the part that has become an impediment. It is a modest distinction, but one that separates maintenance from disguise."
      ]},
      {_key:"repair-time",_type:"articleTextSection",heading:"Time, tension and tolerances",body:[
        "A watch repairer works at a scale where a speck of dust can become an event. A bicycle mechanic works with larger forces — cable tension, bearing play, wheels that must remain true under weight — but the disciplines share an ethic. Both make tiny adjustments whose success is measured by the disappearance of friction. The machine returns to the wrist or the street and begins to feel inevitable again.",
        "Owners often arrive describing a symptom rather than a fault: it loses time, it clicks uphill, it feels wrong when turning left. Translating this imprecise account into a precise correction is part of the craft. The repairer listens to the person, then listens again to the object. The tools matter, but so does the practiced ability to separate a harmless noise from the beginning of a failure."
      ]},
      {_key:"repair-watch",_type:"imageArrangement",layout:"centered",primaryImage:{url:"/journal/features/repair-watch.jpg",alt:"A watch repairer working on a mechanical watch movement",caption:"Precision work at the scale of springs, wheels and dust",credit:"Souq Ali Doha / Wikimedia Commons / CC BY 2.0"}},
      {_key:"repair-city",_type:"articleTextSection",heading:"A city’s second layer",body:[
        "Repair shops form a second layer of urban infrastructure. They are smaller than the businesses that sell new things and more consequential than their square footage suggests. A neighbourhood cobbler, tailor, bicycle mechanic or electronics technician gives residents an alternative to the bin and gives good objects a longer economic life. The service is environmental almost by accident; its immediate promise is simply that Tuesday can continue as planned.",
        "These places deserve attention, but not romantic preservation as decorative relics. They need customers, workable rents, apprentices and objects designed with enough material honesty to be opened and repaired. The future of repair will not be secured by admiring old workbenches. It will be secured when manufacturers, cities and owners once again treat maintenance as a normal part of ownership — and when the person who can fix the thing is still close enough to visit before work."
      ]}
    ]
  },
  {
    slug:"weekly-certainties-001",
    title:"Weekly Certainties No. 001 — The Useful Pile",
    dek:"Five objects from the current working pile, considered after the first enthusiasm has passed. A dispatch about the useful middle ground between a saved tab and a permanent place in the catalog.",
    date:"2026-06-23",
    tags:["Notes","Objects","Issue 001"],
    imageTone:"linear-gradient(135deg,#d8c36b,#9f6f42 54%,#2e3d29)",
    imageSrc:"/journal/image_5.jpg",
    sections:[
      {body:[
        "A weekly list should feel like a small dispatch, not a second homepage. The goal is a handful of useful certainties: things seen, tested, re-noticed, or quietly moved from maybe to yes. This week’s pile is domestic but not sleepy: a bath towel with hotel manners, a notebook that behaves on a train, a shirt cut with enough restraint to survive a long lunch, and one object that seems almost too plain until it starts solving the room.",
        "The useful thing about a small list is that it refuses the panic of abundance. It does not pretend to survey the entire market. It simply says: these are the items that made it through the week without becoming annoying. The bar is low in theory and surprisingly high in practice. Many things are good in a tab; fewer remain good on a wet Tuesday morning."
      ]},
      {heading:"The shape",body:[
        "Five to ten picks. One paragraph each. Links when useful. No fake urgency. No shopping holiday energy. A weekly note can be brisk without becoming disposable; it can point to commerce without shouting at the reader to add something to cart before midnight.",
        "If the catalog is evergreen, the journal is weather. It records what seems newly useful, newly beautiful or newly settled. Some weeks will lean toward clothes, others toward kitchens, hotels, books or songs. The point is not to be comprehensive. The point is to be awake."
      ]},
      {heading:"This week’s bias",body:[
        "We are drawn to objects that do not ask for a new personality from their owner. Soft goods that launder well, clothes that respect the shoulders, tools that sit politely on a desk, and food things that make cooking feel less like performance. The best purchase is often the one that makes tomorrow slightly calmer.",
        "There is still room for delight. A color can be oddly correct. A handle can improve the whole kettle. A typeface can make a sentence feel more inevitable. But delight is better when it is attached to function, when it keeps showing up after the novelty has packed its little suitcase and left."
      ]},
      {heading:"What made the pile",body:[
        "The towel stayed because it dried before the room became damp again. The notebook stayed because its paper accepted pencil, fountain pen and the impatient pressure of a train table without becoming precious about any of them. The shirt stayed because its collar looked considered under a jacket and entirely unremarkable without one. None is an invention, and each improves a familiar action by removing one small source of irritation.",
        "The fifth certainty is less an object than a rule for the next issue: do not confuse photogenic with useful. A thing may photograph beautifully because it is unfamiliar, oversized or newly unwrapped. Daily life is a harsher editor. It introduces water, crumbs, bad light, hurried hands and the fact that storage is never as generous as the catalogue suggested. Anything still persuasive after that treatment earns another week of attention."
      ]}
    ]
  },
  {
    slug:"lamp-for-the-hour-before-dinner",
    title:"A Lamp for the Hour Before Dinner",
    dek:"A short note on the kind of light that makes a desk stop feeling temporary. The best lamp is not a sculpture pretending to be useful, nor a task light with office bitterness. It pools quietly, flatters paper, and gives the room a more generous second shift.",
    date:"2026-06-23",
    tags:["Lighting","Rooms","Workday"],
    imageTone:"linear-gradient(135deg,#efe4c6,#b58b52 52%,#2b241c)",
    imageSrc:"/journal/image_7.webp",
    sections:[
      {body:[
        "The best lamp in a room is rarely the one performing hardest. It does not need to announce the owner’s seriousness or turn the desk into a showroom for adjustable hinges. It simply has to make the hour before dinner better: the email less blue, the paper less abandoned, the room less dependent on ceiling light.",
        "Good light is a kind of courtesy. It gives shape to the corner without over-explaining it. It lets a book remain a book and a laptop remain a tool rather than a small illuminated demand. The right lamp brings a little ceremony to the end of the working day without making the ceremony embarrassing."
      ]},
      {heading:"What it should do",body:[
        "It should sit low enough to feel domestic and high enough to be useful. It should survive being placed next to a stack of receipts, a glass of water, a notebook and the wrong charger. It should make oak, steel, paper and dust look like they belong to the same life.",
        "There is a reason hotel rooms and railway lounges understand lamps better than many offices do. They know that people need a pool of permission. The task is not merely illumination; it is atmosphere with a job."
      ]},
      {heading:"What to avoid",body:[
        "Avoid the lamp that looks like it is applying for a design prize every time you switch it on. Avoid the desk light that has confused precision with severity. Avoid anything that makes a room feel as if it is waiting for a product photographer to arrive.",
        "A good lamp should be noticed once and enjoyed repeatedly. It should let the rest of the room relax. At its best, it becomes the small architectural decision that makes staying in feel less like surrender."
      ]},
      {heading:"The evening test",body:[
        "Switch it on before the room strictly requires it. At five in winter, or at the point in summer when daylight begins to lose its authority, the lamp should establish a smaller room inside the larger one. Papers become readable, a glass catches a narrow reflection and the unlit corners are permitted to recede. This is not mood lighting as spectacle. It is a practical boundary between the public obligations of the day and the private hours that follow.",
        "The best examples also understand darkness. They illuminate the working surface without bleaching the walls or throwing a naked bulb into the eye of anyone sitting opposite. A fabric shade, opal glass or carefully directed metal reflector does more than soften brightness; it gives the light an address. Dinner may still be half an hour away, but the room has already decided that work will not occupy the entire evening."
      ]}
    ]
  },
  {
    slug:"how-a-pick-becomes-certain",
    title:"How a Pick Becomes Certain",
    dek:"A loose note on taste, repetition, and the moment a thing stops asking for permission. The best picks survive a second look, a boring Tuesday, and the small indignities of actual use. Certainty arrives when enthusiasm calms down and the object still holds its place.",
    date:"2026-06-16",
    tags:["Taste","Method","Editorial"],
    imageTone:"linear-gradient(135deg,#e9d8b8,#b9afa0 48%,#222222)",
    imageSrc:"/journal/image_3.jpeg",
    sections:[
      {body:[
        "A pick becomes certain when it survives comparison and boredom. It has to be good the third time, not just exciting the first time. The first encounter is allowed to be emotional: a clean line, a promising fabric, a button with the right resistance. Certainty arrives later, after the object has been used badly, stored hastily, washed incorrectly, packed in a bag, forgotten, recovered and still found to be doing its job.",
        "Small Certainty is not trying to prove that a thing is objectively best. It is trying to make a useful editorial commitment. That commitment has a particular tone: opinionated but not hysterical, specific but not fussy, commercial but not desperate. A recommendation should feel like a friend who knows the city well, not like a sales associate who has memorised the morning briefing."
      ]},
      {heading:"A working rule",body:[
        "If a recommendation needs too much explanation, it probably is not ready. The note can be short because the pick is doing most of the work. A good towel does not need a philosophy of towels; it needs a hand, a loop, a weave and a reason to be chosen over the pile beside it.",
        "The process is slower than a search result and quicker than a formal review. It starts with a category that feels too broad: best chair, best blazer, best coffee maker. Then the field narrows. What would we actually recommend to someone whose taste we respect? What would still feel right in a year? What has the fewest hidden irritations?"
      ]},
      {heading:"The final test",body:[
        "The final test is language. If the sentence becomes evasive, the pick usually is too. If the prose has to lean on superlatives, the object may not be carrying enough weight. A certain thing lets the description relax. It can be praised plainly because the reasons are already visible.",
        "That is the strange pleasure of editing a catalog: the work is not just finding good things. It is removing the almost-good things until the remaining item feels less like a choice and more like a relief."
      ]},
      {heading:"The dissenting vote",body:[
        "Certainty should leave room for a serious objection. A chair may be exceptionally made and still too wide for an ordinary dining room. A coat may be beautiful and wrong for rain. Price, maintenance, availability and repair are not footnotes to taste; they are part of the thing being judged. Recording the strongest reason not to choose an item often reveals whether the recommendation is durable or merely enthusiastic.",
        "The final selection therefore carries a little abrasion from the argument that produced it. It is not perfect and does not need to pretend otherwise. It is the object whose limitations are understandable, whose strengths matter in use and whose alternatives introduce compromises we would rather not accept. The word best becomes credible only after the editor has explained, at least to himself, what it is best for."
      ]}
    ]
  },
  {
    slug:"in-defense-of-boring",
    title:"In Defense of Boring",
    dek:"Some things are good because they disappear into daily use. They do not announce a new lifestyle or demand a fresh vocabulary; they simply make the room, the drawer, or the morning work better. Boring, properly chosen, becomes a form of grace.",
    date:"2026-06-09",
    tags:["Defaults","Design","Daily Use"],
    imageTone:"linear-gradient(135deg,#f4efe3,#d8d4c9 52%,#8a8f85)",
    imageSrc:"/journal/image_6.webp",
    sections:[
      {body:[
        "Boring is underrated. A towel that dries quickly, a pen that starts every time, a theme that does not announce itself every three seconds. Much of good taste is simply the removal of needless incident. Not everything has to become a conversation piece. Some things are best when they become infrastructure: useful, calm, repeatable and difficult to improve without making them worse.",
        "The site keeps returning to quiet defaults because quiet defaults are where daily life spends most of its time. A chair is not usually experienced as an image. It is experienced as the place where the bag lands, the shirt is buttoned, the call is taken, the book is abandoned with a receipt inside it. A good object understands this and avoids melodrama."
      ]},
      {heading:"Useful boredom",body:[
        "The highest compliment for some objects is that you stop thinking about them. They become part of the room. This does not mean they lack character. It means the character is well behaved. The color is right in several kinds of light. The proportion remains steady next to other people’s things. The material ages without asking to be forgiven.",
        "Boring also protects the owner from reinvention fatigue. A wardrobe of excellent defaults is not a failure of imagination; it is a platform for having a life. The navy sweater, the white plate, the black suitcase, the plain towel — these are not admissions of defeat. They are agreements with the morning."
      ]},
      {heading:"Against novelty",body:[
        "Novelty is not the enemy, but it should earn its rent. A surprising object that improves a routine is welcome. A surprising object that merely demands attention is a small tax on the room. We prefer the former: delight with a job, color with a reason, oddness with manners.",
        "The boring thing, properly chosen, is often the brave thing. It resists the feed. It does not become obsolete because another shade of excitement has arrived. It waits, performs and slowly becomes difficult to replace."
      ]},
      {heading:"The long acquaintance",body:[
        "Time gives boring objects their proper character. The white plate develops a faint history of cutlery, the canvas bag softens at the handles and the plain wooden table records the places where cups repeatedly land. None was purchased as an heirloom. Their importance arrives through continuity: they remain available while more expressive possessions move through the room and out of it again.",
        "This is why replacement can feel strangely personal even when the object itself is generic. The old version had acquired the dimensions of habit. A new one may be cleaner, faster or more technically accomplished, yet still require the household to learn it. The best boring things spare us that negotiation for years. They do not disappear because they lack identity; they disappear because their identity has become inseparable from use."
      ]}
    ]
  },
  {
    slug:"notes-on-the-interface",
    title:"Notes on the Interface",
    dek:"Search, rows, themes, and the strange pleasure of reducing things until the page starts to breathe. The interface is a little machine for editorial commitment: enough structure to feel deliberate, enough quiet to let the recommendations remain the loudest part.",
    date:"2026-06-02",
    tags:["Interface","Search","Design"],
    imageTone:"linear-gradient(135deg,#c9d7d6,#829a96 50%,#1f1a17)",
    imageSrc:"/journal/image_1.webp",
    sections:[
      {body:[
        "The interface wants to be a table, a list, and a small machine. Rows should be obvious. Hovers should be gentle. Icons should not perform personality too loudly. The catalog is essentially a set of decisions, so the page should not behave like a magazine cover, a store window and a dashboard all at once. It should let the decisions sit there, available and slightly severe.",
        "Every piece of chrome has to earn its keep. When it does not, it leaves. The search icon becomes a small target rather than a grand portal. The theme button becomes a quiet joke. The row is allowed to do most of the work: category on the left, chosen item on the right, a rule that says this is one thought and the next row is another."
      ]},
      {heading:"Current bias",body:[
        "Pale background. Black type. A few named themes. A search card that behaves like a thought bubble, not a command center. The best interface here is not invisible; it has a point of view. But the point of view is editorial restraint, not decoration.",
        "The grid matters because it prevents the site from becoming merely minimal. Minimalism without structure can look like a mistake. The grid gives the odd choices somewhere to sit: the stacked section title, the narrow mono label, the product name at the far right, the share icon with just enough embarrassment to stay small."
      ]},
      {heading:"What stays",body:[
        "What stays is what helps a person move through the list without learning a new language. Rows click through to details. Product names go outward. Articles sit apart from the catalog but share its rhythm. The footer behaves like a set of quiet signals rather than a final sales pitch.",
        "A good interface should make the site feel edited before a single word is read. The spacing says there is patience here. The rules say there is order. The hover says the page is alive, but only if you ask."
      ]},
      {heading:"The useful interruption",body:[
        "Search is the exception to the catalog’s deliberate stillness. It interrupts the page because the reader has arrived with a question rather than a willingness to browse. The overlay should therefore feel like the same room brought closer, not a separate application dropped on top of it. The type, row height and rules remain familiar; only the pace changes as a long catalog contracts around a few entered letters.",
        "On a phone, this discipline matters more. The keyboard consumes half the available height and every decorative heading competes with the results. The interface must retain enough identity to feel intentional while surrendering anything that slows the next useful tap. A successful search is not the one with the most features. It is the one that helps a reader leave the search box and return to the object as quickly as possible."
      ]}
    ]
  }
];

export function getArticle(slug:string) {
  return journalArticles.find(article=>article.slug===slug);
}
