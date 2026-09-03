"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";
import { mainSkills } from "@/lib/data";

function RadialProgress({ value, label }: { value: number; label: string }) {
  // Unique gradient ID per instance to avoid SVG id collision
  const gradientId = useId().replace(/:/g, "-");
  const id = `gradient-${gradientId}`;

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ff8c00" />
            </linearGradient>
          </defs>
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="4"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            strokeDasharray={circumference}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold gradient-accent-text">{value}%</span>
        </div>
      </div>
      <span className="text-xs text-white/50 font-medium">{label}</span>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="skills" className="relative py-32 section-fade">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-accent-500/7 rounded-full blur-[110px]" />
        <div className="absolute bottom-1/3 -right-40 w-[450px] h-[450px] bg-accent-600/5 rounded-full blur-[110px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/10 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <SectionBadge icon={Brain} label={t("skills.badge")} />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {parseGradientText(t("skills.heading"))}
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
            {t("skills.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {mainSkills.map((skill, i) => (
            <motion.div
              key={`${skill.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-3 rounded-2xl gradient-border transition-all duration-300 hover:glow-sm"
            >
              <RadialProgress value={skill.level} label={skill.name} />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
