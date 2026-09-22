"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, Pause, Play, Search, Volume2, VolumeX } from "lucide-react";

type ProductImage = { file: string; label: string; alt: string };

const productImages: ProductImage[] = [
  { file: "solitaire", label: "Front view", alt: "Oval lab-grown diamond solitaire engagement ring" },
  { file: "featured", label: "Three-quarter view", alt: "Diamond engagement ring in warm champagne light" },
  { file: "hero", label: "Setting detail", alt: "Close view of a sculpted gold diamond ring setting" },
  { file: "trust", label: "Certification", alt: "Diamond ring presented beside its grading certificate" },
];

const specifications = [
  ["Centre diamond", "Oval lab-grown diamond, available from 1.00 carat"],
  ["Diamond quality", "F colour · VS clarity · independently certified"],
  ["Setting", "Low-profile cathedral setting with a fine pavé band"],
  ["Metal", "18k yellow gold, 18k rose gold or platinum"],
];

function ProductHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="ring-header">
      <div className="ring-header-primary wrap">
        <button className="ring-header-control" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="ring-navigation"><Menu size={15} /><span>MENU</span></button>
        <Link className="wordmark ring-wordmark" href="/" aria-label="Lab Grant Diamond home"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></Link>
        <div className="ring-header-tools"><Link href="/contact#book">CLIENT SERVICES</Link><Link href="/collections" aria-label="Search the collections"><Search size={15} /></Link></div>
      </div>
      <nav id="ring-navigation" className={`ring-navigation ${menuOpen ? "is-open" : ""}`} aria-label="Ring navigation">
        <div className="wrap"><Link href="/engagement-rings">ENGAGEMENT RINGS</Link><Link href="/wedding-bands">WEDDING BANDS</Link><Link href="/bespoke">BESPOKE</Link><Link href="/diamond-guide">DIAMOND GUIDE</Link><Link href="/appointments">APPOINTMENTS</Link></div>
      </nav>
    </header>
  );
}

