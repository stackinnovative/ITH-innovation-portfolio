import { rentalProductsFallback, type RentalProduct } from "@/content/site";

// Rental equipment is managed by the client in Sanity Studio (studio/).
// Read over Sanity's public HTTP query API with plain fetch, so no Sanity SDK ships with the site.
// Pages stay static: the result is cached under RENTAL_TAG and refreshed by the Sanity webhook
// (app/api/revalidate/route.ts), with an hourly refresh as a backstop.

export const RENTAL_TAG = "rental";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2025-02-19";

const query = `*[_type == "rentalProduct" && defined(image.asset)] | order(order asc, name asc) {
  name,
  category,
  spec,
  "image": image.asset->url,
  "fit": select(showWhole == true => "contain", "cover")
}`;

export async function getRentalProducts(): Promise<RentalProduct[]> {
  if (!projectId) return rentalProductsFallback;

  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { cache: "force-cache", next: { tags: [RENTAL_TAG], revalidate: 3600 } });
    if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
    const { result } = (await res.json()) as { result: (Omit<RentalProduct, "spec"> & { spec: string | null })[] };
    return result.map((p) => ({ ...p, spec: p.spec ?? undefined }));
  } catch (error) {
    console.error("[rental] falling back to local product list", error);
    return rentalProductsFallback;
  }
}
