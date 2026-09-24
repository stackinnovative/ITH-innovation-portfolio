import { services, ui, type ServiceSlug } from "@/content/site";

// Section ids on the home page (match design/Main.dc.html).
export const serviceAnchors: Record<ServiceSlug, string> = {
  fabrication: "fabrication",
  erection: "erection",
  "heavy-equipment-handling": "handling",
  "operation-maintenance": "om",
  "equipment-rental": "rental",
};

export const sectionIds = {
  services: "services",
  industries: "industries",
  contact: "contact",
} as const;

export const routes = {
  home: "/",
  projects: "/projects",
  contact: "/contact",
} as const;

export function serviceHref(slug: ServiceSlug) {
  return `/services/${slug}`;
}

export const serviceNav = services.map((s) => ({
  num: s.num,
  slug: s.slug,
  label: s.navLabel,
  title: s.title,
  href: serviceHref(s.slug),
}));

export const secondaryNav = [
  { label: ui.projects, href: routes.projects },
  { label: ui.contact, href: routes.contact },
];

/** Unknown client facts are written as "[...]" in content/site.ts. */
export function isPlaceholder(value: string) {
  return value.includes("[");
}

// Placeholders must never turn into a dialable number (e.g. "919XXXXXXXXX" → "919").
export function telHref(phone: string) {
  return isPlaceholder(phone) ? "tel:" : `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailHref(email: string) {
  return isPlaceholder(email) ? "mailto:" : `mailto:${email}`;
}

export function whatsappHref(number: string) {
  return isPlaceholder(number) ? "https://wa.me/" : `https://wa.me/${number.replace(/\D/g, "")}`;
}
