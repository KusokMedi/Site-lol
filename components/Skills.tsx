"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { mainSkills } from "@/lib/data";

function RadialProgress({ value, label }: { value: number; label: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
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
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            strokeDasharray={circumference}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ff8c00" />
            </linearGradient>
          </defs>
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
  return (
    <AnimatedSection id="skills" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-accent-500/3 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent-700/3 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/50 tracking-wide"
          >
            <Brain className="w-3 h-3 text-accent-400" />
            Навыки
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Мой{" "}
            <span className="gradient-accent-text">инструментарий</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
            20+ технологий и языков. Вот мои самые сильные стороны.
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