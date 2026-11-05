"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "motion/react";

export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, decimals = 0, suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {(reduce ? to : val).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function SectionTitle({ kicker, title, sub, as: Tag = "h2" }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-sm text-accent-2">{kicker}</p>
      <Tag className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</Tag>
      {sub && <p className="mt-3 max-w-2xl text-muted">{sub}</p>}
    </Reveal>
  );
}

// Top of every inner page: one h1 per page (good for SEO), padded below the fixed navbar.
export function PageHeader({ kicker, title, sub }) {
  return (
    <header className="relative mx-auto max-w-6xl px-4 pt-36 sm:px-6">
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <SectionTitle as="h1" kicker={kicker} title={title} sub={sub} />
    </header>
  );
}
