"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
}

export default function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // null = "not animating yet", so the prerendered HTML (and any render before
  // the section scrolls in) shows the real figure instead of a placeholder 0.
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || count !== null) return;

    const duration = 1500;
    const start = performance.now();
    let rafId = 0;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [isInView, value, count]);

  return (
    <span ref={ref}>
      {count ?? value}{suffix}
    </span>
  );
}
