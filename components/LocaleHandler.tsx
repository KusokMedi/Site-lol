"use client";

import { useCallback, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { alternates, langUrl, ogLocales, pathToLangOrDefault } from "@/lib/languages";

function setMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    if (existing.content !== content) existing.content = content;
    return;
  }
  const meta = document.createElement("meta");
  meta.setAttribute(attr, key);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}

function ensureLink(rel: string): HTMLLinkElement {
  const existing = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (existing) return existing;
  const link = document.createElement("link");
  link.rel = rel;
  document.head.appendChild(link);
  return link;
}

function createAlternate(): HTMLLinkElement {
  const link = document.createElement("link");
  link.rel = "alternate";
  document.head.appendChild(link);
  return link;
}

/**
 * Keeps the document in sync with the active language after a switch that
 * happened without a page load: <html lang>, title, meta description, canonical,
 * Open Graph and Twitter cards. The address bar is handled by LanguageProvider,
 * which knows whether the change came from the visitor or from the browser.
 */
export default function LocaleHandler() {
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;

    const title = `${t("hero.name")} — ${t("hero.title")}`;
    const description = t("hero.description");
    const url = langUrl(lang);

    if (document.title !== title) document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:locale", ogLocales[lang]);
    setMeta("property", "og:site_name", `${t("hero.name")} Portfolio`);
    setMeta("property", "og:image:alt", title);

    // Without this the document would keep advertising the language it was
    // server-rendered in, contradicting the og:* tags above.
    const canonical = ensureLink("canonical");
    if (canonical.getAttribute("href") !== url) canonical.setAttribute("href", url);

    // Next.js emits one <link rel="alternate"> per hreflang, all with the same
    // rel — look them up by hreflang so each language gets its own element.
    for (const [hrefLang, href] of Object.entries(alternates())) {
      const link =
        document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hrefLang}"]`) ??
        createAlternate();
      link.setAttribute("hreflang", hrefLang);
      if (link.getAttribute("href") !== href) link.setAttribute("href", href);
    }
  }, [lang, t]);

  // Browser back/forward across language URLs. The root path has no language
  // segment, so it maps to English — otherwise going back to "/" would leave the
  // previous language on screen.
  const onPopState = useCallback(() => {
    setLang(pathToLangOrDefault(window.location.pathname), { immediate: true, syncUrl: false });
  }, [setLang]);

  useEffect(() => {
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [onPopState]);

  return null;
}
