import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";
import { langPath, languages } from "@/lib/languages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return languages.map((lang, index) => ({
    url: `${siteUrl}${langPath(lang)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: index === 0 ? 1 : 0.9,
  }));
}
