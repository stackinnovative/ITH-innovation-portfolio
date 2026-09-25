import { hero, seo } from "@/content/site";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { ErectionSection } from "@/components/sections/ErectionSection";
import { FabricationSection } from "@/components/sections/FabricationSection";
import { HandlingSection } from "@/components/sections/HandlingSection";
import { Hero } from "@/components/sections/Hero";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { OmSection } from "@/components/sections/OmSection";
import { RentalSection } from "@/components/sections/RentalSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: seo.homeTitle, description: hero.body, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <ClientStrip />
      <ServicesOverview />
      <FabricationSection />
      <ErectionSection />
      <HandlingSection />
      <OmSection />
      <RentalSection />
      <IndustriesSection />
      <EnquirySection />
    </>
  );
}
