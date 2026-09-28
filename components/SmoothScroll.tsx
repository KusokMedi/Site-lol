"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { isTouchDevice } from "@/lib/isTouchDevice";

const LenisContext = createContext<Lenis | null>(null);

/** Gap left between the header and the first content of the target section. */
const CONTENT_GAP = 24;

/**
 * Offset that lands a section's *content* right under the fixed header.
 *
 * Both numbers are responsive - the header is h-16 (64px) below sm and
 * h-[68px] from sm, and every anchored section carries py-28 (112px) / py-36
 * (144px) of top padding - so neither can be hardcoded. Landing on the section's
 * padding box (what a fixed offset does) hides the heading ~200px down the
 * viewport, which is what the old HEADER_OFFSET = 80 produced.
 *
 * Positive Lenis offsets scroll further down, so cancelling the padding is
 * positive here.
 */
function anchorOffset(el: HTMLElement): number {
  const header = document.querySelector<HTMLElement>("[data-nav-header]");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const paddingTop = Number.parseFloat(getComputedStyle(el).paddingTop) || 0;
  return paddingTop - headerHeight - CONTENT_GAP;
}

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
 * Scrolls to a selector or element, landing its content below the fixed header.
 * Falls back to the native smooth scroll when Lenis is not running.
 * Pass an explicit `offset` to override the measured one (0 = element's own
 * top edge at the top of the viewport, used by the back-to-top button).
 * The identity is stable, so it is safe to use in effect dependency lists.
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target: string | HTMLElement, offset?: number) => {
      if (typeof document === "undefined") return;

      const el =
        typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;

      const delta = offset ?? anchorOffset(el);

      if (lenis) {
        lenis.scrollTo(el, { offset: delta, duration: 1.2 });
        return;
      }

      const top = el.getBoundingClientRect().top + window.scrollY + delta;
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
