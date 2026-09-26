"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { languageNames, languages } from "@/lib/languages";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = (focusTrigger = true) => {
    setIsOpen(false);
    if (focusTrigger) buttonRef.current?.focus();
  };

  /** Moves focus between the options — the menu pattern keeps focus inside. */
  const moveFocus = (from: number, delta: number) => {
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    if (!items?.length) return;
    const next = (from + delta + items.length) % items.length;
    items[next].focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // ArrowDown on the trigger opens the menu with the current language focused.
  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
      requestAnimationFrame(() => {
        const current = listRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]');
        (current ?? listRef.current?.querySelector("button"))?.focus();
      });
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? close(false) : setIsOpen(true))}
        onKeyDown={onTriggerKeyDown}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/70 hover:text-white transition-colors text-sm"
        aria-label={languageNames[lang]}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase font-medium">{lang}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            role="menu"
            aria-label={languageNames[lang]}
            onKeyDown={(e) => {
              const items = Array.from(
                listRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []
              );
              const from = items.indexOf(document.activeElement as HTMLButtonElement);
              if (e.key === "ArrowDown") {
                e.preventDefault();
                moveFocus(from < 0 ? 0 : from, 1);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                moveFocus(from < 0 ? items.length - 1 : from, -1);
              } else if (e.key === "Home") {
                e.preventDefault();
                moveFocus(0, 0);
              } else if (e.key === "End") {
                e.preventDefault();
                moveFocus(items.length - 1, 0);
              }
            }}
            className="absolute right-0 mt-2 py-2 rounded-xl bg-dark-800/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl min-w-[160px] max-h-[70vh] overflow-y-auto z-50"
          >
            {languages.map((item, i) => (
              <motion.button
                key={item}
                role="menuitemradio"
                aria-checked={lang === item}
                onClick={() => {
                  setLang(item);
                  close();
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-white/[0.04] transition-all duration-200 ${
                  lang === item ? "text-accent-400 bg-white/[0.04]" : "text-white/70"
                }`}
              >
                <span>{languageNames[item]}</span>
                <span className="text-xs text-white/30">[{item.toUpperCase()}]</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
