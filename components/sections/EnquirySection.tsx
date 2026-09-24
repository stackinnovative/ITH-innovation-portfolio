import { home, type ServiceSlug } from "@/content/site";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { sectionIds } from "@/lib/links";
import { ContactDetails } from "./ContactDetails";

type EnquirySectionProps = {
  defaultService?: ServiceSlug;
};

export function EnquirySection({ defaultService }: EnquirySectionProps) {
  const copy = home.enquiry;

  return (
    <Section
      id={sectionIds.contact}
      labelledBy="enquiry-title"
      surface="ink"
      containerClassName="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-18"
    >
      <div className="flex flex-col gap-6 md:gap-7">
        <Eyebrow tone="on-dark">{copy.eyebrow}</Eyebrow>
        <h2 id="enquiry-title" className="m-0 font-display text-h2 font-bold uppercase lg:text-[64px]">
          {copy.title}
        </h2>
        <p className="m-0 text-base leading-[1.6] text-on-dark md:text-[17px]">{copy.lead}</p>
        <ContactDetails />
      </div>

      <EnquiryForm defaultService={defaultService} />
    </Section>
  );
}
