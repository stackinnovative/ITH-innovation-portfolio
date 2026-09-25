import { ImageResponse } from "next/og";
import { brand } from "@/content/site";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the "ITH" mark from the header logo. */
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15171A",
          color: "#FFFFFF",
          fontFamily: "Barlow Condensed",
          fontSize: 34,
        }}
      >
        {brand.mark}
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
