"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "lv", label: "Latviešu" },
  { code: "uk", label: "Українська" },
  { code: "zh", label: "中文" },
  { code: "es", label: "Español" },
  { code: "hi", label: "हिन्दी" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

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
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 mt-2 py-2 rounded-xl bg-dark-800/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl min-w-[160px] z-50 overflow-hidden"
          >
            {languages.map((item, i) => (
              <motion.button
                key={item.code}
                onClick={() => { setLang(item.code as any); setIsOpen(false); }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-white/[0.04] transition-all duration-200 ${
                  lang === item.code ? "text-accent-400 bg-white/[0.04]" : "text-white/70"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-white/30">[{item.code.toUpperCase()}]</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
