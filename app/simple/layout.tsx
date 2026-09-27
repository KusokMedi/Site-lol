import type { Metadata, Viewport } from "next";
import SimpleShell from "@/components/SimpleShell";
import { defaultLanguage } from "@/lib/languages";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
};

/**
 * Root layout of "/simple/" — the document copy, English only.
 *
 * There is no app/layout.tsx: every route tree brings its own root layout, which
 * is what lets this one skip RootShell and ship a bare document. The other
 * language versions live in app/(lang-simple)/[lang]/simple/ and use the same
 * shell.
 */
export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return <SimpleShell lang={defaultLanguage}>{children}</SimpleShell>;
}
