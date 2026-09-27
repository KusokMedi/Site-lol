import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import SimpleShell from "@/components/SimpleShell";
import { isLanguage, defaultLanguage, languages } from "@/lib/languages";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
};

// Only the supported languages are prerendered; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  // English is served from "/simple/" (see simplePath), so /simple/en/ would be
  // a duplicate URL.
  return languages.filter((lang) => lang !== defaultLanguage).map((lang) => ({ lang }));
}

/**
 * Root layout of "/{lang}/simple/" — the document copy in every other language.
 *
 * A route group ("(lang-simple)" adds nothing to the URL) keeps this tree apart
 * from the designed "app/[lang]/", so the language versions of the document can
 * sit under "/{lang}/simple/" and still render the bare shell instead of
 * RootShell. Like app/[lang]/layout.tsx, it is a root layout on a dynamic
 * segment, which is what puts the real language into the static <html lang>.
 */
export default async function LangSimpleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang) || lang === defaultLanguage) notFound();

  return <SimpleShell lang={lang}>{children}</SimpleShell>;
}
