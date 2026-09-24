import type { Metadata } from "next";
import { projectsPage, sectors, ui } from "@/content/site";
import { SectorCard } from "@/components/projects/SectorCard";
import { SectorFilter } from "@/components/projects/SectorFilter";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: ui.projects,
  description: projectsPage.lead,
};

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
