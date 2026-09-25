import en from "./locales/en.json";
import ru from "./locales/ru.json";
import lv from "./locales/lv.json";
import uk from "./locales/uk.json";
import zh from "./locales/zh.json";
import es from "./locales/es.json";
import hi from "./locales/hi.json";
import pt from "./locales/pt.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import { defaultLanguage, type Language } from "./languages";

export type Dict = Record<string, string>;

/**
 * All translations. Kept as a flat record of dotted keys, e.g. "nav.home".
 * Server-only: the client gets the active dictionary through LanguageProvider.
 */
export const dictionaries: Record<Language, Dict> = {
  en, ru, lv, uk, zh, es, hi, pt, fr, de, ja, ko,
};

/** English dictionary — the fallback for every missing key in any language. */
export const fallbackDict: Dict = en;

export function getDict(lang: Language): Dict {
  return dictionaries[lang] ?? dictionaries[defaultLanguage];
}

/** Slice of a dictionary needed to build metadata (server bundles stay small). */
export function getMeta(lang: Language): Dict {
  return getDict(lang);
}
