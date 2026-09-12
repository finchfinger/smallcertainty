export type ImprintRecommendationSet={
  slug:string;
  label:string;
  recommendations:{ productName:string; productHref?:string; note:string }[];
};

export const imprintRecommendations:ImprintRecommendationSet[]=[
  {
    slug:"email-address",
    label:"Best Email Address",
    recommendations:[
      {
        productName:"hello@smallcertainty.com",
        productHref:"mailto:hello@smallcertainty.com",
        note:`Email hello@smallcertainty.com with recommendations, corrections, questions, and useful disagreements. If there is an object, place, publication, or service that belongs in the catalog, send its name, a link, and a brief explanation of what makes it unusually good. We are interested in specific experience, not votes or enthusiasm measured by volume.

Corrections are especially welcome. Include the page in question, describe what is wrong, and provide a reliable source when one is available. Product links change, companies close, specifications drift, and even confident editors make mistakes. A clear note helps us repair the catalog quickly and properly.

Writers, photographers, designers, shops, manufacturers, and press offices may also use the address for pitches, image permissions, partnerships, review material, and rights inquiries. Tell us what you are proposing, why it suits Small Certainty, and whether there is a deadline. Please link to large files rather than attaching them without warning.

A short, complete email is ideal. There is no special submission form, hidden department, or preferred introduction. Write plainly, provide enough context to make the message useful, and send it to hello@smallcertainty.com. It reaches the people who edit the site.`,
      },
      {
        productName:"craig@craigslist.org",
        productHref:"https://www.craigslist.org/about/craig_newmark",
        note:"Craig Newmark’s address has the pleasing literalness of Craigslist itself: a first name attached to the thing he made, with no reception desk in between. It belongs to an earlier, more direct internet.",
      },
      {
        productName:"woz@woz.org",
        productHref:"https://woz.org/",
        note:"A nickname before and after the at sign is difficult to improve upon. The address is compact, unmistakable, and personal in the particular way that only an early internet identity can be.",
      },
    ],
  },
  {
    slug:"instagram-account",
    label:"Best Instagram Account",
    recommendations:[
      {
        productName:"@smallcertainty",
        productHref:"https://www.instagram.com/smallcertainty/",
        note:`Some judgments begin with a texture, proportion, package, shopfront, or room that needs to be seen before it can be explained. @smallcertainty gives the catalog that visual margin without turning the project into a stream of advertisements. The account collects observations made in the world and connects them to the longer arguments and recommendations on the site.

The format suits comparisons, close details, short field reports, and objects whose behavior can be understood in a few frames. Photography remains direct, captions carry actual information, and the feed can move between a chair, a street, a label, and a hotel without pretending they are the same subject. Stories provide a lighter working layer for provisional finds, while permanent posts retain the things worth finding again.

Instagram brings familiar limitations. Cropping can distort scale, an attractive surface can outrun a useful judgment, and the platform rewards frequency more reliably than care. The account should therefore remain selective. It will not reproduce every catalog entry or manufacture daily enthusiasm. Follow it for visual evidence and new additions, then use the site when the reasoning, links, and complete recommendation matter.

The best publication accounts extend an editorial sensibility rather than merely announcing that new content exists. @smallcertainty should make the project more immediate while preserving its standards of selection. It offers a place for looking, testing, and noticing in public, with enough restraint to keep each post distinct. For the full catalog, come here; for the visual notebook that accompanies it, that is the account to follow.`,
      },
      {
        productName:"@thesartorialist",
        productHref:"https://www.instagram.com/thesartorialist/",
        note:"Scott Schuman has spent two decades noticing how people actually wear clothes. The account remains strongest away from the runway, where posture, proportion, age, weather, and the habits of a city matter as much as labels. It is fashion photography with a memory for ordinary life.",
      },
      {
        productName:"@karelmartens",
        productHref:"https://www.instagram.com/karelmartens/",
        note:"Karel Martens turns printing tests, found forms, color studies, and fragments of daily work into a continuing lesson in looking. The account is rigorous without becoming solemn, showing how repetition and accident can keep a graphic practice alive after more than sixty years.",
      },
    ],
  },
  {
    slug:"x-account",
    label:"Best X Account",
    recommendations:[
      {
        productName:"Small Certainty",
        productHref:"https://x.com/smallcertainty",
        note:"Short notes from the catalog desk: new rows, revised picks, links worth keeping and small editorial arguments that do not yet require an essay.",
      },
      {
        productName:"Monocle",
        productHref:"https://x.com/monoclemagazine",
        note:"A measured stream of international affairs, design, business and travel from Monocle’s editors and correspondents.",
      },
      {
        productName:"Financial Times",
        productHref:"https://x.com/FinancialTimes",
        note:"Clear reporting on business, markets and public life, presented with the discipline of an established international newspaper.",
      },
    ],
  },
  {
    slug:"tiktok-account",
    label:"Best TikTok Account",
    recommendations:[
      {
        productName:"Small Certainty",
        productHref:"https://www.tiktok.com/@smallcertainty",
        note:"The moving version of the catalog: fast comparisons, object tests and small field reports that benefit from a hand, a table or thirty seconds of evidence.",
      },
      {
        productName:"NOWNESS",
        productHref:"https://www.tiktok.com/@nowness",
        note:"Short films that remember short does not have to mean hurried. Architecture, dance, fashion and art are given enough atmosphere to feel discovered rather than processed.",
      },
      {
        productName:"Letterboxd",
        productHref:"https://www.tiktok.com/@letterboxd",
        note:"Cinema culture without the velvet rope. Interviews, lists and festival encounters are delivered with enthusiasm, good timing and a refreshing willingness to admit that taste can also be fun.",
      },
    ],
  },
  {
    slug:"disclaimer",
    label:"Best Disclaimer",
    recommendations:[
      {
        productName:"Copyright 2026. All rights reserved.",
        note:"Small Certainty is edited, designed and maintained as a living catalog. Its original writing, photography, structure and interface may not be reproduced without permission. Product names, trademarks and outside works remain the property of their respective owners. Inclusion is editorial, never an assertion of ownership; a link may earn us a commission, but payment never determines what we select or how we rank it.",
      },
      {
        productName:"Monocle Terms & Conditions",
        productHref:"https://monocle.com/terms-and-conditions/",
        note:"Monocle’s terms identify the company, explain the agreement in plain sections and set out the practical rights of both reader and publisher without confusing the purpose of the document.",
      },
      {
        productName:"Penguin Random House Terms of Use",
        productHref:"https://global.penguinrandomhouse.com/terms-of-use/",
        note:"A conventional publishing notice that clearly separates copyright, trademarks, permitted personal use and third-party material. It is thorough, direct and written for an international catalogue of protected work.",
      },
    ],
  },
];
