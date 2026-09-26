"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ children, id, className = "", delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Framer Motion serialises its *animate* target into the static HTML, so the
  // animate value itself has to be visible on the server — `initial={false}`
  // alone is not enough, it only skips the enter transition. `hydrated` is false
  // during SSR and on the first client render, so the prerendered markup is
  // fully readable for crawlers and no-JS visitors, and a failed or slow bundle
  // degrades to "no animation" instead of a blank page. Once hydrated, sections
  // that are not in view yet fade in as they are scrolled to.
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(isInView);
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (isInView) setVisible(true);
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={false}
      animate={{ opacity: !hydrated || visible ? 1 : 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
