import { site } from "@/lib/site";
import JsonLdScript from "./JsonLdScript";

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList structured data. Search results show the trail instead of a
 * bare URL, which reads better for nested case pages.
 */
export default function BreadcrumbJsonLd({ trail }: { trail: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: new URL(crumb.path, site.url).href,
    })),
  };

  return <JsonLdScript data={data} />;
}
