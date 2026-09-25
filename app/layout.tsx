import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Particles from "@/components/Particles";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { Analytics } from "@vercel/analytics/next";
import { env, siteUrl } from "@/lib/env";
import { rootMetadata } from "@/lib/seo";

// ─── Local fonts via next/font (no CDN, no render-blocking) ───────────────────
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
// Defaults only — every route overrides them with its own language via
// lib/seo.ts, so title/description/hreflang are correct in the static HTML.
export const metadata: Metadata = {
  ...rootMetadata(),
  applicationName: "KusokMedi Portfolio",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

// ─── JSON-LD structured data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "KusokMedi",
      url: siteUrl,
      jobTitle: "Developer / Programmer",
      image: `${siteUrl}/icon.svg`,
      knowsAbout: ["Python", "React", "Node.js", "Linux", "TypeScript", "Docker"],
      knowsLanguage: ["en", "ru", "lv", "uk", "zh", "es", "hi", "pt", "fr", "de", "ja", "ko"],
      sameAs: [
        env("NEXT_PUBLIC_GITHUB_URL"),
        env("NEXT_PUBLIC_GITHUB_ORG_URL"),
        env("NEXT_PUBLIC_DISCORD_URL"),
        env("NEXT_PUBLIC_TELEGRAM_URL"),
        env("NEXT_PUBLIC_YOUTUBE_MAIN_URL"),
        env("NEXT_PUBLIC_YOUTUBE_EN_URL"),
      ],
    },
    {
      "@type": "WebSite",
      name: "KusokMedi Portfolio",
      url: siteUrl,
      description: "Personal developer portfolio",
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang="en" is the SSR default for "/" — LocaleHandler syncs it per language
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KusokMedi" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise-overlay relative min-h-screen antialiased overflow-x-hidden">
        {/* Respects prefers-reduced-motion for every Framer Motion animation */}
        <MotionConfig reducedMotion="user">
        {/*
          Global ambient glow — fixed layer, covers entire page.
          Strong left/right edge orbs visible in every section.
        */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
          {/* LEFT EDGE — top */}
          <div
            className="absolute top-[5%] -left-40 w-[520px] h-[520px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,179,0,0.1) 0%, rgba(255,140,0,0.04) 45%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
          {/* LEFT EDGE — mid */}
          <div
            className="absolute top-[38%] -left-32 w-[480px] h-[480px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          {/* LEFT EDGE — bottom */}
          <div
            className="absolute top-[70%] -left-36 w-[460px] h-[460px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,179,0,0.07) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          {/* RIGHT EDGE — top */}
          <div
            className="absolute top-[10%] -right-40 w-[520px] h-[520px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,106,0,0.09) 0%, rgba(255,179,0,0.03) 45%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
          {/* RIGHT EDGE — mid */}
          <div
            className="absolute top-[45%] -right-32 w-[480px] h-[480px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          {/* RIGHT EDGE — bottom */}
          <div
            className="absolute top-[75%] -right-36 w-[460px] h-[460px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,179,0,0.07) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          {/* Center ambient — very subtle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(255,179,0,0.018) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>
        <SmoothScroll>
          {children}
          <Particles />
        </SmoothScroll>
        </MotionConfig>
        <ServiceWorkerRegistration />
        <Analytics />
      </body>
    </html>
  );
}
