// All site copy and data for ITH Innovation Private Limited.
// Items in [SQUARE BRACKETS] are unknown client facts — replace when the client confirms.

export const company = {
  name: "ITH Innovation Private Limited",
  shortName: "ITH Innovation",
  tagline: "Engineering · Fabrication",
  phone: "[PHONE NUMBER]",
  whatsapp: "[WHATSAPP NUMBER, e.g. 919XXXXXXXXX]",
  email: "[EMAIL ADDRESS]",
  address: "[FULL WORKSHOP & YARD ADDRESS]",
  city: "[CITY, STATE]",
  gstin: "[GSTIN]",
  yearsInField: "[XX]+",
  replyTime: "[X] working hours",
};

export const hero = {
  eyebrow: "Fabricate · Erect · Lift · Maintain · Rent",
  title: "We build the steel that keeps plants running.",
  body: "We fabricate equipment and structures, erect them at site, move and lift heavy loads, maintain running plants, and rent out the tools to do it — one team, start to finish.",
  stats: [
    { value: company.yearsInField, label: "Years in the field" },
    { value: "59", label: "Client projects" },
    { value: "15", label: "Industries served" },
    { value: "400 T", label: "Jacking capacity" },
  ],
  shutdownCard: { eyebrow: "24×7 Shutdown Support", title: "Emergency or annual shutdown?" },
};

export const clientStrip = [
  "ISRO", "Kudankulam NPP", "Kalpakkam APP", "L&T", "UltraTech", "ACC Cement",
  "Saint-Gobain", "Hyundai Motors", "Ford India", "NLC", "Coromandel",
];

export type ServiceSlug =
  | "fabrication" | "erection" | "heavy-equipment-handling"
  | "operation-maintenance" | "equipment-rental";

export const services: {
  num: string; slug: ServiceSlug; title: string; navLabel: string; summary: string;
}[] = [
  { num: "01", slug: "fabrication", title: "Fabrication", navLabel: "Fabrication",
    summary: "Vessels, reactors, heat exchangers, silos, tanks and 23 more products in MS and SS." },
  { num: "02", slug: "erection", title: "Erection", navLabel: "Erection",
    summary: "Site erection of structures, tanks, silos, chimneys, vessels and piping." },
  { num: "03", slug: "heavy-equipment-handling", title: "Heavy Equipment Handling", navLabel: "Heavy Handling",
    summary: "Lifting, jacking, skidding, shifting and transport of heavy loads." },
  { num: "04", slug: "operation-maintenance", title: "O&M", navLabel: "O&M",
    summary: "O&M contracts plus emergency and annual shutdowns for process plants." },
  { num: "05", slug: "equipment-rental", title: "Equipment Rental", navLabel: "Equipment Rental",
    summary: "Winches, jacks, welding sets, rolling machines and site kit on hire." },
];

// ---------- 01 Fabrication ----------
export const productCategories = [
  "Pressure & Process", "Storage & Handling", "Air & Gas Handling", "Structures & Heavy",
] as const;
export type ProductCategory = (typeof productCategories)[number];

export const products: { name: string; category: ProductCategory }[] = [
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
];

// ---------- 02 Erection ----------
export const erection = {
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
};

// ---------- 03 Heavy Equipment Handling ----------
export const handling = {
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
    { name: "Hydraulic Cranes", spec: "Capacity [XX] T – [XX] T" },
    { name: "Boom Lifts", spec: "Working height up to [XX] m" },
    { name: "Transport Vehicles", spec: "Trailers / trucks [CONFIRM TYPES]" },
  ],
};

// ---------- 04 O&M ----------
export const om = {
  offers: [
    { title: "O&M contracts", body: "Long-term upkeep" },
    { title: "Emergency shutdowns", body: "Rapid mobilisation" },
    { title: "Annual shutdowns", body: "Planned turnarounds" },
  ],
  plants: ["Cement", "Carbon", "Glass", "Chemical", "Paper", "Sugar", "Textile"],
};

