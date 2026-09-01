"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-dark-950 px-4 noise-overlay" role="main">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-mono text-[120px] sm:text-[150px] font-bold leading-none"
        >
          <span className="gradient-accent-text">404</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-semibold text-white/80"
        >
          Страница не найдена
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/40 text-base sm:text-lg max-w-md mx-auto"
        >
          Такой страницы не существует. Возможно, она была перемещена или удалена.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-dark-950 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow"
          >
            На главную
          </Link>
        </motion.div>
      </div>
    </main>
  );
}