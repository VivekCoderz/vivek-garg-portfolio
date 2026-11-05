"use client";
import { motion } from "motion/react";
import { ArrowUpRight, Flame, Trophy, Star, Users, FolderGit2, CalendarDays } from "lucide-react";
import { Counter, Reveal, SectionTitle } from "./ui";
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, CodeChefIcon, CodeforcesIcon } from "./Icons";
import { socials, academics, usernames } from "@/data/profile";

const url = (n) => socials.find((s) => s.name === n)?.url;

/* ── top strip of big animated numbers ─────────────────────────── */
export function StatsStrip({ lc, gh, cc, cf }) {
  const stats = [
    { value: lc.solved + (cc?.solved ?? 0) + (cf?.solved ?? 0), label: "DSA problems solved", suffix: "+" },
    { value: lc.rating ?? 0, label: "LeetCode contest rating" },
    { value: gh.repos, label: "GitHub repositories" },
    { value: academics.cgpa, label: "CGPA (B.Tech CSE)", decimals: 2 },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="card grid grid-cols-2 divide-line overflow-hidden md:grid-cols-4 md:divide-x">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="p-6 text-center">
            <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} className="font-display text-3xl font-bold sm:text-4xl" />
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── LeetCode ───────────────────────────────────────────────────── */
function Donut({ lc }) {
  const r = 70;
  const C = 2 * Math.PI * r;
  const parts = [
    { v: lc.easy, color: "var(--easy)" },
    { v: lc.medium, color: "var(--medium)" },
    { v: lc.hard, color: "var(--hard)" },
  ];
  let offset = 0;
  return (
    <div className="relative size-44 shrink-0">
      <svg viewBox="0 0 180 180" className="size-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="12" />
        {parts.map((p, i) => {
          const len = (p.v / lc.solved) * C;
          const el = (
            <motion.circle
              key={i}
              cx="90" cy="90" r={r} fill="none" stroke={p.color} strokeWidth="12" strokeLinecap="round"
              strokeDashoffset={-offset}
              initial={{ strokeDasharray: `0 ${C}` }}
              whileInView={{ strokeDasharray: `${Math.max(len - 6, 1)} ${C}` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.25, ease: "easeOut" }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <Counter to={lc.solved} className="font-display text-4xl font-bold" />
        <span className="text-xs text-muted">of {lc.totals.all.toLocaleString("en-IN")} solved</span>
      </div>
    </div>
  );
}

function DiffBar({ label, v, total, color, delay }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span style={{ color }}>{label}</span>
        <span className="tabular-nums text-muted">
          <span className="text-ink">{v}</span> / {total}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max((v / total) * 100, 2)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function Heatmap({ calendar, asOf }) {
  // last 26 weeks, columns = weeks, rows = Sun..Sat (UTC days, like LeetCode)
  const DAY = 86400;
  const now = asOf;
  const today = now - (now % DAY);
  const todayDow = new Date(today * 1000).getUTCDay();
  const start = today - (25 * 7 + todayDow) * DAY;
  const weeks = [];
  let max = 1;
  Object.values(calendar).forEach((v) => (max = Math.max(max, v)));
  for (let w = 0; w < 26; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const ts = start + (w * 7 + d) * DAY;
      col.push(ts > today ? null : { ts, n: calendar[ts] || 0 });
    }
    weeks.push(col);
  }
  const level = (n) => (n === 0 ? 0 : Math.ceil((n / max) * 4));
  const shades = ["var(--surface-2)", "#134e4a", "#0f766e", "#14b8a6", "#5eead4"];
  const subs = Object.entries(calendar).filter(([ts]) => Number(ts) >= start).reduce((s, [, v]) => s + v, 0);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /> Last 6 months</span>
        <span><span className="text-ink">{subs}</span> submissions</span>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((col, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {col.map((c, d) =>
              c ? (
                <motion.div
                  key={d}
                  title={`${new Date(c.ts * 1000).toDateString()}: ${c.n} submission${c.n === 1 ? "" : "s"}`}
                  className="size-[11px] rounded-[3px]"
                  style={{ background: shades[level(c.n)] }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: w * 0.02 }}
                />
              ) : (
                <div key={d} className="size-[11px]" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LeetCodeCard({ lc }) {
  return (
    <Reveal className="card relative overflow-hidden p-6 lg:col-span-2">
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-medium/10 blur-3xl" />
      <CardHead icon={<LeetCodeIcon className="text-medium" />} name="LeetCode" handle="Vivek_Garg2005" href={url("LeetCode")} live={lc.live} />

      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row">
        <Donut lc={lc} />
        <div className="w-full space-y-4">
          <DiffBar label="Easy" v={lc.easy} total={lc.totals.easy} color="var(--easy)" delay={0.2} />
          <DiffBar label="Medium" v={lc.medium} total={lc.totals.medium} color="var(--medium)" delay={0.4} />
          <DiffBar label="Hard" v={lc.hard} total={lc.totals.hard} color="var(--hard)" delay={0.6} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Mini icon={<Trophy size={15} />} label="Contest rating" value={lc.rating ?? "–"} />
        <Mini icon={<Users size={15} />} label="Contests" value={lc.contests} />
        <Mini icon={<Star size={15} />} label="Global rank" value={`#${lc.ranking.toLocaleString("en-IN")}`} />
        <Mini icon={<Flame size={15} />} label="Active days" value={lc.activeDays} />
      </div>

      <div className="mt-6">
        <Heatmap calendar={lc.calendar} asOf={lc.asOf} />
      </div>
    </Reveal>
  );
}

/* ── GitHub ─────────────────────────────────────────────────────── */
const langColor = { JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c", "C++": "#f34b7d", TypeScript: "#3178c6", Python: "#3572A5" };

function GitHubCard({ gh }) {
  const total = gh.languages.reduce((s, l) => s + l.count, 0) || 1;
  return (
    <Reveal delay={0.1} className="card relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -left-16 -top-16 size-52 rounded-full bg-accent/10 blur-3xl" />
      <CardHead icon={<GitHubIcon />} name="GitHub" handle="VivekCoderz" href={url("GitHub")} live={gh.live} />

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Mini icon={<FolderGit2 size={15} />} label="Repos" value={<Counter to={gh.repos} />} />
        <Mini icon={<Star size={15} />} label="Stars" value={<Counter to={gh.stars} />} />
        <Mini icon={<Users size={15} />} label="Followers" value={<Counter to={gh.followers} />} />
      </div>

      <p className="mt-6 text-sm text-muted">Top languages</p>
      <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-surface-2">
        {gh.languages.map((l, i) => (
          <motion.div
            key={l.name}
            style={{ background: langColor[l.name] || "#8b8b9e" }}
            initial={{ width: 0 }}
            whileInView={{ width: `${(l.count / total) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.12 }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {gh.languages.map((l) => (
          <li key={l.name} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: langColor[l.name] || "#8b8b9e" }} />
            {l.name} <span className="text-ink">{Math.round((l.count / total) * 100)}%</span>
          </li>
        ))}
      </ul>

      {gh.recent.length > 0 && (
        <>
          <p className="mt-6 text-sm text-muted">Recently pushed</p>
          <ul className="mt-2 space-y-1.5">
            {gh.recent.map((r) => (
              <li key={r.name}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-surface-2">
                  <span className="truncate font-mono">{r.name}</span>
                  <ArrowUpRight size={14} className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </Reveal>
  );
}

/* ── CodeChef ───────────────────────────────────────────────────── */
function CodeChefCard({ cc }) {
  const pct = Math.min((cc.rating / 1400) * 100, 100); // 1400 = 2-star on CodeChef
  return (
    <Reveal delay={0.12} className="card relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -bottom-16 -right-16 size-52 rounded-full bg-[#b07c4f]/15 blur-3xl" />
      <CardHead icon={<CodeChefIcon className="text-[#c99a6b]" />} name="CodeChef" handle={usernames.codechef} href={url("CodeChef")} live={cc.live} />

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-muted">Rating{cc.provisional ? " (provisional)" : ""}</p>
          <Counter to={cc.rating} className="font-display text-5xl font-bold" />
        </div>
        {cc.division && <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{cc.division}</span>}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#8b5a2b] to-[#e0b07a]"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>
      <p className="mt-1.5 text-right text-[11px] text-muted">{Math.max(1400 - cc.rating, 0)} points to 2★</p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Mini icon={<Star size={15} />} label="Solved" value={<Counter to={cc.solved} />} />
        <Mini icon={<Trophy size={15} />} label="Highest" value={cc.highest} />
        <Mini icon={<Users size={15} />} label="Contests" value={cc.contests} />
      </div>
    </Reveal>
  );
}

/* ── Codeforces ─────────────────────────────────────────────────── */
function CodeforcesCard({ cf }) {
  const fresh = cf.solved === 0 && cf.contests === 0;
  return (
    <Reveal delay={0.14} className="card relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -left-16 -bottom-16 size-52 rounded-full bg-blue-500/10 blur-3xl" />
      <CardHead icon={<CodeforcesIcon />} name="Codeforces" handle={usernames.codeforces} href={url("Codeforces")} live={cf.live} />

      {fresh ? (
        <div className="mt-6 rounded-xl border border-dashed border-line p-5 text-center">
          <p className="font-display text-lg font-bold">Just getting started 🚀</p>
          <p className="mt-1 text-sm text-muted">Competitive programming on Codeforces is my next goal. This card updates by itself as I solve.</p>
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs capitalize text-muted">{cf.rank ?? "unrated"}</p>
              <p className="font-display text-5xl font-bold">{cf.rating ? <Counter to={cf.rating} /> : "–"}</p>
            </div>
            {cf.maxRating && <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">max {cf.maxRating}</span>}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Mini icon={<Star size={15} />} label="Solved" value={<Counter to={cf.solved} />} />
            <Mini icon={<Users size={15} />} label="Contests" value={cf.contests} />
          </div>
        </>
      )}
    </Reveal>
  );
}

/* ── LinkedIn (no public API, so it's a link card) ──────────────── */
function LinkedInCard() {
  return (
    <Reveal delay={0.15} className="card group relative overflow-hidden p-6">
      <div className="flex h-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-start">
        <div className="flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-xl bg-[#0a66c2]/15 text-[#4f9be8]">
            <LinkedInIcon width={22} height={22} />
          </div>
          <div>
            <p className="font-display text-lg font-bold">Let&apos;s connect on LinkedIn</p>
            <p className="text-sm text-muted">Projects, hackathons and the Dhagaro startup journey, shared as I go.</p>
          </div>
        </div>
        <a href={url("LinkedIn")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110">
          linkedin.com/in/-vivek-garg <ArrowUpRight size={15} />
        </a>
      </div>
    </Reveal>
  );
}

/* ── shared bits ────────────────────────────────────────────────── */
function CardHead({ icon, name, handle, href, live }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-surface-2">{icon}</div>
        <div>
          <p className="font-display font-bold">{name}</p>
          <p className="font-mono text-xs text-muted">@{handle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {live && (
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300 sm:inline-flex">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> live
          </span>
        )}
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}`} className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-ink">
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}

function Mini({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[11px] text-muted">{icon} {label}</p>
      <p className="mt-0.5 font-display text-lg font-bold tabular-nums">{value}</p>
    </div>
  );
}

export default function Profiles({ lc, gh, cc, cf, withTitle = true }) {
  return (
    <section id="profiles" className={`mx-auto max-w-6xl px-4 sm:px-6 ${withTitle ? "py-24" : "pb-24 pt-2"}`}>
      {withTitle && <SectionTitle kicker="// coding profiles" title="The numbers, live" sub="Pulled straight from LeetCode, CodeChef, Codeforces and GitHub and refreshed every hour." />}
      <div className="grid gap-5 lg:grid-cols-3">
        <LeetCodeCard lc={lc} />
        <GitHubCard gh={gh} />
        <CodeChefCard cc={cc} />
        <CodeforcesCard cf={cf} />
        <LinkedInCard />
      </div>
    </section>
  );
}
