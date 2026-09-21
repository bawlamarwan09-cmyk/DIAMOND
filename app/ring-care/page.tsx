import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "How to Care for a Diamond Ring | Lab Grant Diamond",
  description: "Simple diamond ring care tips: gentle cleaning, safe storage and when to ask a jeweler to inspect a setting.",
  alternates: { canonical: "/ring-care" },
  openGraph: { title: "Diamond Ring Care | Lab Grant Diamond", description: "A thoughtful routine to keep your ring looking its best.", url: "/ring-care", images: [{ url: "/media/solitaire.webp", alt: "The Solitaire diamond engagement ring" }] },
};

export default function RingCare() {
  return <EditorialShell variant="theme-care">
    <EditorialBreadcrumb name="Ring care" path="/ring-care" />
    <EditorialHero eyebrow="CARING FOR YOUR RING" title={<>For every day<br /><em>after the yes.</em></>} description="A little care helps protect the ring you will reach for every day. Keep the routine simple and the setting secure." image="emotion-final" alt="Diamond ring worn on a hand" href="#care-guide" action="READ THE CARE GUIDE" />
    <section className="editorial-statement"><div className="wrap"><p className="eyebrow">EVERYDAY CARE</p><span className="editorial-hairline" /><h2>Keep the brilliance.<br /><em>Care for the setting.</em></h2><p>Diamonds can collect oils and residue during everyday wear. The metal and the small components holding a stone also deserve attention.</p></div></section>
    <section id="care-guide" className="editorial-guide editorial-diamond-chapters"><div className="wrap"><article className="editorial-guide-row"><Picture file="solitaire" alt="Close view of an oval diamond ring" /><div><span>01 / CLEAN GENTLY</span><h2>A softer<br /><em>kind of sparkle.</em></h2><p>Use a small bowl of lukewarm water and mild dish soap. Clean gently with a soft brush, rinse in a bowl of clean water and dry with a soft lint-free cloth. Avoid cleaning over an open drain. If your ring has other stones or a delicate finish, ask a jeweler before using any cleaning solution.</p></div></article><article className="editorial-guide-row"><Picture file="bands" alt="Rings resting together on a dark surface" /><div><span>02 / WEAR WITH CARE</span><h2>Make space<br /><em>for the moment.</em></h2><p>Take your ring off before heavy impact, abrasive work or handling harsh cleaning chemicals. Put it in a secure place rather than on the edge of a sink. Store pieces separately in a soft pouch or lined box to reduce contact and scratches.</p></div></article><article className="editorial-guide-row"><Picture file="craft" alt="Detail of a diamond ring setting" /><div><span>03 / CHECK THE SETTING</span><h2>A small check<br /><em>can matter.</em></h2><p>If a stone moves, a prong catches or the ring is bent, stop wearing it and ask a qualified jeweler to inspect it. Professional inspection can catch wear around the setting that a home clean will not address.</p><Link className="editorial-dark-link" href="/our-craft">EXPLORE THE RING DETAILS <ArrowRight size={17} /></Link></div></article><p className="editorial-care-source">Further reading: <a href="https://4cs.gia.edu/" target="_blank" rel="noopener noreferrer">GIA’s diamond education ↗</a></p></div></section>
    <EditorialNext eyebrow="THE RING AT A GLANCE" title={<>Every detail<br /><em>worth keeping.</em></>} copy="Return to The Solitaire for its design details and ring information." href="/product/solitaire-ring" action="VIEW THE SOLITAIRE" image="featured" />
  </EditorialShell>;
}
