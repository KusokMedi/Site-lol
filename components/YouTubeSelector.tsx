"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const youtubeChannels = [
  {
    name: "@kusokmedi",
    url: "https://youtube.com/@kusokmedi",
    lang: "ru",
  },
  {
    name: "@kexbytes",
    url: "https://youtube.com/@kexbytes",
    lang: "en",
  },
];

export default function YouTubeSelector({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang } = useLanguage();

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 transition-all duration-300 hover:text-[#FF0000] hover:bg-white/[0.08] hover:border-white/[0.12]"
        title="YouTube"
      >
        <Youtube className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 z-50 min-w-[160px] rounded-xl bg-dark-800/95 backdrop-blur-xl border border-white/[0.08] shadow-xl overflow-hidden"
            >
              <div className="p-2">
                <p className="px-3 py-2 text-xs text-white/40 font-medium">
                  {lang === "ru" ? "Выберите канал" : "Select channel"}
                </p>
                {youtubeChannels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                  >
                    <Youtube className="w-4 h-4 text-[#FF0000]" />
                    <span>{channel.name}</span>
                    <span className="ml-auto text-xs text-white/30">
                      [{channel.lang.toUpperCase()}]
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
