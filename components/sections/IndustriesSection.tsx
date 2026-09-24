import Link from "next/link";
import { home, projectCountLabel, sectors, totalProjects } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { routes, sectionIds } from "@/lib/links";

export function IndustriesSection() {
  const copy = home.industries;
  const cta = copy.cta(totalProjects);

  return (
    <Section
      id={sectionIds.industries}
      labelledBy="industries-title"
      surface="steel"
      containerClassName="flex flex-col gap-8 md:gap-12"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-4 md:gap-5">
          <Eyebrow tone="on-dark">{copy.eyebrow}</Eyebrow>
          <h2 id="industries-title" className="m-0 max-w-[780px] font-display text-h2 font-bold uppercase">
            {copy.title}
          </h2>
        </div>
        <Button href={routes.projects} variant="on-dark" arrow className="max-md:hidden">
          {cta}
        </Button>
      </div>

      {/* Tablet/desktop: sector cards. Phone: chips (design/Mobile.dc.html). */}
      <ul className="m-0 grid list-none grid-cols-3 gap-px border border-line-dark bg-line-dark p-0 max-md:hidden lg:grid-cols-5">
        {sectors.map((sector) => (
          <li key={sector.name} className="flex">
            <Link
              href={routes.projects}
              className="flex min-h-35 w-full flex-col gap-5 bg-steel px-6 py-7 text-white hover:bg-steel-raised"
            >
              <span className="font-mono text-[13px] font-medium text-accent-on-dark uppercase">
                {projectCountLabel(sector.clients.length)}
              </span>
              <span className="font-display text-[26px] leading-[1.1] font-semibold uppercase">{sector.name}</span>
              <span className="text-[13px] leading-normal text-on-dark-muted">{copy.samples[sector.name]}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="m-0 flex list-none flex-wrap gap-2 p-0 md:hidden">
        {sectors.map((sector) => (
          <li key={sector.name} className="border border-line-dark-strong px-3 py-2 text-sm">
            {sector.name}
          </li>
        ))}
      </ul>
      <Button href={routes.projects} variant="on-dark" fullWidth className="md:hidden">
        {cta}
      </Button>
    </Section>
  );
}
