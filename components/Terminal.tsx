"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

// Inner component — re-mounts completely when `key` changes (lang switch)
function TypingContent({ fileContent }: { fileContent: string[] }) {
  const allChars = useMemo(() => {
    const chars: { char: string; lineIdx: number }[] = [];
    fileContent.forEach((line, li) => {
      if (line === "") {
        chars.push({ char: "", lineIdx: li });
      } else {
        for (const ch of line) {
          chars.push({ char: ch, lineIdx: li });
        }
      }
    });
    return chars;
  }, [fileContent]);

  const [revealedCount, setRevealedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (revealedCount >= allChars.length) return;
    const next = allChars[revealedCount];
    const delay = next.char === "" ? 30 : 14;
    timerRef.current = setTimeout(() => setRevealedCount((v) => v + 1), delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [revealedCount, allChars]);

  const lineTexts = useMemo(() => {
    const lines: string[] = Array(fileContent.length).fill("");
    for (let i = 0; i < Math.min(revealedCount, allChars.length); i++) {
      const { char, lineIdx } = allChars[i];
      if (char !== "") lines[lineIdx] += char;
    }
    return lines;
  }, [revealedCount, allChars, fileContent.length]);

  const isTyping = revealedCount < allChars.length;
  const currentLineIdx = isTyping
    ? (allChars[revealedCount]?.lineIdx ?? fileContent.length - 1)
    : fileContent.length - 1;

  return (
    <div className="p-4 space-y-0.5">
      {fileContent.map((_, li) => {
        const text = lineTexts[li];
        const isEmpty = fileContent[li] === "";
        const isCurrentLine = isTyping && li === currentLineIdx;

        return (
          <div
            key={li}
            className="flex items-start gap-3 font-mono text-[12px] sm:text-[13px] leading-[1.7]"
          >
            <span className="text-white/[0.12] select-none shrink-0 w-5 text-right tabular-nums">
              {li + 1}
            </span>
            {isEmpty ? (
              <span className="text-white/[0.06] select-none">~</span>
            ) : (
              <span className="text-white/60">
                {text}
                {isCurrentLine && (
                  <motion.span
                    className="inline-block w-[7px] h-[13px] bg-white/50 align-middle ml-px"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Terminal({ className = "" }: { className?: string }) {
  const { t, lang } = useLanguage();

  const fileContent = useMemo(() => [
    t("terminal.line1"),
    t("terminal.line2"),
    t("terminal.line3"),
    t("terminal.line4"),
    t("terminal.line5"),
    t("terminal.line6"),
    t("terminal.line7"),
    t("terminal.line8"),
    t("terminal.line9"),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [lang]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "rgba(6,6,6,0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        backdropFilter: "blur(32px)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[11px] text-white/30 font-mono">about.txt</span>
        </div>
      </div>

      {/* key=lang forces full remount on language change — guaranteed clean reset */}
      <div style={{ minHeight: "260px" }}>
        <TypingContent key={lang} fileContent={fileContent} />
      </div>
    </motion.div>
  );
}
