"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Diamond, Gem, Menu, Pause, Play, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Film = { file: string; title: string; subtitle: string };
const films: Film[] = [
  { file: "wedding-hero", title: "A day to remember", subtitle: "The beginning of your forever" },
  { file: "wedding-vows", title: "The promise", subtitle: "A moment held close" },
  { file: "hero", title: "The first encounter", subtitle: "An extraordinary beginning" },
  { file: "collections", title: "The collection", subtitle: "A silhouette for every story" },
  { file: "craft", title: "In the details", subtitle: "A closer look at the craft" },
  { file: "custom-final", title: "From a dream", subtitle: "The art of a personal ring" },
  { file: "emotion-final", title: "Close to you", subtitle: "Made for the everyday and forever" },
  { file: "uae-final", title: "A world of possibilities", subtitle: "A modern expression of love" },
  { file: "trust", title: "A considered experience", subtitle: "The finishing touches" },
  { file: "featured", title: "Distinctly yours", subtitle: "Our signature silhouettes" },
  { file: "closing", title: "Your forever", subtitle: "The beginning of a love story" },
  { file: "gallery", title: "The gallery", subtitle: "Wedding bands, reimagined" },
  { file: "custom", title: "Lines into light", subtitle: "Another view of the creative process" },
  { file: "emotion", title: "The quiet moments", subtitle: "Beauty in the everyday" },
  { file: "uae", title: "After dark", subtitle: "Warm light. Extraordinary brilliance." },
  { file: "intro", title: "A study in light", subtitle: "Every angle tells a story" },
];
const rings = [
  { name: "The Solitaire", category: "ENGAGEMENT RINGS", file: "hero", poster: "solitaire", text: "One remarkable centre stone. A beautifully simple expression of a love that needs no explanation.", detail: "Discover the solitaire silhouette" },
  { name: "Together, Always", category: "WEDDING BANDS", file: "gallery", poster: "bands", text: "Two individual stories, one shared future. Explore warm metallic tones and diamond-set bands.", detail: "Discover wedding bands" },
  { name: "A Different Light", category: "SIGNATURE RINGS", file: "featured", poster: "signature", text: "Distinctive cuts and expressive settings. Find the silhouette that feels entirely your own.", detail: "Discover signature rings" },
  { name: "Only for You", category: "BESPOKE INSPIRATION", file: "custom-final", poster: "bespoke", text: "From the first imagined line to the final setting, every detail is an opportunity to tell your story.", detail: "Discover bespoke inspiration" },
];
const shapes = [
  { name: "Oval", note: "Soft length and graceful light" },
  { name: "Round", note: "An enduring classic" },
  { name: "Marquise", note: "A striking, elongated silhouette" },
  { name: "Emerald", note: "Clean lines and quiet depth" },
];
const chapters = [
  { file: "craft", label: "01 — THE DETAIL", title: <>Extraordinary.<br /><em>In every detail.</em></>, text: "Light, held in a thousand little moments. Discover the facets, the setting, and the details that make a ring unforgettable." },
  { file: "custom-final", label: "02 — THE POSSIBILITY", title: <>Imagined by you.<br /><em>Made personal.</em></>, text: "A line becomes a form. A form becomes a feeling. Let your story inspire the ring you will call your own." },
  { file: "emotion-final", label: "03 — THE FEELING", title: <>For the moment.<br /><em>And all the afters.</em></>, text: "The question. The yes. The quiet everyday. A little reminder of everything that matters, always close to you." },
];
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

function useMotionPreference() {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!mq.matches);
    update(); mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return [motion, setMotion] as const;
}

