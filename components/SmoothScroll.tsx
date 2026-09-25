"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { isTouchDevice } from "@/lib/isTouchDevice";

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null on touch devices / reduced motion. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Scrolls to a selector or element, offset for the fixed header.
 * Falls back to the native smooth scroll when Lenis is not running.
 * The identity is stable, so it is safe to use in effect dependency lists.
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target: string | HTMLElement, offset = -20) => {
      if (typeof document === "undefined") return;

      const el =
        typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;

      if (lenis) {
        lenis.scrollTo(el, { offset, duration: 1.2 });
        return;
      }

      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [lenis]
  );
}

function createLenis(): Lenis | null {
  if (isTouchDevice()) return null;
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  return new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
  });
}

export default function SmoothScroll({ children }: { children?: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = createLenis();
    setLenis(instance);
    if (!instance) return;

    let animId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      animId = requestAnimationFrame(raf);
    };
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
