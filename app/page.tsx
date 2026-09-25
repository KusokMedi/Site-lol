import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import Home from "@/components/Home";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata();

export default function Page() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );
}
