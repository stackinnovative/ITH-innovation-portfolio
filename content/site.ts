// All site copy and data for ITH Innovation Private Limited.
//
// The client edits content in Sanity Studio (studio/). Before every `dev`/`build`,
// scripts/fetch-content.mjs pulls it into content/cms.generated.json, which is merged over the
// `defaults` below: any field the CMS leaves empty falls back to the default. `defaults` is also
// what `npm run seed` (in studio/) loads into a fresh Sanity project — its shape mirrors the Sanity
// documents, one key per document.
//
// Items in [SQUARE BRACKETS] are unknown client facts — replace when the client confirms.
// Text with {placeholders} is filled in below, e.g. {replyTime}, {phone}, {count}.

import cmsContent from "./cms.generated.json";

/** A photo, or a "Photo: …" placeholder label until the client supplies one. */
export type SitePhoto = { src: string; alt: string; position?: string };
type PhotoSlot = SitePhoto | string;

export type ServiceSlug =
  | "fabrication" | "erection" | "heavy-equipment-handling"
  | "operation-maintenance" | "equipment-rental";

// `fit: "contain"` for cut-out product shots on white. `spec` is optional (e.g. "up to 100 T").
export type RentalProduct = { name: string; category: string; spec?: string; image: string; fit: "cover" | "contain" };

const workPhotos = {
  millTandemLift: { src: "/images/work/mill-tandem-lift.jpg", alt: "Tandem crane lift of a large rotating mill shell at site" },
  coneLift: { src: "/images/work/cone-lift.jpg", alt: "Large steel cone lifted by crawler crane beside a plant structure", position: "50% 40%" },
  coneLiftStructure: { src: "/images/work/cone-lift-structure.jpg", alt: "Steel cone lifted over the top of a plant structure by crawler crane", position: "50% 35%" },
  coneRigging: { src: "/images/work/cone-rigging.jpg", alt: "Crew rigging a steel cone for lifting", position: "50% 70%" },
  kilnShellLift: { src: "/images/work/kiln-shell-lift.jpg", alt: "Kiln shell section lifted into place beside a building" },
  kilnLiftPiers: { src: "/images/work/kiln-lift-piers.jpg", alt: "Kiln section lifted onto its piers by mobile crane" },
  kilnTransport: { src: "/images/work/kiln-transport-trailer.jpg", alt: "Kiln shell moved through the plant on hydraulic trailers" },
  crawlerCraneLift: { src: "/images/work/crawler-crane-lift.jpg", alt: "Crawler crane lifting a kiln section at site", position: "50% 75%" },
} satisfies Record<string, SitePhoto>;

