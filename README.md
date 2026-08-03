# Small Certainty

A minimal, CMS-driven editorial catalog built with Next.js, TypeScript, Tailwind, Sanity, and Storybook. Rows open internal recommendation pages, while product links go directly to their sites.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Sanity environment variables, the app displays the complete local seed preview. With them, published CMS content is fetched every 60 seconds. Sanity Studio is available at `/studio`.

## Storybook

```bash
npm run storybook
```

## Seed Sanity

Create a project and dataset, copy `.env.example` to `.env.local`, and provide:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_WRITE_TOKEN` (Editor token; only needed by the seed command)

Then run `npm run seed`. The script uses stable document IDs, so it is safe to run again.
