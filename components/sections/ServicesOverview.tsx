import Link from "next/link";
import { home, services } from "@/content/site";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { sectionIds, serviceHref } from "@/lib/links";

export function ServicesOverview() {
  const copy = home.services;

  return (
    <Section id={sectionIds.services} labelledBy="services-title" containerClassName="flex flex-col gap-8 md:gap-12">
      <SectionHeading
        id="services-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
        titleClassName="max-w-[780px]"
      />
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((s) => (
          <li key={s.slug} className="flex">
            <Link
              href={serviceHref(s.slug)}
              className="group flex w-full flex-col border border-line bg-paper text-ink hover:border-ink"
            >
              <PhotoPlaceholder label={copy.photos[s.slug]} className="h-[140px] md:h-[180px]" />
              <div className="flex grow flex-col gap-2.5 p-5 md:gap-3 md:p-6">
                <div className="flex items-baseline gap-3 md:flex-col md:items-start">
                  <span className="font-mono text-xs font-medium text-accent md:text-[13px]">{s.num}</span>
                  <h3 className="m-0 font-display text-[26px] leading-[1.05] font-bold uppercase md:text-[28px]">{s.title}</h3>
                </div>
                <p className="m-0 grow text-[15px] leading-[1.55] text-body">{s.summary}</p>
                <span className="flex items-center gap-2 text-[15px] font-semibold text-accent group-hover:text-accent-hover">
                  {copy.cardCta}
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
