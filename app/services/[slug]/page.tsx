import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { company, home, serviceLongTitles, servicePage, services, ui, type ServiceSlug } from "@/content/site";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { ErectionSection } from "@/components/sections/ErectionSection";
import { FabricationSection } from "@/components/sections/FabricationSection";
import { HandlingSection } from "@/components/sections/HandlingSection";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { OmSection } from "@/components/sections/OmSection";
import { PageHero } from "@/components/sections/PageHero";
import { RentalFleetSection } from "@/components/sections/RentalFleetSection";
import { RentalSection } from "@/components/sections/RentalSection";
import { Button } from "@/components/ui/Button";
import { sectionIds, serviceHref, telHref } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

// The matching home-page section is the body of each service page.
const bodies: Record<ServiceSlug, ComponentType> = {
  fabrication: FabricationSection,
  erection: ErectionSection,
  "heavy-equipment-handling": HandlingSection,
  "operation-maintenance": OmSection,
  "equipment-rental": RentalSection,
};

// Meta description: the one-line summary plus the section lead.
const leads: Record<ServiceSlug, string> = {
  fabrication: home.fabrication.lead,
  erection: home.erection.lead,
  "heavy-equipment-handling": home.handling.lead,
  "operation-maintenance": home.om.lead,
  "equipment-rental": home.rental.lead,
};

// Only the five services exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: serviceLongTitles[service.slug],
    description: `${service.summary} ${leads[service.slug]}`,
    path: serviceHref(service.slug),
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const Body = bodies[service.slug];

  return (
    <>
      <PageHero eyebrow={servicePage.eyebrow(service.num)} title={serviceLongTitles[service.slug]} lead={service.summary}>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href={`#${sectionIds.contact}`} size="lg" arrow>
            {ui.requestQuote}
          </Button>
          <Button href={telHref(company.phone)} size="lg" variant="on-dark">
            {ui.call} {company.phone}
          </Button>
        </div>
      </PageHero>
      <Body />
      {service.slug === "equipment-rental" && <RentalFleetSection />}
      <IndustriesStrip />
      <EnquirySection defaultService={service.slug} />
    </>
  );
}
