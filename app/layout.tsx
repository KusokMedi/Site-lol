import type { Metadata, Viewport } from "next";
import "./globals.css";
import Particles from "@/components/Particles";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/components/LanguageProvider";
import LocaleHandler from "@/components/LocaleHandler";

const siteUrl = "https://kusok-medi.ru";

// #4: Explicit viewport export — gives us viewport-fit=cover for iOS notch
// and control over initial-scale. Next.js 14+ reads this as the <meta viewport> tag.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "KusokMedi",
  description:
    "Разработчик сайтов, ботов, автоматизации и цифровых решений. Специализация: Python, React, Node.js, Linux.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "KusokMedi | Портфолио",
    description:
      "Разработчик сайтов, ботов, автоматизации и цифровых решений.",
    type: "website",
    locale: "ru_RU",
    siteName: "KusokMedi Portfolio",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "KusokMedi | Портфолио",
    description:
      "Разработчик сайтов, ботов, автоматизации и цифровых решений.",
  },
};

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
        "https://github.com/kusokmedi",
        "https://t.me/kusokmedi52",
        "https://youtube.com/@kusokmedi",
      ],
    },
    {
      "@type": "WebSite",
      name: "KusokMedi Portfolio",
      url: siteUrl,
      description: "Личный сайт-портфолио разработчика",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="en" is the safe SSR default; LocaleHandler updates it on the client
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Preconnect first, then preload the stylesheet to reduce render-blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* #6: preload hint so the browser fetches the CSS before render */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
