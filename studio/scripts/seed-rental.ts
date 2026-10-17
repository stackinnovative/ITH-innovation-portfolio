// One-off: copy the current rental equipment (content/site.ts + public/images/rental) into Sanity.
// Run from studio/: npm run seed   (safe to re-run — documents are replaced, not duplicated)
import { createReadStream } from "node:fs";
import { basename, resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import { rentalProductsFallback } from "../../content/site";

const client = getCliClient({ apiVersion: "2025-02-19" });
const publicDir = resolve(process.cwd(), "../public");

async function seed() {
  for (const [i, product] of rentalProductsFallback.entries()) {
    const file = resolve(publicDir, `.${product.image}`);
    const asset = await client.assets.upload("image", createReadStream(file), { filename: basename(file) });
    await client.createOrReplace({
      _id: `rentalProduct-${basename(file, ".jpg")}`,
      _type: "rentalProduct",
      name: product.name,
      category: product.category,
      spec: product.spec,
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      showWhole: product.fit === "contain",
      order: (i + 1) * 10,
    });
    console.log(`✓ ${product.name}`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
