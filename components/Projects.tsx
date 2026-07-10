"use client";

import { motion } from "framer-motion";
import { ArrowRight, FolderKanban } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <AnimatedSection id="projects" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-accent-500/3 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-accent-700/3 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/50 tracking-wide"
          >
            <FolderKanban className="w-3 h-3 text-accent-400" />
            Проекты
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Избранные{" "}
            <span className="gradient-accent-text">работы</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
            Реальные проекты, созданные с нуля - каждый решает конкретные
            задачи с помощью правильных технологий.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative overflow-hidden rounded-2xl glass gradient-border transition-all duration-500 hover:glow-sm"
            >
              <div
                className={`relative h-44 sm:h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 bg-dark-950/60" />
                <span className="relative text-6xl sm:text-7xl font-bold text-white/10 select-none">
                  {project.image}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
              </div>

              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-white/[0.04] text-white/40 border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-1 text-xs text-accent-400/80 font-medium">
                  {project.result}
                </div>

                <div className="pt-3 text-xs text-white/30 italic leading-relaxed">
                  Тестовый текст - заглушка. Скоро обновлю.
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-10"
        >
          <a
            href="https://github.com/kusokmedi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
          >
            Все проекты на GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}