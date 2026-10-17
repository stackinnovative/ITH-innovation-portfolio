import { company, hero, home, ui } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { sectionIds, telHref } from "@/lib/links";

// Stat cells: 4 across from tablet up; phones drop "years" (design/Mobile.dc.html) and show 3.
const statCell = [
  "max-md:hidden md:pt-5 md:pr-4",
  "pt-4 pr-3 md:border-l md:border-line md:px-4 md:pt-5",
  "pt-4 pr-3 pl-3 border-l border-line md:px-4 md:pt-5",
  "pt-4 pl-3 border-l border-line md:pl-4 md:pt-5",
];

export function Hero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="bg-paper">
        {/* Desktop: text left, photos right, text block vertically centred via the 1fr spacer rows.
            Phone: text → photo → buttons → stats, as in the mobile design. */}
        <Container className="grid gap-5 pt-8 pb-7 md:gap-8 md:pt-14 md:pb-14 lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-14 lg:gap-y-0 lg:pt-18 lg:pb-16">
          <div className="flex flex-col gap-5 md:gap-7 lg:row-start-2">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="hero-title" className="m-0 font-display text-h1 font-bold tracking-[-0.01em] uppercase">
              {hero.title}
            </h1>
            <p className="m-0 max-w-[580px] text-base leading-[1.55] text-body md:text-xl">{hero.body}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 md:grid-rows-[380px_220px] lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-center">
            <Photo
              photo={home.hero.photos.main}
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-[220px] md:col-span-2 md:h-auto"
            />
            <Photo photo={home.hero.photos.secondary} sizes="(min-width: 1024px) 25vw, 50vw" className="max-md:hidden" />
            <div data-surface="dark" className="flex flex-col justify-between gap-6 bg-ink p-7 text-white max-md:hidden">
              <Eyebrow tone="on-dark" size="sm">
                {hero.shutdownCard.eyebrow}
              </Eyebrow>
              <div className="flex flex-col gap-2">
                <p className="m-0 font-display text-[30px] leading-[1.05] font-semibold">{hero.shutdownCard.title}</p>
                <a href={telHref(company.phone)} className="inline-flex min-h-11 items-center text-[15px] text-on-dark hover:text-white">
                  {ui.call} {company.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:row-start-3 lg:mt-7 lg:gap-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href={`#${sectionIds.contact}`} size="lg" arrow>
                {ui.requestQuote}
              </Button>
              <Button href={`#${sectionIds.services}`} size="lg" variant="secondary">
                {home.hero.secondaryCta}
              </Button>
            </div>
            <dl className="m-0 grid grid-cols-3 border-t border-line md:grid-cols-4">
              {hero.stats.map((stat, i) => (
                <div key={stat.label} className={cn("flex flex-col-reverse gap-0.5 md:gap-1", statCell[i])}>
                  <dt className="text-xs text-muted md:text-[13px]">{stat.label}</dt>
                  <dd className="m-0 font-display text-[32px] leading-tight font-bold md:text-[40px]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Phone-only shutdown band (the desktop card lives in the photo grid above). */}
      <a
        href={telHref(company.phone)}
        data-surface="dark"
        className="flex items-center justify-between gap-3 bg-ink px-4 py-5 text-white md:hidden"
      >
        <span className="flex flex-col gap-1">
          <Eyebrow tone="on-dark">{hero.shutdownCard.eyebrow}</Eyebrow>
          <span className="font-display text-[22px] font-semibold">
            {ui.call} {company.phone}
          </span>
        </span>
        <ArrowRightIcon size={20} />
      </a>
    </>
  );
}
