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
import { langPath, type Language } from "@/lib/languages";

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

/** How long the content stays hidden while the dictionary is swapped. */
const FADE_MS = 400;

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

export interface SwitchOptions {
  /** Skip the fade-out (used by popstate and the first automatic restore). */
  immediate?: boolean;
  /**
   * Rewrite the address bar to the new language. Off when the browser already
   * navigated (popstate) and for the automatic restore on "/", so a visitor is
   * never silently moved to a different URL than the one they opened.
   */
  syncUrl?: boolean;
}

interface LanguageContextType {
  lang: Language;
  /** Switch language. See SwitchOptions for the available strategies. */
  setLang: (lang: Language, options?: SwitchOptions) => void;
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
  const [dict, setDict] = useState<Dict>(() => initialDict ?? english);
  const [contentOpacity, setContentOpacity] = useState(true);
  const timers = useRef<{ fade?: ReturnType<typeof setTimeout>; restore?: ReturnType<typeof setTimeout> }>({});
  const switchId = useRef(0);

  // Side-effect free: the server-provided dictionary goes into the cache from
  // an effect rather than from the useState initialiser, which must stay pure.
  useEffect(() => {
    if (initialLang && initialDict) cache.set(initialLang, initialDict);
  }, [initialLang, initialDict]);

  /**
   * Loads a dictionary and makes it the active one.
   * Resolves to false when the chunk could not be fetched or a newer switch
   * superseded this one — callers must be able to recover from that, an
   * unhandled rejection here would leave the UI stuck mid-fade.
   */
  const apply = useCallback(async (next: Language, syncUrl: boolean): Promise<boolean> => {
    const id = ++switchId.current;
    let nextDict: Dict;
    try {
      nextDict = (await loaders[next]()).default as Dict;
    } catch {
      return false; // chunk failed to load — keep the language we already have
    }
    cache.set(next, nextDict);
    if (id !== switchId.current) return false; // a newer switch won

    setDict(nextDict);
    setLangState(next);
    if (syncUrl && typeof window !== "undefined") {
      // Shareable URLs without polluting the back-button history
      window.history.replaceState(null, "", langPath(next) + window.location.search);
    }
    return true;
  }, []);

  const clearTimers = useCallback(() => {
    if (timers.current.fade) clearTimeout(timers.current.fade);
    if (timers.current.restore) clearTimeout(timers.current.restore);
  }, []);

  const setLang = useCallback(
    (next: Language, options: SwitchOptions = {}) => {
      const { immediate = false, syncUrl = true } = options;
      if (next === lang && cache.has(next)) return;
      clearTimers();

      // Immediate switch — used by popstate and the automatic restore on "/"
      if (immediate) {
        void apply(next, syncUrl);
        return;
      }

      // Fade out, swap the dictionary, fade back in
      setContentOpacity(false);
      timers.current.fade = setTimeout(() => {
        void apply(next, syncUrl).then((ok) => {
          // Only an explicit, successful choice becomes the stored preference:
          // merely opening /ru/ must not overwrite what the visitor picked before.
          if (ok && syncUrl) writeStoredLang(next);
          timers.current.restore = setTimeout(() => setContentOpacity(true), 120);
        });
      }, FADE_MS);
    },
    [apply, clearTimers, lang]
  );

  // On a language URL the route already decided the language — leave the
  // stored preference alone. On "/" restore whatever the visitor chose before,
  // or their browser language, without touching the address bar.
  useEffect(() => {
    if (initialLang) return;
    const preferred = readStoredLang() ?? detectBrowserLang();
    if (preferred && preferred !== lang) {
      setLang(preferred, { immediate: true, syncUrl: false });
    }
  }, [initialLang, setLang, lang]);

  // Guard against a language change while the tab is hidden: the fade timers
  // would otherwise be throttled and leave the content stuck at opacity 0.
  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden) setContentOpacity(true);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

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
