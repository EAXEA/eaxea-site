import type { Metadata } from "next";
import { site } from "./site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} · Web, ürün ve video` }],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: ["/opengraph-image"] },
  };
}
