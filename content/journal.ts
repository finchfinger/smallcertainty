export type JournalImage = {
  url:string;
  alt:string;
  caption?:string;
  credit?:string;
};

export type JournalContentBlock =
  | {
      _key:string;
      _type:"articleTextSection";
      heading?:string;
      body:string[];
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
};

export const journalArticles:JournalArticle[]=[
  {
    slug:"veronica-ditting-editing-is-the-design",
    title:"Veronica Ditting: Editing Is the Design",
    dek:"A designer who begins with questions, gives language the same authority as photography and regards clarity as the result of editing rather than subtraction. Veronica Ditting’s work offers a useful model for publications that want a distinct voice without turning every page into a performance.",
    date:"2026-08-12",
    tags:["Design","Publishing","Print"],
    imageSrc:"/journal/features/ditting-type-specimen.jpg",
    author:"Small Certainty",
    sections:[
      {body:[
        "Graphic designers are often introduced through a signature: a colour, a typeface, a composition that can be recognised before it has been read. Veronica Ditting’s work resists that easy description. The continuity is not a look applied to unrelated material but a way of arranging the conversation between words, photographs, objects and the people responsible for them. A page feels particular because its contents have been understood closely enough to occupy it with confidence.",
        "That distinction made The Gentlewoman one of the most assured magazines of its period. Ditting served as art director from 2009 to 2019 and creative director from 2019 to 2021, helping establish a publication in which the portrait, the interview, the headline and the pace between them shared authority. The achievement was not minimalism in the familiar sense. Nothing important had been removed. Everything remaining had been given a reason to be where it was."
      ]},
      {heading:"Begin with the question",body:[
        "Ditting has described herself as someone who asks many questions. This is more than studio temperament. It moves design away from the search for an immediate formal answer and toward the slower work of determining what the project is trying to say. Her route through industrial design in Dortmund and then graphic design at Amsterdam’s Gerrit Rietveld Academie encouraged that attention to systems, objects and use. By the time she established her London studio, the method was already editorial: begin with the material, identify its relationships and allow the form to emerge from them.",
        "Language is part of that material. Ditting has spoken about the sound of a headline as well as its appearance, and about how a name can change as it moves between Spanish, German, Dutch and English. This sensitivity matters on a printed page. Words have rhythm before they have style; a title can arrive sharply, hesitate or carry too much ceremony. Treating language as something to listen to prevents typography from becoming decoration around a sentence that the designer has never properly heard."
      ]},
      {heading:"Several authors, one publication",body:[
        "A magazine is built by people with different forms of attention. The editor hears the argument, the writer tests its sequence, the photographer notices an expression and the designer controls the conditions in which all three will be encountered. Ditting’s best work does not flatten these contributions into a house style. It gives each enough room to remain legible while making the issue feel like a single object. The publication is coherent because its parts have been edited together, not because they have been forced into visual agreement.",
        "This is also why collaboration in her studio is not a courtesy added after the concept. The studio describes its practice as editorially driven and works closely with photographers, artists, editors and writers. The designer’s role is neither invisible service nor solitary authorship. It is to keep the exchange precise: to know when an image needs scale, when a caption needs proximity, when a sequence needs interruption and when the most intelligent decision is to leave a strong contribution alone."
      ]},
      {heading:"Clarity is not minimalism",body:[
        "Ditting has objected to the word minimal because it mistakes the visible result for the labour behind it. Clarity is edited. It depends on choices, comparisons and the confidence to determine what carries meaning. A sparse page can be vague, while a densely populated one can be exact. The relevant question is not how little is present but whether every element understands its task and whether the reader can feel the order without being instructed to admire it.",
        "This approach offers a useful correction to the polished emptiness that has become a default language for fashion and culture. Space alone does not create authority. A thin serif, a pale photograph and a generous margin can become as formulaic as any crowded catalogue. Ditting’s pages feel calm because the relationships are active: scale changes from story to story, language establishes pace and photography is allowed to make an argument rather than merely supply atmosphere. The confidence comes from decisions, not from vacancy."
      ]},
      {heading:"Scale changes the reading",body:[
        "Ditting’s collection of more than one hundred miniature books makes visible a concern that runs throughout her practice. Scale is not simply a production specification; it changes the behaviour of reading. A very small book demands intimacy and compression. A large page can make a photograph architectural. An invitation the size of a card enters a pocket and travels, while a magazine remains on a table and gathers a different kind of time. Each format establishes a social distance between object and reader.",
        "The studio has repeatedly used this fact rather than treating print dimensions as neutral containers. A miniature compendium made for The Gentlewoman’s tenth anniversary condensed a decade of editorial identity into an object that could be held in one hand. The Folio Folio Folio exhibition in Kyoto extended the argument by presenting publications, invitations and printed matter as physical decisions rather than flat images from an archive. The lesson is simple but often ignored: reading begins before the first sentence, at the moment the object tells the hand how to approach it."
      ]},
      {heading:"A useful signature",body:[
        "Ditting’s studio has worked across fashion houses, museums, galleries and publications, including Hermès, Miu Miu, Maison Margiela, The Row, White Cube and the Stedelijk Museum. The clients differ, but the method survives the change of context because it is not dependent on a fixed aesthetic. Each commission can develop its own proportion, tone and tempo while remaining recognisably the work of a designer interested in how content becomes public.",
        "For an independent publication, this may be the most valuable part of her example. A strong identity does not require every story to wear the same clothes. It requires standards of attention that can be repeated without producing repetition: ask better questions, read the words, respect the photograph, choose the scale and edit until the arrangement feels inevitable. The resulting signature is quieter than a logo and more durable than a trend. It is the accumulated evidence that somebody has considered the whole thing."
      ]}
    ],
    content:[
      {_key:"ditting-opening",_type:"articleTextSection",body:[
        "Graphic designers are often introduced through a signature: a colour, a typeface, a composition that can be recognised before it has been read. Veronica Ditting’s work resists that easy description. The continuity is not a look applied to unrelated material but a way of arranging the conversation between words, photographs, objects and the people responsible for them. A page feels particular because its contents have been understood closely enough to occupy it with confidence.",
        "That distinction made The Gentlewoman one of the most assured magazines of its period. Ditting served as art director from 2009 to 2019 and creative director from 2019 to 2021, helping establish a publication in which the portrait, the interview, the headline and the pace between them shared authority. The achievement was not minimalism in the familiar sense. Nothing important had been removed. Everything remaining had been given a reason to be where it was."
      ]},
      {_key:"ditting-specimens",_type:"imageArrangement",layout:"split",primaryImage:{url:"/journal/features/ditting-type-specimen.jpg",alt:"A page from the 1923 American Type Founders specimen book",caption:"A specimen page makes type both language and object",credit:"American Type Founders, 1923 / Wikimedia Commons / Public domain"},secondaryImage:{url:"/journal/features/ditting-type-case.jpg",alt:"An illustrated classical typesetter’s sorting case",caption:"The compositor’s case: an editorial system made physical",credit:"Christian Friedrich Gessner, 1740 / Wikimedia Commons / Public domain"}},
      {_key:"ditting-question",_type:"articleTextSection",heading:"Begin with the question",body:[
        "Ditting has described herself as someone who asks many questions. This is more than studio temperament. It moves design away from the search for an immediate formal answer and toward the slower work of determining what the project is trying to say. Her route through industrial design in Dortmund and then graphic design at Amsterdam’s Gerrit Rietveld Academie encouraged that attention to systems, objects and use. By the time she established her London studio, the method was already editorial: begin with the material, identify its relationships and allow the form to emerge from them.",
        "Language is part of that material. Ditting has spoken about the sound of a headline as well as its appearance, and about how a name can change as it moves between Spanish, German, Dutch and English. This sensitivity matters on a printed page. Words have rhythm before they have style; a title can arrive sharply, hesitate or carry too much ceremony. Treating language as something to listen to prevents typography from becoming decoration around a sentence that the designer has never properly heard."
      ]},
      {_key:"ditting-authors",_type:"articleTextSection",heading:"Several authors, one publication",body:[
        "A magazine is built by people with different forms of attention. The editor hears the argument, the writer tests its sequence, the photographer notices an expression and the designer controls the conditions in which all three will be encountered. Ditting’s best work does not flatten these contributions into a house style. It gives each enough room to remain legible while making the issue feel like a single object. The publication is coherent because its parts have been edited together, not because they have been forced into visual agreement.",
        "This is also why collaboration in her studio is not a courtesy added after the concept. The studio describes its practice as editorially driven and works closely with photographers, artists, editors and writers. The designer’s role is neither invisible service nor solitary authorship. It is to keep the exchange precise: to know when an image needs scale, when a caption needs proximity, when a sequence needs interruption and when the most intelligent decision is to leave a strong contribution alone."
      ]},
      {_key:"ditting-clarity",_type:"articleTextSection",heading:"Clarity is not minimalism",body:[
        "Ditting has objected to the word minimal because it mistakes the visible result for the labour behind it. Clarity is edited. It depends on choices, comparisons and the confidence to determine what carries meaning. A sparse page can be vague, while a densely populated one can be exact. The relevant question is not how little is present but whether every element understands its task and whether the reader can feel the order without being instructed to admire it.",
        "This approach offers a useful correction to the polished emptiness that has become a default language for fashion and culture. Space alone does not create authority. A thin serif, a pale photograph and a generous margin can become as formulaic as any crowded catalogue. Ditting’s pages feel calm because the relationships are active: scale changes from story to story, language establishes pace and photography is allowed to make an argument rather than merely supply atmosphere. The confidence comes from decisions, not from vacancy."
      ]},
      {_key:"ditting-sample",_type:"imageArrangement",layout:"full",primaryImage:{url:"/journal/features/ditting-type-sample.png",alt:"A specimen showing one typeface across several weights and sizes",caption:"Difference within a system: one family, several voices",credit:"Esinconis / Wikimedia Commons / CC0"}},
      {_key:"ditting-scale",_type:"articleTextSection",heading:"Scale changes the reading",body:[
        "Ditting’s collection of more than one hundred miniature books makes visible a concern that runs throughout her practice. Scale is not simply a production specification; it changes the behaviour of reading. A very small book demands intimacy and compression. A large page can make a photograph architectural. An invitation the size of a card enters a pocket and travels, while a magazine remains on a table and gathers a different kind of time. Each format establishes a social distance between object and reader.",
        "The studio has repeatedly used this fact rather than treating print dimensions as neutral containers. A miniature compendium made for The Gentlewoman’s tenth anniversary condensed a decade of editorial identity into an object that could be held in one hand. The Folio Folio Folio exhibition in Kyoto extended the argument by presenting publications, invitations and printed matter as physical decisions rather than flat images from an archive. The lesson is simple but often ignored: reading begins before the first sentence, at the moment the object tells the hand how to approach it."
      ]},
      {_key:"ditting-signature",_type:"articleTextSection",heading:"A useful signature",body:[
        "Ditting’s studio has worked across fashion houses, museums, galleries and publications, including Hermès, Miu Miu, Maison Margiela, The Row, White Cube and the Stedelijk Museum. The clients differ, but the method survives the change of context because it is not dependent on a fixed aesthetic. Each commission can develop its own proportion, tone and tempo while remaining recognisably the work of a designer interested in how content becomes public.",
        "For an independent publication, this may be the most valuable part of her example. A strong identity does not require every story to wear the same clothes. It requires standards of attention that can be repeated without producing repetition: ask better questions, read the words, respect the photograph, choose the scale and edit until the arrangement feels inevitable. The resulting signature is quieter than a logo and more durable than a trend. It is the accumulated evidence that somebody has considered the whole thing."
      ]}
    ]
  },
  {
    slug:"kluane-mountaineering-made-for-the-long-cold",
    title:"Kluane Mountaineering: Made for the Long Cold",
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
    title:"One Good Street: Jægersborggade, Copenhagen",
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
    title:"Weekly Certainties No. 001: The Useful Pile",
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
    title:"A Lamp for the Hour Before Dinner: The Domestic Pool of Light",
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