// ---------- Defaults (= seed data), one key per Sanity document ----------
export const defaults = {
  company: {
    name: "ITH Innovation Private Limited",
    shortName: "ITH Innovation",
    tagline: "Engineering · Fabrication",
    brandMark: "ITH",
    brandSuffix: "Private Limited", // desktop header
    brandSuffixShort: "Pvt Ltd.", // phone header
    phone: "[PHONE NUMBER]",
    whatsapp: "[WHATSAPP NUMBER, e.g. 919XXXXXXXXX]",
    email: "[EMAIL ADDRESS]",
    address: "[FULL WORKSHOP & YARD ADDRESS]",
    city: "[CITY, STATE]",
    gstin: "[GSTIN]",
    yearsInField: "[XX]+",
    replyTime: "[X] working hours",
  },

  home: {
    heroEyebrow: "Erection · Fabrication · O&M (Operation And Maintenance) · Rental",
    heroTitle: "We build the steel that keeps plants running.",
    heroBody: "We fabricate equipment and structures, erect them at site, move and lift heavy loads, maintain running plants, and rent out the tools to do it — one team, start to finish.",
    heroSecondaryCta: "Our 5 Services",
    heroPhotoMain: workPhotos.millTandemLift as PhotoSlot,
    heroPhotoSecondary: workPhotos.coneLift as PhotoSlot,
    stats: [
      { value: "{yearsInField}", label: "Years in the field" },
      { value: "59", label: "Client projects" },
      { value: "15", label: "Industries served" },
      { value: "400 T", label: "Jacking capacity" },
    ],
    shutdownEyebrow: "24×7 Shutdown Support",
    shutdownTitle: "Emergency or annual shutdown?",
    clientStripLabel: "Projects delivered for",
    clients: [
      "ISRO", "Kudankulam NPP", "Kalpakkam APP", "L&T", "UltraTech", "ACC Cement",
      "Saint-Gobain", "Hyundai Motors", "Ford India", "NLC", "Coromandel",
    ],
    servicesEyebrow: "Our services",
    servicesTitle: "Five services. One team on your site.",
    servicesLead: "Hire us for one job, or for the whole cycle — we make it, install it, move it, keep it running, and supply the kit.",
    servicesCardCta: "Learn more",
    industriesEyebrow: "Industries served",
    industriesTitle: "From launch pads to distilleries.",
    industriesCta: "View all {count} projects",
    enquiryEyebrow: "Request a quote",
    enquiryTitle: "Tell us what the job is.",
    enquiryLead: "Share your drawing, lift details or shutdown scope. We reply within {replyTime}.",
  },

  // One document per service. `num` and the URL slug are fixed in code (one page per service).
  services: {
    fabrication: {
      title: "Fabrication",
      navLabel: "Fabrication",
      longTitle: "Fabrication",
      summary: "Vessels, reactors, heat exchangers, silos, tanks and 23 more products in MS and SS.",
      enquiryOption: "Fabrication",
      cardPhoto: "Photo: workshop" as PhotoSlot,
      eyebrow: "Service 01 · Fabrication",
      heading: "{count} products. Built to your drawing.",
      lead: "Process equipment, storage and structures in MS and SS — made in our workshop, tested, and ready for site.",
      allLabel: "All",
      filterLabel: "Filter products by category",
      ctaTitle: "Have a drawing or spec sheet?",
      ctaBody: "Send it with size, material and quantity. We quote from the drawing. [IBR pressure parts — CONFIRM IF STILL OFFERED]",
      cta: "Get a fabrication quote",
      categories: ["Pressure & Process", "Storage & Handling", "Air & Gas Handling", "Structures & Heavy"],
      products: [
        { name: "Vessels", category: "Pressure & Process" },
        { name: "Reactors", category: "Pressure & Process" },
        { name: "Industrial Sheds & Built-Up Structures", category: "Structures & Heavy" },
        { name: "Heavy Equipment", category: "Structures & Heavy" },
        { name: "Dryers", category: "Pressure & Process" },
        { name: "Piping & Allied Equipment", category: "Air & Gas Handling" },
        { name: "Storage Tanks", category: "Storage & Handling" },
        { name: "Launching Pads", category: "Structures & Heavy" },
        { name: "Storage Silos (MS / SS)", category: "Storage & Handling" },
        { name: "Heavy Sliding Doors", category: "Structures & Heavy" },
        { name: "Bag Filters & ESP", category: "Air & Gas Handling" },
        { name: "Chimneys / Stacks", category: "Air & Gas Handling" },
        { name: "Chutes", category: "Storage & Handling" },
        { name: "Dish Ends", category: "Pressure & Process" },
        { name: "Hot Gas Filters", category: "Air & Gas Handling" },
        { name: "Heat Exchangers", category: "Pressure & Process" },
        { name: "Evaporators", category: "Pressure & Process" },
        { name: "Furnaces", category: "Pressure & Process" },
        { name: "Cartridge Filter Tanks", category: "Storage & Handling" },
        { name: "Dampers", category: "Air & Gas Handling" },
        { name: "Bunkers", category: "Storage & Handling" },
        { name: "Distillation Columns", category: "Pressure & Process" },
        { name: "Expansion Bellows", category: "Pressure & Process" },
        { name: "Hoppers", category: "Storage & Handling" },
        { name: "Paint Booths (Automobile)", category: "Structures & Heavy" },
        { name: "Drying Towers", category: "Pressure & Process" },
        { name: "Absorption Towers", category: "Pressure & Process" },
        { name: "Digesters", category: "Pressure & Process" },
      ],
    },
    erection: {
      title: "Erection",
      navLabel: "Erection",
      longTitle: "Erection",
      summary: "Site erection of structures, tanks, silos, chimneys, vessels and piping.",
      enquiryOption: "Erection",
      cardPhoto: workPhotos.kilnLiftPiers as PhotoSlot,
      eyebrow: "Service 02 · Erection",
      heading: "From workshop to foundation. Installed right.",
      lead: "We erect what we fabricate — and what others fabricate. Our own crew, lifting gear and supervision on site.",
      stepsLabel: "How a job runs",
      photoMain: workPhotos.coneLiftStructure as PhotoSlot,
      photoLeft: workPhotos.coneRigging as PhotoSlot,
      photoRight: workPhotos.kilnShellLift as PhotoSlot,
      scope: [
        "Industrial sheds & built-up structures", "Storage tanks (jacking method)",
        "Silos, bunkers & hoppers", "Chimneys & stacks", "Vessels, reactors & columns",
        "Piping & ducting", "Bag filters & ESP", "Heavy sliding doors",
      ],
      steps: [
        { n: "01", title: "Site survey", body: "Scope, loads and method statement" },
        { n: "02", title: "Mobilise", body: "Crew, derricks, winches, cranes" },
        { n: "03", title: "Erect & align", body: "Lifting, welding, alignment" },
        { n: "04", title: "Hand over", body: "Checks, testing, sign-off" },
      ],
    },
    handling: {
      title: "Heavy Equipment Handling",
      navLabel: "Heavy Handling",
      longTitle: "Heavy Equipment Handling",
      summary: "Lifting, jacking, skidding, shifting and transport of heavy loads.",
      enquiryOption: "Heavy Equipment Handling",
      cardPhoto: workPhotos.kilnTransport as PhotoSlot,
      eyebrow: "Service 03 · Heavy Equipment Handling",
      heading: "Heavy loads moved safely. Inside the plant or across the state.",
      lead: "Lifting, jacking, skidding, shifting and transport of heavy machinery and equipment — planned, rigged and moved by our own team.",
      scopeLabel: "What we handle",
      fleetLabel: "Our fleet",
      cta: "Plan a lift or shift",
      capacities: [
        { value: "400 T", label: "Hydraulic jacks" },
        { value: "100 T", label: "Motorised winches" },
        { value: "[XX] T", label: "Hydraulic crane capacity" },
        { value: "[XX] m", label: "Boom lift working height" },
      ],
      scope: [
        { title: "Machinery shifting", body: "Within plant or to new site" },
        { title: "Loading & unloading", body: "Heavy and over-size items" },
        { title: "Jacking & skidding", body: "Jacks up to 400 T, skid rollers" },
        { title: "Winching & pulling", body: "Winches up to 100 T" },
        { title: "Crane lifts", body: "Hydraulic cranes, derricks" },
        { title: "Heavy transport", body: "Trailers for ODC loads [CONFIRM]" },
      ],
      fleet: [
        { name: "Hydraulic Cranes", spec: "Capacity [XX] T – [XX] T", photo: undefined as SitePhoto | undefined },
        { name: "Boom Lifts", spec: "Working height up to [XX] m", photo: undefined as SitePhoto | undefined },
        { name: "Transport Vehicles", spec: "Trailers / trucks [CONFIRM TYPES]", photo: undefined as SitePhoto | undefined },
      ],
    },
    om: {
      title: "O&M",
      navLabel: "O&M",
      longTitle: "Operation & Maintenance",
      summary: "O&M contracts plus emergency and annual shutdowns for process plants.",
      enquiryOption: "Operation & Maintenance / shutdown",
      cardPhoto: "Photo: shutdown crew" as PhotoSlot,
      eyebrow: "Service 04 · Operation & Maintenance",
      heading: "Shutdowns done on schedule.",
      lead: "We take on O&M contracts, emergency shutdowns and annual shutdowns — with our own crew, tools and cranes, so your plant is back online faster.",
      plantsLabel: "Plants we maintain",
      photo: "Photo: shutdown crew inside kiln / boiler" as PhotoSlot,
      cta: "Plan a shutdown",
      offers: [
        { title: "O&M contracts", body: "Long-term upkeep" },
        { title: "Emergency shutdowns", body: "Rapid mobilisation" },
        { title: "Annual shutdowns", body: "Planned turnarounds" },
      ],
      plants: ["Cement", "Carbon", "Glass", "Chemical", "Paper", "Sugar", "Textile"],
    },
    rental: {
      title: "Equipment Rental",
      navLabel: "Equipment Rental",
      longTitle: "Equipment Rental",
      summary: "Cranes, winches, boom lifts and scaffolding on hire.",
      enquiryOption: "Equipment Rental",
      cardPhoto: workPhotos.crawlerCraneLift as PhotoSlot,
      eyebrow: "Service 05 · Equipment Rental",
      heading: "Rent the kit. Skip the capex.",
      lead: "Cranes, lifting and access equipment — the same kit our own crews use, maintained in our yard.",
      termsTitle: "Rental terms",
      cta: "Check availability",
      fleetEyebrow: "On hire",
      fleetTitle: "Cranes, lifts and access equipment.",
      fleetLead: "Available for your site on daily, weekly or monthly hire. Ask us for capacities and availability.",
      fleetCta: "Enquire",
      terms: [
        { label: "Hire period", value: "Daily · Weekly · Monthly" },
        { label: "Operator", value: "[With / without — CONFIRM]" },
        { label: "Delivery", value: "[To site — CONFIRM]" },
      ],
    },
  },

  // Equipment on hire: a list of separate "Rental equipment" documents in Sanity.
  rentalProducts: [
    { name: "Crawler Crane", category: "Cranes", image: "/images/rental/crawler-crane.jpg", fit: "contain" },
    { name: "Tyre Mounted Crane", category: "Cranes", image: "/images/rental/tyre-mounted-crane.jpg", fit: "cover" },
    { name: "Ferana", category: "Cranes", image: "/images/rental/ferana.jpg", fit: "contain" },
    { name: "Winch Machine", category: "Lifting", image: "/images/rental/winch-machine.jpg", fit: "contain" },
    { name: "Boom Lift", category: "Access", image: "/images/rental/boom-lift.jpg", fit: "cover" },
    { name: "Movable Trolley", category: "Access", image: "/images/rental/movable-trolley.jpg", fit: "cover" },
    { name: "Cuplock Scaffolding", category: "Access", image: "/images/rental/cuplock-scaffolding.jpg", fit: "cover" },
  ] as RentalProduct[],

  // WARNING: client must confirm these projects are their own work before launch.
  projects: {
    eyebrow: "Projects · {count} industries",
    title: "Built for India's most demanding plants.",
    lead: "From ISRO launch facilities and nuclear power plants to refineries, cement kilns and distilleries — a selection of clients we have fabricated, erected, lifted and maintained for.",
    allLabel: "All",
    filterLabel: "Filter projects by industry",
    ctaTitle: "Planning a project in one of these industries?",
    cta: "Talk to our engineers",
    // `sample` = short client list on the home page industry cards.
    sectors: [
      { name: "Aerospace", sample: "ISRO", clients: ["ISRO (Indian Space Research Organisation)"] },
      { name: "Nuclear Power", sample: "Kudankulam NPP, Kalpakkam APP", clients: ["Kudankulam Nuclear Power Plant", "Kalpakkam Atomic Power Plant"] },
      { name: "Thermal Power", sample: "NLC, BGR Energy, Lanco", clients: ["LVS Power Plant", "Ind-Barath Power Gencom Ltd", "Cauvery Power Generation Chennai (P) Ltd", "BGR Energy Systems Ltd", "Lanco Industries Ltd", "Neyveli Lignite Corporation"] },
      { name: "Cement", sample: "ACC, UltraTech (L&T)", clients: ["ACC Cement Plant", "UltraTech Cements (L&T)"] },
      { name: "Chemical", sample: "Coromandel, Kamar, Krishna", clients: ["Adheeswara Chemicals Pvt Ltd", "Coromandel Indarc", "Coromandel International Ltd", "Coromandel Fertilisers Ltd", "Kamar Chemicals & Ind. Ltd", "Keerthi (Bangalore) Pvt Ltd", "Krishna Chemicals & Ind. Ltd", "Rayalaseema Hi-Strength Alkalis Ltd"] },
      { name: "Water & Effluent", sample: "Quality Water Management", clients: ["Quality Water Management"] },
      { name: "Hydrocarbon & Refineries", sample: "Andhra Petrochemicals, Airoil-Flaregas", clients: ["Andhra Petrochemicals Ltd", "V.B. Ferro Alloys Ltd", "Viki Industries Ltd", "Cetex Ltd", "U.B. Petro Products", "Airoil-Flaregas India Ltd"] },
      { name: "Carbon & Carbon Black", sample: "Epsilon, Phillips Carbon", clients: ["Epsilon Carbon Pvt Ltd", "Hi-Tech Carbon", "Phillips Carbon India Ltd"] },
      { name: "Sugar & Distilleries", sample: "Kothari Sugars, Shaw Wallace", clients: ["Kothari Sugars", "Shaw Wallace & Company Ltd", "A.P. Met Distillery Ltd", "Gemini Distillery Ltd", "Khoday Distillery Ltd", "Maharashtra Distillery Ltd", "Aravind Distilleries"] },
      { name: "Steel", sample: "Kanishk, VKG, SISCOL", clients: ["Kanishk Steel Ltd", "VKG Steels Ltd", "SISCOL Ltd", "Pinakini Steels Ltd"] },
      { name: "Textile", sample: "Loyal Textile, Valli Mills", clients: ["Loyal Textile Ltd", "Valli Mills Ltd"] },
      { name: "Pharma & Drugs", sample: "Malladi, Aswini Bio-Pharma", clients: ["Malladi Drugs & Pharmaceuticals Ltd", "Aswini Bio-Pharma Ltd", "Lactochem Ltd", "J.K. Pharma Ltd"] },
      { name: "Glass", sample: "Saint-Gobain Glass India", clients: ["Saint-Gobain Glass India Ltd"] },
      { name: "Automobile", sample: "Hyundai, Ford, Visteon", clients: ["Visteon Ford India", "Heavy Vehicles Factory", "Ford Motors India Ltd", "Hwashin Automotive India Ltd", "Hyundai Motors India Ltd"] },
      { name: "Heavy Engineering", sample: "L&T, Chennai Harbour", clients: ["L&T Ltd", "Rishabh Engineering Ltd", "Southern Structurals Ltd", "Chennai Harbour", "Balda Mothersons India Ltd", "Chowal India Ltd", "Liporite Ltd"] },
    ] as { name: string; sample: string; clients: string[]; photo?: SitePhoto }[],
  },

  contact: {
    eyebrow: "Contact",
    detailsTitle: "Reach us directly",
    mapLabel: "Map: workshop & yard location",
    phoneLabel: "Phone / WhatsApp",
    emailLabel: "Email",
    addressLabel: "Workshop & Yard",
  },

  enquiryForm: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    companyLabel: "Company",
    companyPlaceholder: "Company name",
    phoneLabel: "Phone",
    phonePlaceholder: "+91",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    serviceLabel: "Service needed",
    detailsLabel: "Details",
    detailsPlaceholder: "Equipment, weight or size, material, site location, timeline",
    optional: "(optional)",
    submit: "Send Enquiry",
    sending: "Sending…",
    whatsapp: "Enquire on WhatsApp",
    errorName: "Please enter your name.",
    errorPhone: "Please enter a valid phone number (at least 8 digits).",
    errorEmail: "Please enter a valid email address, or leave it empty.",
    errorService: "Please choose a service.",
    errorTooLong: "This is too long — please shorten it.",
    errorSend: "Sorry, we could not send your enquiry. Please try again, or call us on {phone}.",
    successTitle: "Enquiry sent",
    successBody: "Thank you — we have your enquiry and will reply within {replyTime}.",
    successAgain: "Send another enquiry",
    whatsappIntro: "Hello {shortName}, I would like a quote.",
    emailSubject: "New enquiry",
  },

  // Header, menus and footer.
  chrome: {
    utilityBarServices: "Fabrication · Erection · O&M · Equipment Rental · Heavy Equipment Handling",
    requestQuote: "Request a Quote",
    projects: "Projects",
    contact: "Contact",
    call: "Call",
    callUs: "Call us",
    chatOnWhatsApp: "Chat on WhatsApp",
    footerBlurb: "Fabrication, erection, heavy equipment handling, O&M and equipment rental for Indian industry.",
    footerServicesHeading: "Services",
    footerCompanyHeading: "Company",
    footerContactHeading: "Contact",
    footerExtraLinks: ["[Certifications]", "[Careers]"],
    footerRights: "All rights reserved.",
    gstinLabel: "GSTIN",
  },

  seo: {
    homeTitle: "{companyName} — Fabrication, Erection, Heavy Equipment Handling, O&M & Equipment Rental",
    ogImageAlt: "{companyName} — {heroTitle}",
  },
};

