// Loads the site's built-in content (content/site.ts `defaults` + photos in public/) into Sanity.
// Run from studio/: npm run seed
//
// Safe to re-run: documents that already exist are left alone (createIfNotExists), so the
// client's edits are never overwritten. First checks that every default field has a matching
// Studio field, so nothing is seeded that the client couldn't see or edit.
import { createReadStream } from "node:fs";
import { basename, resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import { defaults } from "../../content/site";
import { schemaTypes } from "../schemaTypes";

const client = getCliClient({ apiVersion: "2025-02-19" });
const publicDir = resolve(process.cwd(), "../public");

// Sanity document id (= type) → defaults section. Keep in sync with scripts/fetch-content.mjs.
const docs: Record<string, Record<string, unknown>> = {
  company: defaults.company,
  home: defaults.home,
  serviceFabrication: defaults.services.fabrication,
  serviceErection: defaults.services.erection,
  serviceHandling: defaults.services.handling,
  serviceOm: defaults.services.om,
  serviceRental: defaults.services.rental,
  projects: defaults.projects,
  contact: defaults.contact,
  enquiryForm: defaults.enquiryForm,
  chrome: defaults.chrome,
  seo: defaults.seo,
};

type SchemaField = { name: string; type: string; of?: { type: string; fields?: SchemaField[] }[] };

/** Every default key must exist in the schema, recursively into lists of objects. */
function checkFields(path: string, value: Record<string, unknown>, fields: SchemaField[], problems: string[]) {
  for (const [key, v] of Object.entries(value)) {
    const field = fields.find((f) => f.name === key);
    if (!field) {
      problems.push(`${path}.${key}`);
      continue;
    }
    const itemFields = field.of?.[0]?.fields;
    if (Array.isArray(v) && itemFields) {
      for (const item of v) if (item && typeof item === "object") checkFields(`${path}.${key}[]`, item as Record<string, unknown>, itemFields, problems);
    }
  }
}

const uploads = new Map<string, Promise<string>>();
function upload(src: string) {
  if (!uploads.has(src)) {
    const file = resolve(publicDir, `.${src}`);
    uploads.set(src, client.assets.upload("image", createReadStream(file), { filename: basename(file) }).then((a) => a._id));
  }
  return uploads.get(src)!;
}

const isPhoto = (v: unknown): v is { src: string; alt: string; position?: string } =>
  !!v && typeof v === "object" && "src" in v && "alt" in v;

let keyCounter = 0;

/** defaults value → Sanity value: photos uploaded, list items keyed, placeholder photo labels dropped. */
async function toSanity(value: unknown, key = ""): Promise<unknown> {
  if (value === undefined) return undefined;
  if (isPhoto(value)) {
    const [x, y] = (value.position ?? "50% 50%").split(" ").map((p) => parseFloat(p) / 100);
    return {
      _type: "image",
      asset: { _type: "reference", _ref: await upload(value.src) },
      alt: value.alt,
      hotspot: { _type: "sanity.imageHotspot", x, y, width: 0.6, height: 0.6 },
    };
  }
  if (typeof value === "string" && /photo/i.test(key)) return undefined; // "Photo: …" placeholder label
  if (Array.isArray(value)) {
    return Promise.all(
      value.map(async (item) =>
        item && typeof item === "object" ? { _key: `k${(keyCounter++).toString(36)}`, ...((await toSanity(item)) as object) } : item,
      ),
    );
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const converted = await toSanity(v, k);
      if (converted !== undefined) out[k] = converted;
    }
    return out;
  }
  return value;
}

async function seed() {
  const problems: string[] = [];
  for (const [id, content] of Object.entries(docs)) {
    const type = schemaTypes.find((t) => t.name === id) as unknown as { fields: SchemaField[] } | undefined;
    if (!type) problems.push(`${id} (no schema type)`);
    else checkFields(id, content, type.fields, problems);
  }
  if (problems.length) throw new Error(`Default fields missing from the Studio schema:\n  ${problems.join("\n  ")}`);

  for (const [id, content] of Object.entries(docs)) {
    const existing = await client.getDocument(id);
    if (existing) {
      console.log(`– ${id} (already exists, left as is)`);
      continue;
    }
    await client.createIfNotExists({ _id: id, _type: id, ...((await toSanity(content)) as object) });
    console.log(`✓ ${id}`);
  }

  for (const [i, product] of defaults.rentalProducts.entries()) {
    const id = `rentalProduct-${basename(product.image, ".jpg")}`;
    if (await client.getDocument(id)) {
      console.log(`– ${product.name} (already exists, left as is)`);
      continue;
    }
    await client.createIfNotExists({
      _id: id,
      _type: "rentalProduct",
      name: product.name,
      category: product.category,
      spec: product.spec,
      image: { _type: "image", asset: { _type: "reference", _ref: await upload(product.image) } },
      showWhole: product.fit === "contain",
      order: (i + 1) * 10,
    });
    console.log(`✓ ${product.name}`);
  }
}

seed().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
