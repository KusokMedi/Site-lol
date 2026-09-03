"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LocaleHandler() {
  const { lang } = useLanguage();
  const isFirst = useRef(true);

  useEffect(() => {
    // Update <html lang> attribute
    document.documentElement.lang = lang;

    // On first render don't push — URL is already clean after LanguageProvider init
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Push /{lang} so the address bar reflects the active language
    // /en stays as / for cleanliness
    const newPath = lang === "en" ? "/" : `/${lang}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
    }
  }, [lang]);

  return null;
}
