import { erection, home } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { serviceAnchors } from "@/lib/links";

export function ErectionSection() {
  const copy = home.erection;

  return (
    <Section
      id={serviceAnchors.erection}
      labelledBy="erection-title"
      borderTop
      containerClassName="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16"
    >
      {/* Photos sit left on desktop, after the text on phones. */}
      <div className="order-last flex flex-col gap-3 md:gap-4 lg:order-none">
        <PhotoPlaceholder label={copy.photos.main} className="h-[240px] md:h-[420px]" />
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <PhotoPlaceholder label={copy.photos.left} className="h-[140px] md:h-[180px]" />
          <PhotoPlaceholder label={copy.photos.right} className="h-[140px] md:h-[180px]" />
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-7">
        <SectionHeading
          id="erection-title"
          layout="stack"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          leadClassName="md:text-lg"
        />

        <ul className="m-0 grid list-none border-t-2 border-ink p-0 sm:grid-cols-2 sm:gap-x-8">
          {erection.scope.map((item) => (
            <li key={item} className="flex items-center gap-3 border-b border-line py-3.5 text-base font-medium">
              <CheckIcon className="shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3.5">
          <Eyebrow tone="muted" size="sm">
            {copy.stepsLabel}
          </Eyebrow>
          <ol className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
            {erection.steps.map((step) => (
              <li key={step.n} className="flex flex-col gap-2 border border-line bg-paper p-4.5">
                <span aria-hidden="true" className="font-display text-[32px] leading-none font-bold text-accent">
                  {step.n}
                </span>
                <span className="text-[15px] font-semibold">{step.title}</span>
                <span className="text-[13px] leading-normal text-muted">{step.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
