import { siteUrl } from "./env";

export const languages = [
  "en", "ru", "lv", "uk", "zh", "es", "hi", "pt", "fr", "de", "ja", "ko",
] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

export const languageNames: Record<Language, string> = {
  en: "English",
  ru: "Русский",
  lv: "Latviešu",
  uk: "Українська",
  zh: "中文",
  es: "Español",
  hi: "हिन्दी",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  ko: "한국어",
};

/** Open Graph locale codes — used for og:locale and og:locale:alternate. */
export const ogLocales: Record<Language, string> = {
  en: "en_US",
  ru: "ru_RU",
  lv: "lv_LV",
  uk: "uk_UA",
  zh: "zh_CN",
  es: "es_ES",
  hi: "hi_IN",
  pt: "pt_BR",
  fr: "fr_FR",
  de: "de_DE",
  ja: "ja_JP",
  ko: "ko_KR",
};

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (languages as readonly string[]).includes(value);
}

/** Public URL of a language: "/" for English, "/ru/" for the rest. */
export function langPath(lang: Language): string {
  return lang === defaultLanguage ? "/" : `/${lang}/`;
}

/**
 * hreflang map for every supported language plus x-default.
 * The root URL is the English one, every other language has its own path.
 * Lives here (not in lib/seo.ts) so client components can update the <link>
 * tags on a language switch without pulling in the server-side dictionaries.
 */
export function alternates(): Record<string, string> {
  return Object.fromEntries([
    ...languages.map((lang) => [lang, `${siteUrl}${langPath(lang)}`]),
    ["x-default", siteUrl],
  ]);
}

/** Absolute URL of a language page. */
export function langUrl(lang: Language): string {
  return `${siteUrl}${langPath(lang)}`;
}

/** Language encoded in a pathname, or null for unknown/absent segments. */
export function pathToLang(pathname: string): Language | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLanguage(segment) ? segment : null;
}

/**
 * Language a pathname represents, falling back to English.
 * The root path has no language segment, so it means English — needed by the
 * back/forward handler, which must be able to switch *back* to English.
 */
export function pathToLangOrDefault(pathname: string): Language {
  const lang = pathToLang(pathname);
  return lang ?? defaultLanguage;
}
