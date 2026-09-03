"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Terminal from "./Terminal";
import SocialLinks from "./SocialLinks";
import { scrollToTarget } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Local orbs — stronger than global to anchor the hero */}
      <div
        className="absolute top-[10%] left-[-10%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,179,0,0.09) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[10%] right-[-10%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,106,0,0.07) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center min-h-[calc(100dvh-64px)] lg:min-h-0 justify-center pt-20 lg:pt-0">

          {/* Left — text */}
          <div className="space-y-6 w-full">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-green-400/20 text-xs font-mono text-white/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              available for work
            </motion.div>

            {/* Heading */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight leading-[1.05]"
              >
                <span className="gradient-accent-text">KusokMedi</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-white/35 max-w-md leading-relaxed text-balance"
              >
                {t("hero.description")}
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollToTarget("#services")}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-dark-950 font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] glow ripple"
              >
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => scrollToTarget("#contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover text-sm font-medium text-white/60 hover:text-white transition-all duration-300"
              >
                {t("contact.title")}
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg mx-auto lg:mx-0"
          >
            <Terminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — mouse icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => scrollToTarget("#about")}
          className="flex items-center justify-center text-white/20 hover:text-white/50 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <svg
            width="20"
            height="32"
            viewBox="0 0 20 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.5"
              y="1.5"
              width="17"
              height="29"
              rx="8.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="9" r="2" fill="currentColor">
              <animate attributeName="cy" values="9;15;9" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
