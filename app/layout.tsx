import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { company, hero, ui } from "@/content/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UtilityBar } from "@/components/layout/UtilityBar";
import "./globals.css";

const barlow = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

// Per-page titles and Open Graph come in Phase 5.
export const metadata: Metadata = {
  title: { default: company.name, template: `%s | ${company.shortName}` },
  description: hero.body,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${barlow.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-ground font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only z-50 bg-accent px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          {ui.skipToContent}
        </a>
        <UtilityBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
