import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "Personal Ring Design Inspiration | Lab Grant Diamond",
  description: "Explore personal engagement ring design inspiration, from diamond silhouette and setting to metal tone and the way a wedding band pairs with your ring.",
  alternates: { canonical: "/bespoke" },
  openGraph: { title: "Bespoke Inspiration | Lab Grant Diamond", description: "A personal ring begins with the details that mean something to you.", url: "/bespoke", images: [{ url: "/media/bespoke.webp", alt: "Personal ring design inspiration" }] },
};

export default function Bespoke() {
  return <EditorialShell variant="theme-bespoke">
    <EditorialBreadcrumb name="Bespoke inspiration" path="/bespoke" />
    <EditorialHero eyebrow="PERSONAL DESIGN INSPIRATION" title={<>A ring with<br /><em>your story in it.</em></>} description="Think about the shape they love, the details they notice and the moment the ring will become theirs." image="bespoke" alt="Diamond ring design inspiration in warm bronze light" href="#design-notes" action="EXPLORE THE IDEAS" />
    <section className="editorial-statement"><div className="wrap"><p className="eyebrow">THE FIRST IDEA</p><span className="editorial-hairline" /><h2>Begin with<br /><em>what feels personal.</em></h2><p>A thoughtful ring begins with someone in mind. Use these design notes to discover the details you love, then explore the options actually listed for The Solitaire.</p></div></section>
    <section id="design-notes" className="editorial-guide editorial-diamond-chapters"><div className="wrap"><article className="editorial-guide-row"><Picture file="cut-marquise" alt="Marquise diamond silhouette on ivory fabric" /><div><span>01 / THE OUTLINE</span><h2>A shape<br /><em>to remember.</em></h2><p>Start with the diamond shape. Oval, round, marquise and emerald silhouettes each create a different feeling. These images are a starting point for finding your taste; they do not represent a catalog of available rings.</p><Link className="editorial-dark-link" href="/diamond-guide">COMPARE DIAMOND SHAPES <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="solitaire" alt="Oval diamond ring with a pavé band" /><div><span>02 / THE FINISH</span><h2>Consider<br /><em>the setting.</em></h2><p>Look at the band, metal tone and the way the setting frames the centre stone. The Solitaire pairs its oval stone with pavé details; its product page shows the current metal and size selections.</p><Link className="editorial-dark-link" href="/product/solitaire-ring">SEE THE AVAILABLE OPTIONS <ArrowRight size={17} /></Link></div></article><article className="editorial-guide-row"><Picture file="bands" alt="Wedding band styling inspiration" /><div><span>03 / THE FUTURE</span><h2>Imagine<br /><em>the band beside it.</em></h2><p>A wedding band can echo an engagement ring or offer a contrast. Consider how the profiles meet, how the two sit on the hand and how each looks alone. The band imagery here is inspiration; band products are not currently listed.</p><Link className="editorial-dark-link" href="/wedding-bands">EXPLORE WEDDING BANDS <ArrowRight size={17} /></Link></div></article></div></section>
    <EditorialNext eyebrow="THE RING TO EXPLORE" title={<>A place<br /><em>to begin.</em></>} copy="See the design, details and listed options of The Solitaire." href="/product/solitaire-ring" action="DISCOVER THE SOLITAIRE" image="emotion-final" />
  </EditorialShell>;
}
