"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, FileText, MapPin } from "lucide-react";
import { profile, socials } from "@/data/profile";
import { iconFor } from "./Icons";
import Magnetic from "./Magnetic";

function useTypewriter(words) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (empty) {
          setDeleting(false);
          return setI(i + 1);
        }
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      done ? 1600 : deleting ? 35 : 75
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, reduce]);

  return reduce ? words[0] : text;
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const role = useTypewriter(profile.roles);
  const first = profile.name.split(" ")[0];
  const rest = profile.name.split(" ").slice(1).join(" ");

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="float pointer-events-none absolute -left-32 top-24 size-[28rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="float pointer-events-none absolute -right-24 bottom-10 size-[24rem] rounded-full bg-accent-2/15 blur-[120px] [animation-delay:-3s]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
        <motion.div variants={{ show: { transition: { staggerChildren: 0.12 } } }} initial="hidden" animate="show">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.openTo}
          </motion.div>

          <motion.h1 variants={item} className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Hi, I&apos;m {first}
            <br />
            <span className="text-gradient">{rest}.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 h-8 font-mono text-lg text-accent-2 sm:text-xl">
            <span className="text-muted">&gt; </span>
            <span className="blink">{role}</span>
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
            <a href="/projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-medium text-bg transition hover:shadow-[0_0_40px_-6px_var(--accent-2)]">
              See my work <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
            </a>
            </Magnetic>
            <Magnetic>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-medium transition hover:border-accent-2/60">
              <FileText size={16} /> Resume
            </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = iconFor[s.name];
              return (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-11 place-items-center rounded-full border border-line bg-surface text-muted transition hover:-translate-y-1 hover:border-accent-2/60 hover:text-ink">
                  <Icon />
                </a>
              );
            })}
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-64 sm:w-80"
        >
          <div className="relative aspect-square">
            <div className="ring-spin absolute -inset-1.5 rounded-full opacity-80 blur-[2px]" />
            <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-bg">
              <Image src={profile.photo} alt={profile.name} fill priority sizes="320px" className="object-cover" />
            </div>
          </div>
          {/* chhoti wali photo: idhar-udhar tairti hai, aur mouse se kheench bhi sakte ho */}
          <motion.div
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.15, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, -150, -230, -90, 40, 0],
              y: [0, -40, 140, 300, 180, 0],
            }}
            transition={{
              opacity: { delay: 1.5 },
              scale: { delay: 1.5, type: "spring" },
              x: { delay: 2, duration: 18, repeat: Infinity, ease: "easeInOut" },
              y: { delay: 2, duration: 18, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -right-6 -top-10 z-10 size-16 cursor-grab touch-none sm:size-20"
            title="Drag me!"
          >
            <div className="ring-spin absolute -inset-1 rounded-full" />
            <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-bg">
              <Image src={profile.photo2} alt="" fill sizes="80px" className="pointer-events-none object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="card absolute -right-4 top-24 px-3 py-2 text-sm sm:-right-10"
          >
            <span className="font-mono text-accent-3">B.Tech CSE</span>
            <span className="block text-xs text-muted">Geeta University</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="card absolute -left-4 bottom-6 px-3 py-2 text-sm sm:-left-10"
          >
            <span className="font-mono text-accent-2">MERN + DSA</span>
            <span className="block text-xs text-muted">C++ · React · Node</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
