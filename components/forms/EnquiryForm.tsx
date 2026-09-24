"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { company, enquiryForm, services, type ServiceSlug } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ChatIcon, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import {
  enquirySchema,
  HONEYPOT_FIELD,
  isServiceSlug,
  whatsappMessage,
  type Enquiry,
  type EnquiryField,
} from "@/lib/enquiry";
import { whatsappHref } from "@/lib/links";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<EnquiryField, string>>;

const FIELD_ORDER: EnquiryField[] = ["name", "company", "phone", "email", "service", "details"];

const fieldClass =
  "w-full border bg-paper text-base font-normal text-ink placeholder:text-muted";

function readValues(form: HTMLFormElement) {
  const data = new FormData(form);
  const get = (key: string) => String(data.get(key) ?? "");
  return {
    values: Object.fromEntries(FIELD_ORDER.map((field) => [field, get(field)])),
    honeypot: get(HONEYPOT_FIELD),
  };
}

type EnquiryFormProps = {
  /** Preselected service. A valid ?service= in the URL overrides it. */
  defaultService?: ServiceSlug;
};

export function EnquiryForm({ defaultService = "fabrication" }: EnquiryFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const urlService = useRef<ServiceSlug | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  // Read ?service= on the client so every page can stay statically rendered.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("service");
    if (isServiceSlug(param) && serviceRef.current) {
      urlService.current = param;
      serviceRef.current.value = param;
    }
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const f = enquiryForm.fields;
  const sending = status === "sending";

  /** Validate with the shared Zod schema; show messages and focus the first bad field. */
  function validate(): Enquiry | null {
    const form = formRef.current;
    if (!form) return null;
    const result = enquirySchema.safeParse(readValues(form).values);
    if (result.success) {
      setErrors({});
      return result.data;
    }
    const next: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as EnquiryField;
      next[field] ??= issue.message;
    }
    setErrors(next);
    const first = FIELD_ORDER.find((field) => next[field]);
    if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || !formRef.current) return;
    const enquiry = validate();
    if (!enquiry) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enquiry, [HONEYPOT_FIELD]: readValues(formRef.current).honeypot }),
      });
      if (response.status === 400) {
        // Server-side validation disagreed (e.g. old cached script): show its messages.
        const data: { errors?: Partial<Record<EnquiryField, string[]>> } = await response.json().catch(() => ({}));
        if (data.errors) {
          setErrors(Object.fromEntries(Object.entries(data.errors).map(([k, v]) => [k, v?.[0]])) as FieldErrors);
          setStatus("idle");
          return;
        }
      }
      if (!response.ok) throw new Error(`Enquiry failed with status ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleWhatsApp() {
    const enquiry = validate();
    if (!enquiry) return;
    const url = `${whatsappHref(company.whatsapp)}?text=${encodeURIComponent(whatsappMessage(enquiry))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function startOver() {
    formRef.current?.reset();
    if (urlService.current && serviceRef.current) serviceRef.current.value = urlService.current;
    setErrors({});
    setStatus("idle");
  }

  /** Shared id / aria wiring and error border for each input. */
  const control = (field: EnquiryField) => ({
    id: `${id}-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
    className: cn(fieldClass, errors[field] ? "border-accent" : "border-field-border"),
  });

  const field = (name: EnquiryField, label: string, input: ReactNode, opts: { wide?: boolean; optional?: boolean } = {}) => (
    <div className={cn("flex flex-col gap-2", opts.wide && "sm:col-span-2")}>
      <label htmlFor={`${id}-${name}`} className="text-sm font-semibold">
        {label}
        {opts.optional ? <span className="font-normal text-muted"> {enquiryForm.optional}</span> : null}
      </label>
      {input}
      {errors[name] ? (
        <p id={`${id}-${name}-error`} className="m-0 text-sm font-medium text-accent">
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="bg-paper text-ink">
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        hidden={status !== "success"}
        className="flex flex-col items-start gap-4 p-5 outline-none md:p-11"
      >
        <CheckIcon size={36} className="text-accent" />
        <h3 className="m-0 font-display text-[32px] leading-none font-bold uppercase">{enquiryForm.success.title}</h3>
        <p className="m-0 text-base leading-[1.6] text-body">{enquiryForm.success.body}</p>
        <Button variant="secondary" onClick={startOver}>
          {enquiryForm.success.again}
        </Button>
      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        hidden={status === "success"}
        className="relative grid gap-5 p-5 sm:grid-cols-2 md:p-11"
      >
        {field("name", f.name.label, <input {...control("name")} type="text" required autoComplete="name" placeholder={f.name.placeholder} className={cn(control("name").className, "h-[50px] px-3.5")} />)}
        {field("company", f.company.label, <input {...control("company")} type="text" autoComplete="organization" placeholder={f.company.placeholder} className={cn(control("company").className, "h-[50px] px-3.5")} />, { optional: true })}
        {field("phone", f.phone.label, <input {...control("phone")} type="tel" required autoComplete="tel" placeholder={f.phone.placeholder} className={cn(control("phone").className, "h-[50px] px-3.5")} />)}
        {field("email", f.email.label, <input {...control("email")} type="email" autoComplete="email" placeholder={f.email.placeholder} className={cn(control("email").className, "h-[50px] px-3.5")} />, { optional: true })}
        {field(
          "service",
          f.service.label,
          <select {...control("service")} ref={serviceRef} required defaultValue={defaultService} className={cn(control("service").className, "h-[50px] px-3.5")}>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {enquiryForm.serviceOptions[s.slug]}
              </option>
            ))}
          </select>,
          { wide: true },
        )}
        {field("details", f.details.label, <textarea {...control("details")} rows={5} placeholder={f.details.placeholder} className={cn(control("details").className, "resize-y p-3.5")} />, { wide: true, optional: true })}

        {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-${HONEYPOT_FIELD}`}>{enquiryForm.honeypotLabel}</label>
          <input id={`${id}-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" ? (
          <p role="alert" className="m-0 border-l-4 border-accent bg-ground px-4 py-3 text-sm leading-normal sm:col-span-2">
            {enquiryForm.errors.send}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" size="lg" onClick={handleWhatsApp}>
            <ChatIcon />
            {enquiryForm.whatsapp}
          </Button>
          <Button type="submit" size="lg" disabled={sending} className="sm:px-8">
            {sending ? enquiryForm.sending : enquiryForm.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}
