import { company, contactLabels, home, ui, type ServiceSlug } from "@/content/site";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { mailHref, sectionIds, telHref, whatsappHref } from "@/lib/links";

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

        <dl className="m-0 flex flex-col gap-4.5 border-t border-line-dark pt-3">
          <div className="flex flex-col gap-1">
            <dt>
              <Eyebrow tone="on-dark-muted" size="sm">
                {contactLabels.phone}
              </Eyebrow>
            </dt>
            <dd className="m-0">
              <a href={telHref(company.phone)} className="text-xl font-medium text-white hover:text-accent-on-dark">
                {company.phone}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt>
              <Eyebrow tone="on-dark-muted" size="sm">
                {contactLabels.email}
              </Eyebrow>
            </dt>
            <dd className="m-0">
              <a href={mailHref(company.email)} className="text-xl font-medium text-white hover:text-accent-on-dark">
                {company.email}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt>
              <Eyebrow tone="on-dark-muted" size="sm">
                {contactLabels.address}
              </Eyebrow>
            </dt>
            <dd className="m-0 text-[17px] leading-normal">{company.address}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-3">
        <EnquiryForm defaultService={defaultService} />
        <Button href={whatsappHref(company.whatsapp)} variant="on-dark" fullWidth className="md:hidden">
          {ui.chatOnWhatsApp}
        </Button>
      </div>
    </Section>
  );
}
