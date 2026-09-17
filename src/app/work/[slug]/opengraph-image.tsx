import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { work, getCaseStudy } from "@/data/work";
import OgCard, { ogSize, ogContentType } from "@/components/seo/OgCard";

export const alt = `${site.name} · seçili iş`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

/**
 * Every case gets its own share card in its own accent colour. Sharing a single
 * site-wide image made each case link look like the same page in a timeline.
 */
export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return new ImageResponse(<OgCard lines={[...site.headline]} footerLeft={site.positioning} footerRight={site.founder} />, size);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={study.category}
        lines={[study.title]}
        accent={study.accent}
        footerLeft={study.summary}
        footerRight={study.year}
      />
    ),
    size
  );
}
