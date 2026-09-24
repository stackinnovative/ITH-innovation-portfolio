# Prompts for Claude Code — paste one at a time

Run each phase, check the result in the browser (`npm run dev`), then move to the next.
Don't paste all phases at once. Small steps = fewer bugs and less token waste.

---

## Phase 0 — Plan (use Plan Mode: press Shift+Tab until it says "plan mode")

```
Read CLAUDE.md, content/site.ts and all three files in design/.
Then give me a build plan: folder structure, list of components, which ones are client components, and the order you will build them in. Don't write code yet.
```

Check the plan. Fix anything you don't like, then continue.

---

## Phase 1 — Project setup + design system

```
Set up the project in this folder:
- create-next-app with TypeScript, Tailwind, App Router, ESLint, src/ dir off, import alias @/*
  (this folder is not empty, so create it in a temp folder and move the files here)
- keep design/, content/, CLAUDE.md, PROMPTS.md as they are
- add the design tokens from CLAUDE.md to Tailwind theme and globals.css
- load the 3 fonts with next/font/google and expose them as font-display, font-sans, font-mono
- build shared pieces: Container, Eyebrow, SectionHeading, Button (primary/secondary/on-dark), PhotoPlaceholder (striped, label as alt)
- build Header (utility bar + main nav + mobile menu) and Footer from design/Main.dc.html and design/Mobile.dc.html
- make a simple home page with only header + footer so I can check them
Run the build and fix all errors before you stop.
```

---

## Phase 2 — Home page

```
Build the full home page from design/Main.dc.html, section by section, in the order listed in CLAUDE.md.
Use data from content/site.ts only. Match spacing, sizes and colors from the inline styles.
Make every section responsive: follow design/Mobile.dc.html for phone layouts (single column, 16px side padding, H1 52px, H2 40px).
The fabrication product filter is a client component.
Leave the enquiry form as UI only for now.
When done, run the build and list anything in the design you could not match.
```

---

## Phase 3 — Service pages + projects + contact

```
Build:
1. /services/[slug] using generateStaticParams for the 5 services in content/site.ts. Page hero + the matching home section as the body + industries strip + enquiry form with that service preselected.
2. /projects from design/Projects.dc.html with the sector filter (client component).
3. /contact with the enquiry form, contact details and a map placeholder.
Update header and footer links to point to these pages.
```

---

## Phase 4 — Enquiry form backend

```
Make the enquiry form work:
- POST to app/api/enquiry/route.ts
- validate with Zod on client and server
- honeypot field for spam, reject if filled
- optional drawing upload: pdf, dwg, jpg, png, max 10 MB
- send the enquiry by email with Resend to ENQUIRY_TO_EMAIL, attach the drawing
- env vars: RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL — add .env.example
- show loading, success and error states on the form
- read ?service= from the URL to preselect the service
```

---

## Phase 5 — SEO, accessibility, performance

```
Finish for launch:
- metadata (title, description, Open Graph) for every page
- app/sitemap.ts, app/robots.ts
- LocalBusiness JSON-LD on the home page using content/site.ts
- floating WhatsApp button on mobile
- check focus states, labels, alt text, color contrast, 44px touch targets
- run a production build and fix every warning
Then give me a short list of everything still marked [PLACEHOLDER] that the client must send.
```

---

## Later (after launch, separate quote)

- Replace photo placeholders with the client's real photos (`public/images/…`).
- Simple admin to edit projects and rental list (Payload CMS or Sanity) — only if the client will really update it.
- Rental availability / booking enquiry — the recurring-revenue upsell.
