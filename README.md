This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Content (Sanity CMS)

All copy, lists and photos are edited by the client in Sanity Studio (`studio/`), deployed at `https://<SANITY_STUDIO_HOST>.sanity.studio`.

How it works:

- `scripts/fetch-content.mjs` runs before every `npm run build` / `npm run dev` (and after `npm install`). It pulls the published content into `content/cms.generated.json` (git-ignored).
- `content/site.ts` merges that over its `defaults`: any field left empty in the CMS falls back to the default. Components import from `content/site.ts` as before.
- Publishing in the Studio calls a Vercel **Deploy Hook**, which rebuilds the site (about a minute). The site stays fully static.
- If Sanity is unreachable during a Vercel build, the build fails and the last good version stays live.
- Without `SANITY_PROJECT_ID` the site builds from the defaults alone.

**Adding a field:** add it to `defaults` in `content/site.ts` (and the export that uses it), add a matching field (same name) in `studio/schemaTypes/`, then `npm run deploy` in `studio/`. `npm run seed` refuses to run if a default field has no Studio field.

One-time setup:

1. `cd studio && npm install`, `npx sanity login`, copy `studio/.env.example` to `studio/.env` and fill in the project ID.
2. `npm run seed` (in `studio/`) loads the defaults and photos into Sanity. Existing documents are never overwritten, so it is safe to re-run.
3. `npm run deploy` (in `studio/`) publishes the Studio. Invite editors under sanity.io/manage → Members.
4. Vercel → Settings → Environment Variables: `SANITY_PROJECT_ID`, `SANITY_DATASET`.
5. Vercel → Settings → Git → **Deploy Hooks**: create one for branch `main` and copy its URL.
6. sanity.io/manage → API → **Webhooks**: URL = the deploy hook URL, dataset `production`, trigger on create/update/delete, no filter, HTTP method POST.

The dataset must stay **public** (the default): the build reads it without a token.
