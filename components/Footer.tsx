"use client";

import { Terminal } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { scrollToTarget } from "@/lib/utils";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-8 sm:py-10">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Subtle glow behind footer */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,179,0,0.025) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollToTarget("#home")}
            className="flex items-center gap-2 group"
            aria-label="Наверх"
          >
            <div className="w-7 h-7 rounded-lg bg-accent-500/8 border border-accent-400/15 flex items-center justify-center group-hover:bg-accent-500/15 group-hover:border-accent-400/30 transition-all duration-300">
              <Terminal className="w-3.5 h-3.5 text-accent-400" />
            </div>
            <span className="font-mono text-sm font-semibold text-white/60 group-hover:text-white/90 transition-colors duration-300">
              KusokMedi<span className="text-accent-400">~</span>
            </span>
          </button>

          {/* Copyright */}
          <p className="text-[11px] text-white/18 font-mono tracking-wide text-center">
            © {year} KusokMedi. {t("footer.rights")}
          </p>

          {/* Back to top hint */}
          <button
            onClick={() => scrollToTarget("#home")}
            className="text-[11px] text-white/20 hover:text-white/50 font-mono transition-colors duration-300 hidden sm:block"
          >
            ↑ back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
