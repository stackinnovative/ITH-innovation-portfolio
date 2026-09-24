"use client";

import { useState, type ReactNode } from "react";
import type { ProductCategory } from "@/content/site";
import { cn } from "@/lib/cn";
import { pad2 } from "@/lib/format";

type Product = { name: string; category: ProductCategory };

type ProductFilterProps = {
  /** Server-rendered eyebrow + H2 + lead; the chips sit beside it on desktop. */
  heading: ReactNode;
  products: Product[];
  categories: readonly ProductCategory[];
  allLabel: string;
  filterLabel: string;
};

type Selection = ProductCategory | "all";

/** Fabrication product grid with category chips. Tablet and up; phones get ProductGroups instead. */
export function ProductFilter({ heading, products, categories, allLabel, filterLabel }: ProductFilterProps) {
  const [selected, setSelected] = useState<Selection>("all");

  const chips: { value: Selection; label: string; count: number }[] = [
    { value: "all", label: allLabel, count: products.length },
    ...categories.map((c) => ({ value: c, label: c, count: products.filter((p) => p.category === c).length })),
  ];

  // Keep each product's number from the full list (01–28) when filtered.
  const numbered = products.map((p, i) => ({ ...p, num: pad2(i + 1) }));
  const visible = selected === "all" ? numbered : numbered.filter((p) => p.category === selected);

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        {heading}
        <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2 max-md:hidden lg:max-w-[620px] lg:justify-end">
          {chips.map((chip) => {
            const pressed = chip.value === selected;
            return (
              <button
                key={chip.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => setSelected(chip.value)}
                className={cn(
                  "flex h-11 cursor-pointer items-center gap-2 border-[1.5px] border-ink px-4 text-sm font-semibold",
                  pressed ? "bg-ink text-white" : "bg-paper text-ink hover:bg-ground",
                )}
              >
                {chip.label}
                <span className="font-mono text-xs font-medium opacity-75">{chip.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Borders on cells (not a gap background) so a short last row doesn't show grey holes. */}
      <ul className="m-0 grid list-none grid-cols-2 border-t border-l border-line p-0 max-md:hidden lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p) => (
          <li key={p.name} className="flex min-h-16 items-start gap-4.5 border-r border-b border-line bg-paper p-6">
            <span className="w-6 shrink-0 pt-1 font-mono text-[13px] font-medium text-muted">{p.num}</span>
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-2xl leading-[1.1] font-semibold">{p.name}</span>
              <span className="text-[13px] text-muted">{p.category}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
