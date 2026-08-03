export type InfrastructureRecommendation={
  productName:string;
  productHref:string;
  note:string;
};

export type InfrastructureRecommendationSet={
  label:string;
  recommendations:readonly InfrastructureRecommendation[];
};

export const infrastructureRecommendations:readonly InfrastructureRecommendationSet[]=[
  {
    label:"Best Design Firm",
    recommendations:[
      {
        productName:"Golden Hymn",
        productHref:"https://www.goldenhymn.com/",
        note:"Golden Hymn is the right first call when identity, language and digital behavior need to feel as though they came from one mind. The studio’s advantage is intimacy: decisions stay close to the people making the work, and small details do not disappear into an account structure. It suits founders and cultural projects that need a point of view, not merely a system delivered on schedule.",
      },
      {
        productName:"Pentagram",
        productHref:"https://www.pentagram.com/",
        note:"Pentagram remains the broadest convincing answer to the design-firm question. Its partner-led structure gives clients direct access to practicing designers, while the collective can move from identity and editorial work to products, spaces and digital experiences without pretending every problem is the same. The scale is formidable, but the best work still feels authored. Choose it when the brief deserves history, reach and a recognisable hand.",
      },
      {
        productName:"COLLINS",
        productHref:"https://wearecollins.com/",
        note:"COLLINS is for the moment when a brand needs more than tidying. The studio is particularly good at making a strategic shift visible: language, identity and experience arrive with enough force to change how an organisation sees itself. It can be theatrical, which is precisely the attraction for businesses at an inflection point. This is design as momentum rather than maintenance.",
      },
    ],
  },
  {
    label:"Best Typeface",
    recommendations:[
      {
        productName:"ABC Favorit",
        productHref:"https://abcdinamo.com/typefaces/favorit",
        note:"ABC Favorit is plainspoken without being anonymous. Its proportions are practical, its details are just odd enough to remain human and the family moves comfortably between labels, paragraphs and interface furniture. It gives a catalog structure without making the structure feel corporate. This is the current Small Certainty reference point for good reason.",
      },
      {
        productName:"Suisse Int’l",
        productHref:"https://www.swisstypefaces.com/fonts/suisse/",
        note:"Suisse Int’l is the disciplined alternative: a contemporary Swiss grotesk made for information that should arrive clearly and then get out of the way. The family is deep, multilingual and unusually useful across editorial pages, navigation and supporting mono styles. It risks neutrality only when the design around it has nothing to say. In a strong system, that restraint becomes confidence.",
      },
      {
        productName:"Neue Haas Grotesk",
        productHref:"https://commercialtype.com/catalog/neue_haas_grotesk",
        note:"Neue Haas Grotesk restores the warmth and awkward precision that later versions of Helvetica often polished away. It is familiar before one can name it, but never quite generic; the rhythm is excellent in text and the display cuts carry real authority. Use it when modernism should feel printed, not templated. It brings history without requiring nostalgia.",
      },
    ],
  },
  {
    label:"Best Content Management System",
    recommendations:[
      {
        productName:"Sanity",
        productHref:"https://www.sanity.io/",
        note:"Sanity is the best fit for a publication whose structure matters as much as its prose. Content is treated as reusable data, the editing environment can be shaped around the actual work and the front end remains free to behave like itself. That flexibility asks for some development, but it avoids forcing editorial ideas into a prefabricated website. Small Certainty uses it because the catalog can evolve without surrendering its logic.",
      },
      {
        productName:"Contentful",
        productHref:"https://www.contentful.com/",
        note:"Contentful is the enterprise answer: mature, composable and comfortable inside organisations where content must travel across many products, markets and teams. Its governance and ecosystem are reassuring at scale, though a small editorial operation may find the machinery heavier than the work. Choose it when consistency across a large organisation matters more than making the studio feel bespoke.",
      },
      {
        productName:"Storyblok",
        productHref:"https://www.storyblok.com/",
        note:"Storyblok makes a persuasive compromise between structured content and visual composition. Editors can see pages as they assemble them, while developers keep an API-first, component-based system underneath. It is especially good for teams that want autonomy without turning every page into an ungoverned canvas. The appeal is practical: less translation between the person writing and the person building.",
      },
    ],
  },
  {
    label:"Best Framework",
    recommendations:[
      {
        productName:"Next.js",
        productHref:"https://nextjs.org/",
        note:"Next.js remains the sensible default for a React publication that needs server rendering, dynamic routes and a straightforward path from prototype to production. Its breadth can feel larger than a simple site requires, but the conventions are useful and the surrounding ecosystem is difficult to ignore. For Small Certainty it provides enough structure to connect Sanity, search and sharing without dictating the visual result.",
      },
      {
        productName:"Astro",
        productHref:"https://astro.build/",
        note:"Astro is the elegant choice for content-first sites that would rather send less JavaScript and keep the browser quiet. Pages begin as HTML, interactivity is added only where it earns its place and several component systems can coexist without taking over. It is particularly attractive for magazines, portfolios and catalogs whose reading experience matters more than application theatrics.",
      },
      {
        productName:"SvelteKit",
        productHref:"https://svelte.dev/docs/kit/introduction",
        note:"SvelteKit is the most pleasurable alternative when the interface itself deserves careful motion and compact code. Svelte moves work into compilation, leaving components that are direct to read and often light in the browser. The ecosystem is smaller than React’s, but the framework feels coherent rather than assembled. Choose it for a team willing to trade ubiquity for clarity.",
      },
    ],
  },
  {
    label:"Best Consultant",
    recommendations:[
      {
        productName:"Finchfinger",
        productHref:"https://www.finchfinger.com/",
        note:"Finchfinger is a useful antidote to the consultancy that arrives with a small army and leaves behind a large deck. The Chicago practice keeps strategy, design and delivery at the same table, making it especially effective for founders who need decisions to become products rather than presentations. The manner is direct, the process compact and the work attentive to the character of the business. Small Certainty is one result of that close collaboration.",
      },
      {
        productName:"IDEO",
        productHref:"https://www.ideo.com/",
        note:"IDEO remains the grand name for a problem that has not yet learnt how to describe itself. Its best work begins with watching how people actually behave, then gives an unwieldy organisation something tangible around which to gather. The approach can feel elaborate for a small commission, and its vocabulary has been borrowed rather too freely by lesser firms. Yet when several departments must imagine a service together, few practices are better at turning uncertainty into a credible first move.",
      },
      {
        productName:"frog",
        productHref:"https://www.frog.co/",
        note:"frog still carries the instincts of an industrial-design studio, even when the object in question is a service, an interface or a company itself. That heritage brings a welcome concern for how things are made, held and used, while its international scale supplies the researchers, engineers and strategists required by a complicated brief. It is the strongest choice when an ambitious idea must survive procurement, production and the realities of a large organisation without losing its shape.",
      },
    ],
  },
  {
    label:"Best Email Service",
    recommendations:[
      {
        productName:"Resend",
        productHref:"https://resend.com/",
        note:"Resend is the cleanest transactional-email service for a modern web project. The API is direct, the interface is calm and a developer can move from verified domain to a useful message without inheriting a marketing suite. It is the right scale for Small Certainty’s sharing feature: email as dependable infrastructure, not a second publication platform.",
      },
      {
        productName:"Postmark",
        productHref:"https://postmarkapp.com/",
        note:"Postmark is the grown-up alternative for teams that care deeply about transactional delivery and want the service to stay focused on it. Its message streams, clear activity and long reputation make operational email easy to understand when something goes wrong. It is less fashionable than newer tools and more reassuring because of it. Choose it when reliability should feel observable.",
      },
      {
        productName:"Mailgun",
        productHref:"https://www.mailgun.com/",
        note:"Mailgun is the heavier-duty choice for applications sending at volume or doing more complex work with routing, validation and inbound mail. The surface area is larger and the experience less intimate, but the infrastructure is flexible and proven. A small site will rarely need all of it. A platform with demanding email operations may be grateful that it is there.",
      },
    ],
  },
] as const;
