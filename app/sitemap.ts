import type { MetadataRoute } from "next";
import { services } from "@/content/site";
import { routes, serviceHref } from "@/lib/links";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page(routes.home, 1),
    ...services.map((s) => page(serviceHref(s.slug), 0.9)),
    page(routes.projects, 0.7),
    page(routes.contact, 0.8),
  ];
}