function RingGallery() {
  const [active, setActive] = useState(0);
  const current = productImages[active];
  return (
    <div className="ring-gallery" aria-label="The Solitaire product gallery">
      <div className="ring-gallery-stage">
        <Image key={current.file} src={`/media/${current.file}.webp`} alt={current.alt} fill priority={active === 0} sizes="(max-width: 900px) 100vw, 55vw" className="ring-gallery-image" />
        <span className="ring-gallery-number">{String(active + 1).padStart(2, "0")} / {String(productImages.length).padStart(2, "0")}</span>
        <span className="ring-gallery-caption">{current.label}</span>
      </div>
      <div className="ring-gallery-dots" role="tablist" aria-label="Choose a product view">
        {productImages.map((image, index) => <button key={image.file} role="tab" aria-selected={active === index} onClick={() => setActive(index)} aria-label={`Show ${image.label}`}><span /></button>)}
      </div>
      <div className="ring-gallery-thumbs">
        {productImages.map((image, index) => <button key={image.file} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show ${image.label}`}><Image src={`/media/${image.file}.webp`} alt="" fill sizes="120px" /></button>)}
      </div>
    </div>
  );
}

function WeddingFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      else { video.pause(); setPlaying(false); }
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { video.pause(); setPlaying(false); }
  };

  return (
    <section className="ring-film" aria-label="A wedding moment">
      <video ref={videoRef} autoPlay muted={muted} loop playsInline preload="metadata" poster="/media/wedding-hero.webp"><source src="/media/wedding-hero.mp4" type="video/mp4" /></video>
      <div className="ring-film-shade" />
      <div className="ring-film-copy"><p className="eyebrow">A PROMISE, BEAUTIFULLY LIT</p><h2>The moment<br /><em>becomes forever.</em></h2><p>A ring made for the quiet pause before yes, the celebration after it, and every ordinary morning still to come.</p></div>
      <div className="ring-film-controls"><button onClick={togglePlayback} aria-label={playing ? "Pause film" : "Play film"}>{playing ? <Pause size={15} /> : <Play size={15} />}</button><button onClick={() => { if (videoRef.current) videoRef.current.muted = !muted; setMuted((value) => !value); }} aria-label={muted ? "Turn sound on" : "Mute film"}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button></div>
    </section>
  );
}

export default function ProductExperience({ slug }: { slug: string }) {
  const [priceOpen, setPriceOpen] = useState(false);
  const [openSpec, setOpenSpec] = useState<string | null>(specifications[0][0]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);

  if (slug !== "solitaire-ring") return <main className="product-not-found"><p className="eyebrow">THE COLLECTION</p><h1>This chapter is still being written.</h1><Link className="button button-gold" href="/collections">RETURN TO THE COLLECTION <ArrowLeft size={17} /></Link></main>;

  return (
    <div className="ring-product-page">
      <ProductHeader />
      <main>
        <section className="ring-product-hero">
          <RingGallery />
          <div className="ring-product-copy">
            <p className="ring-kicker"><Link href="/engagement-rings">ENGAGEMENT RINGS</Link> / THE SOLITAIRE</p>
            <p className="eyebrow">LAB GRANT SIGNATURE</p>
            <h1>The Solitaire<br /><em>Oval Diamond Ring</em></h1>
            <p className="ring-product-description">A luminous oval centre diamond rises from a finely sculpted setting. Its clean silhouette lets the stone hold the light without distraction — modern, intimate and enduring.</p>
            <p className="ring-product-meta">Available from 1.00 carat in 18k gold or platinum.</p>
            <p className="ring-product-reference">PRODUCT REFERENCE: LGD-001</p>
            <div className="ring-product-actions"><Link className="ring-primary-action" href="/appointments">SCHEDULE AN APPOINTMENT <ArrowRight size={15} /></Link><Link className="ring-secondary-action" href="/contact#book">REQUEST ASSISTANCE</Link></div>
            <div className="ring-price-note"><button onClick={() => setPriceOpen((value) => !value)} aria-expanded={priceOpen}><span>ABOUT PRICING &amp; AVAILABILITY</span><ChevronDown size={15} /></button>{priceOpen && <p>Every centre diamond is individually selected. Final pricing reflects carat weight, diamond grade and your chosen metal. Our client advisor will prepare a personal quotation.</p>}</div>
          </div>
        </section>

        <WeddingFilm />

        <section className="ring-promise wrap">
          <div className="ring-promise-image"><Image src="/media/wedding-vows.webp" alt="A newly married couple sharing an intimate wedding moment" fill sizes="(max-width: 760px) 100vw, 56vw" /></div>
          <div className="ring-promise-copy"><p className="eyebrow">THE ART OF THE SOLITAIRE</p><h2>Nothing between<br />the diamond and<br /><em>its light.</em></h2><p>The setting is drawn around the stone, not the other way around. Each curve is refined by hand so the oval appears to float above a slender band.</p><Link className="ring-text-link" href="/our-craft">DISCOVER OUR CRAFT <ArrowRight size={15} /></Link></div>
        </section>

        <section className="ring-detail-feature">
          <div className="ring-detail-copy"><p className="eyebrow">DESIGNED AROUND YOU</p><h2>Quiet from afar.<br /><em>Remarkable up close.</em></h2><p>A low profile keeps the ring elegant and effortless to wear. Delicate pavé adds a soft line of brilliance while the centre stone remains the focus.</p></div>
          <div className="ring-detail-image"><Image src="/media/intro.webp" alt="Side profile of the solitaire ring illuminated by a champagne light" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        </section>

        <section className="ring-specifications wrap">
          <div><p className="eyebrow">THE DETAILS</p><h2>Every line<br /><em>considered.</em></h2><p className="ring-spec-intro">Your ring is made to order and can be refined with our advisor during a private appointment.</p></div>
          <div className="ring-spec-list">{specifications.map(([title, copy]) => <div className="ring-spec" key={title}><button onClick={() => setOpenSpec(openSpec === title ? null : title)} aria-expanded={openSpec === title}><span>{title}</span><ChevronDown size={17} /></button>{openSpec === title && <p>{copy}</p>}</div>)}</div>
        </section>

        <section className="ring-suggestions wrap">
          <div className="ring-section-heading"><p className="eyebrow">LAB GRANT SUGGESTS</p><h2>Continue your story.</h2></div>
          <div className="ring-suggestion-grid">
            <Link href="/wedding-bands"><span className="ring-suggestion-image"><Image src="/media/bands.webp" alt="Lab-grown diamond wedding bands" fill sizes="(max-width: 700px) 100vw, 48vw" /></span><span className="ring-suggestion-copy"><small>THE PERFECT PAIRING</small><strong>Wedding Bands</strong><span>EXPLORE <ArrowRight size={14} /></span></span></Link>
            <Link href="/bespoke"><span className="ring-suggestion-image"><Image src="/media/bespoke.webp" alt="Bespoke diamond ring design" fill sizes="(max-width: 700px) 100vw, 48vw" /></span><span className="ring-suggestion-copy"><small>MADE FOR ONE STORY</small><strong>Bespoke Design</strong><span>EXPLORE <ArrowRight size={14} /></span></span></Link>
          </div>
        </section>

        <section className="ring-consultation"><div className="wrap"><p className="eyebrow">YOUR PRIVATE APPOINTMENT</p><h2>Step into your<br /><em>forever moment.</em></h2><p>Meet with a Lab Grant advisor to compare diamonds, refine the setting and create a ring that feels unmistakably yours.</p><Link href="/appointments">BOOK A CONVERSATION <ArrowRight size={16} /></Link></div></section>
      </main>
      <footer className="ring-footer"><div className="wrap"><Link className="wordmark" href="/"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></Link><div><Link href="/engagement-rings">ENGAGEMENT RINGS</Link><Link href="/appointments">APPOINTMENTS</Link><Link href="/contact">CONTACT</Link></div><p>© {new Date().getUTCFullYear()} LAB GRANT DIAMOND</p></div></footer>
    </div>
  );
}
