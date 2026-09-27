import type { Metadata, Viewport } from "next";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

// Its own stylesheet, not app/globals.css: nothing of the site's design (and no
// Tailwind) may reach this copy.
import "./nodesign.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
};

/**
 * Root layout of "/nodesign/" — the design-free copy, English only.
 *
 * Like the other routes it is a root layout (there is no app/layout.tsx), which
 * is what lets it ship its own <html>/<body> and skip RootShell entirely: no
 * fonts, ambient orbs, particles, smooth scroll, motion or analytics. The
 * service worker is still registered so the page works offline like the rest.
 */
export default function NoDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
