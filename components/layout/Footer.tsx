import Link from "next/link";
import type { ReactNode } from "react";
import { company, footer, serviceLongTitles, services, ui } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mailHref, routes, serviceHref, telHref } from "@/lib/links";

// 44px rows on phones (touch targets), tighter on desktop to match the design.
const rowClass = "flex min-h-11 items-center md:min-h-8";
const linkClass = "inline-flex min-h-11 items-center text-on-dark hover:text-white md:min-h-8";

function Column({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <Eyebrow size="sm" className="text-footer-muted">
        {heading}
      </Eyebrow>
      <ul className="m-0 flex list-none flex-col p-0 text-[15px] md:gap-1">{children}</ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-surface="dark" className="bg-footer text-on-dark">
      <Container className="flex flex-col gap-10 pt-10 pb-8 md:gap-12 md:pt-16 md:pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <span className="font-display text-2xl font-bold text-white uppercase md:text-[32px]">{company.shortName}</span>
            <p className="m-0 max-w-[380px] text-[15px] leading-[1.6]">{footer.blurb}</p>
          </div>

          <Column heading={footer.headings.services}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={serviceHref(s.slug)} className={linkClass}>
                  {serviceLongTitles[s.slug]}
                </Link>
              </li>
            ))}
          </Column>

          <Column heading={footer.headings.company}>
            <li>
              <Link href={routes.projects} className={linkClass}>
                {ui.projects}
              </Link>
            </li>
            <li>
              <Link href={routes.contact} className={linkClass}>
                {ui.contact}
              </Link>
            </li>
            {footer.companyPlaceholders.map((p) => (
              <li key={p} className={rowClass}>
                {p}
              </li>
            ))}
          </Column>

          <Column heading={footer.headings.contact}>
            <li>
              <a href={telHref(company.phone)} className={linkClass}>
                {company.phone}
              </a>
            </li>
            <li>
              <a href={mailHref(company.email)} className={linkClass}>
                {company.email}
              </a>
            </li>
            <li className={rowClass}>{company.city}</li>
          </Column>
        </div>

        <div className="flex flex-col gap-2 border-t border-footer-line pt-6 text-[13px] text-footer-muted md:flex-row md:justify-between">
          <span>
            © {year} {company.shortName}. {footer.rights}
          </span>
          <span>
            {footer.gstinLabel} {company.gstin}
          </span>
        </div>
      </Container>
    </footer>
  );
}
