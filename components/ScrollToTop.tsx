"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

function scrollToTop() {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => setVisible(scroll > 400);
      lenis.on("scroll", handler);
      return () => lenis.off("scroll", handler);
    } else {
      const handler = () => setVisible(window.scrollY > 400);
      window.addEventListener("scroll", handler, { passive: true });
      return () => window.removeEventListener("scroll", handler);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer btn-glass text-accent-400/70 hover:text-accent-400"
          style={{
            boxShadow: "0 0 20px rgba(255,179,0,0.12), 0 8px 32px rgba(0,0,0,0.5)",
            borderColor: "rgba(255,179,0,0.2)",
          }}
          title="Наверх"
        >
          <ChevronUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
