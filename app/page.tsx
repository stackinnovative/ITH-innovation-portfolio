import { company, hero, ui } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes, telHref } from "@/lib/links";

// Phase 1 preview: header + footer plus the shared pieces. Replaced by the full home page in Phase 2.
export default function HomePage() {
  return (
    <>
      <section className="bg-paper py-12 md:py-18">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col justify-center gap-7">
            <SectionHeading as="h1" layout="stack" eyebrow={hero.eyebrow} title={hero.title} lead={hero.body} />
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href={routes.contact} size="lg" arrow>
                {ui.requestQuote}
              </Button>
              <Button href={routes.projects} size="lg" variant="secondary">
                {ui.projects}
              </Button>
            </div>
          </div>
          <PhotoPlaceholder label="Photo: large vessel being erected at site" className="h-[220px] md:h-[380px]" />
        </Container>
      </section>

      <section data-surface="dark" className="bg-steel py-12 text-white md:py-26">
        <Container className="flex flex-col gap-8">
          <SectionHeading tone="dark" eyebrow={hero.shutdownCard.eyebrow} title={hero.shutdownCard.title} lead={hero.body} />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={telHref(company.phone)} variant="on-dark">
              {ui.call} {company.phone}
            </Button>
            <Eyebrow tone="on-dark-muted" size="sm">
              {company.city}
            </Eyebrow>
          </div>
          <PhotoPlaceholder dark label="Photo" className="h-[120px] w-[170px]" />
        </Container>
      </section>
    </>
  );
}