// ---------- 05 Equipment Rental ----------
export const rentalTools: { name: string; spec: string }[] = [
  { name: "Motorised Winches", spec: "up to 100 T" },
  { name: "Hydraulic Jacks", spec: "up to 400 T" },
  { name: "Tank Jacks", spec: "2.5 m / 12 T" },
  { name: "Chain Pulley Blocks", spec: "up to 10 T" },
  { name: "Wire Rope Pulleys", spec: "up to 5 sheave" },
  { name: "Derricks / Leading Beams", spec: "—" },
  { name: "Skid Rollers", spec: "—" },
  { name: "Hydraulic Power Packs", spec: "—" },
  { name: "Rolling Machine", spec: "up to 36 mm · MS/SS" },
  { name: "Plasma Cutting Machine", spec: "—" },
  { name: "Radial Drilling Machine", spec: "—" },
  { name: "Air Compressor", spec: "up to 40 HP" },
  { name: "Welding Generators", spec: "K320" },
  { name: "Welding Rectifiers", spec: "MIG / TIG" },
  { name: "Welding Inverters", spec: "—" },
  { name: "Fabrication Tools", spec: "full set" },
  { name: "Site Containers", spec: "office / stairs" },
  { name: "CC Cribs / Sleepers / Rails", spec: "—" },
];

export const rentalTerms = [
  { label: "Hire period", value: "Daily · Weekly · Monthly" },
  { label: "Operator", value: "[With / without — CONFIRM]" },
  { label: "Delivery", value: "[To site — CONFIRM]" },
  { label: "Cranes & boom lifts", value: "Also on hire" },
];

// ---------- Projects ----------
// WARNING: client must confirm these projects are their own work before launch.
export const sectors: { name: string; clients: string[] }[] = [
  { name: "Aerospace", clients: ["ISRO (Indian Space Research Organisation)"] },
  { name: "Nuclear Power", clients: ["Kudankulam Nuclear Power Plant", "Kalpakkam Atomic Power Plant"] },
  { name: "Thermal Power", clients: ["LVS Power Plant", "Ind-Barath Power Gencom Ltd", "Cauvery Power Generation Chennai (P) Ltd", "BGR Energy Systems Ltd", "Lanco Industries Ltd", "Neyveli Lignite Corporation"] },
  { name: "Cement", clients: ["ACC Cement Plant", "UltraTech Cements (L&T)"] },
  { name: "Chemical", clients: ["Adheeswara Chemicals Pvt Ltd", "Coromandel Indarc", "Coromandel International Ltd", "Coromandel Fertilisers Ltd", "Kamar Chemicals & Ind. Ltd", "Keerthi (Bangalore) Pvt Ltd", "Krishna Chemicals & Ind. Ltd", "Rayalaseema Hi-Strength Alkalis Ltd"] },
  { name: "Water & Effluent", clients: ["Quality Water Management"] },
  { name: "Hydrocarbon & Refineries", clients: ["Andhra Petrochemicals Ltd", "V.B. Ferro Alloys Ltd", "Viki Industries Ltd", "Cetex Ltd", "U.B. Petro Products", "Airoil-Flaregas India Ltd"] },
  { name: "Carbon & Carbon Black", clients: ["Epsilon Carbon Pvt Ltd", "Hi-Tech Carbon", "Phillips Carbon India Ltd"] },
  { name: "Sugar & Distilleries", clients: ["Kothari Sugars", "Shaw Wallace & Company Ltd", "A.P. Met Distillery Ltd", "Gemini Distillery Ltd", "Khoday Distillery Ltd", "Maharashtra Distillery Ltd", "Aravind Distilleries"] },
  { name: "Steel", clients: ["Kanishk Steel Ltd", "VKG Steels Ltd", "SISCOL Ltd", "Pinakini Steels Ltd"] },
  { name: "Textile", clients: ["Loyal Textile Ltd", "Valli Mills Ltd"] },
  { name: "Pharma & Drugs", clients: ["Malladi Drugs & Pharmaceuticals Ltd", "Aswini Bio-Pharma Ltd", "Lactochem Ltd", "J.K. Pharma Ltd"] },
  { name: "Glass", clients: ["Saint-Gobain Glass India Ltd"] },
  { name: "Automobile", clients: ["Visteon Ford India", "Heavy Vehicles Factory", "Ford Motors India Ltd", "Hwashin Automotive India Ltd", "Hyundai Motors India Ltd"] },
  { name: "Heavy Engineering", clients: ["L&T Ltd", "Rishabh Engineering Ltd", "Southern Structurals Ltd", "Chennai Harbour", "Balda Mothersons India Ltd", "Chowal India Ltd", "Liporite Ltd"] },
];

// ---------- Site chrome: header, mobile menu, footer ----------
export const brand = {
  mark: "ITH",
  suffix: "Private Limited", // desktop header
  suffixShort: "Pvt Ltd.", // phone header
};

export const utilityBar = {
  services: "Fabrication · Erection · O&M · Equipment Rental · Heavy Equipment Handling",
};

