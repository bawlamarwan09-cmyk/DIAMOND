import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "Lab-Grown Diamond Engagement Rings | Lab Grant Diamond",
  description: "Discover engagement ring inspiration, diamond silhouettes and The Solitaire oval lab-grown diamond ring at Lab Grant Diamond.",
  alternates: { canonical: "/engagement-rings" },
  openGraph: { title: "Engagement Rings | Lab Grant Diamond", description: "A ring for the question that changes everything. Explore The Solitaire and find your diamond silhouette.", url: "/engagement-rings", images: ["/media/solitaire.webp"] },
};

const cuts = [
  { file: "cut-oval", name: "Oval", note: "Soft length, graceful light" },
  { file: "cut-round", name: "Round", note: "An enduring classic" },
  { file: "cut-marquise", name: "Marquise", note: "An expressive silhouette" },
  { file: "cut-emerald", name: "Emerald", note: "Quiet, architectural lines" },
];

export default function EngagementRings() {
  return <EditorialShell variant="theme-engagement">
    <EditorialBreadcrumb name="Engagement rings" path="/engagement-rings" />
    <EditorialHero eyebrow="01 / THE QUESTION" title={<>A ring for<br /><em>the beginning.</em></>} description="For the moment you ask, and every moment that follows. Discover a diamond ring with a story all its own." image="emotion-final" alt="Diamond engagement ring worn in a tender moment" href="#the-solitaire" action="EXPLORE THE RING" position="center 56%" />
    <section className="editorial-statement"><div className="wrap"><p className="eyebrow">THE ENGAGEMENT STORY</p><span className="editorial-hairline" /><h2>One question.<br /><em>A lifetime of light.</em></h2><p>The right ring feels like a reflection of the person who will wear it. Begin with the shape, the setting and the details that speak to you.</p></div></section>
    <section id="the-solitaire" className="editorial-feature"><div className="wrap editorial-feature-grid"><Picture file="solitaire" alt="The Solitaire oval lab-grown diamond engagement ring" /><div className="editorial-feature-copy"><p className="eyebrow">THE RING · 01</p><h2>Meet<br /><em>The Solitaire.</em></h2><p>An oval lab-grown diamond, a delicate pavé band and a setting designed to let the centre stone speak. A singular expression of your promise.</p><Link className="editorial-dark-link" href="/product/solitaire-ring">VIEW THE SOLITAIRE <ArrowRight size={17} /></Link><small>Explore the ring, its details and available options on the product page.</small></div></div></section>
    <section className="editorial-cuts"><div className="wrap"><div className="editorial-section-heading"><div><p className="eyebrow">A STUDY IN SHAPE</p><h2>Find your<br /><em>kind of brilliance.</em></h2></div><p>Each diamond cut changes the way light moves. Explore four silhouettes that can help you discover what feels like yours.</p></div><div className="editorial-cut-grid">{cuts.map(({file,name,note}, index) => <article key={name}><Picture file={file} alt={`${name} cut diamond inspiration`} /><span>0{index+1} / THE CUT</span><h3>{name}</h3><p>{note}</p></article>)}</div><p className="editorial-cuts-note">Diamond cuts are shown for inspiration. The Solitaire is the ring currently featured on this site.</p></div></section>
    <EditorialNext eyebrow="A MOMENT TO MAKE YOURS" title={<>A little guidance<br /><em>goes a long way.</em></>} copy="From finding the right silhouette to making space for the surprise, let our bridal guide help you begin." href="/bridal-guide" action="READ THE BRIDAL GUIDE" image="wedding-hero" />
  </EditorialShell>;
}
