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
      <body className="noise-overlay relative min-h-screen antialiased">
        {/* Global ambient glow — single continuous layer behind all sections */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-500/4 rounded-full blur-[160px]" />
          <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-accent-700/3 rounded-full blur-[160px]" />
          <div className="absolute top-2/3 -left-32 w-[500px] h-[500px] bg-accent-600/3 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-500/4 rounded-full blur-[160px]" />
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
