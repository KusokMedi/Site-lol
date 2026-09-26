"use client";

import { useEffect } from "react";

/**
 * Registers the generated service worker.
 *
 * next-pwa only injects its registration for the Pages Router, so with the App
 * Router (and especially with `output: "export"`) nothing registers /sw.js and
 * the PWA silently degrades to "just a manifest".
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        // Offline support is optional — ignore registration failures
      });
    };

    // No reload on the `online` event: the precache is revision-stamped, so the
    // new service worker already serves the fresh assets once it activates, and
    // reloading would throw away the scroll position every time the connection
    // flaps (which is routine on mobile).

    if (document.readyState === "complete") {
      register();
      return;
    }

    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
