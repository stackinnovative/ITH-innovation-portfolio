import { home, rentalProducts, rentalTerms } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { sectionIds, serviceAnchors } from "@/lib/links";

export function RentalSection() {
  const copy = home.rental;

  return (
    <Section
      id={serviceAnchors["equipment-rental"]}
      labelledBy="rental-title"
      surface="paper"
      borderTop
      containerClassName="flex flex-col gap-8 md:gap-12"
    >
      <SectionHeading id="rental-title" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <ul className="m-0 grid list-none content-start border-t-2 border-ink p-0 sm:grid-cols-2 sm:gap-x-10">
          {rentalProducts.map((product) => (
            <li key={product.name} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
              <span className="text-base font-medium">{product.name}</span>
              <span className="text-right font-mono text-[13px] font-medium text-muted">{product.spec ?? product.category}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 self-start border border-line bg-ground p-6 md:p-8">
          <h3 className="m-0 font-display text-[26px] font-bold uppercase md:text-[30px]">{copy.termsTitle}</h3>
          <dl className="m-0 flex flex-col gap-3.5 text-[15px]">
            {rentalTerms.map((term, i) => (
              <div
                key={term.label}
                className={cn("flex justify-between gap-3", i < rentalTerms.length - 1 && "border-b border-line pb-3")}
              >
                <dt className="text-muted">{term.label}</dt>
                <dd className="m-0 text-right font-semibold">{term.value}</dd>
              </div>
            ))}
          </dl>
          <Button href={`#${sectionIds.contact}`} fullWidth>
            {copy.cta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
