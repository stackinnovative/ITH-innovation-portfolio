import { home, om } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionIds, serviceAnchors } from "@/lib/links";

export function OmSection() {
  const copy = home.om;

  return (
    <Section
      id={serviceAnchors["operation-maintenance"]}
      labelledBy="om-title"
      containerClassName="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <PhotoPlaceholder label={copy.photo} className="order-last h-[240px] md:h-[460px] lg:order-none" />

      <div className="flex flex-col gap-6">
        <SectionHeading
          id="om-title"
          layout="stack"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          leadSize="lg"
        />

        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
          {om.offers.map((offer) => (
            <li key={offer.title} className="flex flex-col gap-1.5 border border-line bg-paper p-4">
              <span className="font-semibold">{offer.title}</span>
              <span className="text-[13px] text-muted">{offer.body}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2.5">
          <Eyebrow tone="muted" size="sm">
            {copy.plantsLabel}
          </Eyebrow>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {om.plants.map((plant) => (
              <li key={plant} className="border border-line-strong px-3.5 py-2 text-sm">
                {plant}
              </li>
            ))}
          </ul>
        </div>

        <Button href={`#${sectionIds.contact}`} className="max-sm:w-full sm:self-start">
          {copy.cta}
        </Button>
      </div>
    </Section>
  );
}
