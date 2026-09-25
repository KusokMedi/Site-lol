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

    // Pick up where the user left off once the connection is back
    const onOnline = () => window.location.reload();
    window.addEventListener("online", onOnline);

    if (document.readyState === "complete") {
      register();
      return () => window.removeEventListener("online", onOnline);
    }

    window.addEventListener("load", register, { once: true });
    return () => {
      window.removeEventListener("load", register);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return null;
}
