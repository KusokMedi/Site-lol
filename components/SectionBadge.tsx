"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface SectionBadgeProps {
  icon: LucideIcon;
  label: string;
}

export default function SectionBadge({ icon: Icon, label }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide relative"
      style={{
        background: "rgba(255,179,0,0.06)",
        border: "1px solid rgba(255,179,0,0.18)",
        boxShadow: "0 0 16px rgba(255,179,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        color: "rgba(255,215,0,0.7)",
      }}
    >
      <Icon className="w-3 h-3 text-accent-400" />
      {label}
    </motion.div>
  );
}
