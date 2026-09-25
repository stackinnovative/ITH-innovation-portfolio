import type { ReactNode } from "react";
import { company, contactLabels } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { mailHref, telHref } from "@/lib/links";

type ContactDetailsProps = {
  tone?: "light" | "dark";
  className?: string;
};

/** Phone / email / workshop address list, as in the enquiry band of design/Main.dc.html. */
export function ContactDetails({ tone = "dark", className }: ContactDetailsProps) {
  const dark = tone === "dark";
  const linkClass = cn(
    "inline-flex min-h-11 items-center text-xl font-medium",
    dark ? "text-white hover:text-accent-on-dark" : "text-ink hover:text-accent",
  );

  const item = (label: string, value: ReactNode) => (
    <div className="flex flex-col gap-1">
      <dt>
        <Eyebrow tone={dark ? "on-dark-muted" : "muted"} size="sm">
          {label}
        </Eyebrow>
      </dt>
      <dd className="m-0">{value}</dd>
    </div>
  );

  return (
    <dl className={cn("m-0 flex flex-col gap-4.5 border-t pt-3", dark ? "border-line-dark" : "border-line", className)}>
      {item(
        contactLabels.phone,
        <a href={telHref(company.phone)} className={linkClass}>
          {company.phone}
        </a>,
      )}
      {item(
        contactLabels.email,
        <a href={mailHref(company.email)} className={linkClass}>
          {company.email}
        </a>,
      )}
      {item(contactLabels.address, <span className="text-[17px] leading-normal">{company.address}</span>)}
    </dl>
  );
}
