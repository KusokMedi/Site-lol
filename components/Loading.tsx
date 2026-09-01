"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Loading() {
  return (
    <motion.main
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-dvh flex items-center justify-center bg-dark-950"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Terminal className="w-12 h-12 text-accent-400" />
        </motion.div>

        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
