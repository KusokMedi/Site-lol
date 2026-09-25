import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import { languages } from "./lib/languages";

// The service worker is compiled from webpack assets, which do not include the
// HTML written by the export step — so the pages are added to the precache
// manifest explicitly, otherwise offline navigation would fail.
const buildRevision = process.env.GITHUB_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA ?? String(Date.now());
const pageEntries = [
  "/index.html",
  "/404.html",
  ...languages.filter((lang) => lang !== "en").map((lang) => `/${lang}/index.html`),
].map((url) => ({ url, revision: buildRevision }));

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    additionalManifestEntries: pageEntries,
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
