"use client";

import { useCallback, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { langPath, ogLocales, pathToLang } from "@/lib/languages";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", content);
  else {
    const meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    meta.setAttribute("content", content);
    document.head.appendChild(meta);
  }
}

/**
 * Keeps the document in sync with the active language:
 * <html lang>, title, meta description, Open Graph tags and the address bar.
 */
export default function LocaleHandler() {
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;

    const title = `${t("hero.name")} — ${t("hero.title")}`;
    const description = t("hero.description");

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:locale"]', "property", "og:locale", ogLocales[lang]);
    setMeta('meta[property="og:url"]', "property", "og:url", window.location.href);

    // Shareable URLs without polluting the back-button history
    const path = langPath(lang);
    if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path + window.location.search);
    }
  }, [lang, t]);

  // Browser back/forward across language URLs
  const onPopState = useCallback(() => {
    const fromUrl = pathToLang(window.location.pathname);
    if (fromUrl) setLang(fromUrl, true);
  }, [setLang]);

  useEffect(() => {
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [onPopState]);

  return null;
}
