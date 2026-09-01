"use client";

import { motion } from "framer-motion";
import { Send, ArrowRight, MessageCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/3 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <SectionBadge icon={MessageCircle} label={t("contact.title")} />

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {parseGradientText(t("contact.heading"))}
          </h2>

          <p className="text-base sm:text-lg text-white/40 text-balance">
            {t("contact.text")}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-2"
          >
            <a
              href="https://t.me/kusokmedi52"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl gradient-accent text-dark-950 font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow"
            >
              <Send className="w-5 h-5" />
              {t("contact.button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
