import type { Metadata, Viewport } from "next";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

// Its own stylesheet, not app/globals.css: none of the site's heavy design
// (Tailwind, web fonts, glass, animation) may reach this copy.
import "./simple.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
};

/**
 * Root layout of "/simple/" — the same site in its simplest form, English only.
 *
 * Like the other routes it is a root layout (there is no app/layout.tsx), which
 * is what lets it ship its own <html>/<body> and skip RootShell entirely: no
 * fonts, ambient orbs, particles, smooth scroll, motion or analytics. The
 * service worker is still registered so the page works offline like the rest.
 */
export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
