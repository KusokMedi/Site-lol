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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/50 tracking-wide"
    >
      <Icon className="w-3 h-3 text-accent-400" />
      {label}
    </motion.div>
  );
}
