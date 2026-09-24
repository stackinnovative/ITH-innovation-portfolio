import { z } from "zod";
import { enquiryForm, services, type ServiceSlug } from "@/content/site";

// Shared by the form (client) and app/api/enquiry/route.ts (server).

const serviceSlugs = services.map((s) => s.slug) as [ServiceSlug, ...ServiceSlug[]];
const e = enquiryForm.errors;

/** Hidden field bots tend to fill in. Real visitors never see it. */
export const HONEYPOT_FIELD = "website";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, e.name).max(100, e.tooLong),
  company: z.string().trim().max(150, e.tooLong),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]*$/, e.phone)
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 8 && digits <= 15;
    }, e.phone),
  email: z.union([z.literal(""), z.email(e.email).max(150, e.tooLong)]),
  service: z.enum(serviceSlugs, e.service),
  details: z.string().trim().max(3000, e.tooLong),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof Enquiry;

export function isServiceSlug(value: string | null): value is ServiceSlug {
  return value !== null && (serviceSlugs as string[]).includes(value);
}

/** Label/value rows for the WhatsApp message and the email; empty optional fields are left out. */
export function enquiryRows(enquiry: Enquiry): [label: string, value: string][] {
  const f = enquiryForm.fields;
  const rows: [string, string][] = [
    [f.service.label, enquiryForm.serviceOptions[enquiry.service]],
    [f.name.label, enquiry.name],
    [f.company.label, enquiry.company],
    [f.phone.label, enquiry.phone],
    [f.email.label, enquiry.email],
    [f.details.label, enquiry.details],
  ];
  return rows.filter(([, value]) => value !== "");
}

export function whatsappMessage(enquiry: Enquiry) {
  const lines = enquiryRows(enquiry).map(([label, value]) => `${label}: ${value}`);
  return [enquiryForm.whatsappIntro, "", ...lines].join("\n");
}
