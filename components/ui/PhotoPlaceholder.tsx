import { cn } from "@/lib/cn";

type PhotoPlaceholderProps = {
  /** Describes the photo the client will supply. Becomes the image alt text later. */
  label: string;
  dark?: boolean;
  className?: string;
};

/** Striped stand-in for a real photo. Swap for next/image (alt = label) when photos arrive. */
export function PhotoPlaceholder({ label, dark = false, className }: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center p-3 text-center font-mono text-[11px] font-medium tracking-[0.04em] uppercase md:text-xs",
        dark ? "bg-stripes-dark text-on-dark-muted" : "bg-stripes text-ph-ink",
        className,
      )}
    >
      <span aria-hidden="true">{label}</span>
    </div>
  );
}
