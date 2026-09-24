# ITH Innovation Private Limited — company website

Marketing + lead-generation site for an industrial engineering company.
Built by StackInnovative. Goal of the site: **get quote enquiries and phone calls** from plant managers and purchase teams.

## Stack (do not change without asking)

- Next.js (latest, App Router) + TypeScript (strict)
- Tailwind CSS (whatever version create-next-app installs; tokens below)
- Fonts via `next/font/google`: Barlow Condensed (500/600/700), IBM Plex Sans (400/500/600), IBM Plex Mono (500)
- Enquiry form: Route Handler `app/api/enquiry/route.ts` → email via Resend. Validate with Zod. Honeypot field for spam.
- Images: `next/image`. Placeholders until client sends real photos.
- Deploy target: Vercel. Every page statically rendered except the API route.
- No UI kits (no shadcn, MUI, Bootstrap). No animation libraries. Keep the bundle small.

## Source of truth

- `design/*.dc.html` = the approved design. Read them before building any section.
  - Layout and styles are inline `style="..."` attributes. Copy spacing, font sizes, colors exactly.
  - `{{name}}` = a value from the `<script>` block at the bottom of each file.
  - `<sc-for list="{{items}}" as="x">` = a loop. `<sc-if>` = a condition.
  - `class="ph"` = a striped photo placeholder. Keep the label text as the image `alt`.
  - Artboards are fixed-size (1440 desktop, 390 mobile). The real site must be **fluid**: max content width 1440px, side padding 64px desktop / 24px tablet / 16px mobile.
- `design/Main.dc.html` → home page (desktop). `design/Mobile.dc.html` → how home collapses on phones. `design/Projects.dc.html` → /projects.
- `content/site.ts` = all copy and data. Import from here. **Never hardcode content in components.**

## Design tokens

| Token | Value | Use |
|---|---|---|
| ground | #F3F1EC | page background |
| paper | #FFFFFF | cards, light sections |
| ink | #15171A | text, dark bands, primary borders |
| steel | #1C2126 | dark sections (handling, industries, projects header) |
| footer | #0F1113 | footer |
| muted | #545A61 | secondary text on light |
| body | #3E444A | paragraph text on light |
| line | #D9D5CC | borders on light |
| line-dark | #353C44 | borders on dark |
| on-dark | #C9CDD1 | paragraph text on dark |
| on-dark-muted | #9AA2AA | small text on dark |
| accent | #B9440F | buttons, eyebrows, links (hover #8E330A) |
| accent-on-dark | #F08A55 | eyebrows/numbers on dark backgrounds |

- Headings: Barlow Condensed 700, UPPERCASE, line-height 0.95–1. H1 92px desktop / 52px mobile. H2 60px / 40px.
- Eyebrow labels: IBM Plex Mono 13px, letter-spacing .1em, uppercase, accent color.
- Body: IBM Plex Sans 16–20px, line-height 1.55–1.6.
- **Square corners everywhere** (no border-radius). No shadows. No gradients except the photo placeholder stripes.
- Buttons: height 52–56px, padding 0 24–28px, 600 weight. Primary = accent fill + white text. Secondary = 1.5px ink border.

## Pages

- `/` home — sections in this order: utility bar, header, hero, client strip, services overview (5 cards), 01 Fabrication, 02 Erection, 03 Heavy Equipment Handling, 04 O&M, 05 Equipment Rental, industries, enquiry form, footer.
- `/services/fabrication`, `/services/erection`, `/services/heavy-equipment-handling`, `/services/operation-maintenance`, `/services/equipment-rental` — one page per service (for SEO). Reuse the matching home section as the page body, plus a page hero, related projects/industries, and the enquiry form with that service pre-selected.
- `/projects` — sector filter chips + sector cards (see design).
- `/contact` — enquiry form + contact details + map embed placeholder.
- Header nav links go to the service pages (not `#anchors`) once those exist.

## Behaviour

- Fabrication product filter and projects sector filter: client components, `useState`, buttons with `aria-pressed`.
- Mobile header: logo + call icon + menu button → full-screen menu. Sticky header on scroll.
- Enquiry form fields: name, company, phone, email, service (5 options), details, optional drawing upload (PDF/DWG/JPG/PNG, max 10 MB). Show success and error states. Service can be preselected by `?service=` query param.
- Floating WhatsApp button on mobile. Phone numbers are `tel:` links.

## Rules

- Placeholders in `[SQUARE BRACKETS]` are unknown client facts. Keep them visible; do **not** invent numbers, certifications or contact details.
- Accessibility: real `<button>`/`<a>`/`<label>`, visible focus ring (2px accent outline), 44px min touch targets, text contrast 4.5:1.
- SEO: unique `title` + `description` per page via `metadata`, Open Graph image, `sitemap.ts`, `robots.ts`, LocalBusiness JSON-LD on home.
- Performance: Lighthouse 90+ on mobile. No client JS except filters, mobile menu and the form.
- Commit after each working phase with a clear message.
