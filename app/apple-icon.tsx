import { ImageResponse } from "next/og";
import { brand } from "@/content/site";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 92,
        }}
      >
        {brand.mark}
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
