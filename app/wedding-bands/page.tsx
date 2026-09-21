import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "Wedding Band Inspiration | Lab Grant Diamond",
  description: "Explore wedding band inspiration and the meaning behind the rings you will exchange on your wedding day at Lab Grant Diamond.",
  alternates: { canonical: "/wedding-bands" },
  openGraph: { title: "Wedding Bands | Lab Grant Diamond", description: "The promise, worn every day. Wedding band inspiration for your celebration and all the days after.", url: "/wedding-bands", images: ["/media/wedding-vows.webp"] },
};

export default function WeddingBands() {
  return <EditorialShell variant="theme-bands">
    <EditorialBreadcrumb name="Wedding bands" path="/wedding-bands" />
    <EditorialHero eyebrow="02 / THE PROMISE" title={<>The promise,<br /><em>worn every day.</em></>} description="Two rings. One shared future. For the vows, the dancing and all the ordinary days that become extraordinary together." image="wedding-vows" alt="A couple together at their wedding celebration" href="#bands-story" action="DISCOVER THE STORY" position="center 44%" />
    <section className="editorial-statement"><div className="wrap"><p className="eyebrow">THE WEDDING DAY</p><span className="editorial-hairline" /><h2>For the vows.<br /><em>And everything after.</em></h2><p>A wedding band is a small, beautiful reminder of the promise you make to one another. Its most meaningful moments come long after the ceremony.</p></div></section>
    <section id="bands-story" className="editorial-feature editorial-feature-bands"><div className="wrap editorial-feature-grid"><Picture file="bands" alt="Wedding bands in warm metal and diamond set designs" /><div className="editorial-feature-copy"><p className="eyebrow">BANDS · INSPIRATION</p><h2>Better<br /><em>together.</em></h2><p>Some couples choose matching bands. Others choose individual styles with a shared detail. Think about the finish, the width, the way the band sits beside an engagement ring and how it feels every day.</p><Link className="editorial-dark-link" href="/bridal-guide">EXPLORE THE BRIDAL GUIDE <ArrowRight size={17} /></Link><small>These wedding band images are design inspiration; individual band products are not yet listed here.</small></div></div></section>
    <section className="editorial-band-moment"><Picture file="gallery" alt="Diamond wedding band design details" /><div><p className="eyebrow">A SHARED DETAIL</p><h2>Made for<br /><em>your story.</em></h2><p>Whether beautifully simple or finished with diamond light, the band you exchange is the one you will see every day. Choose a shape that feels comfortable, and a detail you love returning to.</p></div></section>
    <EditorialNext eyebrow="THE STORY BEGINS" title={<>Before the vows,<br /><em>the question.</em></>} copy="Explore The Solitaire, the oval diamond engagement ring at the heart of our bridal story." href="/product/solitaire-ring" action="MEET THE SOLITAIRE" image="emotion-final" />
  </EditorialShell>;
}
