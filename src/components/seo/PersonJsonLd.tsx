import { site } from "@/lib/site";
import { capabilities } from "@/data/studio";
import JsonLdScript from "./JsonLdScript";

/**
 * Person structured data for the about page. Name searches are the highest
 * intent traffic a one-person studio gets, so the founder needs a node of his
 * own rather than a nested stub under the business.
 */
export default function PersonJsonLd() {
  const url = `${site.url}/hakkimda`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: site.founder,
    jobTitle: site.role,
    url,
    email: site.email,
    knowsAbout: [...capabilities],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ankara",
      addressCountry: "TR",
    },
    worksFor: {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.name,
      url: site.url,
    },
    sameAs: site.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };

  return <JsonLdScript data={data} />;
}
