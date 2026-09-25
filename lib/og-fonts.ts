import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Brand fonts for ImageResponse (OG image, icons). Satori needs raw font files, not next/font.
export async function ogFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [barlow, plexMono] = await Promise.all([
    readFile(join(dir, "BarlowCondensed-Bold.woff")),
    readFile(join(dir, "IBMPlexMono-Medium.woff")),
  ]);
  return [
    { name: "Barlow Condensed", data: barlow, weight: 700 as const, style: "normal" as const },
    { name: "IBM Plex Mono", data: plexMono, weight: 500 as const, style: "normal" as const },
  ];
}
