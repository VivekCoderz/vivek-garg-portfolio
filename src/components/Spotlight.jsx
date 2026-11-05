"use client";
import { useEffect, useRef } from "react";

// A soft glow that follows the mouse. Skipped on touch screens and for "reduce motion".
export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || calm || !el) return;
    el.style.opacity = "1";
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(129,140,248,0.09), transparent 45%)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-700" />;
}
