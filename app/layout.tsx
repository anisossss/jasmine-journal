import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import { formatDateline } from "@/lib/format";
import JasmineMark from "@/components/JasmineMark";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jasmine Journal — Quiet, considered news from Tunisia",
    template: "%s — Jasmine Journal",
  },
  description:
    "An airy English-language journal of Tunisian news and ideas — politics, economy, culture and the Maghreb, told with white space and one green thread.",
  openGraph: {
    siteName: "Jasmine Journal",
    type: "website",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-paper font-body text-charcoal antialiased">
        {adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        <header className="border-b border-hairline">
          <div className="border-b border-hairline">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-charcoal/45">
              <span>{formatDateline()}</span>
              <span className="hidden sm:inline">Tunis · Tunisia</span>
              <a href="/feed.xml" className="hover-underline text-jasmine">
                RSS
              </a>
            </div>
          </div>

          <div className="px-6 pb-10 pt-14 text-center">
            <Link href="/" className="group inline-block">
              <JasmineMark className="mx-auto mb-5 h-6 w-6 text-jasmine transition-transform duration-700 ease-out group-hover:rotate-[72deg]" />
              <span className="block font-display text-5xl font-light tracking-[0.03em] text-charcoal sm:text-6xl">
                Jasmine Journal
              </span>
            </Link>
            <p className="micro-label mt-5">Quiet, considered news from Tunisia</p>
          </div>

          <nav aria-label="Sections">
            <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-hairline px-6 py-4">
              <li>
                <Link
                  href="/"
                  className="hover-underline text-[11px] font-bold uppercase tracking-[0.22em] text-charcoal/70 transition-colors hover:text-jasmine"
                >
                  Home
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${encodeURIComponent(category)}`}
                    className="hover-underline text-[11px] font-bold uppercase tracking-[0.22em] text-charcoal/70 transition-colors hover:text-jasmine"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-32 border-t border-hairline">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <JasmineMark className="mx-auto h-4 w-4 text-jasmine" />
            <p className="mt-5 font-display text-2xl font-light text-charcoal">
              Jasmine Journal
            </p>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-charcoal/40">
              White space and one green thread
            </p>
            <div className="mt-9 flex items-center justify-center gap-10">
              <Link
                href="/"
                className="hover-underline text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/60 hover:text-jasmine"
              >
                Home
              </Link>
              <a
                href="/feed.xml"
                className="hover-underline text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/60 hover:text-jasmine"
              >
                RSS feed
              </a>
              <a
                href="/sitemap.xml"
                className="hover-underline text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/60 hover:text-jasmine"
              >
                Sitemap
              </a>
            </div>
            <p className="mt-12 text-xs text-charcoal/40">
              © {new Date().getFullYear()} Jasmine Journal, Tunis. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
