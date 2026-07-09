"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { highlights } from "@/lib/data";

export default function About() {
  return (
    <AnimatedSection id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/50 tracking-wide"
            >
              <User className="w-3 h-3 text-accent-400" />
              Обо мне
            </motion.div>

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
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group p-5 sm:p-6 rounded-2xl glass glass-hover transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-accent-400 mb-3" />
                <div className="space-y-1">
                  <div className="text-2xl font-bold tracking-tight gradient-accent-text">
                    {item.value}
                  </div>
                  <div className="text-sm font-medium text-white/80">
                    {item.label}
                  </div>
                  <div className="text-xs text-white/30">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}