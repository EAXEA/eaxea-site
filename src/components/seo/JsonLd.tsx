import { site } from "@/lib/site";
import JsonLdScript from "./JsonLdScript";

/** ProfessionalService structured data for richer search results. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    // Carries the name inline so this node stands alone, and the @id so it
    // resolves to the full Person node on /hakkimda.
    founder: {
      "@type": "Person",
      "@id": `${site.url}/hakkimda#person`,
      name: site.founder,
    },
    // Consistent with the site's "Ankara · Remote" positioning: Ankara-based,
    // serving clients remotely across Türkiye.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ankara",
      addressCountry: "TR",
    },
    areaServed: "TR",
    knowsAbout: [
      "Web Design",
      "Full-Stack Development",
      "AI-Assisted Development",
      "Custom Web Development",
      "Next.js",
      "Motion Design",
      "Search Engine Optimization",
      "Web Accessibility",
      "Video Production",
      "Video Editing (Adobe Premiere)",
      "3D Animation (Blender)",
    ],
    sameAs: site.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };

  return <JsonLdScript data={data} />;
}
