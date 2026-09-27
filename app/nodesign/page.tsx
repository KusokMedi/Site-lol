import type { Metadata } from "next";
import NoDesignHome from "@/components/NoDesignHome";
import { getDict } from "@/lib/dictionaries";
import { defaultLanguage } from "@/lib/languages";

const dict = getDict(defaultLanguage);

export const metadata: Metadata = {
  title: `${dict["hero.name"]} — ${dict["hero.title"]}`,
  description: dict["hero.description"],
  // The same content as "/", so it must not compete with it in search results.
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function NoDesignPage() {
  return <NoDesignHome />;
}
