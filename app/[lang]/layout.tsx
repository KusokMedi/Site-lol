import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import RootShell, { shellMetadata, shellViewport } from "@/components/RootShell";
import { isLanguage, languages } from "@/lib/languages";

export const viewport: Viewport = shellViewport;

export const metadata: Metadata = shellMetadata;

// Only the supported languages are prerendered; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  // English lives at "/" (see langPath), so /en/ would be a duplicate URL.
  return languages.filter((lang) => lang !== "en").map((lang) => ({ lang }));
}

/** Root layout of "/{lang}/" — renders the real `lang` into the static HTML. */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang) || lang === "en") notFound();

  return <RootShell lang={lang}>{children}</RootShell>;
}
