"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import en from "@/lib/locales/en.json";
import type { Language } from "@/lib/languages";

export type { Language };

export type Dict = Record<string, string>;

const STORAGE_KEY = "lang";

/** English is the fallback for missing keys and the SSR default of "/". */
const english: Dict = en;

/**
 * Dictionaries are code-split: the active one arrives with the page, the rest
 * are fetched only when the visitor actually switches language.
 */
const loaders: Record<Language, () => Promise<{ default: Dict }>> = {
  en: () => import("@/lib/locales/en.json"),
  ru: () => import("@/lib/locales/ru.json"),
  lv: () => import("@/lib/locales/lv.json"),
  uk: () => import("@/lib/locales/uk.json"),
  zh: () => import("@/lib/locales/zh.json"),
  es: () => import("@/lib/locales/es.json"),
  hi: () => import("@/lib/locales/hi.json"),
  pt: () => import("@/lib/locales/pt.json"),
  fr: () => import("@/lib/locales/fr.json"),
  de: () => import("@/lib/locales/de.json"),
  ja: () => import("@/lib/locales/ja.json"),
  ko: () => import("@/lib/locales/ko.json"),
};

const cache = new Map<Language, Dict>([["en", english]]);

function getDict(lang: Language): Dict | undefined {
  return cache.get(lang);
}

async function loadDict(lang: Language): Promise<Dict> {
  const cached = cache.get(lang);
  if (cached) return cached;
  const mod = await loaders[lang]();
  const dict = mod.default as Dict;
  cache.set(lang, dict);
  return dict;
}

function readStoredLang(): Language | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isStoredLang(saved) ? saved : null;
  } catch {
    // Private mode / storage disabled — fall through to browser detection
    return null;
  }
}

function writeStoredLang(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore — the language still applies for the current visit
  }
}

function isStoredLang(value: string | null): value is Language {
  return value !== null && value in loaders;
}

function detectBrowserLang(): Language | null {
  if (typeof navigator === "undefined") return null;
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const base = tag?.toLowerCase().split("-")[0];
    if (base && base in loaders) return base as Language;
  }
  return null;
}

interface LanguageContextType {
  lang: Language;
  /** Switch language. `immediate` skips the fade-out (used by popstate). */
  setLang: (lang: Language, immediate?: boolean) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  /**
   * Language resolved on the server from the URL (/ru/ → "ru"). When it is
   * omitted the provider starts in English and upgrades to the stored or the
   * browser language after hydration.
   */
  initialLang?: Language;
  /**
   * Dictionary of `initialLang`, inlined by the server so the static HTML of
   * /ru/ is already in Russian — no flash, no extra request.
   */
  dict?: Dict;
}

export function LanguageProvider({ children, initialLang, dict: initialDict }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(initialLang ?? "en");
  const [dict, setDict] = useState<Dict>(() => {
    if (initialLang && initialDict) cache.set(initialLang, initialDict);
    return initialDict ?? english;
  });
  const [contentOpacity, setContentOpacity] = useState(true);
  const timers = useRef<{ fade?: ReturnType<typeof setTimeout>; restore?: ReturnType<typeof setTimeout> }>({});
  const switchId = useRef(0);

  const apply = useCallback(async (next: Language) => {
    const id = ++switchId.current;
    const nextDict = await loadDict(next);
    if (id !== switchId.current) return; // a newer switch won
    setDict(nextDict);
    setLangState(next);
    writeStoredLang(next);
  }, []);

  // Remember the language that came from the URL, otherwise restore the
  // visitor's own preference.
  useEffect(() => {
    if (initialLang) {
      writeStoredLang(initialLang);
      return;
    }
    const preferred = readStoredLang() ?? detectBrowserLang();
    if (preferred && preferred !== "en") void apply(preferred);
  }, [initialLang, apply]);

  const clearTimers = useCallback(() => {
    if (timers.current.fade) clearTimeout(timers.current.fade);
    if (timers.current.restore) clearTimeout(timers.current.restore);
  }, []);

  const setLang = useCallback(
    (next: Language, immediate = false) => {
      if (next === lang && getDict(next)) return;
      clearTimers();

      // Immediate switch — used by the browser back/forward buttons
      if (immediate) {
        void apply(next);
        return;
      }

      // Fade out, swap the dictionary, fade back in
      setContentOpacity(false);
      timers.current.fade = setTimeout(() => {
        void apply(next);
        timers.current.restore = setTimeout(() => setContentOpacity(true), 120);
      }, 400);
    },
    [apply, clearTimers, lang]
  );

  useEffect(() => clearTimers, [clearTimers]);

  const t = useCallback(
    (key: string): string => dict[key] ?? english[key] ?? key,
    [dict]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {/* lang on the wrapper scopes the statically rendered content correctly,
          even before LocaleHandler syncs it onto <html> */}
      <div
        lang={lang}
        className={`transition-opacity duration-500 ${contentOpacity ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
