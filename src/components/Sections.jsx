"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight, Briefcase, GraduationCap, MapPin, Trophy, X, Mail, Phone, Copy, Check } from "lucide-react";
import { Reveal, SectionTitle, Counter } from "./ui";
import { GitHubIcon, iconFor } from "./Icons";
import { timeline, skills, projects, certificates, profile, socials, academics } from "@/data/profile";

/* ── Journey timeline: the line draws itself as you scroll ──────── */
export function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionTitle kicker="// journey" title="Experience & education" />
      <div ref={ref} className="relative pl-10 sm:pl-14">
        <div className="absolute left-4 top-0 h-full w-px bg-line sm:left-6" />
        <motion.div style={{ scaleY }} className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-6" />

        <div className="space-y-8">
          {timeline.map((t, i) => {
            const Icon = t.type === "work" ? Briefcase : GraduationCap;
            return (
              <Reveal key={i} delay={0.05} className="relative">
                <div className={`absolute -left-10 top-5 grid size-8 place-items-center rounded-full border border-line bg-bg sm:-left-[3.25rem] ${t.type === "work" ? "text-accent-2" : "text-accent-3"}`}>
                  <Icon size={15} />
                </div>
                <div className="card p-5 transition hover:border-white/20 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold">{t.title}</h3>
                      <p className="text-accent-2">{t.org}</p>
                    </div>
                    <div className="text-right text-sm text-muted">
                      <p className="font-mono">{t.period}</p>
                      <p className="inline-flex items-center gap-1"><MapPin size={12} /> {t.place}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {t.points.map((p, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Skills: infinite marquee + grouped chips ───────────────────── */
export function Skills() {
  const all = skills.flatMap((s) => s.items);
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle kicker="// stack" title="Tools I build with" />
      </div>

      <div className="marquee-wrap relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee flex w-max gap-3">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2 font-mono text-sm text-muted" aria-hidden={i >= all.length}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.08} className="card p-5">
            <p className="font-mono text-sm text-accent-2">{g.group}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <motion.span key={s} whileHover={{ y: -3, scale: 1.05 }} className="cursor-default rounded-lg bg-surface-2 px-2.5 py-1 text-sm">
                  {s}
                </motion.span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Projects: cards tilt toward the cursor ─────────────────────── */
function TiltCard({ p, i }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    setGlow({ x: px * 100, y: py * 100 });
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <Reveal delay={(i % 3) * 0.08} className={p.featured ? "md:col-span-2 lg:col-span-1" : ""}>
      <motion.article
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        className="card group relative flex h-full flex-col overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.07), transparent 40%)` }}
        />
        <div className={`relative h-28 bg-gradient-to-br ${p.accent} p-5`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_-20%,rgba(255,255,255,.35),transparent_60%)]" />
          <span className="relative font-display text-2xl font-bold text-white drop-shadow">{p.title}</span>
          {p.featured && <span className="absolute right-4 top-4 rounded-full bg-black/30 px-2 py-0.5 text-xs text-white backdrop-blur">Featured</span>}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-bg transition hover:bg-accent-2">
                Live <ArrowUpRight size={14} />
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-1.5 text-sm transition hover:border-white/30">
                <GitHubIcon width={14} height={14} /> Code
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Projects({ preview = false, withTitle = true }) {
  const items = preview ? projects.slice(0, 3) : projects;
  return (
    <section id="projects" className={`mx-auto max-w-6xl px-4 sm:px-6 ${withTitle ? "py-24" : "pb-24 pt-2"}`}>
      {withTitle && <SectionTitle kicker="// projects" title={preview ? "Featured projects" : "Things I've built"} sub="From my own startup's store to campus tools. Most of them are live, so try them." />}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => <TiltCard key={p.title} p={p} i={i} />)}
      </div>
      {preview && <MoreLink href="/projects">All {projects.length} projects</MoreLink>}
    </section>
  );
}

function MoreLink({ href, children }) {
  return (
    <Reveal className="mt-10 flex justify-center">
      <Link href={href} className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-medium transition hover:border-accent-2/60">
        {children} <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}

/* ── Certificates: filter tabs + click to open full size ─────── */
const CATS = ["All", "Hackathon", "Internship", "Industry", "Certification", "Leadership"];
const catStyle = {
  Hackathon: "bg-accent-3/15 text-accent-3",
  Internship: "bg-emerald-400/15 text-emerald-300",
  Industry: "bg-accent-2/15 text-accent-2",
  Certification: "bg-accent/15 text-accent",
  Leadership: "bg-pink-400/15 text-pink-300",
};

function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <motion.div
        layoutId={`cert-${cert.img}`}
        className="card relative max-h-[90vh] w-full max-w-4xl overflow-auto p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={`/certificates/${cert.img}.jpg`} alt={cert.title} width={1400} height={990} className="h-auto w-full rounded-xl" />
        <div className="flex flex-wrap items-center justify-between gap-3 p-3">
          <div>
            <p className="font-display font-bold">{cert.title}</p>
            <p className="text-sm text-muted">{cert.issuer} · {cert.date}</p>
          </div>
          <div className="flex gap-2">
            {cert.verify && (
              <a href={cert.verify} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-bg hover:bg-accent-2">
                Verify <ArrowUpRight size={14} />
              </a>
            )}
            <button onClick={onClose} className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-1.5 text-sm hover:border-white/30">
              <X size={14} /> Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Certificates({ preview = false, withTitle = true }) {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const list = preview
    ? certificates.filter((c) => c.highlight).slice(0, 6)
    : cat === "All" ? certificates : certificates.filter((c) => c.category === cat);
  const count = (c) => (c === "All" ? certificates.length : certificates.filter((x) => x.category === c).length);

  return (
    <section id="certificates" className={`mx-auto max-w-6xl px-4 sm:px-6 ${withTitle ? "py-24" : "pb-24 pt-2"}`}>
      {withTitle && (
        <SectionTitle
          kicker="// certificates"
          title={preview ? "Highlights" : "Hackathons, internships & certifications"}
          sub={preview ? "Hackathon wins, internships and industry job simulations." : `${certificates.length} certificates. Click any one to see it full size.`}
        />
      )}

      {!preview && <Reveal className="mb-8 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`relative rounded-full px-4 py-1.5 text-sm transition ${cat === c ? "text-bg" : "border border-line text-muted hover:text-ink"}`}
          >
            {cat === c && <motion.span layoutId="cert-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative">{c} <span className="opacity-60">{count(c)}</span></span>
          </button>
        ))}
      </Reveal>}

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.button
              layout
              key={c.img}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -6 }}
              onClick={() => setOpen(c)}
              className="card group overflow-hidden text-left"
            >
              <motion.div layoutId={`cert-${c.img}`} className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={`/certificates/${c.img}.jpg`}
                  alt={c.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-contain transition duration-500 group-hover:scale-105"
                />
                {c.highlight && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-medium text-accent-3 backdrop-blur">
                    <Trophy size={11} /> Highlight
                  </span>
                )}
              </motion.div>
              <div className="p-4">
                <span className={`rounded-md px-2 py-0.5 font-mono text-[11px] ${catStyle[c.category]}`}>{c.category}</span>
                <h3 className="mt-2 font-medium leading-snug">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.issuer} · {c.date}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {preview && <MoreLink href="/certificates">All {certificates.length} certificates</MoreLink>}
      <AnimatePresence>{open && <CertModal cert={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ── Contact ────────────────────────────────────────────────────── */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
      <Reveal>
        <p className="font-mono text-sm text-accent-2">{"// contact"}</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          Let&apos;s build <span className="text-gradient">something</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          I&apos;m looking for SDE internships and I&apos;m happy to talk about projects. Email gets the fastest reply.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-medium text-bg transition hover:shadow-[0_0_40px_-6px_var(--accent-2)]">
          <Mail size={17} /> {profile.email}
        </a>
        <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm transition hover:border-white/30" aria-label="Copy email">
          {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
        </button>
        <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm transition hover:border-white/30">
          <Phone size={16} /> {profile.phone}
        </a>
      </Reveal>

      <Reveal delay={0.2} className="mt-8 flex justify-center gap-3">
        {socials.map((s) => {
          const Icon = iconFor[s.name];
          return (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-12 place-items-center rounded-full border border-line bg-surface text-muted transition hover:-translate-y-1 hover:text-ink">
              <Icon />
            </a>
          );
        })}
      </Reveal>

    </section>
  );
}

/* ── Academics: latest SGPA gauge + subject grades ──────────────── */
const gradeStyle = { "A+": "bg-emerald-400/15 text-emerald-300", A: "bg-accent-2/15 text-accent-2", "B+": "bg-accent-3/15 text-accent-3", B: "bg-surface-2 text-muted", "C+": "bg-surface-2 text-muted" };
const gradeRank = { "A+": 0, A: 1, "B+": 2, B: 3, "C+": 4, C: 5 };

export function Academics() {
  const { latest } = academics;
  const [semName, setSemName] = useState(latest.sem);
  const sem = academics.semesters.find((x) => x.sem === semName) ?? latest;
  // strongest subjects first
  const subjects = [...sem.subjects].sort((a, b) => gradeRank[a.grade] - gradeRank[b.grade]);
  const topCount = sem.subjects.filter((x) => x.grade === "A+").length;
  const r = 52;
  const C = 2 * Math.PI * r;
  return (
    <section id="academics" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionTitle kicker="// academics" title="Grades" sub="B.Tech CSE, Geeta University (2024–2028). Pick a semester to see every subject and grade." />
      <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
        <Reveal className="card flex flex-col items-center justify-center p-8 text-center">
          <div className="relative size-40">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r={r} fill="none" stroke="url(#sgpa)" strokeWidth="10" strokeLinecap="round"
                initial={{ strokeDasharray: `0 ${C}` }}
                whileInView={{ strokeDasharray: `${(academics.cgpa / 10) * C} ${C}` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="sgpa" x1="0" x2="1">
                  <stop offset="0" stopColor="var(--accent)" />
                  <stop offset="1" stopColor="var(--accent-2)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-content-center">
              <Counter to={academics.cgpa} decimals={2} className="font-display text-4xl font-bold" />
              <span className="text-xs text-muted">out of 10</span>
            </div>
          </div>
          <p className="mt-4 font-display text-lg font-bold">CGPA</p>
          <p className="text-sm text-muted">{academics.semesters.length} semesters · {academics.semesters.reduce((s, x) => s + x.credits, 0)} credits earned</p>

          <div className="mt-8 flex h-36 w-full items-end justify-center gap-4" role="img" aria-label="SGPA by semester">
            {academics.semesters.map((s, i) => {
              const best = s.sgpa === Math.max(...academics.semesters.map((x) => x.sgpa));
              return (
                <div key={s.sem} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <span className={`font-mono text-xs ${best ? "text-accent-2" : "text-muted"}`}>{s.sgpa.toFixed(2)}</span>
                  <motion.div
                    title={`${s.sem} (${s.exam}): SGPA ${s.sgpa}`}
                    className={`w-full max-w-10 rounded-t-md ${best ? "bg-gradient-to-t from-accent to-accent-2" : "bg-surface-2"}`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${((s.sgpa - 6) / 4) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                  />
                  <span className="text-[11px] text-muted">{s.sem}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Semester">
              {academics.semesters.map((x) => (
                <button
                  key={x.sem}
                  role="tab"
                  aria-selected={x.sem === sem.sem}
                  onClick={() => setSemName(x.sem)}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition ${x.sem === sem.sem ? "text-bg" : "border border-line text-muted hover:text-ink"}`}
                >
                  {x.sem === sem.sem && <motion.span layoutId="sem-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className="relative">{x.sem}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted">
              SGPA <span className="font-mono font-bold text-ink">{sem.sgpa.toFixed(2)}</span> · {sem.exam} · {topCount} × A+
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={sem.sem}
              role="tabpanel"
              aria-label={`${sem.sem} subjects`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-5 grid gap-2 sm:grid-cols-2"
            >
              {subjects.map((s, i) => (
                <motion.li
                  key={s.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3"
                >
                  <span className="text-sm">
                    {s.name}
                    <span className="ml-1.5 text-[11px] text-muted">{s.credits} cr</span>
                  </span>
                  <span className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-sm font-bold ${gradeStyle[s.grade] || ""}`}>{s.grade}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