export const ui = {
  skipToContent: "Skip to content",
  mainNavLabel: "Main",
  requestQuote: "Request a Quote",
  projects: "Projects",
  contact: "Contact",
  callUs: "Call us",
  call: "Call",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Menu",
  chatOnWhatsApp: "Chat on WhatsApp",
};

export const contactLabels = {
  phone: "Phone / WhatsApp",
  email: "Email",
  address: "Workshop & Yard",
};

/** Full service names: footer links, service page H1s and page titles. */
export const serviceLongTitles: Record<ServiceSlug, string> = {
  fabrication: "Fabrication",
  erection: "Erection",
  "heavy-equipment-handling": "Heavy Equipment Handling",
  "operation-maintenance": "Operation & Maintenance",
  "equipment-rental": "Equipment Rental",
};

export const footer = {
  blurb: "Fabrication, erection, heavy equipment handling, O&M and equipment rental for Indian industry.",
  headings: { services: "Services", company: "Company", contact: "Contact" },
  companyPlaceholders: ["[Certifications]", "[Careers]"],
  rights: "All rights reserved.",
  gstinLabel: "GSTIN",
};

// ---------- Home page section copy (from design/Main.dc.html) ----------
export const home = {
  hero: {
    secondaryCta: `Our ${services.length} Services`,
    photos: { main: "Photo: large vessel being erected at site", secondary: "Photo: fabrication shop floor" },
  },
  clientStripLabel: "Projects delivered for",
  services: {
    eyebrow: "Our services",
    title: "Five services. One team on your site.",
    lead: "Hire us for one job, or for the whole cycle — we make it, install it, move it, keep it running, and supply the kit.",
    cardCta: "Learn more",
    photos: {
      fabrication: "Photo: workshop",
      erection: "Photo: site erection",
      "heavy-equipment-handling": "Photo: crane lift",
      "operation-maintenance": "Photo: shutdown crew",
      "equipment-rental": "Photo: equipment yard",
    } satisfies Record<ServiceSlug, string>,
  },
  fabrication: {
    eyebrow: "Service 01 · Fabrication",
    title: `${products.length} products. Built to your drawing.`,
    lead: "Process equipment, storage and structures in MS and SS — made in our workshop, tested, and ready for site.",
    allLabel: "All",
    filterLabel: "Filter products by category",
    ctaTitle: "Have a drawing or spec sheet?",
    ctaBody: "Send it with size, material and quantity. We quote from the drawing. [IBR pressure parts — CONFIRM IF STILL OFFERED]",
    cta: "Get a fabrication quote",
  },
  erection: {
    eyebrow: "Service 02 · Erection",
    title: "From workshop to foundation. Installed right.",
    lead: "We erect what we fabricate — and what others fabricate. Our own crew, lifting gear and supervision on site.",
    stepsLabel: "How a job runs",
    photos: {
      main: "Photo: tank / structure erection with derrick",
      left: "Photo: chimney erection",
      right: "Photo: shed / PEB structure",
    },
  },
  handling: {
    eyebrow: "Service 03 · Heavy Equipment Handling",
    title: "Heavy loads moved safely. Inside the plant or across the state.",
    lead: "Lifting, jacking, skidding, shifting and transport of heavy machinery and equipment — planned, rigged and moved by our own team.",
    scopeLabel: "What we handle",
    fleetLabel: "Our fleet",
    fleetPhoto: "Photo",
    cta: "Plan a lift or shift",
  },
  om: {
    eyebrow: "Service 04 · Operation & Maintenance",
    title: "Shutdowns done on schedule.",
    lead: "We take on O&M contracts, emergency shutdowns and annual shutdowns — with our own crew, tools and cranes, so your plant is back online faster.",
    plantsLabel: "Plants we maintain",
    photo: "Photo: shutdown crew inside kiln / boiler",
    cta: "Plan a shutdown",
  },
  rental: {
    eyebrow: "Service 05 · Equipment Rental",
    title: "Rent the kit. Skip the capex.",
    lead: "Lifting, welding, cutting and site equipment — the same kit our own crews use, maintained in our yard.",
    termsTitle: "Rental terms",
    cta: "Check availability",
  },
  industries: {
    eyebrow: "Industries served",
    title: "From launch pads to distilleries.",
    cta: (projectCount: number) => `View all ${projectCount} projects`,
    // Short client list shown on each sector card.
    samples: {
      Aerospace: "ISRO",
      "Nuclear Power": "Kudankulam NPP, Kalpakkam APP",
      "Thermal Power": "NLC, BGR Energy, Lanco",
      Cement: "ACC, UltraTech (L&T)",
      Chemical: "Coromandel, Kamar, Krishna",
      "Water & Effluent": "Quality Water Management",
      "Hydrocarbon & Refineries": "Andhra Petrochemicals, Airoil-Flaregas",
      "Carbon & Carbon Black": "Epsilon, Phillips Carbon",
      "Sugar & Distilleries": "Kothari Sugars, Shaw Wallace",
      Steel: "Kanishk, VKG, SISCOL",
      Textile: "Loyal Textile, Valli Mills",
      "Pharma & Drugs": "Malladi, Aswini Bio-Pharma",
      Glass: "Saint-Gobain Glass India",
      Automobile: "Hyundai, Ford, Visteon",
      "Heavy Engineering": "L&T, Chennai Harbour",
    } as Record<string, string>,
  },
  enquiry: {
    eyebrow: "Request a quote",
    title: "Tell us what the job is.",
    lead: `Share your drawing, lift details or shutdown scope. We reply within ${company.replyTime}.`,
  },
};

