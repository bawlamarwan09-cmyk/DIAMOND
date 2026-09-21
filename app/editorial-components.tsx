import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { siteUrl } from "./site-config";

const navigation = [
  ["Engagement rings", "/engagement-rings"],
  ["Collections", "/collections"],
  ["Journal", "/blog"],
  ["Wedding bands", "/wedding-bands"],
  ["Bridal guide", "/bridal-guide"],
  ["The wedding day", "/wedding-day"],
  ["Diamond guide", "/diamond-guide"],
  ["Our craft", "/our-craft"],
  ["Bespoke", "/bespoke"],
  ["About", "/about"],
  ["Ring care", "/ring-care"],
] as const;

function SiteLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} prefetch={false} />;
}

export function EditorialBreadcrumb({ name, path }: { name: string; path: string }) {
  const data = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function EditorialShell({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  return <div className={`editorial-site ${variant}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="editorial-header"><div className="wrap editorial-header-inner">
      <SiteLink className="wordmark" href="/" aria-label="Lab Grant Diamond home"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></SiteLink>
      <nav className="editorial-desktop-nav" aria-label="Main navigation"><a href="/engagement-rings">Engagement rings</a><a href="/wedding-bands">Wedding bands</a><a href="/wedding-day">Wedding day</a><a href="/diamond-guide">Diamond guide</a><a href="/our-craft">Our craft</a><a href="/bespoke">Bespoke</a><SiteLink href="/blog">Journal</SiteLink></nav>
      <a className="editorial-header-cta" href="/contact#book">BOOK AN APPOINTMENT <ArrowUpRight size={15} /></a>
      <details className="editorial-mobile-nav"><summary aria-label="Open navigation"><span>MENU</span><span className="editorial-menu-lines" /></summary><nav aria-label="Mobile navigation"><a className="mobile-book-link" href="/contact#book">Book an appointment<ArrowUpRight size={17} /></a>{navigation.map(([label, href]) => <SiteLink key={href} href={href}>{label}<ArrowUpRight size={17} /></SiteLink>)}<SiteLink href="/product/solitaire-ring">The Solitaire<ArrowUpRight size={17} /></SiteLink></nav></details>
    </div></header>
    <main id="main">{children}</main>
    <footer className="editorial-footer"><div className="wrap"><div className="editorial-footer-main"><div><p className="eyebrow">LAB GRANT DIAMOND</p><h2>For all the days<br /><em>you call forever.</em></h2><SiteLink className="editorial-gold-link" href="/contact#book">BOOK AN APPOINTMENT <ArrowRight size={17} /></SiteLink></div><nav aria-label="Footer navigation">{navigation.map(([label, href]) => <SiteLink key={href} href={href}>{label}</SiteLink>)}<SiteLink href="/product/solitaire-ring">The Solitaire</SiteLink><SiteLink href="/contact#book">Book an appointment</SiteLink><SiteLink href="/privacy">Privacy information</SiteLink></nav></div><div className="editorial-footer-bottom"><SiteLink href="/">LAB GRANT DIAMOND</SiteLink><span>© {new Date().getUTCFullYear()} Lab Grant Diamond</span></div></div></footer>
  </div>;
}

export function EditorialHero({ eyebrow, title, description, image, alt, href, action, position = "center", film }: { eyebrow: string; title: ReactNode; description: string; image: string; alt: string; href: string; action: string; position?: string; film?: string }) {
  return <section className="editorial-hero"><Image src={`/media/${image}.webp`} alt={alt} fill priority sizes="100vw" style={{ objectPosition: position }} />{film && <video className="editorial-hero-film" autoPlay muted playsInline loop preload="metadata" poster={`/media/${image}.webp`} aria-hidden="true"><source src={`/media/${film}.mp4`} type="video/mp4" /></video>}<div className="editorial-hero-shade" /><div className="wrap editorial-hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p><SiteLink className="editorial-gold-link" href={href}>{action}<ArrowRight size={17} /></SiteLink></div><span className="editorial-hero-index">LAB GRANT BRIDAL · THE STORY CONTINUES</span></section>;
}

export function Picture({ file, alt, className = "" }: { file: string; alt: string; className?: string }) {
  return <div className={`editorial-picture ${className}`}><Image src={`/media/${file}.webp`} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>;
}

export function EditorialNext({ eyebrow, title, copy, href, action, image }: { eyebrow: string; title: ReactNode; copy: string; href: string; action: string; image: string }) {
  return <section className="editorial-next"><Image src={`/media/${image}.webp`} alt="" fill sizes="100vw" /><div className="editorial-next-shade" /><div className="wrap editorial-next-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p><SiteLink className="editorial-gold-link" href={href}>{action}<ArrowRight size={17} /></SiteLink></div></section>;
}
