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

  // "already counting" lives in a ref, not in state: making the effect depend
  // on the frame counter re-ran it on every tick, the cleanup cancelled the
  // pending frame and the guard then refused to restart - the number froze at
  // the first frame (0) instead of reaching the real figure.
  const started = useRef(false);
  const lastValue = useRef(value);

  // A changed figure (e.g. a different language or an updated stat) has to be
  // counted up again from scratch.
  useEffect(() => {
    if (lastValue.current === value) return;
    lastValue.current = value;
    started.current = false;
    setCount(null);
  }, [value]);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const duration = 1500;
    let rafId = 0;
    let cancelled = false;
    // The first callback's timestamp is the time origin: rAF's `now` and
    // performance.now() do not always share a time origin (Firefox, embedded
    // webviews), and a negative `elapsed` would pin the counter at 0.
    let start: number | null = null;

    const tick = (now: number) => {
      if (cancelled) return;
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count ?? value}{suffix}
    </span>
  );
}
