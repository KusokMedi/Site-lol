"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LocaleHandler() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
