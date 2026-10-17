import Image from "next/image";
import { home, rentalProducts } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { sectionIds } from "@/lib/links";

/** Photo grid of hire equipment (managed in Sanity) — only on the equipment rental service page. */
export function RentalFleetSection() {
  const copy = home.rental;
  if (rentalProducts.length === 0) return null;

  return (
    <Section labelledBy="rental-fleet-title" borderTop containerClassName="flex flex-col gap-8 md:gap-12">
      <SectionHeading id="rental-fleet-title" eyebrow={copy.fleetEyebrow} title={copy.fleetTitle} lead={copy.fleetLead} />

      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {rentalProducts.map((product) => (
          <li key={product.name} className="flex flex-col border border-line bg-paper">
            <div className="relative aspect-[4/3] border-b border-line bg-paper">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className={cn(product.fit === "contain" ? "object-contain p-4" : "object-cover")}
              />
            </div>
            <div className="flex flex-1 items-end justify-between gap-4 p-5">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-accent">
                  {product.category}
                </span>
                <h3 className="m-0 font-display text-[24px] font-bold uppercase leading-none">{product.name}</h3>
                {product.spec ? <span className="font-mono text-[13px] font-medium text-muted">{product.spec}</span> : null}
              </div>
              <a
                href={`#${sectionIds.contact}`}
                className="inline-flex min-h-11 shrink-0 items-center text-[15px] font-semibold text-accent underline-offset-4 hover:text-accent-hover hover:underline"
              >
                {copy.fleetCta}
                <span className="sr-only">{copy.fleetCtaLabel(product.name)}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
