import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { RENTAL_TAG } from "@/lib/rental";

// Sanity webhook: fires when the client publishes, edits or deletes rental equipment,
// so the rental pages update within seconds instead of waiting for the hourly refresh.
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();

  if (!secret || !signature || !(await isValidSignature(body, signature, secret))) {
    return Response.json({ ok: false }, { status: 401 });
  }

  revalidateTag(RENTAL_TAG, "max");
  return Response.json({ ok: true });
}
