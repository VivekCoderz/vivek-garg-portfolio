"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Reveal, SectionTitle } from "./ui";
import { profile, skills, projects, academics, certificates, socials } from "@/data/profile";

const PROMPT = "visitor@vivekgarg:~$";

// Interactive terminal: try `help`, Tab to autocomplete, ↑ ↓ for history.
export default function Terminal({ lc, cc, gh }) {
  const total = lc.solved + (cc?.solved ?? 0);

  const commands = {
    help: () => [
      "Available commands:",
      "  whoami      who is Vivek",
      "  skills      tech stack",
      "  projects    things I've built",
      "  stats       live coding stats",
      "  education   college & grades",
      "  achievements",
      "  contact     how to reach me",
      "  open <github|linkedin|leetcode|codechef|resume>",
      "  clear",
    ],
    whoami: () => [`${profile.name}: ${profile.roles.join(" · ")}`, profile.tagline],
    skills: () => skills.map((g) => `${g.group.padEnd(10)} ${g.items.join(", ")}`),
    projects: () => projects.map((p) => `▸ ${p.title.padEnd(22)} ${p.tech.slice(0, 3).join(", ")}`).concat("", "Type `open github` to see the code."),
    stats: () => [
      `DSA problems solved  ${total}+`,
      `  LeetCode           ${lc.solved} (E ${lc.easy} · M ${lc.medium} · H ${lc.hard}), contest rating ${lc.rating ?? "–"}`,
      `  CodeChef           ${cc?.solved ?? "–"} solved, rating ${cc?.rating ?? "–"}`,
      `GitHub               ${gh.repos} repos · ${gh.stars} stars`,
    ],
    education: () => [
      "B.Tech CSE, Geeta University (2024–2028)",
      `CGPA ${academics.cgpa}  |  ` + academics.semesters.map((s) => `${s.sem}: ${s.sgpa}`).join("  "),
    ],
    achievements: () => certificates.filter((c) => c.highlight).map((c) => `🏆 ${c.title}`),
    contact: () => [`email     ${profile.email}`, `phone     ${profile.phone}`, ...socials.map((s) => `${s.name.toLowerCase().padEnd(9)} ${s.url}`)],
    "sudo hire-me": () => ["[sudo] password for recruiter: ********", "Access granted ✓  Opening Gmail in a new tab…"],
  };

  // Gmail / Outlook web compose links work even when no email app is installed (mailto often does nothing on Windows).
  const subject = encodeURIComponent("Internship opportunity");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${profile.email}&subject=${subject}`;

  const [lines, setLines] = useState(() => [
    { type: "in", text: "whoami" },
    ...commands.whoami().map((text) => ({ type: "out", text })),
    { type: "out", text: "" },
    { type: "hint", text: "👆 That was a demo. Click a command button below, or type one here and press Enter." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const out = [{ type: "in", text: raw }];
    if (!cmd) return setLines((l) => [...l, ...out]);
    if (cmd === "clear") return setLines([]);

    if (cmd.startsWith("open ")) {
      const what = cmd.slice(5).trim();
      const s = socials.find((x) => x.name.toLowerCase() === what);
      const url = what === "resume" ? profile.resumeUrl : s?.url;
      if (url) {
        window.open(url, "_blank", "noopener");
        out.push({ type: "out", text: `Opening ${what}…` });
      } else out.push({ type: "err", text: `open: unknown target "${what}". Try github, linkedin, leetcode, codechef, resume` });
    } else if (commands[cmd]) {
      const res = commands[cmd]();
      res.forEach((t) => out.push({ type: "out", text: t }));
      if (cmd === "sudo hire-me") {
        // "noopener" in the features string makes window.open return null, so detach the opener manually instead.
        const tab = window.open(gmailUrl, "_blank");
        if (tab) tab.opener = null;
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        out.push({ type: "out", text: `${tab ? "Gmail opened ✓" : "Pop-up blocked."} Email also copied: ${profile.email}` });
        out.push({ type: "link", text: "Open in Gmail", href: gmailUrl });
        out.push({ type: "link", text: "Open in Outlook", href: outlookUrl });
      }
    } else {
      out.push({ type: "err", text: `command not found: ${cmd}. Type \`help\`.` });
    }
    setLines((l) => [...l, ...out]);
    setHistory((h) => [raw, ...h].slice(0, 30));
    setHIndex(-1);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const opts = [...Object.keys(commands), "open github", "open linkedin", "open leetcode", "open codechef", "open resume", "clear"];
      const m = opts.find((o) => o.startsWith(input.toLowerCase()) && o !== input.toLowerCase());
      if (m) setInput(m);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const quick = [
    { cmd: "whoami", label: "👤 whoami" },
    { cmd: "stats", label: "📊 stats" },
    { cmd: "skills", label: "🛠 skills" },
    { cmd: "projects", label: "🚀 projects" },
    { cmd: "education", label: "🎓 education" },
    { cmd: "achievements", label: "🏆 achievements" },
    { cmd: "contact", label: "✉️ contact" },
    { cmd: "sudo hire-me", label: "😎 sudo hire-me" },
    { cmd: "clear", label: "🧹 clear" },
  ];

  // Focus the input without making the whole page jump to it.
  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6" aria-labelledby="terminal-title">
      <SectionTitle
        kicker="// try it"
        title={<span id="terminal-title">Talk to my terminal</span>}
        sub="A tiny command line with live data about me. No typing needed: just click a button."
      />
      <Reveal>
        <div className="card overflow-hidden font-mono text-sm">
          <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted">vivek@portfolio: ~</span>
          </div>

          <div className="border-b border-line px-4 py-3">
            <p className="mb-2 font-sans text-xs text-muted">👇 Click any command to run it:</p>
            <div className="flex flex-wrap gap-2">
              {quick.map((q) => (
                <button
                  key={q.cmd}
                  onClick={() => run(q.cmd)}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-ink transition hover:-translate-y-0.5 hover:border-accent-2/60 hover:bg-surface-2"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={bodyRef} className="max-h-80 min-h-48 overflow-y-auto p-4 leading-relaxed" aria-live="polite">
            {lines.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }} className="whitespace-pre-wrap break-words">
                {l.type === "in" ? (
                  <span><span className="text-accent-2">{PROMPT}</span> {l.text}</span>
                ) : l.type === "link" ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent-2 underline underline-offset-2 hover:text-ink">
                    → {l.text}
                  </a>
                ) : l.type === "hint" ? (
                  <span className="font-sans text-xs text-accent-3">{l.text}</span>
                ) : (
                  <span className={l.type === "err" ? "text-hard" : "text-ink/85"}>{l.text || "\u00a0"}</span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-line bg-surface px-4 py-3" onClick={focusInput}>
            <span className="hidden shrink-0 text-accent-2 sm:inline">{PROMPT}</span>
            <span className="shrink-0 text-accent-2 sm:hidden">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder='type "help" and press Enter'
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-ink caret-accent-2 outline-none placeholder:text-muted/60"
            />
            <button
              onClick={() => {
                run(input);
                setInput("");
              }}
              className="shrink-0 rounded-md bg-ink px-3 py-1 font-sans text-xs font-medium text-bg hover:bg-accent-2"
            >
              Run ↵
            </button>
          </div>
          <p className="border-t border-line px-4 py-2 font-sans text-[11px] text-muted">
            Tip: <b>Tab</b> completes a command, <b>↑ ↓</b> shows previous ones, <code>open github</code> opens my profiles.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
