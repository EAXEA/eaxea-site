import { site } from "@/lib/site";

/** Person + ProfessionalService structured data for richer search results. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    founder: { "@type": "Person", name: site.founder },
    // Consistent with the site's "Ankara · Remote" positioning — Ankara-based,
    // serving clients remotely across Türkiye.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ankara",
      addressCountry: "TR",
    },
    areaServed: "TR",
    knowsAbout: [
      "Web Design",
      "Landing Page Design",
      "Corporate Website Development",
      "Custom Web Development",
      "Next.js",
      "Search Engine Optimization",
      "Web Accessibility",
    ],
    sameAs: site.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
