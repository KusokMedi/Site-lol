"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe, Bot, Server, Terminal, Code2, Search, Cloud, Wrench, Plug } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

const serviceKeys = ["web", "bots", "backend", "linux", "programs", "audit", "hosting", "support", "api"];
const iconsByKey: Record<string, React.ElementType> = {
  web: Globe,
  bots: Bot,
  backend: Server,
  linux: Terminal,
  programs: Code2,
  audit: Search,
  hosting: Cloud,
  support: Wrench,
  api: Plug,
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="services" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-72 h-72 bg-accent-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-accent-700/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <SectionBadge icon={Zap} label={t("services.title")} />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {parseGradientText(t("services.heading"))}
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
            {t("services.description")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {serviceKeys.map((key, i) => {
            const Icon = iconsByKey[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group p-6 sm:p-7 rounded-2xl glass glass-hover gradient-border transition-all duration-300 cursor-default hover:glow-sm"
              >
                <Icon className="w-6 h-6 text-accent-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1.5">
                  {t(`service.${key}.title`)}
                </h3>
                <p className="text-sm text-white/40 mb-4">{t(`service.${key}.desc`)}</p>
                <ul className="space-y-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <li
                      key={n}
                      className="flex items-center gap-2 text-xs text-white/30"
                    >
                      <ArrowRight className="w-3 h-3 text-accent-400/60" />
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