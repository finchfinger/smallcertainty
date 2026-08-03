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
    slug:"weekly-certainties-001",
    title:"Weekly Certainties No. 001",
    dek:"Five small approvals from the current working pile: objects, references, and minor fixes that kept their charm after the first look. A weekly note for the things that are not quite permanent enough for the catalog, but too useful to leave in a tab.",
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
      ]}
    ]
  }
];

export function getArticle(slug:string) {
  return journalArticles.find(article=>article.slug===slug);
}
