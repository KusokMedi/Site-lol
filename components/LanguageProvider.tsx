"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import en from "@/lib/locales/en.json";
import ru from "@/lib/locales/ru.json";
import lv from "@/lib/locales/lv.json";
import uk from "@/lib/locales/uk.json";
import zh from "@/lib/locales/zh.json";
import es from "@/lib/locales/es.json";
import hi from "@/lib/locales/hi.json";
import pt from "@/lib/locales/pt.json";
import fr from "@/lib/locales/fr.json";
import de from "@/lib/locales/de.json";
import ja from "@/lib/locales/ja.json";
import ko from "@/lib/locales/ko.json";

export type Language = "en" | "ru" | "lv" | "uk" | "zh" | "es" | "hi" | "pt" | "fr" | "de" | "ja" | "ko";

const translations: Record<Language, Record<string, string>> = {
  en, ru, lv, uk, zh, es, hi, pt, fr, de, ja, ko,
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [contentOpacity, setContentOpacity] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved && saved in translations) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setContentOpacity(false);
    setTimeout(() => {
      setLangState(newLang);
      localStorage.setItem("lang", newLang);
      setTimeout(() => setContentOpacity(true), 100);
    }, 500);
  };

  const t = (key: string): string => {
    const value = translations[lang]?.[key as keyof typeof en];
    if (value !== undefined) return value;
    // Fall back to English, then the key itself
    return (translations.en[key as keyof typeof en] as string | undefined) ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div
        className={`transition-opacity duration-500 ${contentOpacity ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
