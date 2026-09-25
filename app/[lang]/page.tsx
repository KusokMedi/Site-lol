import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/LanguageProvider";
import Home from "@/components/Home";
import { isLanguage, languages } from "@/lib/languages";
import { languageMetadata } from "@/lib/seo";
import { getDict } from "@/lib/dictionaries";

// Only the supported languages are prerendered; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return isLanguage(lang) ? languageMetadata(lang) : {};
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <LanguageProvider initialLang={lang} dict={getDict(lang)}>
      <Home />
    </LanguageProvider>
  );
}