// ---------- Enquiry form ----------
export const enquiryForm = {
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    company: { label: "Company", placeholder: "Company name" },
    phone: { label: "Phone", placeholder: "+91" },
    email: { label: "Email", placeholder: "you@company.com" },
    service: { label: "Service needed" },
    details: { label: "Details", placeholder: "Equipment, weight or size, material, site location, timeline" },
  },
  optional: "(optional)",
  honeypotLabel: "Leave this field empty",
  serviceOptions: {
    fabrication: "Fabrication",
    erection: "Erection",
    "heavy-equipment-handling": "Heavy Equipment Handling",
    "operation-maintenance": "Operation & Maintenance / shutdown",
    "equipment-rental": "Equipment Rental",
  } satisfies Record<ServiceSlug, string>,
  submit: "Send Enquiry",
  sending: "Sending…",
  whatsapp: "Enquire on WhatsApp",
  errors: {
    name: "Please enter your name.",
    phone: "Please enter a valid phone number (at least 8 digits).",
    email: "Please enter a valid email address, or leave it empty.",
    service: "Please choose a service.",
    tooLong: "This is too long — please shorten it.",
    send: `Sorry, we could not send your enquiry. Please try again, or call us on ${company.phone}.`,
  },
  success: {
    title: "Enquiry sent",
    body: `Thank you — we have your enquiry and will reply within ${company.replyTime}.`,
    again: "Send another enquiry",
  },
  // WhatsApp message and email use the field labels above for each line.
  whatsappIntro: `Hello ${company.shortName}, I would like a quote.`,
  emailSubject: "New enquiry",
};

/** "01 project" / "06 projects" — shown uppercase on sector cards. */
export const projectCountLabel = (n: number) =>
  `${String(n).padStart(2, "0")} ${n === 1 ? "project" : "projects"}`;

/** Total client projects across all sectors (59). */
export const totalProjects = sectors.reduce((sum, s) => sum + s.clients.length, 0);

// ---------- Service pages (/services/[slug]) ----------
// Hero reuses existing copy: "Our services · 01", the full service name, and the service summary.
export const servicePage = {
  eyebrow: (num: string) => `${home.services.eyebrow} · ${num}`,
};

// ---------- Projects page (from design/Projects.dc.html) ----------
export const projectsPage = {
  eyebrow: `Projects · ${sectors.length} industries`,
  title: "Built for India's most demanding plants.",
  lead: "From ISRO launch facilities and nuclear power plants to refineries, cement kilns and distilleries — a selection of clients we have fabricated, erected, lifted and maintained for.",
  allLabel: "All",
  filterLabel: "Filter projects by industry",
  photo: (sector: string) => `Photo: ${sector} project`,
  ctaTitle: "Planning a project in one of these industries?",
  cta: "Talk to our engineers",
};

// ---------- Contact page ----------
export const contactPage = {
  eyebrow: "Contact",
  title: home.enquiry.title,
  lead: home.enquiry.lead,
  detailsTitle: "Reach us directly",
  mapLabel: "Map: workshop & yard location",
};

// ---------- SEO ----------
export const seo = {
  homeTitle: `${company.name} — Fabrication, Erection, Heavy Equipment Handling, O&M & Equipment Rental`,
  locale: "en_IN",
  ogImageAlt: `${company.name} — ${hero.title}`,
};
