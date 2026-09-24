"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/content/site";
import { cn } from "@/lib/cn";
import { secondaryNav, serviceNav } from "@/lib/links";

// Client only for usePathname (current-page highlight, as on design/Projects.dc.html).
export function DesktopNav() {
  const pathname = usePathname();

  const item = (href: string, label: string) => {
    const current = href === pathname;
    return (
      <li key={href}>
        <Link
          href={href}
          aria-current={current ? "page" : undefined}
          className={cn("inline-flex h-11 items-center", current ? "text-accent" : "text-ink hover:text-accent")}
        >
          <span className={cn("border-b-2 py-1", current ? "border-accent" : "border-transparent")}>{label}</span>
        </Link>
      </li>
    );
  };

  return (
    <nav aria-label={ui.mainNavLabel} className="hidden xl:block">
      <ul className="flex items-center gap-5 text-[15px] font-medium min-[1440px]:gap-7">
        {serviceNav.map((s) => item(s.href, s.label))}
        <li aria-hidden="true" className="h-5 w-px bg-line" />
        {secondaryNav.map((l) => item(l.href, l.label))}
      </ul>
    </nav>
  );
}
