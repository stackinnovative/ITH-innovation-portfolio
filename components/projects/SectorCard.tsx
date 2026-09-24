import { projectCountLabel, projectsPage } from "@/content/site";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ArrowRightIcon } from "@/components/ui/icons";

type SectorCardProps = {
  sector: { name: string; clients: string[] };
};

export function SectorCard({ sector }: SectorCardProps) {
  return (
    <article className="flex flex-col border border-line bg-paper">
      <PhotoPlaceholder label={projectsPage.photo(sector.name)} className="h-40" />
      <div className="flex flex-col gap-4 px-5 pt-6 pb-7 md:px-7">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="m-0 font-display text-[26px] leading-[1.05] font-bold uppercase md:text-[28px]">{sector.name}</h2>
          <span className="shrink-0 font-mono text-[13px] font-medium text-accent uppercase">
            {projectCountLabel(sector.clients.length)}
          </span>
        </div>
        <ul className="m-0 flex list-none flex-col border-t border-line p-0">
          {sector.clients.map((client) => (
            <li key={client} className="flex items-center justify-between gap-3 border-b border-stripe-b py-3 text-[15px]">
              <span>{client}</span>
              <ArrowRightIcon size={14} className="shrink-0 text-muted" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
