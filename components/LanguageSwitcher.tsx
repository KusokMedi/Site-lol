"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 px-1 py-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
          lang === "en"
            ? "bg-accent-400 text-dark-950"
            : "text-white/50 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ru")}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
          lang === "ru"
            ? "bg-accent-400 text-dark-950"
            : "text-white/50 hover:text-white"
        }`}
      >
        RU
      </button>
    </div>
  );
}
