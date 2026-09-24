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

export default function HomePage() {
  return (
    <>
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
