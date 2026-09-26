import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import { defaultLanguage, languages } from "./lib/languages";

// The service worker is compiled from webpack assets, which do not include the
// HTML written by the export step — so the pages are added to the precache
// manifest explicitly, otherwise offline navigation would fail.
//
// The revision has to change whenever *any* precached byte changes, otherwise
// returning visitors keep the previous cache. GITHUB_SHA/VERCEL_GIT_COMMIT_SHA
// are stable for a given commit; the Date.now() fallback is what local and
// ad-hoc builds get, where nothing guarantees an existing cache to bust.
const buildRevision =
  process.env.GITHUB_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA ?? String(Date.now());

// Icons and the manifest are copied verbatim from public/, so workbox never sees
// them. Without this the installed PWA has no icon and no manifest offline.
const staticEntries = [
  "/index.html",
  "/404.html",
  "/manifest.json",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  ...languages
    .filter((lang) => lang !== defaultLanguage)
    .map((lang) => `/${lang}/index.html`),
].map((url) => ({ url, revision: buildRevision }));

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    additionalManifestEntries: staticEntries,
    directoryIndex: "/index.html",
    // The default "index.html" navigation fallback would answer every language
    // URL with the English page — navigations are cached per URL instead.
    navigateFallback: null,
    runtimeCaching: [
      {
        urlPattern: ({ request }: { request: Request }) => request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          networkTimeoutSeconds: 3,
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  // Pure static export — deployable to GitHub Pages and any CDN.
  // Language routes are real pages (app/[lang]), so no middleware is needed.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  devIndicators: process.env.NODE_ENV === "development" ? { position: "bottom-right" } : false,
};

export default withPWA(nextConfig);
