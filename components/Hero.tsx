"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Terminal from "./Terminal";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-dvh lg:h-dvh flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-700/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="space-y-5 pt-20 lg:pt-0">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]"
              >
                <span className="gradient-accent-text">KusokMedi</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-white/40 max-w-lg leading-relaxed text-balance"
              >
                Создаю сайты, автоматизацию, ботов и цифровые решения.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-dark-950 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow"
              >
                Проекты
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
              >
                Связаться
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <SocialLinks />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0 lg:block"
          >
            <Terminal />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo("#about")}
          className="flex flex-col items-center gap-1.5 text-white/20 hover:text-white/50 transition-colors duration-300 cursor-pointer"
        >
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            className="animate-float"
          >
            <rect
              x="2"
              y="2"
              width="16"
              height="26"
              rx="8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="9" r="2" fill="currentColor">
              <animate
                attributeName="cy"
                values="9;14;9"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
