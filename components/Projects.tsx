"use client";

import { motion } from "framer-motion";
import { FolderKanban, Lock, Clock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

const placeholders = [
  {
    gradientFrom: "rgba(255,179,0,0.08)",
    gradientTo: "rgba(255,106,0,0.04)",
    blur: "rgba(255,179,0,0.08)",
  },
  {
    gradientFrom: "rgba(139,92,246,0.08)",
    gradientTo: "rgba(109,40,217,0.04)",
    blur: "rgba(139,92,246,0.08)",
  },
  {
    gradientFrom: "rgba(14,165,233,0.08)",
    gradientTo: "rgba(30,64,175,0.04)",
    blur: "rgba(14,165,233,0.08)",
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="projects" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16 space-y-4">
          <SectionBadge icon={FolderKanban} label={t("projects.title")} />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {parseGradientText(t("projects.heading"))}
          </h2>
          <p className="text-white/35 max-w-xl mx-auto text-base sm:text-[17px] text-balance">
            {t("projects.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {placeholders.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative overflow-hidden rounded-2xl glass gradient-border glow-card flex flex-col"
            >
              {/* Image area */}
              <div
                className="relative h-44 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.gradientFrom} 0%, ${p.gradientTo} 100%)` }}
              >
                {/* Blur orb */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full"
                  style={{ background: p.blur, filter: "blur(40px)" }}
                />
                {/* Lock icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 opacity-70">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white/20" />
                    </div>
                    <div className="space-y-1.5 text-center">
                      <div className="h-2 w-24 rounded-full bg-white/[0.06] mx-auto" />
                      <div className="h-2 w-16 rounded-full bg-white/[0.04] mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Coming soon badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-950/70 backdrop-blur-sm border border-white/[0.08]">
                  <Clock className="w-2.5 h-2.5 text-white/30" />
                  <span className="text-[10px] font-mono text-white/30 tracking-wider">soon</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4 flex-1 flex flex-col">
                {/* Title + desc skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-1/2 rounded-full shimmer" />
                  <div className="h-3 w-full rounded-full shimmer" style={{ animationDelay: "0.15s" }} />
                  <div className="h-3 w-3/4 rounded-full shimmer" style={{ animationDelay: "0.25s" }} />
                </div>

                {/* Tech badges skeleton */}
                <div className="flex flex-wrap gap-1.5">
                  {[14, 16, 12].map((w, j) => (
                    <div
                      key={j}
                      className="h-5 rounded-md shimmer border border-white/[0.05]"
                      style={{ width: `${w * 4}px`, animationDelay: `${j * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Feature list skeleton */}
                <ul className="space-y-2 pt-0.5 flex-1">
                  {[70, 55, 65, 50].map((w, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent-400/18 shrink-0" />
                      <div
                        className="h-2.5 rounded-full shimmer"
                        style={{ width: `${w}%`, animationDelay: `${j * 0.12}s` }}
                      />
                    </li>
                  ))}
                </ul>

                {/* CTA skeleton */}
                <div className="pt-3">
                  <div className="h-8 w-28 rounded-xl shimmer border border-white/[0.05]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
