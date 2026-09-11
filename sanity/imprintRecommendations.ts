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
        note:`hello@smallcertainty.com is the contact method we choose because it gives every kind of correspondence enough room to become useful. A correction, recommendation, proposal, rights question, or thoughtful disagreement can arrive through the same clear door. Email is neither novel nor intimate by default, but it remains the most dependable way to reach an editorial project without asking the sender to join a platform or perform in public.

The address is deliberately plain. “Hello” welcomes a broad range of messages without pretending there is a department behind every subject. The Small Certainty domain makes the destination unambiguous, while a concise subject line provides all the routing most notes require. Attachments, links, references, and a proper written record travel together, which makes the exchange easier to understand later than a chain of hurried notifications.

Email is not instantaneous, and that is useful. Messages can be read with attention, answered in order, and kept when they contain something worth returning to. Send one complete note rather than several fragments, identify any deadline, and include the relevant URL when reporting a correction. Large unsolicited files and generic publicity blasts are less persuasive than a short explanation of why something belongs here.

A good contact method should reduce ceremony without reducing seriousness. This address does that. It is open enough for a reader and specific enough for a collaborator, with none of the ambiguity of a comment thread or disappearing message. Write plainly, provide context, and expect a human reply when one is warranted. For Small Certainty, the inbox remains the proper front desk.`,
      },
      {
        productName:"Instagram DM",
        productHref:"https://www.instagram.com/smallcertainty/",
        note:"The side door for visual evidence. Send the odd shopfront, the convincing chair or the hotel lamp that has quietly solved a problem; anything that would lose its point if translated too quickly into prose.",
      },
      {
        productName:"X Reply",
        productHref:"https://x.com/smallcertainty",
        note:"Best reserved for a quick correction, a useful link or a compact public disagreement. If the entire case fits into a few lines, there is no need to build it a conference room.",
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
        note:`@smallcertainty is the Instagram account we choose because it gives the catalog a useful visual margin without turning the project into a stream of advertisements. Some judgments begin with a texture, proportion, package, shopfront, or room that needs to be seen before it can be explained. The account collects those observations and connects them to the longer arguments and recommendations on the site.

The format suits comparisons, close details, short field reports, and objects whose behavior can be understood in a few frames. Photography remains direct, captions carry actual information, and the feed can move between a chair, a street, a label, and a hotel without pretending they are the same subject. Stories provide a lighter working layer for provisional finds, while permanent posts retain the things worth finding again.

Instagram brings familiar limitations. Cropping can distort scale, an attractive surface can outrun a useful judgment, and the platform rewards frequency more reliably than care. The account should therefore remain selective. It will not reproduce every catalog entry or manufacture daily enthusiasm. Follow it for visual evidence and new additions, then use the site when the reasoning, links, and complete recommendation matter.

The best publication accounts extend an editorial sensibility rather than merely announcing that new content exists. @smallcertainty should make the project more immediate while preserving its standards of selection. It offers a place for looking, testing, and noticing in public, with enough restraint to keep each post distinct. For the full catalog, come here; for the visual notebook that accompanies it, that is the account to follow.`,
      },
      {
        productName:"Subway Hands",
        productHref:"https://www.instagram.com/subwayhands/",
        note:"New York commuters reduced to their most expressive detail. Hannah La Follette Ryan photographs hands gripping poles, holding books, resting on knees and revealing far more than their owners probably intended. It is street photography with the faces removed and the humanity left in.",
      },
      {
        productName:"Depths of Wikipedia",
        productHref:"https://www.instagram.com/depthsofwikipedia/",
        note:"Annie Rauwerda retrieves the encyclopedia’s best footnotes, improbable biographies and wonderfully specific disputes. The result is less a feed than a guided tour through everything humanity considered important enough to document and strange enough to forget.",
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
