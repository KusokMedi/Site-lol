"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.closest("a, button, [role='button'], input, textarea, select, label, [tabindex]")
      );
      setIsPointer(isClickable);
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Animate dot instantly, ring with lerp
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Lerp ring toward cursor
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: isPointer ? "#ffd700" : "rgba(255,255,255,0.9)",
          transition: "background 0.2s, transform 0.05s",
          boxShadow: isPointer ? "0 0 8px rgba(255,215,0,0.6)" : "none",
        }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: isPointer
            ? "1.5px solid rgba(255,215,0,0.6)"
            : "1.5px solid rgba(255,255,255,0.2)",
          transform: isPointer ? "scale(1.3)" : "scale(1)",
          transition: "border-color 0.2s, width 0.2s, height 0.2s",
          boxShadow: isPointer ? "0 0 12px rgba(255,215,0,0.15)" : "none",
        }}
      />
    </>
  );
}
