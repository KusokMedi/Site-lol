import type { Metadata } from "next";
import { siteUrl, toUrl } from "./env";
import {
  alternates,
  defaultLanguage,
  langPath,
  langUrl,
  languages,
  ogLocales,
  type Language,
} from "./languages";
import { getMeta, type Dict } from "./dictionaries";

/** Metadata for a single language page — title/description come from the locale file. */
export function languageMetadata(lang: Language): Metadata {
  const dict = getMeta(lang);
  const title = `${dict["hero.name"]} — ${dict["hero.title"]}`;
  const description = dict["hero.description"];
  const url = langUrl(lang);
  const languagesMap = alternates();

  return {
    title,
    description,
    metadataBase: toUrl(siteUrl),
    alternates: {
      canonical: langPath(lang),
      languages: languagesMap,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: `${dict["hero.name"]} Portfolio`,
      locale: ogLocales[lang],
      alternateLocale: languages
        .filter((l) => l !== lang)
        .map((l) => ogLocales[l]),
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

/** Root page metadata — identical to English, but canonicalises to the site root. */
export function rootMetadata(): Metadata {
  return { ...languageMetadata(defaultLanguage), alternates: { canonical: "/", languages: alternates() } };
}

export type { Dict };
