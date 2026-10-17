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

## Rental equipment CMS (Sanity)

The client adds, edits and removes rental equipment in Sanity Studio (`studio/`). Everything else on the site is still edited in `content/site.ts`.
Until `SANITY_PROJECT_ID` is set, the site uses the built-in list in `content/site.ts` (`rentalProductsFallback`).

One-time setup:

1. `cd studio && npm install`, then `npx sanity login` and `npx sanity init --env` (or create a project at sanity.io/manage). Copy `studio/.env.example` to `studio/.env` and fill in the project ID.
2. Load the current 7 items and photos: `npm run seed` (inside `studio/`).
3. Deploy the editor: `npm run deploy`. The client then logs in at `https://<SANITY_STUDIO_HOST>.sanity.studio`. Invite them under sanity.io/manage → Members (Editor role).
4. In Vercel, set `SANITY_PROJECT_ID`, `SANITY_DATASET` and `SANITY_REVALIDATE_SECRET`, then redeploy.
5. In sanity.io/manage → API → Webhooks, add a webhook: URL `https://<site>/api/revalidate`, dataset `production`, trigger on create/update/delete, filter `_type == "rentalProduct"`, HTTP method POST, secret = `SANITY_REVALIDATE_SECRET`.

After that, published changes appear on the site within a few seconds (or within an hour if the webhook fails). The dataset must stay **public** (the default), because the site reads it without a token.
