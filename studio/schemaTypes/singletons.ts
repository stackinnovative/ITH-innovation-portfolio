import { defineType, type FieldDefinition } from "sanity";
import { objList, photo, placeholders, str, strList, text } from "./fields";

// One document of each of these types exists, with _id = type name (see sanity.config.ts).

const singleton = (name: string, title: string, fields: FieldDefinition[], groups?: { name: string; title: string }[]) =>
  defineType({ name, title, type: "document", groups, fields, preview: { prepare: () => ({ title }) } });

export const company = singleton("company", "Company details", [
  str("name", "Company name"),
  str("shortName", "Short name", { description: "Used in the logo, footer and page titles." }),
  str("tagline", "Tagline under the logo"),
  str("brandMark", "Logo letters", { description: "The letters in the dark square, e.g. ITH." }),
  str("brandSuffix", "Name suffix on desktop", { description: "e.g. Private Limited" }),
  str("brandSuffixShort", "Name suffix on phones", { description: "e.g. Pvt Ltd." }),
  str("phone", "Phone number", { description: "As shown on the site, e.g. +91 98400 00000." }),
  str("whatsapp", "WhatsApp number", { description: "Digits only with country code, e.g. 919840000000." }),
  str("email", "Email address"),
  text("address", "Workshop & yard address"),
  str("city", "City, State"),
  str("gstin", "GSTIN"),
  str("yearsInField", "Years in the field", { description: "e.g. 25+" }),
  str("replyTime", "Reply time", { description: "e.g. 4 working hours. Used in the enquiry texts." }),
]);

const homeGroups = [
  { name: "hero", title: "Top banner" },
  { name: "clients", title: "Client strip" },
  { name: "services", title: "Services" },
  { name: "industries", title: "Industries" },
  { name: "enquiry", title: "Enquiry" },
];

export const home = singleton(
  "home",
  "Home page",
  [
    str("heroEyebrow", "Small label above the headline", { group: "hero" }),
    str("heroTitle", "Headline", { group: "hero" }),
    text("heroBody", "Intro text", { group: "hero", description: "Also used as the site description on Google." }),
    str("heroSecondaryCta", "Second button text", { group: "hero" }),
    photo("heroPhotoMain", "Main photo", { group: "hero" }),
    photo("heroPhotoSecondary", "Small photo", { group: "hero" }),
    objList("stats", "Numbers under the buttons", [str("value", "Number"), str("label", "Label")], ["value", "label"], {
      group: "hero",
      description: placeholders("yearsInField"),
    }),
    str("shutdownEyebrow", "Shutdown box — small label", { group: "hero" }),
    str("shutdownTitle", "Shutdown box — title", { group: "hero" }),
    str("clientStripLabel", "Client strip label", { group: "clients" }),
    strList("clients", "Client names", { group: "clients" }),
    str("servicesEyebrow", "Small label", { group: "services" }),
    str("servicesTitle", "Heading", { group: "services" }),
    text("servicesLead", "Intro text", { group: "services" }),
    str("servicesCardCta", "Card link text", { group: "services" }),
    str("industriesEyebrow", "Small label", { group: "industries" }),
    str("industriesTitle", "Heading", { group: "industries" }),
    str("industriesCta", "Button text", { group: "industries", description: placeholders("count") }),
    str("enquiryEyebrow", "Small label", { group: "enquiry" }),
    str("enquiryTitle", "Heading", { group: "enquiry", description: "Also the Contact page heading." }),
    text("enquiryLead", "Intro text", { group: "enquiry", description: placeholders("replyTime") }),
  ],
  homeGroups,
);

// ---------- Services: shared fields + per-service extras ----------
const serviceGroups = [
  { name: "card", title: "Menu & card" },
  { name: "section", title: "Page section" },
  { name: "lists", title: "Lists" },
];

