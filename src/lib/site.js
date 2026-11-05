import { profile, socials } from "@/data/profile";

// Live URL of the site. On Vercel this is filled in automatically; set NEXT_PUBLIC_SITE_URL
// if you add your own domain (e.g. https://vivekgarg.dev).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const siteName = `${profile.name} · Portfolio`;

// Next.js replaces (not merges) openGraph per page, so every page uses this to keep the preview image.
export const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} · MERN Stack Developer` };
export const og = (url) => ({ type: "profile", siteName, locale: "en_IN", url, images: [ogImage] });

export const defaultDescription =
  "Vivek Garg is a B.Tech CSE student at Geeta University, Panipat, a MERN stack developer with 950+ DSA problems solved on LeetCode and CodeChef, a Smart India Hackathon finalist and the founder of Dhagaro.";

export const keywords = [
  "Vivek Garg", "Vivek Garg portfolio", "VivekCoderz", "MERN stack developer", "full stack developer",
  "React developer", "Next.js developer", "Node.js", "DSA C++", "LeetCode", "CodeChef", "Codeforces", "Geeta University",
  "Panipat", "B.Tech CSE", "software engineering intern", "Dhagaro",
];

// schema.org Person: helps Google show a proper profile card for "Vivek Garg".
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  email: `mailto:${profile.email}`,
  jobTitle: "MERN Stack Developer",
  description: defaultDescription,
  address: { "@type": "PostalAddress", addressLocality: "Panipat", addressRegion: "Haryana", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Geeta University", address: "Panipat, Haryana, India" },
  founder: { "@type": "Organization", name: "Dhagaro", url: "https://dhagaro.vercel.app" },
  knowsAbout: ["JavaScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "C++", "Data Structures and Algorithms"],
  sameAs: socials.map((s) => s.url),
};
