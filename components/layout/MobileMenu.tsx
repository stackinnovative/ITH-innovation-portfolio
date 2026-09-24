"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { company, contactLabels, ui } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { mailHref, routes, secondaryNav, serviceNav, telHref } from "@/lib/links";

type MobileMenuProps = {
  /** Rendered in the menu's top bar so it lines up with the page header. */
  logo: ReactNode;
};

/** Phone/tablet header controls: call icon + menu button opening a full-screen modal <dialog>. */
export function MobileMenu({ logo }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // The menu is hidden at xl; close it if the window grows past that while it is open.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onChange = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  // Any link inside the menu (route, #anchor, tel:) closes it.
  const closeOnLink = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a")) close();
  };

  return (
    <div className="flex items-center gap-1 xl:hidden">
      <a
        href={telHref(company.phone)}
        aria-label={`${ui.callUs} ${company.phone}`}
        className="flex size-11 items-center justify-center text-ink hover:text-accent"
      >
        <PhoneIcon />
      </a>
      <button
        type="button"
        onClick={show}
        aria-label={ui.openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex size-11 cursor-pointer items-center justify-center bg-ink text-white hover:bg-accent"
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={ui.menuTitle}
        onClose={() => setOpen(false)}
        onClick={closeOnLink}
        className="m-0 h-dvh max-h-none w-full max-w-none flex-col bg-ink p-0 text-white backdrop:bg-transparent open:flex"
      >
        <div className="shrink-0 border-b border-line bg-paper">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
            {logo}
            <button
              type="button"
              onClick={close}
              aria-label={ui.closeMenu}
              autoFocus
              className="flex size-11 cursor-pointer items-center justify-center bg-ink text-white hover:bg-accent"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div data-surface="dark" className="flex flex-1 flex-col gap-10 overflow-y-auto px-4 pt-6 pb-10 md:px-6">
          <nav aria-label={ui.mainNavLabel}>
            <ul className="border-t border-line-dark">
              {serviceNav.map((s) => (
                <li key={s.slug} className="border-b border-line-dark">
                  <Link href={s.href} className="flex min-h-16 items-baseline gap-4 py-3.5 text-white hover:text-accent-on-dark">
                    <span className="w-6 shrink-0 font-mono text-xs font-medium text-accent-on-dark">{s.num}</span>
                    <span className="font-display text-[28px] leading-[1.05] font-bold uppercase">{s.title}</span>
                  </Link>
                </li>
              ))}
              {secondaryNav.map((l) => (
                <li key={l.href} className="border-b border-line-dark">
                  <Link href={l.href} className="flex min-h-16 items-center py-3.5 pl-10 text-white hover:text-accent-on-dark">
                    <span className="font-display text-[28px] leading-[1.05] font-bold uppercase">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <Button href={routes.contact} arrow fullWidth>
              {ui.requestQuote}
            </Button>
            <Button href={telHref(company.phone)} variant="on-dark" fullWidth>
              <PhoneIcon size={18} />
              {ui.call} {company.phone}
            </Button>
          </div>

          <dl className="m-0 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <dt>
                <Eyebrow tone="on-dark-muted" size="sm">
                  {contactLabels.email}
                </Eyebrow>
              </dt>
              <dd className="m-0">
                <a href={mailHref(company.email)} className="text-lg font-medium text-white hover:text-accent-on-dark">
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
              <dd className="m-0 text-base leading-normal text-on-dark">{company.address}</dd>
            </div>
          </dl>
        </div>
      </dialog>
    </div>
  );
}