function AmbientFilm({ file, motion, className = "", priority = false }: { file: string; motion: boolean; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || !motion) return;
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && !document.hidden) void v.play().catch(() => {}); else v.pause();
    }), { rootMargin: "80px", threshold: 0.05 });
    io.observe(v);
    const onVisibility = () => { if (document.hidden) v.pause(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { io.disconnect(); v.pause(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [motion]);
  return <div className={`ambient ${className}`}>
    <Image src={`/media/${file}.webp`} alt="" fill sizes="100vw" priority={priority} className="cover" />
    {motion && <video ref={ref} src={`/media/${file}.mp4`} poster={`/media/${file}.webp`} muted playsInline loop preload="none" aria-hidden="true" />}
  </div>;
}

function ScrollHero({ motion, openFilm }: { motion: boolean; openFilm: () => void }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [playBlocked, setPlayBlocked] = useState(false);
  useEffect(() => {
    const s = section.current, v = video.current, st = stage.current;
    if (!s || !v || !st || !motion) return;
    let raf = 0, inView = false;
    const mobile = window.matchMedia("(max-width: 600px)");
    const render = () => {
      raf = 0;
      const rect = s.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, s.offsetHeight - window.innerHeight));
      st.style.setProperty("--hero-progress", String(progress));
    };
    const update = () => { if (inView && !raf) raf = requestAnimationFrame(render); };
    const syncPlayback = () => {
      if (inView && !document.hidden) {
        if (v.paused) void v.play().then(() => setPlayBlocked(false)).catch(() => setPlayBlocked(true));
      }
      else v.pause();
      update();
    };
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncPlayback(); });
    io.observe(s);
    v.addEventListener("loadedmetadata", render);
    v.addEventListener("seeked", update);
    mobile.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    render();
    return () => { cancelAnimationFrame(raf); io.disconnect(); v.pause(); mobile.removeEventListener("change", syncPlayback); document.removeEventListener("visibilitychange", syncPlayback); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); v.removeEventListener("loadedmetadata", render); v.removeEventListener("seeked", update); st.style.removeProperty("--hero-progress"); };
  }, [motion]);
  return <section className={`hero-scroll ${!motion ? "motion-still" : ""}`} ref={section} id="home" aria-labelledby="hero-title">
    <div className="hero-stage" ref={stage}>
      <div className="hero-media">
        <Image src="/media/wedding-hero.webp" alt="A bride wearing a diamond ring shares a tender moment with her partner" fill priority sizes="100vw" className="cover" />
        {motion && <video ref={video} src="/media/wedding-hero.mp4" poster="/media/wedding-hero.webp" autoPlay muted playsInline loop preload="auto" aria-hidden="true" />}
      </div>
      <div className="hero-shade" />
      {motion && playBlocked && <button className="mobile-play-prompt" onClick={() => { if (video.current) void video.current.play().then(() => setPlayBlocked(false)).catch(() => setPlayBlocked(true)); }}><Play size={15} fill="currentColor" /> PLAY THE EXPERIENCE</button>}
      <div className="hero-content wrap">
        <p className="eyebrow entrance e1">THE LAB GRANT BRIDAL COLLECTION</p>
        <h1 id="hero-title" className="entrance e2">For the day<br /><em>you say forever.</em></h1>
        <p className="hero-description entrance e3">A ring for the promise. A light for every day after.</p>
        <div className="hero-actions entrance e4">
          <a className="button button-gold" href="/contact#book">BOOK A PRIVATE CONVERSATION <ArrowRight size={18} /></a>
          <button className="film-button" onClick={openFilm}><span className="play-circle"><Play size={13} fill="currentColor" /></span> WATCH THE FILM</button>
        </div>
      </div>
      <div className="hero-aside"><span>ONE PROMISE.</span><span>A LIFETIME OF MOMENTS.</span><i /></div>
      <div className="hero-bottom wrap">
        <a href="#bridal" className="scroll-hint"><span className="scroll-line" /> SCROLL TO DISCOVER <ArrowDown size={14} /></a>
        <span className="hero-note">LAB-GROWN DIAMOND RINGS</span>
        <div className="hero-pagination"><span>01</span><i /><span>03</span></div>
      </div>
    </div>
  </section>;
}

