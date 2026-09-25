import { company, utilityBar } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { mailHref, telHref } from "@/lib/links";

export function UtilityBar() {
  return (
    <div data-surface="dark" className="hidden bg-ink text-[13px] text-on-dark md:block">
      <Container className="flex h-11 items-center justify-between gap-8">
        <span className="hidden truncate lg:block">{utilityBar.services}</span>
        <div className="flex items-center gap-7 max-lg:w-full max-lg:justify-end">
          <a href={telHref(company.phone)} className="inline-flex h-11 items-center text-on-dark hover:text-white">
            {company.phone}
          </a>
          <a href={mailHref(company.email)} className="inline-flex h-11 items-center text-on-dark hover:text-white">
            {company.email}
          </a>
          <span>{company.city}</span>
        </div>
      </Container>
    </div>
  );
}
