import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SimpleHome from "@/components/SimpleHome";
import { isLanguage, defaultLanguage } from "@/lib/languages";
import { simpleMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang) || lang === defaultLanguage) notFound();
  return simpleMetadata(lang);
}

/** "/ru/simple/", "/lv/simple/" … - the document copy in every other language. */
export default async function LanguageSimplePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang) || lang === defaultLanguage) notFound();

  return <SimpleHome lang={lang} />;
}
