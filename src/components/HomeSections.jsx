"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, BadgeCheck, Briefcase, ChevronDown, Flame, GraduationCap, Rocket, Sparkles, Star, Trophy } from "lucide-react";
import { Reveal, SectionTitle, Counter } from "./ui";
import { CertModal } from "./Sections";
import { iconFor } from "./Icons";
import { milestones, certificates, skills, projects } from "@/data/profile";

const certByImg = Object.fromEntries(certificates.map((c) => [c.img, c]));

/* ── Tech marquee: two rows scrolling in opposite directions ───── */
export function TechMarquee() {
  const all = skills.flatMap((s) => s.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];
  return (
    <section aria-label="Tech stack" className="pt-16">
      <div className="marquee-wrap relative space-y-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className={`marquee flex w-max gap-3 ${r ? "marquee-reverse" : ""}`}>
            {[...row, ...row, ...row, ...row].map((s, i) => (
              <span key={i} aria-hidden={i >= row.length} className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2 font-mono text-sm text-muted">
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Right now: bento of what I'm doing at the moment ──────────── */
export function NowBento({ lc }) {
  const [open, setOpen] = useState(null);
  const latest = milestones.find((m) => m.cert);
  const latestCert = certByImg[latest.cert];
  const dhagaro = projects.find((p) => p.title === "Dhagaro");

  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6" aria-labelledby="now-title">
      <SectionTitle kicker="// right now" title={<span id="now-title">What I&apos;m up to</span>} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Dhagaro */}
        <Reveal className="md:col-span-2">
          <div className="card group relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-8">
            <div className={`pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gradient-to-br ${dhagaro.accent} opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45`} />
            <div className="relative flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-accent-3"><Rocket size={13} /> Founder</span>
              <span title="Udyam: UDYAM-HR-14-0100594" className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300"><BadgeCheck size={13} /> MSME registered</span>
            </div>
            <div className="relative mt-10">
              <h3 className="font-display text-3xl font-bold sm:text-4xl">Building <span className="text-gradient">Dhagaro</span></h3>
              <p className="mt-3 max-w-lg text-muted">{dhagaro.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {dhagaro.tech.map((t) => <span key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>)}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a href={dhagaro.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent-2">
                  Visit store <ArrowUpRight size={14} />
                </a>
                {dhagaro.socials?.map((s) => {
                  const Icon = iconFor[s.name];
                  return (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Dhagaro on ${s.name}`} title={s.name} className="grid size-9 place-items-center rounded-full border border-line bg-surface text-muted transition hover:-translate-y-0.5 hover:border-white/30 hover:text-ink">
                      <Icon width={15} height={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Latest certificate */}
        <Reveal delay={0.08} className="lg:row-span-2">
          <button onClick={() => setOpen(latestCert)} className="card group flex h-full w-full flex-col overflow-hidden text-left">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white lg:aspect-auto lg:flex-1">
              <Image src={`/certificates/${latest.cert}.jpg`} alt={latestCert.title} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-contain transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-medium text-accent-3 backdrop-blur">
                <Sparkles size={11} /> Latest · {latest.date}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold">{latest.title}</h3>
              <p className="mt-1 text-sm text-muted">{latest.text}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm text-accent-2">View certificate <ArrowRight size={14} className="transition group-hover:translate-x-1" /></p>
            </div>
          </button>
        </Reveal>

        {/* DSA */}
        <Reveal delay={0.12}>
          <Link href="/coding-profiles" className="card group relative flex h-full flex-col overflow-hidden p-6">
            <div className="pointer-events-none absolute -bottom-12 -right-12 size-40 rounded-full bg-medium/20 blur-3xl" />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-medium"><Flame size={13} /> Daily DSA</span>
            <Counter to={lc.solved} suffix="+" className="mt-6 font-display text-5xl font-bold" />
            <p className="mt-1 text-sm text-muted">LeetCode problems solved{lc.streak ? ` · ${lc.streak}-day streak` : ""}</p>
            <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-surface-2" aria-hidden>
              <motion.span className="bg-easy" initial={{ width: 0 }} whileInView={{ width: `${(lc.easy / lc.solved) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
              <motion.span className="bg-medium" initial={{ width: 0 }} whileInView={{ width: `${(lc.medium / lc.solved) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.span className="bg-hard" initial={{ width: 0 }} whileInView={{ width: `${(lc.hard / lc.solved) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />
            </div>
            <p className="mt-2 font-mono text-[11px] text-muted">{lc.easy} easy · {lc.medium} medium · {lc.hard} hard</p>
          </Link>
        </Reveal>

        {/* Learning */}
        <Reveal delay={0.16}>
          <div className="card relative flex h-full flex-col overflow-hidden p-6">
            <div className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-accent/20 blur-3xl" />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-accent"><Sparkles size={13} /> Exploring</span>
            <h3 className="mt-6 font-display text-2xl font-bold">AI / ML</h3>
            <p className="mt-2 text-sm text-muted">Learning how to bring AI features into the full-stack apps I build, like the ATS resume analyzer in CareerConnect.</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {["Python", "NumPy", "Pandas", "LLM APIs"].map((t) => <span key={t} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
      <AnimatePresence>{open && <CertModal cert={open} shared={false} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ── Journey: zig-zag milestone timeline that draws as you scroll ─ */
const kinds = {
  award: { icon: Trophy, color: "text-accent-3", ring: "border-accent-3/40", label: "Achievement" },
  work: { icon: Briefcase, color: "text-accent-2", ring: "border-accent-2/40", label: "Experience" },
  edu: { icon: GraduationCap, color: "text-accent", ring: "border-accent/40", label: "Education" },
  launch: { icon: Rocket, color: "text-pink-300", ring: "border-pink-300/40", label: "Launch" },
  grade: { icon: Star, color: "text-emerald-300", ring: "border-emerald-300/40", label: "Academics" },
};
const INITIAL = 6;

export function Milestones() {
  const ref = useRef(null);
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const list = all ? milestones : milestones.slice(0, INITIAL);

  return (
    <section id="journey" className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
      <SectionTitle kicker="// journey" title="The road so far" sub="Hackathons, internships, launches and grades, newest first. Click a card with a certificate to see it." />

      <div ref={ref} className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-line md:left-1/2" />
        <motion.div style={{ scaleY }} className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent-3 via-accent-2 to-accent md:left-1/2" />

        <ol className="space-y-6 md:space-y-2">
          <AnimatePresence initial={false}>
            {list.map((m, i) => {
              const k = kinds[m.kind];
              const left = i % 2 === 0;
              const cert = m.cert && certByImg[m.cert];
              const Body = cert ? "button" : "div";
              return (
                <motion.li
                  key={m.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative pl-12 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
                >
                  <span className={`absolute left-4 top-5 z-10 grid size-9 -translate-x-1/2 place-items-center rounded-full border bg-bg md:left-1/2 ${k.ring} ${k.color}`}>
                    <k.icon size={15} />
                    {i === 0 && <span className="absolute inset-0 animate-ping rounded-full border border-accent-3/60" />}
                  </span>

                  <Reveal y={16} className={left ? "md:col-start-1" : "md:col-start-2"}>
                    <motion.div whileHover={{ y: -4 }}>
                      <Body
                        {...(cert ? { onClick: () => setOpen(cert), "aria-label": `${m.title}: view certificate` } : {})}
                        className={`card group flex w-full items-start gap-4 p-4 text-left transition hover:border-white/20 sm:p-5 ${left ? "md:flex-row-reverse md:text-right" : ""}`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className={`flex flex-wrap items-center gap-2 ${left ? "md:justify-end" : ""}`}>
                            <span className="font-mono text-xs text-muted">{m.date}</span>
                            <span className={`text-[11px] ${k.color}`}>{k.label}</span>
                            {i === 0 && <span className="rounded-full bg-accent-3/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-3">New</span>}
                          </div>
                          <h3 className="mt-1 font-display font-bold leading-snug">{m.title}</h3>
                          <p className="mt-1 text-sm text-muted">{m.text}</p>
                        </div>
                        {cert && (
                          <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-white sm:block">
                            <Image src={`/certificates/${m.cert}.jpg`} alt="" fill sizes="96px" className="object-contain transition duration-500 group-hover:scale-110" />
                          </div>
                        )}
                      </Body>
                    </motion.div>
                  </Reveal>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {milestones.length > INITIAL && (
          <button onClick={() => setAll((v) => !v)} aria-expanded={all} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-medium transition hover:border-accent-2/60">
            {all ? "Show less" : `Show all ${milestones.length} milestones`} <ChevronDown size={16} className={`transition ${all ? "rotate-180" : ""}`} />
          </button>
        )}
        <Link href="/about" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-muted transition hover:text-ink">
          Experience & grades <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
      <AnimatePresence>{open && <CertModal cert={open} shared={false} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
