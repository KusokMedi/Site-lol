import type { Metadata } from "next";
import "./globals.css";
import Particles from "@/components/Particles";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import LocaleHandler from "@/components/LocaleHandler";

const siteUrl = "https://kusok-medi.ru";

export const metadata: Metadata = {
  title: "KusokMedi | Портфолио",
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
  other: {
    "theme-color": "#0a0a0a",
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
    <html lang="ru" className="dark">
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
        <ThemeProvider>
          <LanguageProvider>
            <LocaleHandler />
            {children}
            <Particles />
            <SmoothScroll />
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}