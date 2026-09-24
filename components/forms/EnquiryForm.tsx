import type { ReactNode } from "react";
import { enquiryForm, services, type ServiceSlug } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const fieldClass =
  "w-full border border-field-border bg-paper text-base font-normal text-ink placeholder:text-muted";

function Field({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <label className={cn("flex flex-col gap-2 text-sm font-semibold", wide && "sm:col-span-2")}>
      {label}
      {children}
    </label>
  );
}

type EnquiryFormProps = {
  defaultService?: ServiceSlug;
};

// UI only for now. Phase 4 makes this a client component: Zod validation, honeypot,
// upload checks, POST to /api/enquiry, loading/success/error states and ?service= preselect.
export function EnquiryForm({ defaultService = "fabrication" }: EnquiryFormProps) {
  const f = enquiryForm.fields;

  return (
    <form className="grid gap-5 bg-paper p-5 text-ink sm:grid-cols-2 md:p-11">
      <Field label={f.name.label}>
        <input name="name" type="text" required autoComplete="name" placeholder={f.name.placeholder} className={cn(fieldClass, "h-[50px] px-3.5")} />
      </Field>
      <Field label={f.company.label}>
        <input name="company" type="text" autoComplete="organization" placeholder={f.company.placeholder} className={cn(fieldClass, "h-[50px] px-3.5")} />
      </Field>
      <Field label={f.phone.label}>
        <input name="phone" type="tel" required autoComplete="tel" placeholder={f.phone.placeholder} className={cn(fieldClass, "h-[50px] px-3.5")} />
      </Field>
      <Field label={f.email.label}>
        <input name="email" type="email" autoComplete="email" placeholder={f.email.placeholder} className={cn(fieldClass, "h-[50px] px-3.5")} />
      </Field>
      <Field label={f.service.label} wide>
        <select name="service" defaultValue={defaultService} className={cn(fieldClass, "h-[50px] px-3.5")}>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {enquiryForm.serviceOptions[s.slug]}
            </option>
          ))}
        </select>
      </Field>
      <Field label={f.details.label} wide>
        <textarea name="details" rows={5} placeholder={f.details.placeholder} className={cn(fieldClass, "resize-y p-3.5")} />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 border border-dashed border-field-border px-4 py-2 text-sm text-body focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent hover:border-ink">
          <input name="drawing" type="file" accept=".pdf,.dwg,.jpg,.jpeg,.png" className="sr-only" />
          {f.drawing.label}
        </label>
        <Button type="submit" size="lg" className="px-8">
          {enquiryForm.submit}
        </Button>
      </div>
    </form>
  );
}
