"use client";

import { motion } from "framer-motion";
import { FolderKanban, Gamepad2, Download, MessageCircle, Github, Send, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";
import { env } from "@/lib/env";

type ProjectEntry = {
  key: string;
  icon: React.ElementType;
  linkIcon: React.ElementType;
  tech: string[];
  href: string;
  linkKey: string;
  gradientFrom: string;
  gradientTo: string;
  blur: string;
};

const projectEntries: ProjectEntry[] = [
  {
    key: "ksnake",
    icon: Gamepad2,
    linkIcon: Github,
    tech: ["C++", "SDL2", "CMake", "nlohmann/json"],
    href: env("NEXT_PUBLIC_K_SNAKE_URL"),
    linkKey: "project.link.github",
    gradientFrom: "rgba(255,179,0,0.08)",
    gradientTo: "rgba(255,106,0,0.04)",
    blur: "rgba(255,179,0,0.08)",
  },
  {
    key: "savebot",
    icon: Download,
    linkIcon: Send,
    tech: ["Python", "aiogram", "yt-dlp", "FFmpeg"],
    href: env("NEXT_PUBLIC_SAVE_BOT_URL"),
    linkKey: "project.link.telegram",
    gradientFrom: "rgba(14,165,233,0.08)",
    gradientTo: "rgba(30,64,175,0.04)",
    blur: "rgba(14,165,233,0.08)",
  },
  {
    key: "anonspeak",
    icon: MessageCircle,
    linkIcon: Send,
    tech: ["Python", "aiogram", "SQLite"],
    href: env("NEXT_PUBLIC_ANON_SPEAK_URL"),
    linkKey: "project.link.telegram",
    gradientFrom: "rgba(139,92,246,0.08)",
    gradientTo: "rgba(109,40,217,0.04)",
    blur: "rgba(139,92,246,0.08)",
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
          {projectEntries.map((p, i) => {
            const Icon = p.icon;
            const LinkIcon = p.linkIcon;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative overflow-hidden rounded-2xl glass gradient-border glow-card flex flex-col"
              >
                {/* Header area */}
                <div
                  className="relative h-40 shrink-0"
                  style={{ background: `linear-gradient(135deg, ${p.gradientFrom} 0%, ${p.gradientTo} 100%)` }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[352px] h-[352px]"
                    style={{
                      background: `radial-gradient(circle closest-side, ${p.blur} 0%, transparent 100%)`,
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-accent-400/25 group-hover:bg-accent-400/[0.06] transition-all duration-300">
                      <Icon className="w-7 h-7 text-white/40 group-hover:text-accent-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <h3 className="text-[15px] font-semibold text-white/90 leading-snug">
                      {t(`project.${p.key}.title`)}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed">
                      {t(`project.${p.key}.desc`)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((tech) => (
                      <span
                        key={tech}
                        className="h-5 px-2 rounded-md flex items-center text-[10px] font-mono text-white/40 bg-white/[0.04] border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2 pt-0.5 flex-1">
                    {[1, 2, 3].map((n) => (
                      <li key={n} className="flex items-start gap-2 text-xs text-white/28">
                        <span className="w-1 h-1 rounded-full bg-accent-400/40 mt-1.5 shrink-0" />
                        {t(`project.${p.key}.detail${n}`)}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 h-8 px-3.5 rounded-xl btn-glass text-xs font-medium text-white/60 hover:text-white"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      {t(p.linkKey)}
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/25 group-hover/link:text-accent-400/70 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
