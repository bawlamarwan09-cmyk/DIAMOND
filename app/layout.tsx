import type { Metadata } from "next";
import { brandName, siteUrl } from "./site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lab-Grown Diamond Engagement Rings UAE | Lab Grant Diamond",
  description: "Explore Lab Grant Diamond's bridal collection in the UAE: lab-grown diamond engagement rings, wedding band inspiration and a guide to diamond cuts.",
  applicationName: brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: brandName,
    locale: "en_AE",
    url: "/",
    title: "Lab-Grown Diamond Engagement Rings UAE | Lab Grant Diamond",
    description: "Explore lab-grown diamond engagement rings, wedding band inspiration and the moments that make them yours.",
    images: [{ url: "/media/wedding-hero.webp", width: 1440, height: 810, alt: "A bride wearing her engagement ring beside her partner" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
