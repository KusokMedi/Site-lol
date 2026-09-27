"use client";

import { motion } from "framer-motion";
import { Github, Send, Globe, MessagesSquare } from "lucide-react";
import YouTubeSelector from "./YouTubeSelector";
import { socialEntries } from "@/lib/content";

// Icon and hover colour per social — design only, the links come from
// lib/content.ts so /simple/ can render the same list without either.
const iconsByName: Record<string, React.ElementType> = {
  GitHub: Github,
  "GitHub Organization": Globe,
  Discord: MessagesSquare,
  Telegram: Send,
};

const colorByName: Record<string, string> = {
  Discord: "hover:text-[#5865F2]",
  Telegram: "hover:text-[#0088cc]",
};

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialEntries.map((social, index) => {
        const Icon = iconsByName[social.name];
        return (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.4 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 transition-all duration-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] ${colorByName[social.name] ?? ""}`}
          aria-label={social.name}
          title={social.name}
        >
          <Icon className="w-4 h-4" />
        </motion.a>
        );
      })}
      <YouTubeSelector />
    </div>
  );
}
