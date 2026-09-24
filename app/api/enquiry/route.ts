import { Resend } from "resend";
import { z } from "zod";
import { company, enquiryForm } from "@/content/site";
import { enquiryRows, enquirySchema, HONEYPOT_FIELD, type Enquiry } from "@/lib/enquiry";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function buildEmail(enquiry: Enquiry) {
  const rows = enquiryRows(enquiry);
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="vertical-align:top;color:#545A61;white-space:nowrap"><strong>${escapeHtml(label)}</strong></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;
  const who = enquiry.company ? `${enquiry.name} (${enquiry.company})` : enquiry.name;
  const subject = `${enquiryForm.emailSubject}: ${enquiryForm.serviceOptions[enquiry.service]} — ${who}`;
  return { subject, text, html };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled → a bot. Answer as if it worked so it doesn't retry, but send nothing.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>)[HONEYPOT_FIELD]) {
    return Response.json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: z.flattenError(parsed.error).fieldErrors }, { status: 400 });
  }

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    console.error("Enquiry email not configured: set RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL.");
    return Response.json({ ok: false }, { status: 500 });
  }

  const enquiry = parsed.data;
  const { subject, text, html } = buildEmail(enquiry);
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: `${company.shortName} Website <${ENQUIRY_FROM_EMAIL}>`,
    to: ENQUIRY_TO_EMAIL.split(",").map((address) => address.trim()),
    replyTo: enquiry.email || undefined,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("Resend failed to send enquiry:", error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
