/**
 * Shared renderer for every structured-data block on the site.
 * Escaping `<` keeps a stray "</script>" inside any string from closing the tag
 * early, which would break the page instead of just the markup.
 */
export default function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
