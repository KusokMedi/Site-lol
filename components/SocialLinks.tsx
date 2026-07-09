"use client";

import { motion } from "framer-motion";
import { Github, Send, Youtube, Globe } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/kusokmedi",
    icon: Github,
    color: "hover:text-white",
  },
  {
    name: "GitHub Organization",
    url: "https://github.com/kusokmedillc",
    icon: Globe,
    color: "hover:text-white",
  },
  {
    name: "Telegram",
    url: "https://t.me/kusokmedi52",
    icon: Send,
    color: "hover:text-[#0088cc]",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@kusokmedi",
    icon: Youtube,
    color: "hover:text-[#FF0000]",
  },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((social, index) => (
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
          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 transition-all duration-300 ${social.color} hover:bg-white/[0.08] hover:border-white/[0.12]`}
          title={social.name}
        >
          <social.icon className="w-4 h-4" />
        </motion.a>
      ))}
    </div>
  );
}
