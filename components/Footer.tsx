"use client";

import { Terminal } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative py-6">
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <a
          href="#home"
          className="flex items-center gap-2 group"
        >
          <Terminal className="w-4 h-4 text-accent-400" />
          <span className="font-mono text-sm font-semibold">
            KusokMedi<span className="text-accent-400">~</span>
          </span>
        </a>
        <p className="text-[11px] text-white/20 text-center">
          {t("footer.rights")} KusokMedi {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}