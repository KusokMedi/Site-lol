"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { isTouchDevice } from "@/lib/isTouchDevice";

const LenisContext = createContext<Lenis | null>(null);

/**
 * Height of the fixed header (Navigation.tsx: h-16 on mobile, h-[68px] from
 * sm). Scrolling to a section has to clear it, otherwise the section heading
 * disappears underneath.
 */
const HEADER_OFFSET = 80;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

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
    (target: string | HTMLElement, offset = -HEADER_OFFSET) => {
      if (typeof document === "undefined") return;

      const el =
        typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;

      if (lenis) {
        lenis.scrollTo(el, { offset, duration: 1.2 });
        return;
      }

      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      // The global prefers-reduced-motion rule only shortens CSS transitions,
      // it has no effect on scripted scrolling.
      window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [lenis]
  );
}

function createLenis(): Lenis | null {
  if (isTouchDevice()) return null;
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null;

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
    // Re-created when the visitor flips the OS motion setting while the page is
    // open, so turning reduced motion off actually enables smooth scrolling.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    let animId = 0;

    const raf = (time: number) => {
      instance?.raf(time);
      animId = requestAnimationFrame(raf);
    };

    const start = () => {
      if (instance) return;
      instance = createLenis();
      setLenis(instance);
      if (instance) animId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (!instance) return;
      cancelAnimationFrame(animId);
      instance.destroy();
      instance = null;
      setLenis(null);
    };

    const onMotionChange = () => {
      if (motionQuery.matches) stop();
      else start();
    };

    start();
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(animId);
      instance?.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
