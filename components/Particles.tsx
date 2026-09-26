"use client";

import { useEffect, useRef } from "react";
import { isTouchDevice } from "@/lib/isTouchDevice";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (isTouchDevice()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let running = false;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; alphaDir: number;
    }[] = [];

    // Backing store in device pixels, CSS box stays viewport-sized. Without the
    // ratio the canvas is upscaled by the browser and the dots look blurry.
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const prevWidth = canvas.width / dpr();
      const prevHeight = canvas.height / dpr();
      const ratio = dpr();

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Keep the particles inside the new viewport instead of leaving a band
      // of empty space (or a cluster) after a window resize.
      if (prevWidth > 0 && prevHeight > 0) {
        const scaleX = width / prevWidth;
        const scaleY = height / prevHeight;
        for (const p of particles) {
          p.x *= scaleX;
          p.y *= scaleY;
        }
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 80);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });
    resize();

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width / dpr(),
        y: Math.random() * canvas.height / dpr(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const render = () => {
      const width = canvas.width / dpr();
      const height = canvas.height / dpr();
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.alpha += p.alphaDir * 0.002;
        if (p.alpha > 0.3 || p.alpha < 0.05) p.alphaDir *= -1;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      animId = requestAnimationFrame(render);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animId);
    };

    start();

    // Also listen for runtime changes (user changes OS setting while page is open)
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        stop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        start();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    // Don't burn frames (and battery) while the tab is in the background
    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else if (!motionQuery.matches) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // width/height are set in px by the resize handler (device-pixel aware),
      // so the element must not be stretched by inset-0.
      className="fixed top-0 left-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
