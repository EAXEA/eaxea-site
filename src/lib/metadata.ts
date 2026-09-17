import type { Metadata } from "next";
import { site } from "./site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  // Defaults to the site-wide share card. Case pages pass their own generated
  // image so a shared link shows the project, not the same card every time.
  image = "/opengraph-image",
): Metadata {
  const socialTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: new URL(path, site.url).href,
      title: socialTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
  };
}
