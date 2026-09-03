"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Layers, Code2, GitCommit } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import CountUp from "./CountUp";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

export default function About() {
  const { t } = useLanguage();

  const highlights = [
    { key: "experience", icon: Briefcase },
    { key: "projects",   icon: Layers },
    { key: "tech",       icon: Code2 },
    { key: "commits",    icon: GitCommit },
  ];

  return (
    <AnimatedSection id="about" className="relative py-28 sm:py-36">
      {/* Section decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — text */}
          <div className="space-y-6">
            <SectionBadge icon={User} label={t("about.title")} />

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
              {parseGradientText(t("about.heading"))}
            </h2>

            <div className="space-y-4">
              <p className="text-base sm:text-[17px] text-white/40 leading-relaxed">
                {t("about.text1")}
              </p>
              <p className="text-base sm:text-[17px] text-white/35 leading-relaxed">
                {t("about.text2")}
              </p>
            </div>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {highlights.map((item, i) => {
              const value = t(`highlight.${item.key}.value`);
              const digitMatch = value.match(/(\d+)/);
              const num = digitMatch ? parseInt(digitMatch[1], 10) : 0;
              const suffix = digitMatch
                ? value.slice(digitMatch.index! + digitMatch[1].length)
                : "";

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -6, scale: 1.025 }}
                  className="group relative p-5 sm:p-6 rounded-2xl glass glass-hover gradient-border glow-card transition-all duration-300"
                >
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,179,0,0.06) 0%, transparent 70%)" }}
                  />

                  <item.icon className="w-4 h-4 text-accent-400/80 mb-4" />

                  <div className="space-y-0.5">
                    <div className="text-[1.6rem] sm:text-[1.75rem] font-bold leading-none tracking-tight gradient-accent-text">
                      <CountUp value={num} suffix={suffix} />
                    </div>
                    <div className="text-sm font-medium text-white/70 mt-1">
                      {t(`highlight.${item.key}`)}
                    </div>
                    <div className="text-xs text-white/30 leading-relaxed pt-0.5">
                      {t(`highlight.${item.key}.desc`)}
                    </div>
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
