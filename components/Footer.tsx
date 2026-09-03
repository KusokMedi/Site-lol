"use client";

import { Terminal } from "lucide-react";
import { scrollToTarget } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative py-8 sm:py-10">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => scrollToTarget("#home")}
            className="flex items-center gap-2 group"
            aria-label={t("aria.goHome")}
          >
            <div className="w-7 h-7 rounded-lg bg-accent-500/8 border border-accent-400/15 flex items-center justify-center group-hover:bg-accent-500/15 group-hover:border-accent-400/30 transition-all duration-300">
              <Terminal className="w-3.5 h-3.5 text-accent-400" />
            </div>
            <span className="font-mono text-sm font-semibold text-white/55 group-hover:text-white/80 transition-colors duration-300">
              KusokMedi<span className="text-accent-400">~</span>
            </span>
          </button>

          {/* Copyright — right side on desktop */}
          <p className="text-[11px] text-white/20 font-mono tracking-wide text-center sm:text-right order-last sm:order-none">
            © {year} KusokMedi. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
