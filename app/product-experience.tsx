"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Heart, Minus, Plus, ShieldCheck, Sparkles, Truck, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Metal = { id: string; name: string; tone: string; hex: string };
type ProductImage = { file: string; label: string; alt: string };

const metals: Metal[] = [
  { id: "yellow-gold", name: "18k Yellow Gold", tone: "Warm champagne", hex: "#bf8b45" },
  { id: "rose-gold", name: "18k Rose Gold", tone: "Soft blush", hex: "#c98876" },
  { id: "platinum", name: "Platinum", tone: "Polished silver", hex: "#d7d4cc" },
];

const sizes = ["48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58"];

const productImages: ProductImage[] = [
  { file: "solitaire", label: "Front view", alt: "Oval diamond solitaire ring on a dark stone plinth" },
  { file: "trust", label: "The details", alt: "Diamond ring beside a grading certificate and black jewelry box" },
  { file: "hero", label: "The setting", alt: "Close view of a warm gold diamond ring above dark sculptural stone" },
  { file: "intro", label: "Side profile", alt: "Side profile of a ring catching a champagne light trail" },
];

const details = [
  ["The centre stone", "Oval lab-grown diamond · 1.00 ct · F colour · VS clarity"],
  ["The setting", "Low-profile cathedral setting with a fine pavé band"],
  ["The finish", "Hand-polished 18k gold or platinum, made to order"],
];

function ProductHeader({ bagCount, openBag }: { bagCount: number; openBag: () => void }) {
  return (
    <header className="product-header">
      <div className="wrap product-header-inner">
        <Link className="product-back" href="/#collections" aria-label="Back to the collection"><ArrowLeft size={16} /> <span>THE COLLECTION</span></Link>
        <Link className="wordmark product-wordmark" href="/" aria-label="Lab Grant Diamond home"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></Link>
        <button className="bag-button" onClick={openBag} aria-label={`Open bag, ${bagCount} item${bagCount === 1 ? "" : "s"}`}><span>MY BAG</span><span className="bag-count">{bagCount}</span></button>
      </div>
    </header>
  );
}

