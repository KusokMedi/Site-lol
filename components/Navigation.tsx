"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { useLenis, useScrollTo } from "@/components/SmoothScroll";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTION_IDS = ["home", "about", "services", "projects", "contact"];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const lenis = useLenis();
  const scrollTo = useScrollTo();
  const barRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const activeRef = useRef("home");

  const navLinks = useMemo(
    () => [
      { label: t("nav.home"),     href: "#home" },
      { label: t("nav.about"),    href: "#about" },
      { label: t("nav.services"), href: "#services" },
      { label: t("nav.projects"), href: "#projects" },
      { label: t("nav.contacts"), href: "#contact" },
    ],
    [t]
  );

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll tracking
  useEffect(() => {
    let rafPending = false;
    // The bar's opacity is transitioned by CSS, so it may only be written when
    // the value actually changes — writing it every frame restarts the
    // transition and the bar visibly lags behind the scroll.
    let barVisible = false;

    const handleScroll = (scrollY: number, progress: number) => {
      const pct = Math.min(Math.max(progress, 0), 1);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
        const visible = pct > 0.005;
        if (visible !== barVisible) {
          barVisible = visible;
          barRef.current.style.opacity = visible ? "1" : "0";
        }
      }

      const newScrolled = scrollY > 40;
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

    if (lenis) {
      const onScroll = () => handleScroll(lenis.scroll, lenis.progress);
      lenis.on("scroll", onScroll);
      onScroll();
      return () => lenis.off("scroll", onScroll);
    }

    // No Lenis (touch / reduced motion) — native scroll listener
    const docHeight = () => document.documentElement.scrollHeight - window.innerHeight;
    const onScroll = () => {
      const top = window.scrollY;
      const max = docHeight();
      handleScroll(top, max > 0 ? top / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lenis]);

  // Active section detection
  useEffect(() => {
    const updateActive = () => {
      const threshold = window.innerHeight * 0.4;
      let active = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold) active = id;
      }
      if (active !== activeRef.current) {
        activeRef.current = active;
        setActiveSection(active);
      }
    };

    if (lenis) {
      lenis.on("scroll", updateActive);
      updateActive();
      return () => lenis.off("scroll", updateActive);
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [lenis]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);
      scrollTo(href);
    },
    [scrollTo]
  );

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-dark-950/80 backdrop-blur-2xl" : "bg-transparent"
        }`}
      >
        {/* Bottom border — only when scrolled */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 75%, transparent)" }}
        />

        {/* Scroll progress bar — scaleX, not width: width would relayout every frame */}
        <div
          ref={barRef}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 will-change-transform transition-opacity duration-300 z-10"
          style={{
            opacity: 0,
            background: "linear-gradient(90deg, #ffd700, #ffb300, #ff8c00)",
            boxShadow: "0 0 8px rgba(255,179,0,0.4)",
          }}
        />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px]">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2.5 group shrink-0"
              aria-label={t("aria.goHome")}
            >
              <div className="w-8 h-8 rounded-lg bg-accent-500/8 border border-accent-400/18 flex items-center justify-center group-hover:bg-accent-500/18 group-hover:border-accent-400/35 transition-all duration-300">
                <Terminal className="w-4 h-4 text-accent-400" />
              </div>
              <span className="font-mono text-sm font-semibold tracking-tight text-white/80 group-hover:text-white transition-colors duration-300">
                KusokMedi<span className="text-accent-400 animate-pulse-glow">~</span>
              </span>
            </a>

            {/* Desktop nav pill */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl bg-white/[0.025] border border-white/[0.05]">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative px-4 py-1.5 text-sm rounded-xl transition-all duration-250 ${
                        isActive
                          ? "text-accent-400"
                          : "text-white/38 hover:text-white/75"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl bg-white/[0.065] border border-accent-400/18"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageSwitcher />

              {/* Mobile burger */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl btn-glass text-white/55 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-400/50"
                aria-label={isOpen ? t("aria.closeMenu") : t("aria.openMenu")}
                aria-expanded={isOpen}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark-950/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-[72px] inset-x-3 z-50 md:hidden rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,8,8,0.97)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,179,0,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Top accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-accent-400/25 to-transparent" />

              <div className="p-2.5 space-y-0.5">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18 }}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-accent-400 bg-accent-400/[0.07] border border-accent-400/[0.14]"
                          : "text-white/45 hover:text-white/80 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{link.label}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom line */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
