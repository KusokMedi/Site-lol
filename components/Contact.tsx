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
    <AnimatedSection id="contact" className="relative py-28 sm:py-36">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <SectionBadge icon={MessageCircle} label={t("contact.title")} />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            {parseGradientText(t("contact.heading"))}
          </h2>

          <p className="text-base sm:text-[17px] text-white/38 text-balance leading-relaxed">
            {t("contact.text")}
          </p>

          {/* CTA button */}
          <div className="pt-2">
            <a
              href="https://t.me/kusokmedi52"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl gradient-accent text-dark-950 font-semibold text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] glow ripple"
            >
              <Send className="w-5 h-5" />
              {t("contact.button")}
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
