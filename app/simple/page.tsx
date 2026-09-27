import SimpleHome from "@/components/SimpleHome";
import { defaultLanguage } from "@/lib/languages";
import { simpleMetadata } from "@/lib/seo";

export const metadata = simpleMetadata(defaultLanguage);

/** "/simple/" - the document copy of the English page. */
export default function SimplePage() {
  return <SimpleHome lang={defaultLanguage} />;
}
