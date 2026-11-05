import Link from "next/link";
import { profile, socials } from "@/data/profile";
import { navLinks } from "@/data/nav";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg font-bold">{profile.name}</p>
          <p className="text-sm text-muted">MERN Stack Developer · {profile.location}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-ink">{label}</Link>
          ))}
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer me" className="hover:text-ink">{s.name}</a>
          ))}
        </nav>
      </div>
      <p className="pb-8 text-center text-xs text-muted">© {profile.name} · Built with Next.js &amp; Motion</p>
    </footer>
  );
}
