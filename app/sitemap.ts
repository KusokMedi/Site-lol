import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kusok-medi.ru";

const supportedLangs = ["en", "ru", "lv", "uk", "zh", "es", "hi", "pt", "fr", "de", "ja", "ko"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Root URL
  const root: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  // Language-specific URLs
  const langUrls: MetadataRoute.Sitemap = supportedLangs
    .filter((lang) => lang !== "en")
    .map((lang) => ({
      url: `${siteUrl}/${lang}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [root, ...langUrls];
}