// ---------- Merge CMS content over the defaults ----------
type Content = typeof defaults;

/** CMS value wins when present; missing/null fields keep the default. Arrays are replaced whole. */
function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) || typeof base !== "object" || base === null) return over as T;
  if (typeof over !== "object" || Array.isArray(over)) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(over)) out[key] = merge(out[key], value);
  return out as T;
}

const c: Content = merge(defaults, cmsContent);
const s = c.services;

/** Fill {placeholders} in CMS text. Unknown names are left as written. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
}

// ---------- Exports used by the components ----------
export const company = {
  name: c.company.name,
  shortName: c.company.shortName,
  tagline: c.company.tagline,
  phone: c.company.phone,
  whatsapp: c.company.whatsapp,
  email: c.company.email,
  address: c.company.address,
  city: c.company.city,
  gstin: c.company.gstin,
  yearsInField: c.company.yearsInField,
  replyTime: c.company.replyTime,
};

const vars = {
  replyTime: company.replyTime,
  phone: company.phone,
  shortName: company.shortName,
  companyName: company.name,
  yearsInField: company.yearsInField,
  heroTitle: c.home.heroTitle,
};

export const brand = { mark: c.company.brandMark, suffix: c.company.brandSuffix, suffixShort: c.company.brandSuffixShort };

export const hero = {
  eyebrow: c.home.heroEyebrow,
  title: c.home.heroTitle,
  body: c.home.heroBody,
  stats: c.home.stats.map((stat) => ({ value: fill(stat.value, vars), label: stat.label })),
  shutdownCard: { eyebrow: c.home.shutdownEyebrow, title: c.home.shutdownTitle },
};

export const clientStrip = c.home.clients;

export const services: { num: string; slug: ServiceSlug; title: string; navLabel: string; summary: string }[] = [
  { num: "01", slug: "fabrication", title: s.fabrication.title, navLabel: s.fabrication.navLabel, summary: s.fabrication.summary },
  { num: "02", slug: "erection", title: s.erection.title, navLabel: s.erection.navLabel, summary: s.erection.summary },
  { num: "03", slug: "heavy-equipment-handling", title: s.handling.title, navLabel: s.handling.navLabel, summary: s.handling.summary },
  { num: "04", slug: "operation-maintenance", title: s.om.title, navLabel: s.om.navLabel, summary: s.om.summary },
  { num: "05", slug: "equipment-rental", title: s.rental.title, navLabel: s.rental.navLabel, summary: s.rental.summary },
];

const bySlug = <T,>(pick: (service: Content["services"][keyof Content["services"]]) => T): Record<ServiceSlug, T> => ({
  fabrication: pick(s.fabrication),
  erection: pick(s.erection),
  "heavy-equipment-handling": pick(s.handling),
  "operation-maintenance": pick(s.om),
  "equipment-rental": pick(s.rental),
});

/** Full service names: footer links, service page H1s and page titles. */
export const serviceLongTitles = bySlug((x) => x.longTitle);