const serviceBase = (headingDescription?: string): FieldDefinition[] => [
  str("title", "Service name", { group: "card", description: "Menus and the service card." }),
  str("navLabel", "Short name for the desktop menu", { group: "card" }),
  str("longTitle", "Full name", { group: "card", description: "Page heading, footer link and Google title." }),
  text("summary", "One-line summary", { group: "card", description: "Service card and the top of the service page." }),
  str("enquiryOption", "Name in the enquiry form's service list", { group: "card" }),
  photo("cardPhoto", "Card photo", { group: "card" }),
  str("eyebrow", "Small label", { group: "section" }),
  str("heading", "Heading", { group: "section", description: headingDescription }),
  text("lead", "Intro text", { group: "section" }),
];

const service = (name: string, title: string, fields: FieldDefinition[], headingDescription?: string) =>
  singleton(name, title, [...serviceBase(headingDescription), ...fields], serviceGroups);

export const serviceFabrication = service(
  "serviceFabrication",
  "01 Fabrication",
  [
    str("allLabel", "“All” filter button", { group: "section" }),
    str("filterLabel", "Filter label (screen readers)", { group: "section" }),
    str("ctaTitle", "Box title", { group: "section" }),
    text("ctaBody", "Box text", { group: "section" }),
    str("cta", "Button text", { group: "section" }),
    strList("categories", "Product categories", { group: "lists", description: "Filter buttons. Each product below must use one of these exactly." }),
    objList("products", "Products", [str("name", "Product"), str("category", "Category")], ["name", "category"], { group: "lists" }),
  ],
  placeholders("count"),
);

export const serviceErection = service("serviceErection", "02 Erection", [
  str("stepsLabel", "Steps label", { group: "section" }),
  photo("photoMain", "Large photo", { group: "section" }),
  photo("photoLeft", "Small photo, left", { group: "section" }),
  photo("photoRight", "Small photo, right", { group: "section" }),
  strList("scope", "What we erect", { group: "lists" }),
  objList("steps", "How a job runs", [str("n", "Number"), str("title", "Title"), str("body", "Text")], ["title", "body"], { group: "lists" }),
]);

export const serviceHandling = service("serviceHandling", "03 Heavy Equipment Handling", [
  str("scopeLabel", "“What we handle” label", { group: "section" }),
  str("fleetLabel", "“Our fleet” label", { group: "section" }),
  str("cta", "Button text", { group: "section" }),
  objList("capacities", "Capacity numbers", [str("value", "Number"), str("label", "Label")], ["value", "label"], { group: "lists" }),
  objList("scope", "What we handle", [str("title", "Title"), str("body", "Detail")], ["title", "body"], { group: "lists" }),
  objList("fleet", "Our fleet", [str("name", "Name"), str("spec", "Spec"), photo("photo", "Photo")], ["name", "spec"], {
    group: "lists",
    description: "Only list equipment the company owns.",
  }),
]);

export const serviceOm = service("serviceOm", "04 Operation & Maintenance", [
  str("plantsLabel", "Plants label", { group: "section" }),
  photo("photo", "Photo", { group: "section" }),
  str("cta", "Button text", { group: "section" }),
  objList("offers", "What we offer", [str("title", "Title"), str("body", "Detail")], ["title", "body"], { group: "lists" }),
  strList("plants", "Plants we maintain", { group: "lists" }),
]);

export const serviceRental = service("serviceRental", "05 Equipment Rental", [
  str("termsTitle", "Terms box title", { group: "section" }),
  str("cta", "Terms box button", { group: "section" }),
  str("fleetEyebrow", "“On hire” small label", { group: "section" }),
  str("fleetTitle", "“On hire” heading", { group: "section" }),
  text("fleetLead", "“On hire” intro", { group: "section" }),
  str("fleetCta", "Card link text", { group: "section" }),
  objList("terms", "Rental terms", [str("label", "Label"), str("value", "Value")], ["label", "value"], {
    group: "lists",
    description: "The equipment itself is under “Rental equipment”.",
  }),
]);

