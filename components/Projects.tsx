"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderKanban } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { parseGradientText } from "./GradientText";

const projectKeys = ["anonspeak", "bestdev", "gridmc"];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="projects" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-accent-500/3 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-accent-700/3 rounded-full blur-[140px]" />
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
          {projectKeys.map((key, i) => {
            const gradients = ["from-white/20 to-stone-300/20", "from-yellow-400/20 to-amber-500/20", "from-sky-400/20 to-blue-500/20"];
            const images = ["/resources/AnonSpeak-logo.jpg", "/resources/BestDev-logo.jpg", "/resources/mc-1-21-11-logo.jpeg"];
            const techs = [["Python", "Telebot", "SQLite"], ["Python", "Telebot", "SQLite"], ["Paper", "Java", "Linux"]];
            const links = ["https://t.me/AnonSpeakKM_bot", "https://t.me/bestdevsbot", "https://discord.kusokmedi.lat"];
            const projectFeatures = [
              [t("project.anonspeak.feat1"), t("project.anonspeak.feat2"), t("project.anonspeak.feat3"), t("project.anonspeak.feat4")],
              [t("project.bestdev.feat1"), t("project.bestdev.feat2"), t("project.bestdev.feat3"), t("project.bestdev.feat4")],
              [t("project.gridmc.feat1"), t("project.gridmc.feat2"), t("project.gridmc.feat3"), t("project.gridmc.feat4")],
            ];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-2xl glass gradient-border transition-all duration-500 hover:glow-sm flex flex-col"
              >
                <div
                  className={`relative h-44 sm:h-48 bg-gradient-to-br ${gradients[i]} flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-dark-950/40" />
                  <div className="absolute inset-4 rounded-full bg-accent-500/20 blur-3xl" />
                  <img
                    src={images[i]}
                    alt={t(`project.${key}.title`)}
                    className="relative w-full h-full object-contain p-6 select-none drop-shadow-[0_0_20px_rgba(255,179,0,0.15)]"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
                    {t(`project.${key}.title`)}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {t(`project.${key}.desc`)}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {techs[i].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-white/[0.04] text-white/40 border border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {projectFeatures[i].map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs text-white/30"
                      >
                        <span className="text-accent-400/60 mt-0.5 shrink-0">
                          ▹
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4">
                    <a
                      href={links[i]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-accent text-dark-950 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t(`project.${key}.cta`)}
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