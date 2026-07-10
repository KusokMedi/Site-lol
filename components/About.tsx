"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import CountUp from "./CountUp";
import { highlights } from "@/lib/data";

export default function About() {
  return (
    <AnimatedSection id="about" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-accent-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-accent-700/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <SectionBadge icon={User} label="Обо мне" />

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
              Создаю{" "}
              <span className="gradient-accent-text">цифровые продукты</span>,
              которые имеют значение
            </h2>

            <div className="space-y-4 text-white/40 leading-relaxed">
              <p className="text-base sm:text-lg">
                Я разработчик, который не ограничивается одним стеком. Сайты,
                Telegram-боты, API, серверная инфраструктура - я разбираюсь и
                делаю. Быстро вхожу в контекст и приступаю к работе.
              </p>
              <p className="text-base sm:text-lg">
                Специализируюсь на Python, React, Node.js и Linux. Беру проект
                от концепции до продакшена, работаю с полным стеком. Мой
                подход: понять проблему, выбрать правильные инструменты и
                построить то, что надежно работает.
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