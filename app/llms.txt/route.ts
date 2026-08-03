export const revalidate=3600;

export async function GET(){
  return new Response(`# Small Certainty

Small Certainty is an edited catalog of best-list recommendations.

Useful endpoints for agents:
- /api/catalog — complete structured catalog data, grouped by section.
- /api/search?q=best%20jacket — simple catalog search. Use natural queries like "best jacket", "best sofa", or "best typeface".

Human pages:
- / — catalog index.
- /journal — editorial journal index.
- /profile — site background.

Catalog item fields:
- label: the best-list row, such as "Best Towels".
- topPick: the current top recommendation.
- pagePath: the internal detail page.
- outboundUrl: the external site for the recommendation, when available.
- recommendations: ranked picks when available.
`,{
    headers:{
      "Content-Type":"text/plain; charset=utf-8",
    },
  });
}
