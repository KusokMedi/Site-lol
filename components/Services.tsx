"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe, Bot, Server, Terminal, Code2, Search, Cloud, Wrench, Plug } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

const serviceKeys = ["web", "bots", "backend", "linux", "programs", "audit", "hosting", "support", "api"];
const iconsByKey: Record<string, React.ElementType> = {
  web:      Globe,
  bots:     Bot,
  backend:  Server,
  linux:    Terminal,
  programs: Code2,
  audit:    Search,
  hosting:  Cloud,
  support:  Wrench,
  api:      Plug,
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="services" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,179,0,0.06) 0%, transparent 65%)", filter: "blur(90px)" }}
        />
        <div
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,106,0,0.05) 0%, transparent 65%)", filter: "blur(90px)" }}
        />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16 space-y-4">
          <SectionBadge icon={Zap} label={t("services.title")} />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {parseGradientText(t("services.heading"))}
          </h2>
          <p className="text-white/35 max-w-xl mx-auto text-base sm:text-[17px] text-balance">
            {t("services.description")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {serviceKeys.map((key, i) => {
            const Icon = iconsByKey[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative p-6 rounded-2xl glass glass-hover gradient-border glow-card transition-all duration-300 cursor-default"
              >
                {/* Inner top glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 30% 0%, rgba(255,179,0,0.05) 0%, transparent 60%)" }}
                />

                <div className="flex items-start justify-between mb-5">
                  <div className="w-9 h-9 rounded-xl bg-accent-400/8 border border-accent-400/15 flex items-center justify-center group-hover:bg-accent-400/12 group-hover:border-accent-400/25 transition-all duration-300">
                    <Icon className="w-4.5 h-4.5 text-accent-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-accent-400/50 transition-all duration-300 translate-x-0 group-hover:translate-x-0.5 mt-0.5" />
                </div>

                <h3 className="text-[15px] font-semibold text-white/90 mb-1.5 leading-snug">
                  {t(`service.${key}.title`)}
                </h3>
                <p className="text-sm text-white/35 mb-4 leading-relaxed">
                  {t(`service.${key}.desc`)}
                </p>

                <ul className="space-y-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} className="flex items-start gap-2 text-xs text-white/28">
                      <span className="w-1 h-1 rounded-full bg-accent-400/40 mt-1.5 shrink-0" />
                      {t(`service.${key}.detail${n}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
