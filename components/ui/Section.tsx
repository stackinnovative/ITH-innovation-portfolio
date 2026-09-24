import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

const surfaces = {
  ground: "bg-ground text-ink",
  paper: "bg-paper text-ink",
  steel: "bg-steel text-white",
  ink: "bg-ink text-white",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  surface?: keyof typeof surfaces;
  /** 1px line on top, as between light sections in the design. */
  borderTop?: boolean;
  className?: string;
  containerClassName?: string;
};

/** Full-bleed band with the design's section padding: 48px phone, 72px tablet, 104px desktop. */
export function Section({
  children,
  id,
  labelledBy,
  surface = "ground",
  borderTop = false,
  className,
  containerClassName,
}: SectionProps) {
  const dark = surface === "steel" || surface === "ink";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-surface={dark ? "dark" : undefined}
      className={cn(surfaces[surface], borderTop && "border-t border-line", "py-12 md:py-18 lg:py-26", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
