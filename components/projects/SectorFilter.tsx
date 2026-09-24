"use client";

import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectorFilterProps = {
  /** Server-rendered cards, one per sector. All stay in the HTML; filtering only hides them. */
  items: { name: string; card: ReactNode }[];
  allLabel: string;
  filterLabel: string;
};

export function SectorFilter({ items, allLabel, filterLabel }: SectorFilterProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const chips = [{ value: null, label: allLabel }, ...items.map((i) => ({ value: i.name, label: i.name }))];

  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="py-4 md:py-6">
          {/* Phones: one scrollable row. Tablet and up: wraps, as in the design. */}
          <div
            role="group"
            aria-label={filterLabel}
            className="flex gap-2 max-md:-mx-4 max-md:overflow-x-auto max-md:px-4 max-md:pb-1 md:flex-wrap"
          >
            {chips.map((chip) => {
              const pressed = chip.value === selected;
              return (
                <button
                  key={chip.label}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setSelected(chip.value)}
                  className={cn(
                    "h-11 shrink-0 cursor-pointer border-[1.5px] px-4 text-sm font-semibold whitespace-nowrap",
                    pressed ? "border-ink bg-ink text-white" : "border-line-strong bg-paper text-ink hover:border-ink",
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <Container className="grid items-start gap-5 pt-8 pb-16 md:grid-cols-2 md:pt-14 md:pb-26 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} hidden={selected !== null && selected !== item.name}>
            {item.card}
          </div>
        ))}
      </Container>
    </>
  );
}
