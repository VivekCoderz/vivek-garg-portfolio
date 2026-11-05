"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, CornerDownLeft, FileText, Mail, Home, User, Code2, FolderGit2, Award, ExternalLink } from "lucide-react";
import { profile, socials } from "@/data/profile";

// Opens with Ctrl+K / ⌘K (or the navbar button, which dispatches "open-palette").
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);

  const actions = useMemo(
    () => [
      { group: "Pages", label: "Home", icon: Home, run: () => router.push("/") },
      { group: "Pages", label: "About · experience & grades", icon: User, run: () => router.push("/about") },
      { group: "Pages", label: "Coding profiles · live stats", icon: Code2, run: () => router.push("/coding-profiles") },
      { group: "Pages", label: "Projects", icon: FolderGit2, run: () => router.push("/projects") },
      { group: "Pages", label: "Certificates", icon: Award, run: () => router.push("/certificates") },
      { group: "Actions", label: "Open resume (PDF)", icon: FileText, run: () => window.open(profile.resumeUrl, "_blank", "noopener") },
      {
        group: "Actions",
        label: `Copy email · ${profile.email}`,
        icon: Mail,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setToast("Email copied ✓");
          } catch {
            window.location.href = `mailto:${profile.email}`;
          }
        },
        keepOpen: true,
      },
      ...socials.map((s) => ({ group: "Profiles", label: `${s.name} · ${s.handle}`, icon: ExternalLink, run: () => window.open(s.url, "_blank", "noopener") })),
    ],
    [router]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    // simple fuzzy match: every typed character appears in order
    return actions.filter((a) => {
      const l = a.label.toLowerCase();
      let i = 0;
      for (const ch of q) {
        i = l.indexOf(ch, i);
        if (i === -1) return false;
        i++;
      }
      return true;
    });
  }, [actions, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const choose = (a) => {
    if (!a) return;
    a.run();
    if (!a.keepOpen) close();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    }
  };

  let lastGroup = "";
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-lg overflow-hidden bg-[#0d0d14]/95 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={18} className="text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  className="h-14 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
                {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results for “{query}”</li>}
                {results.map((a, i) => {
                  const header = a.group !== lastGroup ? a.group : null;
                  lastGroup = a.group;
                  const Icon = a.icon;
                  return (
                    <li key={a.label}>
                      {header && <p className="px-3 pb-1 pt-2 text-[11px] uppercase tracking-wider text-muted">{header}</p>}
                      <button
                        role="option"
                        aria-selected={i === active}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => choose(a)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${i === active ? "bg-surface-2 text-ink" : "text-muted"}`}
                      >
                        <Icon size={16} />
                        <span className="flex-1">{a.label}</span>
                        {i === active && <CornerDownLeft size={14} className="text-muted" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex gap-4 border-t border-line px-4 py-2 text-[11px] text-muted">
                <span>↑↓ navigate</span>
                <span>↵ open</span>
                <span>Ctrl K toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