function CraftJourney({ motion }: { motion: boolean }) {
  const root = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const progressLine = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!root.current || !motion) return;
    const el = root.current;
    let frame = 0, near = false;
    const render = () => {
      frame = 0;
      const p = clamp(-el.getBoundingClientRect().top / Math.max(1, el.offsetHeight - window.innerHeight));
      const index = Math.min(2, Math.floor(p * 3));
      setActive(prev => prev === index ? prev : index);
      if (progressLine.current) progressLine.current.style.transform = `scaleX(${p})`;
      if (window.matchMedia("(max-width: 600px)").matches) return;
      const v = videos.current[index];
      if (v && Number.isFinite(v.duration) && !v.seeking) {
        const t = clamp(p * 3 - index) * Math.max(0, v.duration - 0.08);
        if (Math.abs(v.currentTime - t) > 0.04) v.currentTime = t;
      }
    };
    const update = () => { if (near && !frame) frame = requestAnimationFrame(render); };
    const io = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; if (near) { setReady(true); update(); } }, { rootMargin: "500px" });
    io.observe(el);
    window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); io.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [motion]);
  useEffect(() => {
    if (!motion || !ready) return;
    const mobile = window.matchMedia("(max-width: 600px)");
    const syncPlayback = () => {
      videos.current.forEach((v, index) => {
        if (!v) return;
        if (mobile.matches && index === active && root.current && root.current.getBoundingClientRect().bottom > 0 && root.current.getBoundingClientRect().top < window.innerHeight && !document.hidden) { if (v.paused) void v.play().catch(() => {}); }
        else v.pause();
      });
    };
    syncPlayback();
    mobile.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("scroll", syncPlayback, { passive: true });
    return () => { mobile.removeEventListener("change", syncPlayback); document.removeEventListener("visibilitychange", syncPlayback); window.removeEventListener("scroll", syncPlayback); };
  }, [active, motion, ready]);
  const goTo = (index: number) => {
    if (!root.current) return;
    if (!motion) { document.getElementById(`chapter-${index}`)?.scrollIntoView({ behavior: "auto" }); return; }
    const top = root.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (root.current.offsetHeight - window.innerHeight) * ((index + 0.25) / 3), behavior: "smooth" });
  };
  return <section id="craftsmanship" ref={root} className={`craft-journey ${!motion ? "motion-still" : ""}`} aria-label="The story behind the ring">
    <div className="craft-sticky">
      {chapters.map((chapter, index) => <article key={chapter.file} id={`chapter-${index}`} className={`craft-scene ${active === index ? "active" : ""}`} aria-hidden={motion && active !== index}>
        <div className="craft-media"><Image src={`/media/${chapter.file}.webp`} alt="" fill sizes="100vw" className="cover" />
          {motion && ready && <video ref={el => { videos.current[index] = el; }} src={`/media/${chapter.file}.mp4`} muted playsInline loop preload="auto" poster={`/media/${chapter.file}.webp`} aria-hidden="true" />}
        </div>
        <div className="craft-shade" />
        <div className="craft-copy wrap"><p className="eyebrow">{chapter.label}</p><h2>{chapter.title}</h2><p>{chapter.text}</p><span className="detail-line" /></div>
      </article>)}
      <div className="chapter-nav wrap" aria-label="Ring story chapters">
        {chapters.map((c, i) => <button key={c.file} className={active === i ? "active" : ""} onClick={() => goTo(i)} aria-current={active === i ? "step" : undefined}><span>0{i + 1}</span>{["THE CRAFT", "YOUR VISION", "THE FEELING"][i]}</button>)}
      </div>
      <div className="journey-progress"><div ref={progressLine} /></div>
    </div>
  </section>;
}

