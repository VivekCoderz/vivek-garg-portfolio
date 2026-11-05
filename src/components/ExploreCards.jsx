"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, GraduationCap, Code2, FolderGit2, Award } from "lucide-react";
import { Reveal, SectionTitle } from "./ui";
import { academics, projects, certificates } from "@/data/profile";

export default function ExploreCards({ lc, cc, cf }) {
  const cards = [
    { href: "/about", icon: GraduationCap, title: "About", stat: `CGPA ${academics.cgpa}`, text: "Experience, grades by semester and my tech stack.", glow: "bg-accent-3/20" },
    { href: "/coding-profiles", icon: Code2, title: "Coding profiles", stat: `${lc.solved + (cc?.solved ?? 0) + (cf?.solved ?? 0)}+ solved`, text: "Live LeetCode, CodeChef, Codeforces and GitHub stats.", glow: "bg-medium/20" },
    { href: "/projects", icon: FolderGit2, title: "Projects", stat: `${projects.length} projects`, text: "Dhagaro, CareerConnect, PlacementConnect and more.", glow: "bg-accent/20" },
    { href: "/certificates", icon: Award, title: "Certificates", stat: `${certificates.length} certificates`, text: "SIH 2nd place, internships, Deloitte & AWS simulations.", glow: "bg-accent-2/20" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6" aria-labelledby="explore-title">
      <SectionTitle kicker="// explore" title={<span id="explore-title">Take a look around</span>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.href} delay={i * 0.08}>
            <motion.div whileHover={{ y: -6 }} className="h-full">
              <Link href={c.href} className="card group relative flex h-full flex-col overflow-hidden p-5">
                <div className={`pointer-events-none absolute -right-10 -top-10 size-32 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50 ${c.glow}`} />
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-surface-2"><c.icon size={18} /></span>
                  <ArrowUpRight size={18} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>
                <p className="mt-5 font-mono text-sm text-accent-2">{c.stat}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.text}</p>
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
