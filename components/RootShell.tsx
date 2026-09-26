import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Particles from "@/components/Particles";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { Analytics } from "@vercel/analytics/next";
import { env, siteUrl } from "@/lib/env";
import { rootMetadata } from "@/lib/seo";
import { languages, type Language } from "@/lib/languages";

// Both root layouts render this shell, so the global stylesheet is pulled in
// here. Without this Next emits only the next/font @font-face rules and the
// whole site ships unstyled.
import "@/app/globals.css";

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

// ─── Ambient background orbs ───────────────────────────────────────────────────
// Soft radial-gradients instead of `filter: blur()`: the gradient falloff
// already reads as soft, while a blurred surface that large is a repaint-heavy
// layer in Firefox (re-filtered on every scroll frame).
// Sizes/offsets reproduce the previous blurred version's visible falloff.
const AMBIENT_ORBS = [
  {
    key: "left-top",
    left: "-370px",
    top: "5%",
    width: 940,
    height: 940,
    background:
      "radial-gradient(circle closest-side, rgba(255,179,0,0.10) 0%, rgba(255,140,0,0.045) 40%, rgba(255,140,0,0.012) 68%, transparent 100%)",
  },
  {
    key: "left-mid",
    left: "-368px",
    top: "38%",
    width: 960,
    height: 960,
    background:
      "radial-gradient(circle closest-side, rgba(255,140,0,0.08) 0%, rgba(255,140,0,0.03) 42%, rgba(255,140,0,0.008) 70%, transparent 100%)",
  },
  {
    key: "left-bottom",
    left: "-384px",
    top: "70%",
    width: 940,
    height: 940,
    background:
      "radial-gradient(circle closest-side, rgba(255,179,0,0.07) 0%, rgba(255,140,0,0.026) 42%, rgba(255,140,0,0.007) 70%, transparent 100%)",
  },
  {
    key: "right-top",
    left: "calc(100% + 370px)",
    top: "10%",
    width: 940,
    height: 940,
    background:
      "radial-gradient(circle closest-side, rgba(255,106,0,0.09) 0%, rgba(255,179,0,0.035) 40%, rgba(255,140,0,0.01) 68%, transparent 100%)",
  },
  {
    key: "right-mid",
    left: "calc(100% + 368px)",
    top: "45%",
    width: 960,
    height: 960,
    background:
      "radial-gradient(circle closest-side, rgba(255,140,0,0.08) 0%, rgba(255,140,0,0.03) 42%, rgba(255,140,0,0.008) 70%, transparent 100%)",
  },
  {
    key: "right-bottom",
    left: "calc(100% + 384px)",
    top: "75%",
    width: 940,
    height: 940,
    background:
      "radial-gradient(circle closest-side, rgba(255,179,0,0.07) 0%, rgba(255,140,0,0.026) 42%, rgba(255,140,0,0.007) 70%, transparent 100%)",
  },
  {
    key: "center",
    left: "calc(50% - 680px)",
    top: "calc(50% - 430px)",
    width: 1360,
    height: 860,
    background:
      "radial-gradient(ellipse closest-side, rgba(255,179,0,0.018) 0%, rgba(255,179,0,0.008) 45%, transparent 100%)",
  },
] as const;

// ─── Browser detection ─────────────────────────────────────────────────────────
// Runs before first paint so the Firefox-only CSS overrides in globals.css
// apply without a flash of glass/backdrop-filter being rendered first.
const BROWSER_SCRIPT = `document.documentElement.dataset.browser=/Firefox/i.test(navigator.userAgent)?"firefox":"other";`;

// Framer Motion serialises the *start* state of every reveal animation
// (opacity:0 plus a translate) into the static HTML. With scripting enabled
// that is correct — the animation runs on hydration. With scripting off nothing
// ever animates it back in, so the whole page below the hero would stay
// invisible. Cancelling the start state is safe to scope to <noscript>, where it
// cannot affect the scripted path.
const NO_SCRIPT_STYLE = `[style*="opacity:0"]{opacity:1!important}`;

// ─── Viewport ─────────────────────────────────────────────────────────────────
// Re-exported as `viewport` from each root layout, because Next.js only reads
// route segment config from layout/page files, not from shared components.
export const shellViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
// Defaults only — every route overrides them with its own language via
// lib/seo.ts, so title/description/hreflang are correct in the static HTML.
export const shellMetadata: Metadata = {
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

/** JSON-LD structured data. `inLanguage` follows the active route language. */
function buildJsonLd(lang: Language) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "KusokMedi",
        url: siteUrl,
        jobTitle: "Developer / Programmer",
        image: `${siteUrl}/icon.svg`,
        knowsAbout: ["Python", "React", "Node.js", "Linux", "TypeScript", "Docker"],
        knowsLanguage: [...languages],
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
        inLanguage: lang,
      },
    ],
  };
}

/**
 * The <html>/<body> shell shared by every route.
 *
 * There is no top-level app/layout.tsx: Next.js allows multiple root layouts
 * when they live in route groups, and that is the only way to emit a correct
 * `lang` attribute into the *static* HTML — a single root layout is rendered
 * before the route is known and would have to hardcode `lang="en"` for all 12
 * languages. LocaleHandler still syncs it on the client for language switches
 * that happen without a page load.
 */
export default function RootShell({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BROWSER_SCRIPT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NO_SCRIPT_STYLE }} />
        </noscript>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KusokMedi" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
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
          {AMBIENT_ORBS.map((orb) => (
            <div
              key={orb.key}
              className="absolute"
              style={{
                left: orb.left,
                top: orb.top,
                width: orb.width,
                height: orb.height,
                background: orb.background,
              }}
            />
          ))}
        </div>
        <SmoothScroll>
          {children}
          <Particles />
        </SmoothScroll>
        </MotionConfig>
        <ServiceWorkerRegistration />
        {/* The insights script is only served by Vercel's edge network. On any
            other host (and in local builds) it 404s on every page load, so it is
            opt-in via NEXT_PUBLIC_VERCEL_ANALYTICS instead of unconditional. */}
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
