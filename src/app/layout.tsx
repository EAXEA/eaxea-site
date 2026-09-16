import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/motion/Cursor";

// latin-ext covers Turkish glyphs (ş ğ İ ı) — without it those chars fall back
// to a system font, breaking headings on a Turkish (lang="tr") site.
const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-src",
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono-src",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "creative developer",
    "web design",
    "full-stack",
    "hızlı MVP",
    "Next.js",
    "motion design",
    "portfolio",
    site.founder,
  ],
  authors: [{ name: site.founder }],
  creator: site.founder,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${sans.variable} ${mono.variable} grain`}
    >
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[80] rounded-full bg-fg px-5 py-3 text-bg focus:not-sr-only">İçeriğe geç</a>
        <SmoothScroll>
          <Cursor />
          <Nav />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
