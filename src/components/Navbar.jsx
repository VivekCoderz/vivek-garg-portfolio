"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/nav";


export default function Navbar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [open, setOpen] = useState(false);
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX }} className="h-0.5 origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3" />
      <nav aria-label="Main" className="mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-full border border-line bg-bg/70 px-4 py-2 backdrop-blur-xl sm:px-5">
        <Link href="/" className="font-display text-lg font-bold" aria-label={`${profile.name}, home`}>
          {profile.initials}
          <span className="text-accent-2">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(([label, href]) => (
            <li key={href} className="relative">
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative z-10 block px-3 py-1.5 text-sm transition-colors ${isActive(href) ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                {label}
              </Link>
              {isActive(href) && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-surface-2" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            aria-label="Open command palette (Ctrl K)"
            title="Search (Ctrl K)"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-white/30 hover:text-ink lg:inline-flex"
          >
            <span>Search</span>
            <kbd className="rounded bg-surface-2 px-1.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <Link href="/#contact" className="hidden rounded-full border border-line px-4 py-1.5 text-sm transition hover:border-white/30 sm:inline-block">
            Contact
          </Link>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-bg transition hover:bg-accent-2">
            Resume
          </a>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-9 place-items-center rounded-full border border-line md:hidden">
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="card mx-4 mt-2 p-2 md:hidden">
          {[...navLinks, ["Contact", "/#contact"]].map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 hover:bg-surface-2 hover:text-ink ${isActive(href) ? "text-ink" : "text-muted"}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
