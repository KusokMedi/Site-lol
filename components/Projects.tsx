"use client";

import { motion } from "framer-motion";
import { FolderKanban, Lock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

const placeholders = [
  { gradient: "from-accent-500/10 to-accent-700/10", blur: "bg-accent-500/10" },
  { gradient: "from-violet-500/10 to-purple-700/10", blur: "bg-violet-500/10" },
  { gradient: "from-sky-500/10 to-blue-700/10", blur: "bg-sky-500/10" },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="projects" className="relative py-32 section-fade">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-accent-500/7 rounded-full blur-[110px]" />
        <div className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] bg-accent-700/5 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-accent-600/3 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/15 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <SectionBadge icon={FolderKanban} label={t("projects.title")} />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {parseGradientText(t("projects.heading"))}
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
            {t("projects.description")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {placeholders.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl glass gradient-border flex flex-col glow-card"
            >
              {/* Image area */}
              <div className={`relative h-44 sm:h-48 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                <div className={`absolute inset-6 rounded-full ${p.blur} blur-3xl`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 select-none">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white/20" />
                    </div>
                    <div className="space-y-1.5 text-center px-6">
                      <div className="h-2.5 w-28 rounded-full bg-white/[0.06] mx-auto" />
                      <div className="h-2 w-20 rounded-full bg-white/[0.04] mx-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded-full shimmer" />
                  <div className="h-3 w-full rounded-full shimmer" style={{ animationDelay: "0.1s" }} />
                  <div className="h-3 w-3/4 rounded-full shimmer" style={{ animationDelay: "0.2s" }} />
                </div>

                {/* Tech tags skeleton */}
                <div className="flex gap-1.5">
                  <div className="h-5 w-14 rounded-md shimmer border border-white/[0.06]" />
                  <div className="h-5 w-16 rounded-md shimmer border border-white/[0.06]" style={{ animationDelay: "0.1s" }} />
                  <div className="h-5 w-12 rounded-md shimmer border border-white/[0.06]" style={{ animationDelay: "0.2s" }} />
                </div>

                {/* Features skeleton */}
                <ul className="space-y-2 pt-1">
                  {[70, 55, 65, 50].map((w, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-400/20 shrink-0" />
                      <div
                        className="h-2.5 rounded-full shimmer"
                        style={{ width: `${w}%`, animationDelay: `${j * 0.1}s` }}
                      />
                    </li>
                  ))}
                </ul>

                {/* CTA skeleton */}
                <div className="mt-auto pt-4">
                  <div className="h-9 w-28 rounded-xl shimmer border border-white/[0.06]" />
                </div>
              </div>

              {/* Coming soon overlay badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-dark-950/80 backdrop-blur-sm border border-white/[0.08] text-[11px] font-mono text-white/30">
                soon
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
