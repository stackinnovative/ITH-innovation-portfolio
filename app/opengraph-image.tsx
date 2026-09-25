import { ImageResponse } from "next/og";
import { brand, company, hero, seo, utilityBar } from "@/content/site";
import { ogFonts } from "@/lib/og-fonts";

export const alt = seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared by every page (child routes inherit it). Colours are the design tokens.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#1C2126",
          color: "#FFFFFF",
          borderBottom: "16px solid #B9440F",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "#FFFFFF",
              color: "#15171A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Barlow Condensed",
              fontSize: 36,
            }}
          >
            {brand.mark}
          </div>
          <div style={{ display: "flex", fontFamily: "Barlow Condensed", fontSize: 40, letterSpacing: "0.02em" }}>
            {`${company.shortName.toUpperCase()} ${brand.suffix}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: 22, letterSpacing: "0.1em", color: "#F08A55" }}>
            {hero.eyebrow.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontFamily: "Barlow Condensed", fontSize: 104, lineHeight: 0.95, maxWidth: 1000 }}>
            {hero.title.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", fontFamily: "IBM Plex Mono", fontSize: 20, color: "#C9CDD1", letterSpacing: "0.04em" }}>
          {utilityBar.services}
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
