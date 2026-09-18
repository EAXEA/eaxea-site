import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listedWork } from "@/data/work";

// No lastModified: it would be the build timestamp, which claims every page
// changed on every deploy. Search engines discount a lastmod they can prove
// wrong, so omitting it is worth more than a field that always lies.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = ["", "/hakkimda", "/work", "/contact", "/kvkk"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const cases = listedWork.map((w) => ({
    url: `${base}/work/${w.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...cases];
}
