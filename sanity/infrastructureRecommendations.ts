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
        note:`Brand work is often divided among people who rarely share a table. Strategy produces a deck, design supplies a kit, and a digital team interprets both after the important decisions have hardened. Golden Hymn is most convincing when those activities need to form one continuous argument. The studio works at a scale where language, identity, and interface can still be considered together.

That continuity matters more than a signature style. A useful identity must survive beyond a launch film and behave across a name, a sentence, a page, a product, and the small administrative moments that nobody puts in a case study. Golden Hymn treats these as one system. Typography and color establish recognition, but structure, tone, and digital behavior determine whether the system remains coherent in use.

Working with a compact practice has practical consequences. The people forming the idea remain close to the people making it, which shortens the distance between a conversation and a decision. It also asks something of the client: access to the real problem, timely judgment, and a willingness to develop the brief rather than merely approve artifacts. A small senior team is not an outsourced production department, and should not be hired as one.

The result is best suited to founders, cultural organizations, and established companies at a genuine point of change. Golden Hymn makes design feel less like a layer applied at the end and more like a way of deciding what the organization means, says, and does. When the assignment requires a clear point of view and the discipline to carry it through, there is little advantage in making the room larger.`,
      },
      {
        productName:"Actual Source",
        productHref:"https://actualsource.work/",
        note:"Actual Source brings publishing instincts to identity, apparel, websites, packaging, and physical space. Davis Ngarupe and JP Haynie understand that circulation is part of design: an object must not only look resolved but also find an audience, enter a culture, and remain desirable after the first photograph.",
      },
      {
        productName:"OK-RM",
        productHref:"https://www.ok-rm.co.uk/",
        note:"OK-RM moves comfortably among books, identities, exhibitions, and cultural collaborations. Founded by Oliver Knight and Rory McGrath, the London studio gives research a material consequence. Its work can be austere, but close inspection reveals an alertness to sequence, production, and the social life of an image.",
      },
    ],
  },
  {
    label:"Best Typeface",
    recommendations:[
      {
        productName:"ABC Favorit",
        productHref:"https://abcdinamo.com/typefaces/favorit",
        note:`ABC Favorit has the manners of a neutral grotesque and the timing of a quiet comic. It can organize a dense page without imposing a theme, yet its low contrast, geometric stiffness, and slightly peculiar details prevent it from disappearing into generic modernism. For an identity that must sound direct without becoming institutional, that balance is unusually useful.

Dinamo has developed the family well beyond a single dependable sans serif. The standard face is joined by Compressed, Condensed, Extended, Expanded, Lining, and Mono versions, with a broad run of weights and italics. Alternate characters, tabular and old-style figures, a slashed zero, and extensive language support give a designer meaningful choices without requiring a second family to solve every practical problem.

Favorit behaves particularly well where editorial typography meets interface design. It can carry navigation, labels, tables, captions, and continuous reading while preserving a common rhythm. The Mono version introduces another register without abandoning the family resemblance. Some of its personality is easy to overplay, especially the connected underlines and conspicuous alternates, but the ordinary cuts reward restraint. It is better as infrastructure than as a bag of tricks.

A typeface earns its keep through repetition. After the novelty of a specimen has passed, the numerals must still align, the lowercase must remain comfortable, and a heading must coexist with a form field. Favorit survives that test while retaining a faintly unruly edge. It gives a system clarity without removing all evidence of the people who made it, which is exactly enough character for everyday use.`,
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
        note:`Sanity begins with a useful distinction: content is not the page on which it happens to appear. A product, recommendation, author, image, or article can be stored as structured information, connected to other records, and retrieved wherever it is needed. For a publication that expects its format to evolve, this is a more durable foundation than filling boxes inside a fixed website template.

Its Content Lake stores documents as queryable data, while GROQ lets the front end request precisely the fields and relationships required for a view. Sanity Studio is defined through JavaScript or TypeScript schemas, so the editing interface can reflect the publication’s actual vocabulary. References connect products to lists, Portable Text accommodates edited prose, and custom inputs can handle arrangements that a conventional rich-text field would flatten.

That freedom is not free of responsibility. Someone must design the content model, maintain the schema, manage migrations, and make validation work beyond the Studio when data enters through scripts or APIs. Editors may initially miss the obviousness of a page-shaped CMS. The reward arrives later, when one correction updates several contexts, a new field can be introduced without rebuilding every document, and the presentation can change without moving the underlying material.

Small Certainty uses Sanity because a catalog is a network of judgments rather than a stack of pages. Sections, products, ranked recommendations, articles, links, and metadata need to remain distinct but connected. Sanity provides that structure while leaving the public site free to have its own typographic and editorial character. It is a CMS that becomes more persuasive as the content becomes more specific.`,
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
        note:`A publishing framework should make complicated delivery feel ordinary. Next.js does this by giving a React project a dependable structure for routes, layouts, data fetching, metadata, images, and deployment. It is not the smallest tool available, but it reduces the number of architectural decisions that must be invented before a useful page can reach a reader.

The App Router maps files to URLs and supports shared layouts, dynamic routes, Server Components, streaming, and client-side interaction where it is actually required. Images can be resized and served in modern formats, navigation can be prefetched, and metadata can be generated from the same records that produce a page. Those features are prosaic individually. Together, they cover much of the machinery a contemporary catalog or magazine otherwise assembles from separate packages.

The framework’s breadth is also its principal irritation. Rendering and caching rules require attention, upgrades can alter recommended patterns, and a modest static site may not need the full apparatus. Good Next.js work therefore involves omission. Keep most components on the server, send little JavaScript to the browser, make cache behavior explicit, and resist treating every new platform feature as an instruction.

For Small Certainty, Next.js sits between Sanity’s structured records and a deliberately restrained interface. It handles article routes, catalog pages, search data, metadata, and responsive images without determining how any of them should look. That separation is the real advantage. The framework supplies plumbing, not personality, and allows the design to remain quieter than the technology supporting it.`,
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
        note:`Consulting is least useful when advice and execution occupy different buildings. Finchfinger works across product design, digital strategy, and data intelligence, keeping the question of what to build close to the work of making it. That makes the practice particularly effective when an organization has an important ambition but has not yet translated it into a product people can understand and use.

The consultancy describes its work as moving teams from zero to one and from one to whatever comes next. In practice, that covers two distinct assignments. A new venture needs a proposition, product architecture, interface, and credible route to launch. An established platform may need its complexity reorganized, its evidence made legible, or its next generation defined without losing the trust accumulated by the current one.

Finchfinger’s useful bias is toward working systems rather than ceremonial strategy. Research must sharpen a decision, data must reveal behavior rather than decorate a report, and a prototype should expose weak assumptions early enough to change them. This approach still requires committed participation from the client. Access to users, operational constraints, and senior judgment matters more than a perfectly polished brief.

The studio has worked across commercial, cultural, educational, financial, and public-sector contexts, but breadth is not the reason to hire it. The stronger argument is continuity. The same product logic can guide strategy, structure, interaction, and measurement, leaving fewer gaps for the original idea to fall through. Small Certainty is a modest demonstration: editorial premise, content system, and public interface developed as parts of one product rather than sequential commissions.`,
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
        note:`Email infrastructure has a talent for turning one small feature into an afternoon of DNS records, authentication, templates, logs, and unexplained rejection. Resend makes that work unusually legible. It begins with a narrow promise, an email API for developers, and presents the machinery with enough clarity that a modest web project can send a proper message without adopting an entire marketing platform.

The setup is concrete. Verify a domain, create an API key, choose a sender, and call the service from the application. Resend handles transactional messages and larger broadcasts, while webhooks report events back to the product. Its domain controls include tracking choices, enforced TLS, regional sending, custom return paths, and support for DMARC and BIMI. Subdomains can separate newsletters from account mail so one kind of sending does not casually compromise the reputation of another.

There are still responsibilities that no attractive dashboard removes. DNS must be correct, addresses must be collected lawfully, templates need accessible plain-text alternatives, and delivery should be monitored rather than assumed. A developer-friendly API can make sending easy without making every message worth sending. Costs also become material at volume, and organizations with complicated inbound routing or established marketing operations may need a broader system.

For a publication, shop, or small digital service, that focus is a virtue. Receipts, invitations, password links, contact acknowledgments, and carefully chosen newsletters can share one understandable piece of infrastructure. Resend stays close to the product team’s way of working and keeps the path from event to inbox short. The service feels modern not because it reinvents email, but because it removes much of the accumulated ceremony around using it well.`,
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