// 01 Fabrication
export const productCategories = s.fabrication.categories;
export type ProductCategory = string;
export const products = s.fabrication.products;

// 02 Erection
export const erection = { scope: s.erection.scope, steps: s.erection.steps };

// 03 Heavy Equipment Handling
export const handling = { capacities: s.handling.capacities, scope: s.handling.scope, fleet: s.handling.fleet };

// 04 O&M
export const om = { offers: s.om.offers, plants: s.om.plants };

// 05 Equipment Rental
export const rentalTerms = s.rental.terms;
export const rentalProducts = c.rentalProducts;

// Projects
export const sectors = c.projects.sectors;

/** "01 project" / "06 projects" — shown uppercase on sector cards. */
export const projectCountLabel = (n: number) =>
  `${String(n).padStart(2, "0")} ${n === 1 ? "project" : "projects"}`;

/** Total client projects across all sectors. */
export const totalProjects = sectors.reduce((sum, sector) => sum + sector.clients.length, 0);

// Site chrome: header, mobile menu, footer
export const utilityBar = { services: c.chrome.utilityBarServices };

export const ui = {
  skipToContent: "Skip to content",
  mainNavLabel: "Main",
  requestQuote: c.chrome.requestQuote,
  projects: c.chrome.projects,
  contact: c.chrome.contact,
  callUs: c.chrome.callUs,
  call: c.chrome.call,
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Menu",
  chatOnWhatsApp: c.chrome.chatOnWhatsApp,
};

