import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import Spotlight from "@/components/Spotlight";
import { siteUrl, siteName, defaultDescription, keywords, personJsonLd } from "@/lib/site";
import { profile } from "@/data/profile";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "700"] });

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · MERN Stack Developer & Founder of Dhagaro`,
    template: `%s · ${profile.name}`,
  },
  description: defaultDescription,
  keywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName,
    locale: "en_IN",
    url: "/",
    title: `${profile.name} · MERN Stack Developer`,
    description: defaultDescription,
    firstName: "Vivek",
    lastName: "Garg",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} · MERN Stack Developer`, description: defaultDescription },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  // Google Search Console ownership check
  verification: { google: "kK9KWgRWXhcgXc02k11adf6jCEh_VHO_zevX7lVgoyo" },
};

export const viewport = { themeColor: "#07070c", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <Providers>
          <Spotlight />
          <CommandPalette />
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
