type CnInput = string | boolean | undefined | null | Record<string, boolean>;

export function cn(...inputs: CnInput[]): string {
  return inputs
    .flatMap((input) => {
      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([, v]) => v)
          .map(([k]) => k);
      }
      return input || "";
    })
    .filter(Boolean)
    .join(" ");
}

export function scrollToTarget(target: string | HTMLElement, offset = -20) {
  const el = typeof target === "string" ? (document.querySelector(target) as HTMLElement | null) : target;
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
