import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import type { Language } from "@/lib/languages";

// The stylesheet is pulled in here, not in a layout: both document routes
// ("/simple/" and "/{lang}/simple/") render this shell, and it has to travel
// with it — same idea as RootShell importing app/globals.css for the main site.
import "@/app/simple.css";

/**
 * Preferences of the Appearance panel (theme and text size).
 *
 * Runs in <head> before the first paint, so a saved choice is applied without a
 * flash. It only mirrors the radio buttons into `data-` attributes on <html> and
 * remembers them in localStorage — the page itself works without it: the same
 * switches are wired up in CSS through `:has()`.
 */
const PREFS_SCRIPT = `try{var d=document.documentElement,p=localStorage.getItem("simple-appearance");if(p){var o=JSON.parse(p);if(o.t)d.dataset.theme=o.t;if(o.s)d.dataset.size=o.s;}}catch(e){}
document.addEventListener("DOMContentLoaded",function(){try{var d=document.documentElement,p=JSON.parse(localStorage.getItem("simple-appearance")||"{}");["theme","size"].forEach(function(k){var v=p[k==="theme"?"t":"s"],el=v&&document.getElementById((k==="theme"?"theme-":"size-")+v);if(el)el.checked=true;});
d.addEventListener("change",function(e){var t=e.target;if(t.name!=="theme"&&t.name!=="size")return;var o={t:d.dataset.theme||"auto",s:d.dataset.size||"standard"};if(t.name==="theme"){d.dataset.theme=t.value;o.t=t.value;}else{d.dataset.size=t.value;o.s=t.value;}localStorage.setItem("simple-appearance",JSON.stringify(o));});}catch(e){}});`;

/**
 * The <html>/<body> of the document copy — the counterpart of RootShell.
 *
 * Both "/simple/" and "/{lang}/simple/" are separate route trees, so each one
 * has its own root layout, and both wrap their page in this shell. It ships no
 * web fonts, background, particles, smooth scroll, motion or analytics: just
 * the document stylesheet and the ~1 kB preferences script, so the page works
 * offline.
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_SCRIPT }} />
      </head>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
