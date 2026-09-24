import Link from "next/link";
import { brand, company } from "@/content/site";

/** Phone: "ITH INNOVATION Pvt Ltd." · tablet/laptop: "ITH INNOVATION" · 1440+: "ITH INNOVATION Private Limited". */
export function Logo() {
  return (
    <Link href="/" aria-label={`${company.name} — home`} className="flex shrink-0 items-center gap-2.5 text-ink md:gap-3">
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center bg-ink font-display text-lg font-bold text-white md:size-11 md:text-[22px]"
      >
        {brand.mark}
      </span>
      <span className="flex flex-col">
        <span className="font-display text-xl leading-none font-bold md:text-2xl md:tracking-[0.02em]">
          <span className="uppercase">{company.shortName}</span>
          <span className="md:hidden"> {brand.suffixShort}</span>
          <span className="hidden min-[1440px]:inline"> {brand.suffix}</span>
        </span>
        <span className="mt-1 hidden font-mono text-[11px] font-medium tracking-[0.08em] text-muted uppercase md:block">
          {company.tagline}
        </span>
      </span>
    </Link>
  );
}
