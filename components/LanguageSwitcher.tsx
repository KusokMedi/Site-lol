"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/70 hover:text-white transition-colors text-sm"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase font-medium">{lang}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 py-2 rounded-xl bg-dark-900 border border-white/[0.06] shadow-xl min-w-[120px] z-50"
          >
            <button
              onClick={() => { setLang("en"); setIsOpen(false); }}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-white/[0.04] transition-colors ${
                lang === "en" ? "text-accent-400" : "text-white/70"
              }`}
            >
              English
            </button>
            <button
              onClick={() => { setLang("ru"); setIsOpen(false); }}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-white/[0.04] transition-colors ${
                lang === "ru" ? "text-accent-400" : "text-white/70"
              }`}
            >
              Русский
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
