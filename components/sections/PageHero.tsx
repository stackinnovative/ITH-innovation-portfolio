import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Buttons under the lead. */
  children?: ReactNode;
};

/** Dark page header for inner pages, from the header band in design/Projects.dc.html. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" data-surface="dark" className="border-b border-line-dark bg-steel text-white">
      <Container className="grid gap-6 pt-12 pb-10 md:gap-8 md:pt-16 md:pb-12 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16 lg:pt-20 lg:pb-14">
        <div className="flex flex-col gap-4 md:gap-5">
          <Eyebrow tone="on-dark">{eyebrow}</Eyebrow>
          <h1 id="page-title" className="m-0 font-display text-h1 font-bold tracking-[-0.01em] uppercase">
            {title}
          </h1>
        </div>
        {lead || children ? (
          <div className="flex flex-col gap-6">
            {lead ? <p className="m-0 text-base leading-[1.6] text-on-dark md:text-lg">{lead}</p> : null}
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
