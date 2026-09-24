import type { Metadata } from "next";
import { company, contactPage, ui } from "@/content/site";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section } from "@/components/ui/Section";
import { PhoneIcon } from "@/components/ui/icons";
import { telHref, whatsappHref } from "@/lib/links";

export const metadata: Metadata = {
  title: ui.contact,
  description: contactPage.lead,
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactPage.eyebrow} title={contactPage.title} lead={contactPage.lead} />
      <Section labelledBy="contact-details-title" containerClassName="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-18">
        <div className="flex flex-col gap-6 md:gap-8">
          <h2 id="contact-details-title" className="m-0 font-display text-[32px] leading-none font-bold uppercase md:text-[40px]">
            {contactPage.detailsTitle}
          </h2>
          <ContactDetails tone="light" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={telHref(company.phone)} variant="secondary">
              <PhoneIcon size={18} />
              {ui.call} {company.phone}
            </Button>
            <Button href={whatsappHref(company.whatsapp)} variant="secondary">
              {ui.chatOnWhatsApp}
            </Button>
          </div>
          {/* Replace with a Google Maps embed once the client confirms the address. */}
          <PhotoPlaceholder label={contactPage.mapLabel} className="h-[280px] md:h-[360px]" />
        </div>

        <div className="self-start border border-line">
          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}
