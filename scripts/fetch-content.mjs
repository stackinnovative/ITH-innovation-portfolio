// Pulls the client's content from Sanity into content/cms.generated.json, which content/site.ts
// merges over its defaults. Runs before `next build` (strict) and before `next dev` / after
// `npm install` (with --optional: a failed fetch keeps whatever is there instead of failing).
//
// Strict mode exits non-zero on any error, so a failed Vercel build keeps the last good deploy
// live instead of publishing the site with default content.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../content/cms.generated.json", import.meta.url));
const optional = process.argv.includes("--optional");
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2025-02-19";

// Sanity document id → key in content/site.ts `defaults`.
const DOCS = {
  company: "company",
  home: "home",
  serviceFabrication: "services.fabrication",
  serviceErection: "services.erection",
  serviceHandling: "services.handling",
  serviceOm: "services.om",
  serviceRental: "services.rental",
  projects: "projects",
  contact: "contact",
  enquiryForm: "enquiryForm",
  chrome: "chrome",
  seo: "seo",
};

const query = `{
  "docs": *[_id in $ids],
  "rentalProducts": *[_type == "rentalProduct" && defined(image.asset)] | order(order asc, name asc) {
    name, category, spec,
    "image": image.asset->url,
    "fit": select(showWhole == true => "contain", "cover")
  }
}`;

function write(content) {
  const json = `${JSON.stringify(content, null, 2)}\n`;
  if (existsSync(OUT) && readFileSync(OUT, "utf8") === json) return;
  writeFileSync(OUT, json);
}

/** image-<id>-<w>x<h>-<ext> → CDN URL, no extra API call needed. */
function imageUrl(ref) {
  const [, id, size, ext] = ref.split("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${ext}`;
}

/** Strip Sanity bookkeeping (_id, _key, …) and nulls; turn image fields into { src, alt, position }. */
function clean(value) {
  if (Array.isArray(value)) return value.map(clean).filter((v) => v !== undefined);
  if (value === null || typeof value !== "object") return value ?? undefined;
  if (value._type === "image") {
    if (!value.asset?._ref) return undefined;
    const photo = { src: imageUrl(value.asset._ref), alt: value.alt ?? "" };
    if (value.hotspot) photo.position = `${Math.round(value.hotspot.x * 100)}% ${Math.round(value.hotspot.y * 100)}%`;
    return photo;
  }
  const out = {};
  for (const [key, v] of Object.entries(value)) {
    if (key.startsWith("_")) continue;
    const cleaned = clean(v);
    if (cleaned !== undefined) out[key] = cleaned;
  }
  return out;
}

function setPath(target, path, value) {
  const keys = path.split(".");
  let node = target;
  for (const key of keys.slice(0, -1)) node = node[key] ??= {};
  node[keys.at(-1)] = value;
}

async function main() {
  if (!projectId) {
    console.log("[content] SANITY_PROJECT_ID not set — using the defaults in content/site.ts");
    write({});
    return;
  }

  const params = new URLSearchParams({ query, $ids: JSON.stringify(Object.keys(DOCS)), perspective: "published" });
  const res = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params}`);
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
  const { result } = await res.json();

  const content = {};
  for (const doc of result.docs) setPath(content, DOCS[doc._id], clean(doc));
  content.rentalProducts = clean(result.rentalProducts);

  write(content);
  console.log(`[content] ${result.docs.length} documents and ${result.rentalProducts.length} rental items from Sanity`);
}

main().catch((error) => {
  if (optional) {
    console.warn("[content] could not fetch from Sanity — keeping existing content:", error.message);
    if (!existsSync(OUT)) write({});
    return;
  }
  console.error("[content]", error);
  process.exit(1);
});
