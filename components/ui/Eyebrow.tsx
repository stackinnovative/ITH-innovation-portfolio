import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  accent: "text-accent",
  "on-dark": "text-accent-on-dark",
  muted: "text-muted",
  "on-dark-muted": "text-on-dark-muted",
};

const sizes = {
  md: "text-[11px] md:text-[13px]",
  sm: "text-xs",
};

type EyebrowProps = {
  children: ReactNode;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
};

export function Eyebrow({ children, tone = "accent", size = "md", className }: EyebrowProps) {
  return (
    <span className={cn("block font-mono font-medium tracking-eyebrow uppercase", tones[tone], sizes[size], className)}>
      {children}
    </span>
  );
}
