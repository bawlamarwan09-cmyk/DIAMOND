import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "Wedding Day Rings & Bridal Inspiration | Lab Grant Diamond",
  description: "From the proposal to the ceremony, explore wedding day ring inspiration, engagement rings and wedding bands from Lab Grant Diamond.",
  alternates: { canonical: "/wedding-day" },
  openGraph: { title: "The Wedding Day | Lab Grant Diamond", description: "For the vows and every ordinary day after. A wedding story told through the rings.", url: "/wedding-day", images: [{ url: "/media/wedding-vows.webp", alt: "Couple sharing a wedding moment" }] },
};

export default function WeddingDay() {
  return <EditorialShell variant="theme-wedding">
    <EditorialBreadcrumb name="The wedding day" path="/wedding-day" />
    <EditorialHero eyebrow="THE WEDDING DAY" title={<>For the day<br /><em>you say forever.</em></>} description="A celebration of two people and the promise they make. The rings are a part of the story, carried into every day after." image="wedding-vows" film="wedding-vows" alt="Couple exchanging a ring on their wedding day" href="#the-moments" action="EXPLORE THE MOMENTS" position="center 44%" />
    <section className="editorial-statement"><div className="wrap"><p className="eyebrow">A LIFETIME BEGINS</p><span className="editorial-hairline" /><h2>The day is yours.<br /><em>So is the story.</em></h2><p>Whether the ceremony is intimate or full of people you love, the meaning of a wedding ring belongs to the two of you.</p></div></section>
    <section id="the-moments" className="editorial-guide editorial-diamond-chapters"><div className="wrap"><article className="editorial-guide-row"><Picture file="emotion-final" alt="Diamond engagement ring worn on a hand" /><div><span>01 / THE QUESTION</span><h2>It starts<br /><em>with a yes.</em></h2><p>The engagement ring holds the memory of the moment everything changed. Explore The Solitaire, the oval lab-grown diamond ring currently featured on this site.</p><Link className="editorial-dark-link" href="/engagement-rings">EXPLORE ENGAGEMENT RINGS <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="wedding-hero" alt="Wedding couple sharing an intimate moment" /><div><span>02 / THE DAY</span><h2>Make the moment<br /><em>your own.</em></h2><p>Keep the details close: the rings, the vows and a moment to pause together. Our bridal guide offers a few practical things to consider before the day arrives.</p><Link className="editorial-dark-link" href="/bridal-guide">READ THE BRIDAL GUIDE <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="bands" alt="Wedding band design inspiration" /><div><span>03 / THE EVERYDAY</span><h2>A promise<br /><em>to carry home.</em></h2><p>Wedding bands become part of the ordinary days that follow. Explore finishes, proportions and the way a band can sit beside an engagement ring. The band imagery is design inspiration; individual band products are not yet listed.</p><Link className="editorial-dark-link" href="/wedding-bands">EXPLORE WEDDING BANDS <ArrowRight size={17} /></Link></div></article></div></section>
    <EditorialNext eyebrow="THE BEGINNING OF THE STORY" title={<>For this moment.<br /><em>And all the afters.</em></>} copy="Meet the ring that carries a promise in every detail." href="/product/solitaire-ring" action="VIEW THE SOLITAIRE" image="closing" />
  </EditorialShell>;
}
