import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "About Lab Grant Diamond | A Modern Bridal Perspective",
  description: "Discover the design perspective behind Lab Grant Diamond: lab-grown diamond rings, considered details and a bridal story centered on the moments that matter.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Lab Grant Diamond", description: "A modern perspective on diamond rings and the moments they carry.", url: "/about", images: [{ url: "/media/wedding-hero.webp", alt: "Couple sharing a wedding moment" }] },
};

export default function AboutPage() {
  return <EditorialShell variant="theme-about">
    <EditorialBreadcrumb name="About Lab Grant Diamond" path="/about" />
    <EditorialHero eyebrow="ABOUT LAB GRANT DIAMOND" title={<>A brighter kind<br /><em>of forever.</em></>} description="A modern point of view on the ring you choose for a moment you will always remember." image="wedding-hero" alt="Couple sharing a quiet moment with an engagement ring" href="#our-perspective" action="OUR PERSPECTIVE" position="center 35%" />
    <section id="our-perspective" className="editorial-statement"><div className="wrap"><p className="eyebrow">THE LAB GRANT PERSPECTIVE</p><span className="editorial-hairline" /><h2>Meaning in the moment.<br /><em>Beauty in the details.</em></h2><p>Lab Grant Diamond is a bridal experience built around lab-grown diamond rings and the people who wear them. We believe choosing a ring should start with your story: the shape you love, the details you notice and the promise it will represent.</p></div></section>
    <section className="editorial-guide editorial-diamond-chapters"><div className="wrap"><article className="editorial-guide-row"><Picture file="cut-oval" alt="Oval diamond on ivory fabric" /><div><span>01 / THE DIAMOND</span><h2>Light with<br /><em>a new origin.</em></h2><p>Our featured engagement ring centers on a lab-grown diamond. Understanding a stone’s origin, cut and individual characteristics makes it easier to choose with confidence.</p><Link className="editorial-dark-link" href="/diamond-guide">EXPLORE THE DIAMOND GUIDE <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="solitaire" alt="The Solitaire diamond ring" /><div><span>02 / THE RING</span><h2>One silhouette.<br /><em>Many meanings.</em></h2><p>The Solitaire pairs an oval center stone with a fine pavé band. It is the ring you can currently explore in detail on this site, with its listed metal and size options.</p><Link className="editorial-dark-link" href="/product/solitaire-ring">VIEW THE SOLITAIRE <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="wedding-vows" alt="Couple exchanging a ring at a wedding" /><div><span>03 / THE STORY</span><h2>For the day.<br /><em>And the days after.</em></h2><p>From the first question to the vows and the quiet everyday, a ring belongs to the person and the story behind it. Find ideas for the celebration, the wedding band and every detail in between.</p><Link className="editorial-dark-link" href="/wedding-day">EXPLORE THE WEDDING DAY <ArrowRight size={17} /></Link></div></article></div></section>
    <EditorialNext eyebrow="BEGIN WITH THE RING" title={<>The first look<br /><em>at forever.</em></>} copy="Explore the ring at the heart of our bridal story." href="/product/solitaire-ring" action="DISCOVER THE SOLITAIRE" image="emotion-final" />
  </EditorialShell>;
}