export const contactLabels = { phone: c.contact.phoneLabel, email: c.contact.emailLabel, address: c.contact.addressLabel };

export const footer = {
  blurb: c.chrome.footerBlurb,
  headings: { services: c.chrome.footerServicesHeading, company: c.chrome.footerCompanyHeading, contact: c.chrome.footerContactHeading },
  companyPlaceholders: c.chrome.footerExtraLinks,
  rights: c.chrome.footerRights,
  gstinLabel: c.chrome.gstinLabel,
};

// Home page section copy (layout from design/Main.dc.html)
export const home = {
  hero: {
    secondaryCta: c.home.heroSecondaryCta,
    photos: { main: c.home.heroPhotoMain, secondary: c.home.heroPhotoSecondary },
  },
  clientStripLabel: c.home.clientStripLabel,
  services: {
    eyebrow: c.home.servicesEyebrow,
    title: c.home.servicesTitle,
    lead: c.home.servicesLead,
    cardCta: c.home.servicesCardCta,
    photos: bySlug((x) => x.cardPhoto),
  },
  fabrication: {
    eyebrow: s.fabrication.eyebrow,
    title: fill(s.fabrication.heading, { ...vars, count: products.length }),
    lead: s.fabrication.lead,
    allLabel: s.fabrication.allLabel,
    filterLabel: s.fabrication.filterLabel,
    ctaTitle: s.fabrication.ctaTitle,
    ctaBody: s.fabrication.ctaBody,
    cta: s.fabrication.cta,
  },
  erection: {
    eyebrow: s.erection.eyebrow,
    title: s.erection.heading,
    lead: s.erection.lead,
    stepsLabel: s.erection.stepsLabel,
    photos: { main: s.erection.photoMain, left: s.erection.photoLeft, right: s.erection.photoRight },
  },
  handling: {
    eyebrow: s.handling.eyebrow,
    title: s.handling.heading,
    lead: s.handling.lead,
    scopeLabel: s.handling.scopeLabel,
    fleetLabel: s.handling.fleetLabel,
    fleetPhoto: "Photo",
    cta: s.handling.cta,
  },
  om: {
    eyebrow: s.om.eyebrow,
    title: s.om.heading,
    lead: s.om.lead,
    plantsLabel: s.om.plantsLabel,
    photo: s.om.photo,
    cta: s.om.cta,
  },
  rental: {
    eyebrow: s.rental.eyebrow,
    title: s.rental.heading,
    lead: s.rental.lead,
    termsTitle: s.rental.termsTitle,
    cta: s.rental.cta,
    fleetEyebrow: s.rental.fleetEyebrow,
    fleetTitle: s.rental.fleetTitle,
    fleetLead: s.rental.fleetLead,
    fleetCta: s.rental.fleetCta,
    fleetCtaLabel: (name: string) => ` about ${name}`,
  },
  industries: {
    eyebrow: c.home.industriesEyebrow,
    title: c.home.industriesTitle,
    cta: (projectCount: number) => fill(c.home.industriesCta, { ...vars, count: projectCount }),
    // Short client list shown on each sector card.
    samples: Object.fromEntries(sectors.map((sector) => [sector.name, sector.sample])) as Record<string, string>,
  },
  enquiry: {
    eyebrow: c.home.enquiryEyebrow,
    title: c.home.enquiryTitle,
    lead: fill(c.home.enquiryLead, vars),
  },
};

