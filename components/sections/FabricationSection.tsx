import { home, productCategories, products } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pad2 } from "@/lib/format";
import { sectionIds, serviceAnchors } from "@/lib/links";
import { ProductFilter } from "./ProductFilter";

/** Phone layout from design/Mobile.dc.html: products grouped by category instead of the filter grid. */
function ProductGroups() {
  return (
    <ul className="m-0 list-none border-t-2 border-ink p-0 md:hidden">
      {productCategories.map((category) => {
        const items = products.filter((p) => p.category === category);
        return (
          <li key={category} className="flex flex-col gap-2 border-b border-line py-4">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="m-0 font-display text-[22px] font-bold uppercase">{category}</h3>
              <span className="font-mono text-xs font-medium text-muted">{pad2(items.length)}</span>
            </div>
            <p className="m-0 text-sm leading-[1.55] text-body">{items.map((p) => p.name).join(", ")}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function FabricationSection() {
  const copy = home.fabrication;

  return (
    <Section
      id={serviceAnchors.fabrication}
      labelledBy="fabrication-title"
      surface="paper"
      borderTop
      containerClassName="flex flex-col gap-8 md:gap-10"
    >
      <ProductFilter
        heading={
          <SectionHeading
            id="fabrication-title"
            layout="stack"
            eyebrow={copy.eyebrow}
            title={copy.title}
            lead={copy.lead}
            leadClassName="max-w-[620px]"
          />
        }
        products={products}
        categories={productCategories}
        allLabel={copy.allLabel}
        filterLabel={copy.filterLabel}
      />
      <ProductGroups />

      <div className="flex flex-col gap-5 border-[1.5px] border-ink p-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-9 md:py-7">
        <div className="flex flex-col gap-1.5">
          <h3 className="m-0 font-display text-2xl font-bold uppercase md:text-[30px]">{copy.ctaTitle}</h3>
          <p className="m-0 text-[15px] leading-normal text-muted">{copy.ctaBody}</p>
        </div>
        <Button href={`#${sectionIds.contact}`}>{copy.cta}</Button>
      </div>
    </Section>
  );
}
