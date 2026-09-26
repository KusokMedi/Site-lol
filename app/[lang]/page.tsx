import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/LanguageProvider";
import Home from "@/components/Home";
import { isLanguage, type Language } from "@/lib/languages";
import { languageMetadata } from "@/lib/seo";
import { getDict } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  // "en" is served from "/", never from "/en/".
  return isLanguage(lang) && lang !== "en" ? languageMetadata(lang) : {};
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang) || lang === "en") notFound();

  return (
    <LanguageProvider initialLang={lang as Language} dict={getDict(lang)}>
      <Home />
    </LanguageProvider>
  );
}
