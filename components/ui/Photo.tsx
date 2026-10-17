import Image from "next/image";
import type { SitePhoto } from "@/content/site";
import { cn } from "@/lib/cn";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

type PhotoProps = {
  /** A real photo, or a placeholder label (string) until the client supplies one. */
  photo: SitePhoto | string;
  /** Sizing classes (height/width) — the image fills this box. */
  className?: string;
  /** next/image `sizes` for the box's rendered width. */
  sizes: string;
  /** Load eagerly (above the fold). */
  preload?: boolean;
  dark?: boolean;
};

export function Photo({ photo, className, sizes, preload = false, dark = false }: PhotoProps) {
  if (typeof photo === "string") return <PhotoPlaceholder label={photo} dark={dark} className={className} />;

  return (
    <div className={cn("relative overflow-hidden bg-line", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </div>
  );
}
