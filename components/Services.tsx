"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <AnimatedSection id="services" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/50 tracking-wide"
          >
            <Zap className="w-3 h-3 text-accent-400" />
            Услуги
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Что я{" "}
            <span className="gradient-accent-text">могу</span> для вас сделать
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
            Полный цикл разработки - от концепции до деплоя. Работаю со всем
            стеком, чтобы создать готовое решение.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group p-6 sm:p-7 rounded-2xl glass glass-hover transition-all duration-300 cursor-default"
            >
              <service.icon className="w-6 h-6 text-accent-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-1.5">
                {service.title}
              </h3>
              <p className="text-sm text-white/40 mb-4">{service.description}</p>
              <ul className="space-y-1.5">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-center gap-2 text-xs text-white/30"
                  >
                    <ArrowRight className="w-3 h-3 text-accent-400/60" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}