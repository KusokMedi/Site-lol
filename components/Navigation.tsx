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
  const barGlowRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const activeRef = useRef("home");

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contacts"), href: "#contact" },
  ];

  useEffect(() => {
    let rafPending = false;

    const handleScroll = (scrollY: number, progress: number) => {
      const pct = Math.min(progress * 100, 100);
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
        barRef.current.style.opacity = pct > 0 ? "1" : "0";
      }
      if (barGlowRef.current) {
        barGlowRef.current.style.opacity = pct > 0 ? "1" : "0";
      }

      const newScrolled = scrollY > 50;
      if (newScrolled !== scrolledRef.current) {
        scrolledRef.current = newScrolled;
        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(() => {
            rafPending = false;
            setIsScrolled(newScrolled);
          });
        }
      }
    };

    const lenis = window.__lenis;
    let fallback: (() => void) | null = null;

    if (lenis) {
      const onLenisScroll = () => handleScroll(lenis.scroll, lenis.progress);
      lenis.on("scroll", onLenisScroll);
      onLenisScroll();
      (lenis as unknown as Record<string, unknown>).__navUnsub = () => lenis.off("scroll", onLenisScroll);
    } else {
      fallback = () => {
        const top = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        handleScroll(top, docH > 0 ? top / docH : 0);
      };
      window.addEventListener("scroll", fallback, { passive: true });
      fallback();
    }

    const sectionIds = navLinks.map(({ href }) => href.slice(1));

    const updateActiveSection = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      const threshold = window.innerHeight * 0.4;
      let active = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) {
          active = section.id;
        }
      }
      if (active !== activeRef.current) {
        activeRef.current = active;
        setActiveSection(active);
      }
    };

    const lenisCb = window.__lenis;
    if (lenisCb) {
      lenisCb.on("scroll", updateActiveSection);
      updateActiveSection();
      (lenisCb as unknown as Record<string, unknown>).__navActiveSub = () => lenisCb.off("scroll", updateActiveSection);
    } else {
      window.addEventListener("scroll", updateActiveSection, { passive: true });
      updateActiveSection();
    }

    return () => {
      if (lenis) {
        const unsub = (lenis as unknown as Record<string, unknown>).__navUnsub;
        if (typeof unsub === "function") unsub();
        delete (lenis as unknown as Record<string, unknown>).__navUnsub;
        const activeSub = (lenis as unknown as Record<string, unknown>).__navActiveSub;
        if (typeof activeSub === "function") activeSub();
        delete (lenis as unknown as Record<string, unknown>).__navActiveSub;
      } else {
        if (fallback) window.removeEventListener("scroll", fallback);
        window.removeEventListener("scroll", updateActiveSection);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToTarget(href);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-dark-950/75 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Bottom border line — only when scrolled */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }}
        />

        {/* Scroll progress bar */}
        <div
          ref={barRef}
          className="absolute bottom-0 left-0 h-[2px] will-change-[width] transition-opacity duration-500"
          style={{
            width: "0%",
            opacity: 0,
            background: "linear-gradient(90deg, #ffd700, #ffb300, #ff8c00)",
          }}
        />
        {/* Glow under progress bar */}
        <div
          ref={barGlowRef}
          className="absolute bottom-0 left-0 h-[6px] pointer-events-none transition-opacity duration-500"
          style={{
            width: "inherit",
            opacity: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,179,0,0.4), transparent)",
            filter: "blur(4px)",
          }}
        />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="На главную"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-500/10 border border-accent-400/20 flex items-center justify-center group-hover:bg-accent-500/20 group-hover:border-accent-400/40 transition-all duration-300">
                <Terminal className="w-4 h-4 text-accent-400" />
              </div>
              <span className="font-mono text-sm font-semibold tracking-tight">
                KusokMedi<span className="text-accent-400 animate-pulse-glow">~</span>
              </span>
            </a>

            {/* Desktop nav — pill style */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-4 py-1.5 text-sm rounded-xl transition-all duration-300 ${
                        isActive
                          ? "text-accent-400"
                          : "text-white/40 hover:text-white/80"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl bg-white/[0.07] border border-accent-400/20"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageSwitcher />

              {/* Mobile burger */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.07] transition-all duration-200"
                aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
                whileTap={{ scale: 0.92 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu — full overlay, outside header so no height animation issues */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-dark-950/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-[72px] left-3 right-3 z-50 md:hidden rounded-2xl overflow-hidden"
              style={{
                background: "rgba(10,10,10,0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,179,0,0.05)",
                backdropFilter: "blur(32px)",
              }}
            >
              {/* Top accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

              <div className="p-3 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-accent-400 bg-accent-400/[0.08] border border-accent-400/[0.15]"
                          : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
