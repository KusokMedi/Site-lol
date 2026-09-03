import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/components/LanguageProvider";
import LocaleHandler from "@/components/LocaleHandler";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kusok-medi.ru";

const supportedLangs = ["en", "ru", "lv", "uk", "zh", "es", "hi", "pt", "fr", "de", "ja", "ko"] as const;

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

// ─── Static metadata (en fallback) ───────────────────────────────────────────
// Per-language title/description are injected client-side via LocaleHandler;
// here we provide sane English defaults for crawlers that hit the root URL.
export const metadata: Metadata = {
  title: "KusokMedi — Developer & Programmer",
  description:
    "Developer of websites, bots, automation and digital solutions. Specialization: Python, React, Node.js, Linux.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "KusokMedi | Portfolio",
    description: "Developer of websites, bots, automation and digital solutions.",
    type: "website",
    locale: "en_US",
    siteName: "KusokMedi Portfolio",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "KusokMedi | Portfolio",
    description: "Developer of websites, bots, automation and digital solutions.",
  },
  // hreflang alternates for multilingual SEO
  alternates: {
    canonical: siteUrl,
    languages: Object.fromEntries(
      supportedLangs.map((lang) => [
        lang,
        lang === "en" ? siteUrl : `${siteUrl}/${lang}`,
      ])
    ),
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
      knowsAbout: ["Python", "React", "Node.js", "Linux", "TypeScript", "Docker"],
      sameAs: [
        process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/kusokmedi",
        process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/kusokmedi52",
        process.env.NEXT_PUBLIC_YOUTUBE_MAIN_URL ?? "https://youtube.com/@kusokmedi",
      ],
    },
    {
      "@type": "WebSite",
      name: "KusokMedi Portfolio",
      url: siteUrl,
      description: "Personal developer portfolio",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang="en" is the safe SSR default; LocaleHandler updates it on the client
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* hreflang tags for multilingual SEO */}
        {supportedLangs.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={lang === "en" ? siteUrl : `${siteUrl}/${lang}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise-overlay relative min-h-screen antialiased overflow-x-hidden">
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
        <LanguageProvider>
          <LocaleHandler />
          {children}
          <Particles />
          <SmoothScroll />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
