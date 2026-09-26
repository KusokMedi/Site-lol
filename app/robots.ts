import type { MetadataRoute } from "next";
import { siteUrl, toUrl } from "@/lib/env";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    // `host` is a bare hostname, not a URL — "https://…" is not spec-compliant.
    host: toUrl(siteUrl).host,
  };
}
