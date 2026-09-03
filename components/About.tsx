"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Layers, Code2, GitCommit } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import CountUp from "./CountUp";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

const icons = [Briefcase, Layers, Code2, GitCommit];

export default function About() {
  const { t } = useLanguage();

  const highlights = [
    { key: "experience", icon: Briefcase },
    { key: "projects", icon: Layers },
    { key: "tech", icon: Code2 },
    { key: "commits", icon: GitCommit },
  ];

  return (
    <AnimatedSection id="about" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-accent-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent-700/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-600/3 rounded-full blur-[120px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Thin glowing line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent-400/20 to-transparent" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <SectionBadge icon={User} label={t("about.title")} />

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
              {parseGradientText(t("about.heading"))}
            </h2>

            <div className="space-y-4 text-white/40 leading-relaxed">
              <p className="text-base sm:text-lg">
                {t("about.text1")}
              </p>
              <p className="text-base sm:text-lg">
                {t("about.text2")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((item, i) => {
              const value = t(`highlight.${item.key}.value`);
              // Bug #12 fixed: extract the first run of digits anywhere in the
              // string, so translations like "3+ years" or "más de 25" still
              // resolve to a valid number. Falls back to 0 only if truly absent.
              const digitMatch = value.match(/(\d+)/);
              const num = digitMatch ? parseInt(digitMatch[1], 10) : 0;
              // Capture everything after the digits as the suffix (e.g. "+")
              const suffix = digitMatch
                ? value.slice(digitMatch.index! + digitMatch[1].length)
                : "";

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group p-5 sm:p-6 rounded-2xl glass glass-hover gradient-border transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 text-accent-400 mb-3" />
                  <div className="space-y-1">
                    <div className="text-2xl font-bold tracking-tight gradient-accent-text">
                      <CountUp value={num} suffix={suffix} />
                    </div>
                    <div className="text-sm font-medium text-white/80">
                      {t(`highlight.${item.key}`)}
                    </div>
                    <div className="text-xs text-white/30">{t(`highlight.${item.key}.desc`)}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}