function ProductGallery({ active, setActive }: { active: number; setActive: (index: number) => void }) {
  const current = productImages[active];
  return (
    <div className="product-gallery" aria-label="The Solitaire product gallery">
      <div className="product-main-image">
        <Image src={`/media/${current.file}.webp`} alt={current.alt} fill priority={active === 0} sizes="(max-width: 900px) 100vw, 58vw" className="product-image" />
        <span className="gallery-count">{String(active + 1).padStart(2, "0")} / {String(productImages.length).padStart(2, "0")}</span>
        <span className="gallery-label">{current.label}</span>
      </div>
      <div className="product-thumbnails" role="tablist" aria-label="Product views">
        {productImages.map((image, index) => (
          <button key={image.file} role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show ${image.label}`}>
            <Image src={`/media/${image.file}.webp`} alt="" fill sizes="100px" className="product-thumb-image" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductOption({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return <section className="product-option"><div className="product-option-heading"><h2>{label}</h2>{note && <span>{note}</span>}</div>{children}</section>;
}

function BagDialog({ open, onOpenChange, metal, size, quantity }: { open: boolean; onOpenChange: (open: boolean) => void; metal: Metal; size: string; quantity: number }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bag-dialog">
        <div className="bag-dialog-top"><div><p className="eyebrow">YOUR BAG</p><DialogTitle>One beautiful beginning.</DialogTitle></div><button aria-label="Close bag" onClick={() => onOpenChange(false)}><X size={18} /></button></div>
        <DialogDescription className="sr-only">Your selected Lab Grant Diamond ring.</DialogDescription>
        <div className="bag-item"><div className="bag-item-image"><Image src="/media/solitaire.webp" alt="The Solitaire ring" fill sizes="150px" className="cover" /></div><div className="bag-item-copy"><p className="eyebrow">THE SOLITAIRE</p><h3>Oval Diamond Ring</h3><p>{metal.name} · Size {size}</p><span>Qty {quantity}</span></div><strong>AED 4,200</strong></div>
        <div className="bag-summary"><span>Made to order</span><strong>Complimentary delivery</strong></div>
        <button className="button button-gold bag-cta" onClick={() => onOpenChange(false)}>CONTINUE TO CHECKOUT <ArrowRight size={17} /></button>
        <p className="bag-note">Checkout is shown as a design preview. Payment and inventory are not connected yet.</p>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductExperience({ slug }: { slug: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const [metalId, setMetalId] = useState("yellow-gold");
  const [size, setSize] = useState("52");
  const [quantity, setQuantity] = useState(1);
  const [bagOpen, setBagOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const metal = useMemo(() => metals.find((item) => item.id === metalId) ?? metals[0], [metalId]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);

  if (slug !== "solitaire-ring") {
    return <main className="product-not-found"><p className="eyebrow">THE COLLECTION</p><h1>This chapter is still being written.</h1><Link className="button button-gold" href="/#collections">RETURN TO THE COLLECTION <ArrowLeft size={17} /></Link></main>;
  }

  return (
    <div className="product-page">
      <ProductHeader bagCount={bagOpen ? 1 : 0} openBag={() => setBagOpen(true)} />
      <main>
        <section className="product-hero wrap">
          <ProductGallery active={activeImage} setActive={setActiveImage} />
          <div className="product-information">
            <div className="product-breadcrumb"><Link href="/#collections">THE RINGS</Link><span>/</span><span>THE SOLITAIRE</span></div>
            <div className="product-title-row"><div><p className="eyebrow">ENGAGEMENT RINGS · LGD-001</p><h1>The Solitaire</h1><p className="product-subtitle">A forever kind of love.</p></div><button className={`wishlist-button ${saved ? "saved" : ""}`} onClick={() => setSaved((value) => !value)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved}><Heart size={21} fill={saved ? "currentColor" : "none"} /></button></div>
            <div className="product-price-row"><strong>AED 4,200</strong><span>From · made to order</span></div>
            <p className="product-lede">A luminous oval centre stone, held in a sculpted setting and finished with a fine pavé band. Designed to catch the light quietly, then keep it.</p>
            <div className="product-rule" />
            <ProductOption label="Metal" note={metal.name}>
              <RadioGroup className="metal-options" value={metalId} onValueChange={setMetalId} aria-label="Choose a metal">
                {metals.map((item) => <label key={item.id} className={`metal-option ${metalId === item.id ? "selected" : ""}`}><RadioGroupItem value={item.id} id={item.id} /><span className="metal-swatch" style={{ background: item.hex }} /><span><b>{item.name}</b><small>{item.tone}</small></span></label>)}
              </RadioGroup>
            </ProductOption>
            <ProductOption label="Ring size" note="Need help?" >
              <div className="size-options" aria-label="Choose a ring size">{sizes.map((item) => <button key={item} className={size === item ? "selected" : ""} onClick={() => setSize(item)} aria-pressed={size === item}>{item}</button>)}</div>
              <button className="size-guide" onClick={() => setSizeGuideOpen(true)}>VIEW THE SIZE GUIDE <ArrowRight size={15} /></button>
            </ProductOption>
            <div className="product-purchase-row"><div className="quantity-control" aria-label="Quantity"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div><button className="button button-gold add-bag-button" onClick={() => setBagOpen(true)}>ADD TO BAG <ArrowRight size={18} /></button></div>
            <div className="delivery-notes"><div><Truck size={19} /><span><b>Complimentary delivery</b><small>Insured across the UAE</small></span></div><div><ShieldCheck size={19} /><span><b>Lifetime service</b><small>Here for every milestone</small></span></div><div><Sparkles size={19} /><span><b>Made to order</b><small>Ready in approximately 3–4 weeks</small></span></div></div>
          </div>
        </section>
        <section className="product-story"><div className="wrap product-story-grid"><div><p className="eyebrow">THE STORY OF THE SOLITAIRE</p><h2>One stone.<br /><em>A thousand little moments.</em></h2></div><div><p>There is something quietly powerful about a solitaire. The centre stone carries the whole feeling — clear, luminous and entirely itself.</p><p>Our oval silhouette is designed with a low, elegant profile, so the ring feels effortless from the first question to every day that follows.</p><Link href="/#craftsmanship" className="text-link">SEE THE CRAFT <ArrowRight size={17} /></Link></div></div></section>
        <section className="product-details-section wrap"><div className="details-heading"><p className="eyebrow">THE DETAILS</p><h2>Made to hold<br /><em>your meaning.</em></h2></div><div className="details-list">{details.map(([title, copy]) => <div key={title} className="detail-row"><button onClick={() => setOpenDetail(openDetail === title ? null : title)} aria-expanded={openDetail === title}><span>{title}</span><ChevronDown size={18} /></button>{openDetail === title && <p>{copy}</p>}</div>)}</div></section>
        <section className="product-information-section"><div className="wrap information-grid"><div><p className="eyebrow">YOUR RING, AT A GLANCE</p><h2>Every detail<br /><em>considered.</em></h2><p>The Solitaire brings the stone, setting and finish together in one quiet silhouette.</p></div><dl><div><dt>Design</dt><dd>Oval diamond solitaire ring</dd></div><div><dt>Centre stone</dt><dd>1.00 ct · F colour · VS clarity</dd></div><div><dt>Setting</dt><dd>Low-profile cathedral · fine pavé band</dd></div><div><dt>Metal options</dt><dd>18k Yellow Gold · 18k Rose Gold · Platinum</dd></div><div><dt>Preparation</dt><dd>Made to order · approximately 3–4 weeks</dd></div></dl></div></section>
        <section className="product-service"><div className="wrap product-service-inner"><div><p className="eyebrow">A BRIGHTER WAY TO CHOOSE</p><h2>A ring that feels<br /><em>like your own.</em></h2></div><div className="service-grid"><div><Check size={16} /><span>IGI-certified diamond<small>Authenticity, clearly considered.</small></span></div><div><Check size={16} /><span>Insured UAE delivery<small>From our studio to your door.</small></span></div><div><Check size={16} /><span>Lifetime service<small>Care for every chapter after.</small></span></div></div></div></section>
        <section className="product-discover wrap"><div><p className="eyebrow">EXPLORE MORE</p><h2>Another expression<br /><em>of your story.</em></h2></div><div className="product-discover-links"><Link href="/#collections"><span className="discover-picture"><Image src="/media/bands.webp" alt="Gold wedding bands on a dark plinth" fill sizes="(max-width: 600px) 85vw, 28vw" className="cover" /></span><span>Wedding bands <ArrowRight size={18} /></span></Link><Link href="/#bespoke"><span className="discover-picture"><Image src="/media/bespoke.webp" alt="Bespoke ring design inspiration" fill sizes="(max-width: 600px) 85vw, 28vw" className="cover" /></span><span>Bespoke inspiration <ArrowRight size={18} /></span></Link></div></section>
      </main>
      <footer className="site-footer product-footer"><div className="wrap"><div className="footer-top"><Link className="wordmark" href="/"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></Link><nav aria-label="Footer navigation"><Link href="/#collections">THE COLLECTION</Link><Link href="/#craftsmanship">CRAFTSMANSHIP</Link><Link href="/#our-world">OUR WORLD</Link></nav><Link href="/" className="back-top" aria-label="Back to home"><ArrowLeft size={20} /></Link></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} Lab Grant Diamond.</span><span>MODERN LOVE. TIMELESS BRILLIANCE.</span></div></div></footer>
      <BagDialog open={bagOpen} onOpenChange={setBagOpen} metal={metal} size={size} quantity={quantity} />
      <Dialog open={sizeGuideOpen} onOpenChange={setSizeGuideOpen}><DialogContent className="size-guide-dialog"><p className="eyebrow">FIND YOUR FIT</p><DialogTitle>Ring size guide</DialogTitle><DialogDescription>Our sizes are listed in EU measurements. Measure the inside circumference of a ring that fits the intended finger, then choose the nearest size.</DialogDescription><div className="size-guide-table" role="table" aria-label="EU ring sizes and inner circumference"><div role="row"><span role="columnheader">EU SIZE</span><span role="columnheader">INNER CIRCUMFERENCE</span></div>{[48,50,52,54,56,58].map(value => <div role="row" key={value}><span role="cell">{value}</span><span role="cell">Approximately {value} mm</span></div>)}</div><p className="size-guide-help">Measure at the end of the day and check the finger on the correct hand. If you are between sizes, consider the fit you prefer before choosing.</p><button className="button button-gold" onClick={() => setSizeGuideOpen(false)}>BACK TO THE RING <ArrowRight size={17} /></button></DialogContent></Dialog>
    </div>
  );
}
