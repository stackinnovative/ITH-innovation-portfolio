import Link from "next/link";
import { home, sectors, totalProjects } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { routes } from "@/lib/links";

/** Compact industries band for inner pages: sector chips + link to /projects. */
export function IndustriesStrip() {
  const copy = home.industries;

  return (
    <Section surface="steel" compact labelledBy="industries-strip-title" containerClassName="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="flex flex-col gap-3 md:gap-4">
          <Eyebrow tone="on-dark">{copy.eyebrow}</Eyebrow>
          <h2 id="industries-strip-title" className="m-0 font-display text-[32px] leading-none font-bold uppercase md:text-[40px]">
            {copy.title}
          </h2>
        </div>
        <Button href={routes.projects} variant="on-dark" arrow className="max-md:w-full">
          {copy.cta(totalProjects)}
        </Button>
      </div>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {sectors.map((sector) => (
          <li key={sector.name}>
            <Link
              href={routes.projects}
              className="inline-flex min-h-11 items-center border border-line-dark-strong px-3 text-sm text-white hover:border-white md:px-3.5"
            >
              {sector.name}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
