"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fileContent = [
  "KusokMedi - Программист.",
  "",
  "Стек: Python, React, Linux, Docker",
  "Создаю сайты, ботов, автоматизацию",
  "и цифровые решения под ключ.",
  "",
  "Писать в телеграм: @kusokmedi52",
];

export default function Terminal({ className = "" }: { className?: string }) {
  const [showFile, setShowFile] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const fileTimer = setTimeout(() => setShowFile(true), 1200);
    return () => clearTimeout(fileTimer);
  }, []);

  useEffect(() => {
    if (!showFile) return;
    if (visibleLines < fileContent.length) {
      const lineTimer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        100 + visibleLines * 30
      );
      return () => clearTimeout(lineTimer);
    }
  }, [showFile, visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-dark-800/50 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center px-3 py-2 border-b border-white/[0.06] bg-dark-900/50">
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="text-[10px] text-white/30 font-mono">nano</span>
          <span className="text-[10px] text-white/20">-</span>
          <span className="text-[10px] text-white/40 font-mono truncate">/home/kusokmedi/about.txt</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 10 10"><line x1="2" y1="5" x2="8" y2="5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round"/></svg>
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="2" y="2" width="6" height="6" rx="1" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none"/></svg>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 2L8 8M8 2L2 8" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round"/></svg>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <AnimatePresence mode="wait">
          {!showFile ? (
            <motion.div
              key="cmd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs sm:text-sm"
            >
              <span className="text-green-400/70">kusokmedi@archlinux</span>
              <span className="text-white/20">:</span>
              <span className="text-blue-400/70">~</span>
              <span className="text-white/20">$ </span>
              <span className="text-white/70">nano /home/kusokmedi/about.txt</span>
              <motion.span
                className="inline-block w-2 h-4 bg-white/60 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-0"
            >
              
              {fileContent.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-3 font-mono text-xs sm:text-sm leading-relaxed"
                >
                  <span className="text-white/[0.1] select-none shrink-0 w-4 text-right">
                    {i + 1}
                  </span>
                  {line === "" ? (
                    <span className="text-white/[0.02] select-none">~</span>
                  ) : (
                    <span className="text-white/70">{line}</span>
                  )}
                </motion.div>
              ))}
              {visibleLines >= fileContent.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-3 pt-0.5"
                >
                  <span className="text-white/[0.1] select-none shrink-0 w-4 text-right font-mono text-xs">
                    {fileContent.length + 1}
                  </span>
                  <span className="w-2 h-4 bg-white/50 animate-pulse-glow" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}