// Enquiry form
const f = c.enquiryForm;
export const enquiryForm = {
  fields: {
    name: { label: f.nameLabel, placeholder: f.namePlaceholder },
    company: { label: f.companyLabel, placeholder: f.companyPlaceholder },
    phone: { label: f.phoneLabel, placeholder: f.phonePlaceholder },
    email: { label: f.emailLabel, placeholder: f.emailPlaceholder },
    service: { label: f.serviceLabel },
    details: { label: f.detailsLabel, placeholder: f.detailsPlaceholder },
  },
  optional: f.optional,
  honeypotLabel: "Leave this field empty",
  serviceOptions: bySlug((x) => x.enquiryOption),
  submit: f.submit,
  sending: f.sending,
  whatsapp: f.whatsapp,
  errors: {
    name: f.errorName,
    phone: f.errorPhone,
    email: f.errorEmail,
    service: f.errorService,
    tooLong: f.errorTooLong,
    send: fill(f.errorSend, vars),
  },
  success: { title: f.successTitle, body: fill(f.successBody, vars), again: f.successAgain },
  // WhatsApp message and email use the field labels above for each line.
  whatsappIntro: fill(f.whatsappIntro, vars),
  emailSubject: f.emailSubject,
};

// Service pages (/services/[slug]): hero reuses "Our services · 01", the full name and the summary.
export const servicePage = {
  eyebrow: (num: string) => `${home.services.eyebrow} · ${num}`,
};

// Projects page (layout from design/Projects.dc.html)
export const projectsPage = {
  eyebrow: fill(c.projects.eyebrow, { ...vars, count: sectors.length }),
  title: c.projects.title,
  lead: c.projects.lead,
  allLabel: c.projects.allLabel,
  filterLabel: c.projects.filterLabel,
  photo: (sector: string) => `Photo: ${sector} project`,
  ctaTitle: c.projects.ctaTitle,
  cta: c.projects.cta,
};

// Contact page
export const contactPage = {
  eyebrow: c.contact.eyebrow,
  title: home.enquiry.title,
  lead: home.enquiry.lead,
  detailsTitle: c.contact.detailsTitle,
  mapLabel: c.contact.mapLabel,
};

// SEO
export const seo = {
  homeTitle: fill(c.seo.homeTitle, vars),
  locale: "en_IN",
  ogImageAlt: fill(c.seo.ogImageAlt, vars),
};
