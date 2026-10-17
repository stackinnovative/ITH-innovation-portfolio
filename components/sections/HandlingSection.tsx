import { handling, home } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { sectionIds, serviceAnchors } from "@/lib/links";

export function HandlingSection() {
  const copy = home.handling;

  return (
    <Section
      id={serviceAnchors["heavy-equipment-handling"]}
      labelledBy="handling-title"
      surface="steel"
      containerClassName="flex flex-col gap-10 md:gap-12"
    >
      <div className="grid gap-5 md:gap-6 lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
        <div className="flex flex-col gap-4 md:gap-5">
          <Eyebrow tone="on-dark">{copy.eyebrow}</Eyebrow>
          <h2 id="handling-title" className="m-0 font-display text-h2 font-bold uppercase">
            {copy.title}
          </h2>
        </div>
        <p className="m-0 text-base leading-[1.6] text-on-dark md:text-[17px]">{copy.lead}</p>
      </div>

      <dl className="m-0 grid grid-cols-2 gap-px border border-line-dark bg-line-dark lg:grid-cols-4">
        {handling.capacities.map((c) => (
          <div key={c.label} className="flex flex-col-reverse gap-2 bg-steel p-5 md:p-7">
            <dt className="text-sm text-on-dark md:text-[15px]">{c.label}</dt>
            <dd className="m-0 font-display text-[40px] leading-none font-bold text-accent-on-dark md:text-[56px]">
              {c.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <Eyebrow tone="on-dark-muted" size="sm">
            {copy.scopeLabel}
          </Eyebrow>
          <ul className="m-0 flex list-none flex-col border-t border-line-dark-strong p-0">
            {handling.scope.map((item) => (
              <li key={item.title} className="flex items-center justify-between gap-4 border-b border-line-dark py-4">
                <span className="text-base font-medium md:text-[17px]">{item.title}</span>
                <span className="text-right text-sm text-on-dark-muted">{item.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow tone="on-dark-muted" size="sm">
            {copy.fleetLabel}
          </Eyebrow>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {handling.fleet.map((v) => (
              <li key={v.name} className="flex border border-line-dark bg-steel-raised">
                <Photo
                  dark
                  photo={v.photo ?? `${copy.fleetPhoto}: ${v.name}`}
                  sizes="170px"
                  className="h-[120px] w-[120px] shrink-0 sm:w-[170px]"
                />
                <div className="flex flex-col justify-center gap-1.5 px-5 py-5 md:px-6">
                  <h3 className="m-0 font-display text-[22px] font-bold uppercase md:text-[26px]">{v.name}</h3>
                  <span className="text-sm text-on-dark-muted">{v.spec}</span>
                </div>
              </li>
            ))}
          </ul>
          <Button href={`#${sectionIds.contact}`} fullWidth>
            {copy.cta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