export default function DiamondExperience() {
  const router = useRouter();
  const [motion, setMotion] = useMotionPreference();
  const [menu, setMenu] = useState(false);
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const [selectedRing, setSelectedRing] = useState<number | null>(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const filmRef = useRef<HTMLVideoElement>(null);
  const openFilm = useCallback((index = 0) => setFilmIndex(index), []);
  useEffect(() => {
    const update = () => setHeaderSolid(window.scrollY > 40);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!motion) return;
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: 0.08 });
    els.forEach(el => { el.classList.add("reveal-ready"); io.observe(el); });
    return () => { io.disconnect(); els.forEach(el => el.classList.remove("reveal-ready")); };
  }, [motion]);
  const currentFilm = filmIndex === null ? null : films[filmIndex];
  const ring = selectedRing === null ? null : rings[selectedRing];
  return <div className={motion ? "site motion-on" : "site motion-off"}>
    <a className="skip-link" href="#bridal">Skip to bridal collection</a>
    <header className={`site-header ${headerSolid ? "solid" : ""}`}>
      <div className="header-inner wrap">
        <a className="wordmark" href="#home" aria-label="Lab Grant Diamond home"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="/bridal-guide">BRIDAL</a><a href="/engagement-rings">THE RINGS</a><Link href="/collections">COLLECTIONS</Link><a href="/wedding-day">THE WEDDING DAY</a><a href="/our-craft">OUR CRAFT</a><Link href="/blog">JOURNAL</Link></nav>
        <div className="header-actions"><button className="motion-toggle" onClick={() => setMotion(v => !v)} aria-label={motion ? "Pause motion" : "Enable motion"} aria-pressed={motion}>{motion ? <Pause size={14} /> : <Play size={14} />}<span>MOTION {motion ? "ON" : "OFF"}</span></button><a className="header-cta" href="/contact#book">BOOK A CONVERSATION <ArrowUpRight size={14} /></a><button className="mobile-toggle" aria-label="Open navigation" onClick={() => setMenu(true)}><Menu size={24} /></button></div>
      </div>
    </header>
    <main>
      <ScrollHero motion={motion} openFilm={() => openFilm(0)} />
      <section id="bridal" className="bridal-intro section-pad" aria-labelledby="bridal-heading"><div className="wrap reveal"><p className="eyebrow">LAB GRANT BRIDAL</p><span className="bridal-rule" aria-hidden="true" /><h2 id="bridal-heading">Every love has its own<br /><em>beautiful beginning.</em></h2><p>From the question that changes everything to the vows that make it yours, discover rings made to hold every part of your story.</p><a className="text-link" href="#collections">DISCOVER THE COLLECTION <ArrowRight size={17} /></a></div></section>
      <section className="bridal-paths" aria-label="Explore bridal jewelry"><div className="wrap bridal-path-grid"><a className="bridal-path reveal" href="/engagement-rings"><Image src="/media/solitaire.webp" alt="Solitaire diamond engagement ring" fill sizes="(max-width: 700px) 100vw, 33vw" className="cover" /><span className="bridal-path-copy"><small>01 / THE QUESTION</small><strong>Engagement Rings</strong><span>EXPLORE ENGAGEMENT RINGS <ArrowRight size={17}/></span></span></a><a className="bridal-path reveal" href="/wedding-bands"><Image src="/media/bands.webp" alt="Wedding band design inspiration" fill sizes="(max-width: 700px) 100vw, 33vw" className="cover" /><span className="bridal-path-copy"><small>02 / THE PROMISE</small><strong>Wedding Bands</strong><span>EXPLORE INSPIRATION <ArrowRight size={17}/></span></span></a><a className="bridal-path reveal" href="/wedding-day"><Image src="/media/wedding-vows.webp" alt="Couple together at their wedding ceremony" fill sizes="(max-width: 700px) 100vw, 33vw" className="cover" /><span className="bridal-path-copy"><small>03 / THE CELEBRATION</small><strong>The Wedding Day</strong><span>STEP INTO THE MOMENT <ArrowRight size={17}/></span></span></a></div></section>
      <section id="wedding-day" className="wedding-moment" aria-labelledby="wedding-title"><AmbientFilm file="wedding-vows" motion={motion} /><div className="wedding-moment-shade" /><div className="wrap wedding-moment-copy reveal"><p className="eyebrow">THE WEDDING DAY</p><h2 id="wedding-title">A moment that<br /><em>lasts a lifetime.</em></h2><p>Two hands. One promise. The beginning of everything.</p><button className="text-link" onClick={() => openFilm(1)}>WATCH THE MOMENT <Play size={15}/></button></div></section>
      <section id="collections" className="collections-section section-pad">
        <div className="wrap">
          <div className="section-top reveal"><div><p className="eyebrow">THE BRIDAL COLLECTION</p><h2>A ring for <em>your kind of love.</em></h2></div><p className="section-intro">For the proposal, the ceremony and all the days that follow. Discover the shape of your forever.</p></div>
          <div className="ring-grid">
            {rings.map((r, i) => <button key={r.name} className="ring-card reveal" onClick={() => { if (i === 0) router.push("/product/solitaire-ring"); else setSelectedRing(i); }} aria-label={i === 0 ? "Open The Solitaire product page" : r.detail} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="ring-picture"><Image src={`/media/${r.poster}.webp`} alt={r.name === "Together, Always" ? "A pair of gold wedding bands on a dark stone plinth" : `${r.name} diamond ring`} fill sizes="(max-width: 600px) 82vw, (max-width: 1000px) 45vw, 23vw" className="cover" /><span className="ring-number">0{i + 1}</span></div>
              <div className="ring-info"><p className="eyebrow">{r.category}</p><h3>{r.name}</h3><span className="ring-arrow"><ArrowUpRight size={18} /></span></div>
            </button>)}
          </div>
          <div className="collection-foot"><span><Gem size={17} /> LAB-GROWN. ENDLESSLY CAPTIVATING.</span><Link className="text-link" href="/collections">EXPLORE ALL COLLECTIONS <ArrowRight size={17} /></Link></div>
        </div>
      </section>
      <section className="shape-section section-pad" id="diamond-shapes" aria-labelledby="shape-heading">
        <div className="wrap">
          <div className="shape-heading reveal"><p className="eyebrow">A GUIDE TO THE DIAMOND</p><span className="shape-heading-rule" aria-hidden="true" /><h2 id="shape-heading">Find your <em>shape of light.</em></h2><p>Every diamond has its own way of holding the light. Discover the silhouette that feels like yours.</p></div>
          <div className="shape-grid">{shapes.map((shape, index) => <article className="shape-card reveal" key={shape.name} style={{ transitionDelay: `${index * 70}ms` }}><div className="shape-visual"><Image src={`/media/cut-${shape.name.toLowerCase()}.webp`} alt={`${shape.name} cut diamond on ivory silk`} fill sizes="(max-width: 700px) 45vw, 23vw" className="cover" /></div><div className="shape-card-copy"><span className="shape-index">0{index + 1} / THE CUT</span><h3>{shape.name}</h3><p>{shape.note}</p></div></article>)}</div>
          <div className="shape-ending reveal"><span>THE SOLITAIRE IS AVAILABLE TO EXPLORE</span><a href="/diamond-guide" className="text-link">READ THE DIAMOND GUIDE <ArrowRight size={17} /></a></div>
        </div>
      </section>
      <CraftJourney motion={motion} />
      <section className="bespoke-section section-pad" id="bespoke" aria-labelledby="bespoke-heading"><div className="wrap bespoke-grid"><div className="bespoke-image reveal"><Image src="/media/bespoke.webp" alt="Diamond ring design inspiration in warm bronze light" fill sizes="(max-width: 900px) 100vw, 48vw" className="cover" /></div><div className="bespoke-content reveal"><p className="eyebrow">BESPOKE INSPIRATION</p><h2 id="bespoke-heading">From a thought<br /><em>to your ring.</em></h2><p>There is room for your own story in every detail. Imagine the cut, consider the setting, and discover how the final piece comes together.</p><ol className="bespoke-steps"><li><span>01</span><div><h3>Choose a silhouette</h3><p>Start with the diamond shape that speaks to you.</p></div></li><li><span>02</span><div><h3>Consider the setting</h3><p>Explore the metal and the details around the stone.</p></div></li><li><span>03</span><div><h3>Make it yours</h3><p>Find the combination that feels personal.</p></div></li></ol><a href="/bespoke" className="text-link">EXPLORE DESIGN IDEAS <ArrowRight size={18} /></a></div></div></section>
      <section className="considered-section section-pad" id="our-world">
        <div className="wrap considered-grid">
          <div className="considered-image reveal"><AmbientFilm file="trust" motion={motion} /><span className="image-caption">THOUGHTFUL, DOWN TO THE LAST DETAIL</span></div>
          <div className="considered-copy reveal"><p className="eyebrow">THE LAB GRANT PERSPECTIVE</p><h2>Beautifully made.<br /><em>Thoughtfully chosen.</em></h2><p>Some things never change. The beauty of a diamond. The meaning of a promise. We bring a modern perspective to the ring you will treasure.</p><div className="values"><div><Diamond size={22} strokeWidth={1} /><span>A love of brilliance<small>Light at the heart of every design.</small></span></div><div><Sparkles size={22} strokeWidth={1} /><span>A considered approach<small>Thoughtful details, from setting to presentation.</small></span></div><div><Gem size={22} strokeWidth={1} /><span>A personal expression<small>A silhouette that feels like you.</small></span></div></div><button className="text-link" onClick={() => openFilm(9)}>A CLOSER LOOK <ArrowRight size={18} /></button></div>
        </div>
      </section>
      <section className="assurance-section" aria-label="The Lab Grant experience"><div className="wrap assurance-grid"><div><Diamond size={25} strokeWidth={1} /><h3>Considered diamonds</h3><p>A modern perspective on the stone at the heart of the ring.</p></div><div><Sparkles size={25} strokeWidth={1} /><h3>Personal details</h3><p>Thoughtful silhouettes, settings and finishes.</p></div><div><Gem size={25} strokeWidth={1} /><h3>Made for your story</h3><p>A ring to carry the moments that matter to you.</p></div></div></section>
      <section className="world-section">
        <div className="world-image"><AmbientFilm file="uae-final" motion={motion} /></div>
        <div className="world-shade" />
        <div className="wrap world-copy reveal"><p className="eyebrow">A MODERN LOVE STORY</p><h2>Rooted in a moment.<br /><em>Made for your world.</em></h2><p>From a quiet question to a lifetime of memories.<br />Let the next chapter be yours.</p><button className="text-link" onClick={() => openFilm(8)}>EXPLORE OUR WORLD <ArrowRight size={18} /></button></div>
      </section>
      <section className="questions-section section-pad" id="questions"><div className="wrap questions-grid"><div><p className="eyebrow">GOOD TO KNOW</p><h2>Questions worth<br /><em>asking.</em></h2></div><div className="questions-list"><details><summary>What is a lab-grown diamond?<ChevronRight size={18} /></summary><p>A lab-grown diamond is a real diamond created in a controlled environment. It shares the same physical and optical properties as a mined diamond.</p></details><details><summary>Can I choose the metal and ring size?<ChevronRight size={18} /></summary><p>On The Solitaire page, you can explore the listed metal and ring-size choices before adding the design to your bag preview.</p></details><details><summary>When will my ring be ready?<ChevronRight size={18} /></summary><p>The Solitaire is shown as made to order, with an approximate preparation time of three to four weeks. Confirm availability and timing before placing a real order.</p></details><details><summary>Can I complete an order online?<ChevronRight size={18} /></summary><p>Online checkout is currently a design preview. Payment and inventory are not connected yet.</p></details></div></div></section>
      <section className="closing-section section-pad">
        <div className="closing-art"><AmbientFilm file="closing" motion={motion} /></div><div className="closing-shade" />
        <div className="wrap closing-copy reveal"><p className="eyebrow">MORE THAN A RING</p><h2>Your forever<br /><em>begins here.</em></h2><p>Find the one that says everything.</p><a className="button button-gold" href="#collections">FIND YOUR RING <ArrowRight size={18} /></a></div>
      </section>
    </main>
      <footer className="site-footer"><div className="wrap"><div className="footer-top"><a className="wordmark" href="#home"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></a><nav aria-label="Footer navigation"><a href="/bridal-guide">BRIDAL GUIDE</a><a href="/engagement-rings">ENGAGEMENT RINGS</a><Link href="/collections">COLLECTIONS</Link><a href="/wedding-bands">WEDDING BANDS</a><a href="/wedding-day">WEDDING DAY</a><a href="/diamond-guide">DIAMONDS</a><a href="/our-craft">OUR CRAFT</a><a href="/bespoke">BESPOKE</a><Link href="/blog">JOURNAL</Link><a href="/about">ABOUT</a><a href="/ring-care">RING CARE</a><a href="/contact#book">BOOK AN APPOINTMENT</a><a href="/privacy">PRIVACY</a><a href="#questions">QUESTIONS</a><button onClick={() => openFilm()}>THE FILMS</button></nav><a href="#home" className="back-top" aria-label="Back to top"><ArrowUpRight size={20} /></a></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} Lab Grant Diamond.</span><span>MODERN LOVE. TIMELESS BRILLIANCE.</span></div></div></footer>
    <Dialog open={menu} onOpenChange={setMenu}><DialogContent className="navigation-dialog"><DialogTitle className="sr-only">Navigation</DialogTitle><DialogDescription className="sr-only">Explore Lab Grant Diamond</DialogDescription><span className="eyebrow">LAB GRANT DIAMOND</span><nav aria-label="Mobile navigation">{[["Book an appointment", "/contact#book"], ["Bridal guide", "/bridal-guide"], ["Engagement rings", "/engagement-rings"], ["Collections", "/collections"], ["Wedding bands", "/wedding-bands"], ["The wedding day", "/wedding-day"], ["Diamond guide", "/diamond-guide"], ["Our craft", "/our-craft"], ["Bespoke", "/bespoke"], ["Journal", "/blog"], ["About", "/about"], ["Ring care", "/ring-care"], ["Questions", "#questions"]].map(([title,href],i)=><a key={href} href={href} onClick={()=>setMenu(false)}><span>0{i+1}</span>{title}<ArrowUpRight size={22}/></a>)}</nav><button className="text-link" onClick={()=>{setMenu(false);openFilm();}}>WATCH THE FILM <Play size={14}/></button></DialogContent></Dialog>
    <Dialog open={filmIndex !== null} onOpenChange={open => { if (!open) setFilmIndex(null); }}><DialogContent className="film-dialog">{currentFilm && <><div className="film-heading"><p className="eyebrow">THE LAB GRANT FILMS</p><DialogTitle>{currentFilm.title}</DialogTitle><DialogDescription>{currentFilm.subtitle}</DialogDescription></div><video key={currentFilm.file} ref={filmRef} controls autoPlay muted playsInline poster={`/media/${currentFilm.file}.webp`} src={`/media/${currentFilm.file}.mp4`} aria-label={currentFilm.title} onEnded={() => setFilmIndex(i => i === null ? null : (i + 1) % films.length)} /><div className="film-navigation"><button aria-label="Previous film" onClick={() => setFilmIndex(i => ((i ?? 0) + films.length - 1) % films.length)}><ChevronLeft size={20} /></button><span>{String((filmIndex ?? 0)+1).padStart(2,"0")} / {films.length} <span className="film-next-label">{currentFilm.title}</span></span><button aria-label="Next film" onClick={() => setFilmIndex(i => ((i ?? 0) + 1) % films.length)}><ChevronRight size={20} /></button></div><div className="film-chapters" aria-label="Choose a film">{films.map((f,i)=><button key={f.file} onClick={()=>setFilmIndex(i)} aria-pressed={filmIndex===i} title={f.title}>{String(i+1).padStart(2,"0")}</button>)}</div></>}</DialogContent></Dialog>
    <Dialog open={selectedRing !== null} onOpenChange={open=>{if(!open)setSelectedRing(null);}}><DialogContent className="ring-dialog">{ring && <><div className="ring-dialog-visual"><AmbientFilm file={ring.file} motion={motion} /></div><div className="ring-dialog-copy"><p className="eyebrow">{ring.category}</p><DialogTitle>{ring.name}</DialogTitle><DialogDescription>{ring.text}</DialogDescription><p className="ring-detail-note">A closer look at the collection’s design inspiration.</p><button className="button button-gold" onClick={()=>{setSelectedRing(null);openFilm(films.findIndex(f=>f.file===ring.file));}}>EXPLORE THE DESIGN <Play size={15}/></button></div></>}</DialogContent></Dialog>
  </div>;
}
