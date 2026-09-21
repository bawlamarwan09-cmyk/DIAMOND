import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialHero, EditorialNext, EditorialShell, Picture } from "../editorial-components";

export const metadata: Metadata = {
  title: "Lab-Grown Diamond Guide: Cuts & the 4Cs | Lab Grant Diamond",
  description: "Learn what a lab-grown diamond is, understand the 4Cs and compare oval, round, marquise and emerald diamond silhouettes before choosing a ring.",
  alternates: { canonical: "/diamond-guide" },
  openGraph: { title: "The Diamond Guide | Lab Grant Diamond", description: "A clear introduction to lab-grown diamonds, the 4Cs and four diamond shapes.", url: "/diamond-guide", images: [{ url: "/media/cut-oval.webp", alt: "Oval cut diamond on ivory fabric" }] },
};

const cuts = [
  ["cut-oval", "Oval", "An elongated outline with a soft, lively appearance."],
  ["cut-round", "Round", "A balanced silhouette prized for its bright appearance."],
  ["cut-marquise", "Marquise", "A pointed outline with a dramatic sense of length."],
  ["cut-emerald", "Emerald", "Long, stepped facets and a more restrained play of light."],
] as const;

export default function DiamondGuide() {
  return <EditorialShell variant="theme-diamond">
    <EditorialBreadcrumb name="Diamond guide" path="/diamond-guide" />
    <EditorialHero eyebrow="THE DIAMOND GUIDE" title={<>Every stone<br /><em>holds the light.</em></>} description="A closer look at lab-grown diamonds, their defining details and the shapes that give each ring its character." image="cut-oval" alt="Oval diamond catching the light against ivory fabric" href="#understanding-diamonds" action="BEGIN THE GUIDE" />
    <section id="understanding-diamonds" className="editorial-statement"><div className="wrap"><p className="eyebrow">THE MODERN DIAMOND</p><span className="editorial-hairline" /><h2>Same material.<br /><em>A different origin.</em></h2><p>Lab-grown diamonds are diamonds formed in a controlled setting. They have essentially the same chemical, physical and optical properties as natural diamonds. Their origin should be clearly identified when you choose a stone.</p></div></section>
    <section className="editorial-guide editorial-diamond-chapters"><div className="wrap"><article className="editorial-guide-row"><Picture file="intro" alt="Close view of a diamond in warm light" /><div><span>01 / THE FOUR Cs</span><h2>Look beyond<br /><em>the sparkle.</em></h2><p>Cut describes how the stone’s proportions and facets affect its light performance. Color describes its body color; clarity refers to its internal and surface characteristics; carat is its weight, rather than a direct measure of size. Consider all four alongside the shape you love and the information supplied for the individual stone.</p></div></article><article className="editorial-guide-row"><Picture file="cut-emerald" alt="Emerald cut diamond with stepped facets" /><div><span>02 / SHAPE & CUT</span><h2>Find the form<br /><em>that feels yours.</em></h2><p>Shape is the outline you notice first. Cut quality is about the workmanship and how light behaves inside the stone. Two diamonds of the same shape can still look different, so study the individual diamond rather than choosing from a silhouette alone.</p><Link className="editorial-dark-link" href="/engagement-rings">EXPLORE ENGAGEMENT RINGS <ArrowRight size={17} /></Link></div></article></div></section>
    <section className="editorial-cuts"><div className="wrap"><div className="editorial-section-heading"><div><p className="eyebrow">FOUR SHAPES TO EXPLORE</p><h2>A silhouette<br /><em>for your story.</em></h2></div><p>These studies show how the outline of a diamond changes its character. They are visual inspiration, not a list of available stones.</p></div><div className="editorial-cut-grid">{cuts.map(([file,name,note],index) => <article key={name}><Picture file={file} alt={`${name} cut diamond on ivory fabric`} /><span>0{index+1} / THE SHAPE</span><h3>{name}</h3><p>{note}</p></article>)}</div><p className="editorial-cuts-note">The Solitaire product currently shown on this site features an oval lab-grown diamond.</p><div className="editorial-references"><span>FURTHER READING</span><a href="https://4cs.gia.edu/en-us/simulants-moissanite-and-lab-grown-diamonds/" target="_blank" rel="noopener noreferrer">GIA: Lab-grown diamonds ↗</a><a href="https://4cs.gia.edu/" target="_blank" rel="noopener noreferrer">GIA: The 4Cs ↗</a></div></div></section>
    <EditorialNext eyebrow="THE NEXT CHAPTER" title={<>See the oval<br /><em>in its setting.</em></>} copy="Take a closer look at the diamond and pavé details of The Solitaire." href="/product/solitaire-ring" action="EXPLORE THE SOLITAIRE" image="hero" />
  </EditorialShell>;
}
