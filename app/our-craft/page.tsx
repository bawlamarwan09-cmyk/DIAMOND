import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "Ring Design & Craft Details | Lab Grant Diamond",
  description: "Explore the details behind a diamond ring: stone silhouette, setting, pavé accents and the design choices that shape The Solitaire.",
  alternates: { canonical: "/our-craft" },
  openGraph: { title: "Our Craft | Lab Grant Diamond", description: "A closer look at the shape, setting and details of The Solitaire ring.", url: "/our-craft", images: [{ url: "/media/craft.webp", alt: "Diamond ring details in warm light" }] },
};

export default function OurCraft() {
  return <EditorialShell variant="theme-craft">
    <EditorialBreadcrumb name="Our craft" path="/our-craft" />
    <EditorialHero eyebrow="THE DETAILS" title={<>Beauty lives<br /><em>in the details.</em></>} description="The line of a setting. The way a diamond catches light. A closer look at the choices that give a ring its character." image="craft" alt="Close view of diamond ring setting details" href="#craft-details" action="EXPLORE THE DETAILS" />
    <section className="editorial-statement"><div className="wrap"><p className="eyebrow">A DESIGN PERSPECTIVE</p><span className="editorial-hairline" /><h2>Considered from<br /><em>every angle.</em></h2><p>A ring is experienced in the small moments: how its profile looks from the side, how it feels on the hand and how the stone sits in the light.</p></div></section>
    <section id="craft-details" className="editorial-guide editorial-diamond-chapters"><div className="wrap"><article className="editorial-guide-row"><Picture file="cut-oval" alt="Oval diamond shape on a soft ivory background" /><div><span>01 / THE STONE</span><h2>Start with<br /><em>the silhouette.</em></h2><p>Shape changes the whole impression of a ring. The elongated oval at the heart of The Solitaire gives its centre stone a soft outline and a distinct presence on the hand.</p><Link className="editorial-dark-link" href="/diamond-guide">DISCOVER DIAMOND SHAPES <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="solitaire" alt="The Solitaire oval diamond ring and its pavé band" /><div><span>02 / THE SETTING</span><h2>Give light<br /><em>its space.</em></h2><p>The Solitaire brings together an oval centre stone and a fine pavé band. The supporting details frame the diamond while allowing the main stone to remain the focus. Study the product photos and listed options to see how the design comes together.</p><Link className="editorial-dark-link" href="/product/solitaire-ring">VIEW THE SOLITAIRE <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="bespoke" alt="Diamond ring design inspiration in bronze light" /><div><span>03 / THE PERSONAL DETAIL</span><h2>Choose what<br /><em>feels right.</em></h2><p>Metal tone, proportions and the relationship between a ring and a future wedding band all change how it feels to wear. Begin with the details that reflect the person, then check the exact available options on the product page.</p><Link className="editorial-dark-link" href="/bespoke">EXPLORE DESIGN INSPIRATION <ArrowRight size={17} /></Link></div></article></div></section>
    <EditorialNext eyebrow="SEE THE FINISHED DESIGN" title={<>One ring.<br /><em>Every detail.</em></>} copy="Explore the photographs and specifications for the ring currently featured by Lab Grant Diamond." href="/product/solitaire-ring" action="VIEW THE SOLITAIRE" image="featured" />
  </EditorialShell>;
}
