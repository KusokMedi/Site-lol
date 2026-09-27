"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";

// The global 404 is the one page of the app that no root layout wraps (the
// layouts live in route groups and in /simple/), so it has to pull the design in
// itself: without this import its Tailwind classes are unstyled and the page
// comes out blank. RootShell does the same for every other route.
import "@/app/globals.css";

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

// Framer Motion writes the *start* state of every animation (opacity:0) into the
// static HTML. Without scripting nothing animates it back, so the 404 would
// render as a blank dark page - same guard as RootShell.
const NO_SCRIPT_STYLE = `[style*="opacity:0"]{opacity:1!important}`;

function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <main className="min-h-dvh flex items-center justify-center bg-dark-950 px-4 noise-overlay" role="main">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-mono text-[120px] sm:text-[150px] font-bold leading-none"
        >
          <span className="gradient-accent-text">404</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-semibold text-white/80"
        >
          {t("notFound.title")}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/40 text-base sm:text-lg max-w-md mx-auto"
        >
          {t("notFound.text")}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-dark-950 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow"
          >
            {t("notFound.button")}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

// Rendered outside the page tree, so it needs its own provider
export default function NotFound() {
  return (
    <LanguageProvider>
      {/* The font variables normally sit on <html>; here they have to be set on
          a wrapper, because Next generates the <html> element of the 404 itself. */}
      <div className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NO_SCRIPT_STYLE }} />
        </noscript>
        <NotFoundContent />
      </div>
    </LanguageProvider>
  );
}
