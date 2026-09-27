import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import type { Language } from "@/lib/languages";

// The stylesheet is pulled in here, not in a layout: both document routes
// ("/simple/" and "/{lang}/simple/") render this shell, and it has to travel
// with it — same idea as RootShell importing app/globals.css for the main site.
import "@/app/simple.css";

/**
 * The <html>/<body> of the document copy — the counterpart of RootShell.
 *
 * Both "/simple/" and "/{lang}/simple/" are separate route trees, so each one
 * has its own root layout, and both wrap their page in this shell. It ships no
 * web fonts, background, particles, smooth scroll, motion or analytics: just
 * the document stylesheet and the service worker, so the page works offline.
 */
export default function SimpleShell({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang}>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
