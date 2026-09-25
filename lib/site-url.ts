// Absolute site URL for metadata, sitemap, robots and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL to the client's domain once it is live; Vercel's production URL is the fallback.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
