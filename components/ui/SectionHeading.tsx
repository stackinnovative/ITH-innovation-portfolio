import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** "dark" for steel/ink bands. */
  tone?: "light" | "dark";
  /** split: heading left, lead right (bottom-aligned) on desktop. stack: everything in one column. */
  layout?: "split" | "stack";
  as?: "h1" | "h2";
  /** Lead text size from tablet up: 17px (default) or 18px. */
  leadSize?: "md" | "lg";
  id?: string;
  className?: string;
  titleClassName?: string;
  leadClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  layout = "split",
  as: Heading = "h2",
  leadSize = "md",
  id,
  className,
  titleClassName,
  leadClassName,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:gap-6",
        layout === "split" && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:gap-5">
        <Eyebrow tone={dark ? "on-dark" : "accent"}>{eyebrow}</Eyebrow>
        <Heading
          id={id}
          className={cn(
            "m-0 font-display font-bold uppercase",
            Heading === "h1" ? "text-h1 tracking-[-0.01em]" : "text-h2",
            titleClassName,
          )}
        >
          {title}
        </Heading>
      </div>
      {lead ? (
        <p
          className={cn(
            "m-0 text-base leading-[1.6]",
            leadSize === "lg" ? "md:text-lg" : "md:text-[17px]",
            dark ? "text-on-dark" : "text-body",
            layout === "split" && "lg:max-w-[460px]",
            leadClassName,
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