export const projects = singleton("projects", "Projects page", [
  str("eyebrow", "Small label", { description: placeholders("count") }),
  str("title", "Heading"),
  text("lead", "Intro text"),
  str("allLabel", "“All” filter button"),
  str("filterLabel", "Filter label (screen readers)"),
  str("ctaTitle", "Bottom band text"),
  str("cta", "Bottom band button"),
  objList(
    "sectors",
    "Industries & clients",
    [
      str("name", "Industry"),
      str("sample", "Short client list for the home page", { description: "e.g. ACC, UltraTech (L&T)" }),
      strList("clients", "Clients"),
      photo("photo", "Photo"),
    ],
    ["name", "sample"],
    { description: "Only list projects the company did itself." },
  ),
]);

export const contact = singleton("contact", "Contact page", [
  str("eyebrow", "Small label", { description: "Heading and intro come from Home page → Enquiry." }),
  str("detailsTitle", "Contact details heading"),
  str("mapLabel", "Map placeholder text"),
  str("phoneLabel", "Phone label"),
  str("emailLabel", "Email label"),
  str("addressLabel", "Address label"),
]);

export const enquiryForm = singleton("enquiryForm", "Enquiry form", [
  str("nameLabel", "Name — label"),
  str("namePlaceholder", "Name — hint"),
  str("companyLabel", "Company — label"),
  str("companyPlaceholder", "Company — hint"),
  str("phoneLabel", "Phone — label"),
  str("phonePlaceholder", "Phone — hint"),
  str("emailLabel", "Email — label"),
  str("emailPlaceholder", "Email — hint"),
  str("serviceLabel", "Service — label", { description: "The service names come from each service's “Name in the enquiry form”." }),
  str("detailsLabel", "Details — label"),
  str("detailsPlaceholder", "Details — hint"),
  str("optional", "“Optional” marker"),
  str("submit", "Send button"),
  str("sending", "Send button while sending"),
  str("whatsapp", "WhatsApp button"),
  str("errorName", "Error: name"),
  str("errorPhone", "Error: phone"),
  str("errorEmail", "Error: email"),
  str("errorService", "Error: service"),
  str("errorTooLong", "Error: too long"),
  text("errorSend", "Error: could not send", { description: placeholders("phone") }),
  str("successTitle", "Success — title"),
  text("successBody", "Success — text", { description: placeholders("replyTime") }),
  str("successAgain", "Success — button"),
  text("whatsappIntro", "First line of the WhatsApp message", { description: placeholders("shortName") }),
  str("emailSubject", "Email subject (to you)"),
]);

export const chrome = singleton("chrome", "Header & footer", [
  str("utilityBarServices", "Top bar text"),
  str("requestQuote", "“Request a Quote” button"),
  str("projects", "“Projects” menu link"),
  str("contact", "“Contact” menu link"),
  str("call", "“Call” button word"),
  str("callUs", "“Call us” (screen readers)"),
  str("chatOnWhatsApp", "“Chat on WhatsApp”"),
  text("footerBlurb", "Footer text"),
  str("footerServicesHeading", "Footer heading: services"),
  str("footerCompanyHeading", "Footer heading: company"),
  str("footerContactHeading", "Footer heading: contact"),
  strList("footerExtraLinks", "Extra footer items", { description: "e.g. certifications. Shown as plain text." }),
  str("footerRights", "Copyright text"),
  str("gstinLabel", "GSTIN label"),
]);

export const seo = singleton("seo", "Google & sharing", [
  str("homeTitle", "Home page title on Google", { description: placeholders("companyName") }),
  str("ogImageAlt", "Share image description", { description: placeholders("companyName", "heroTitle") }),
]);

export const singletonTypes = [
  company, home,
  serviceFabrication, serviceErection, serviceHandling, serviceOm, serviceRental,
  projects, contact, enquiryForm, chrome, seo,
];
