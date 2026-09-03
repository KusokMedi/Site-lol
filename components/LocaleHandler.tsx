"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LocaleHandler() {
  const { lang } = useLanguage();
  const isFirst = useRef(true);

  useEffect(() => {
    // Update <html lang> attribute
    document.documentElement.lang = lang;

    // On first render don't push to history — URL is already clean after LanguageProvider init
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Push /{lang} to URL so the address bar always reflects the active language
    const newPath = `/${lang}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
    }
  }, [lang]);

  return null;
}
