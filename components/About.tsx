"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import CountUp from "./CountUp";
import { highlights } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";

export default function About() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="about" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-accent-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-accent-700/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <SectionBadge icon={User} label={t("about.title")} />

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
              {t("about.heading")}
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
              const match = item.value.match(/^(\d+)(.*)$/);
              const num = match ? parseInt(match[1]) : 0;
              const suffix = match ? match[2] : item.value;

              return (
                <motion.div
                  key={item.label}
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
                      {item.label}
                    </div>
                    <div className="text-xs text-white/30">{item.desc}</div>
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