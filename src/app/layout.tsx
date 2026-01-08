import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://connorcolyer.com"),
  title: `${site.name} — Portfolio`,
  description: site.tagline,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${site.name} — Portfolio`,
    description: site.tagline,
    url: "https://connorcolyer.com",
    siteName: site.name,
    images: [
      {
        url: "/opengraph.svg",
        width: 1200,
        height: 630,
        alt: `${site.name} portfolio preview`
      }
    ],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portfolio`,
    description: site.tagline,
    images: ["/opengraph.svg"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Analytics placeholder: add Plausible or Vercel Analytics script here. */}
        <Nav />
        <main id="main-content" className="bg-hero-glow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
