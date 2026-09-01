"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { scrollToTarget } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const barRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const activeRef = useRef("home");

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.code"), href: "#github" },
    { label: t("nav.contacts"), href: "#contact" },
  ];

  useEffect(() => {
    const update = () => {
      const lenis = window.__lenis;
      if (lenis) {
        const pct = Math.min(lenis.progress * 100, 100);
        if (barRef.current) barRef.current.style.width = `${pct}%`;
        const newScrolled = lenis.scroll > 50;
        if (newScrolled !== scrolledRef.current) {
          scrolledRef.current = newScrolled;
          setIsScrolled(newScrolled);
        }
      }
    };

    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", update);
      update();
    } else {
      const fallback = () => {
        const top = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? (top / docH) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${pct}%`;
        const newScrolled = top > 50;
        if (newScrolled !== scrolledRef.current) {
          scrolledRef.current = newScrolled;
          setIsScrolled(newScrolled);
        }
      };
      window.addEventListener("scroll", fallback, { passive: true });
      fallback();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id !== activeRef.current) {
              activeRef.current = id;
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    const sections = navLinks
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter(Boolean);

    sections.forEach((el) => el && observer.observe(el));
    return () => {
      observer.disconnect();
      if (lenis) lenis.off("scroll", update);
    };
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToTarget(href);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent-400 to-accent-600 will-change-[width]"
        style={{ width: "0%" }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group"
            aria-label="На главную"
          >
            <Terminal className="w-5 h-5 text-accent-400 group-hover:text-accent-500 transition-colors" />
            <span className="font-mono text-sm font-semibold tracking-tight">
              KusokMedi<span className="text-accent-400">~</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-accent-400 bg-white/[0.06]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/70 hover:text-white transition-colors"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/[0.04] bg-dark-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    aria-current={isActive ? "page" : undefined}
                    className={`block px-4 py-3 text-sm rounded-xl transition-all ${
                      isActive
                        ? "text-accent-400 bg-white/[0.06]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}