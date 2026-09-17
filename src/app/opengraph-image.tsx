import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import OgCard, { ogSize, ogContentType } from "@/components/seo/OgCard";

export const alt = `${site.name} · ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return new ImageResponse(
    (
      <OgCard
        lines={[...site.headline]}
        footerLeft={site.positioning}
        footerRight={site.founder}
      />
    ),
    size
  );
}
