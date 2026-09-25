import type { Metadata } from "next";
import { company, seo } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of the "%s | ITH Innovation" template (home page). */
  absoluteTitle?: boolean;
};

// A page-level `openGraph` object replaces the file-based image, so point at app/opengraph-image.tsx explicitly.
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: seo.ogImageAlt };

/** Title, description, canonical URL and Open Graph/Twitter tags for one page. */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${company.shortName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: seo.locale,
      siteName: company.name,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}
