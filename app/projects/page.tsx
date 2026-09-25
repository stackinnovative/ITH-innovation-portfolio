import { projectsPage, sectors, ui } from "@/content/site";
import { SectorCard } from "@/components/projects/SectorCard";
import { SectorFilter } from "@/components/projects/SectorFilter";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { routes } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: ui.projects, description: projectsPage.lead, path: routes.projects });

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow={projectsPage.eyebrow} title={projectsPage.title} lead={projectsPage.lead} />
      <SectorFilter
        allLabel={projectsPage.allLabel}
        filterLabel={projectsPage.filterLabel}
        items={sectors.map((sector) => ({ name: sector.name, card: <SectorCard sector={sector} /> }))}
      />
      <CtaBand title={projectsPage.ctaTitle} cta={projectsPage.cta} href={routes.contact} />
    </>
  );
}
