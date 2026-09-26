import type { Metadata, Viewport } from "next";
import RootShell, { shellMetadata, shellViewport } from "@/components/RootShell";
import { defaultLanguage } from "@/lib/languages";

export const viewport: Viewport = shellViewport;

export const metadata: Metadata = shellMetadata;

/** Root layout of "/" — the English page. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang={defaultLanguage}>{children}</RootShell>;
}
