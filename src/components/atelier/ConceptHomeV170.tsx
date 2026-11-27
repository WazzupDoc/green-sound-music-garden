import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { images, videos, ytThumb, type Video } from "@/data/site";
import { ProductionIndex } from "@/components/atelier/ProductionIndex";
import { VideoLite } from "@/components/site/VideoLite";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={diagonal ? "M5 19 19 5M7 5h12v12" : "M3 12h17m-7-7 7 7-7 7"}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
function Play() {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 4.5 20 12 8 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>;
}
const films: { label: string; eyebrow: string; video: Video }[] = [
  { label: "Nuntă la Ramada Pitești", eyebrow: "NUNTĂ / DJ & MC", video: videos.nuntaRamada },
  { label: "Show de lumini Green Sound", eyebrow: "LUMINI / DJ / MC", video: videos.showLumini },
  { label: "Green Sound Music la TV", eyebrow: "LIVE / STUDIO", video: videos.neatza },
];

/** V297: a new poster composition, in normal document flow. Native links and
 * the real existing service programme; no video load before explicit Play. */
export function ConceptHomeV170() {
  const heroRef = useRef<HTMLElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [lightHue, setLightHue] = useState<"green" | "cool">("green");
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const film = filmIndex === null ? null : films[filmIndex];
  const filmTriggerRef = useRef<HTMLButtonElement | null>(null);
  const openFilm = (index: number, trigger: HTMLButtonElement) => {
    filmTriggerRef.current = trigger;
    setFilmIndex(index);
  };
  useEffect(() => { setHydrated(true); }, []);
  // Pointer depth is progressive and only attached to a fine pointer. No React render per frame.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || !lightsOn) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const reset = () => { cancelAnimationFrame(frame); el.style.removeProperty("--gs300-x"); el.style.removeProperty("--gs300-y"); };
    const move = (e: PointerEvent) => {
      if (!media.matches || document.documentElement.dataset["gsPerformance"] === "lite") { reset(); return; }
      const rect = el.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, 2*(e.clientX-rect.left)/rect.width-1));
      const y = Math.max(-1, Math.min(1, 2*(e.clientY-rect.top)/rect.height-1));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {el.style.setProperty("--gs300-x", (x*9).toFixed(2)+"px");el.style.setProperty("--gs300-y",(y*6).toFixed(2)+"px");});
    };
    el.addEventListener("pointermove", move, {passive:true});
    el.addEventListener("pointerleave", reset);
    media.addEventListener("change", reset);
    return () => {reset();el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",reset);media.removeEventListener("change",reset);};
  }, [lightsOn]);

  return <>
    <section ref={heroRef} className="gs170-hero" data-stage="cinematic" aria-labelledby="gs170-title"
      data-hydrated={hydrated ? "true" : "false"} data-lights={lightsOn ? "on" : "off"} data-hue={lightHue}>
      <div className="gs297-shell">
        <div className="gs300-atmosphere" aria-hidden="true"><i/><i/><i/></div>
        <div className="gs297-coverline">
          <span>GREEN SOUND MUSIC</span>
          <span className="gs297-signal" aria-hidden="true"><svg viewBox="0 0 90 22" width="90" height="22">
            <path d="M1 11h17l5-7 5 14 5-10 5 5h12l5-12 5 20 5-10h24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg></span>
          <span>PITEȘTI / ARGEȘ</span>
        </div>
        <div className="gs170-hero__content">
          <span className="gs300-eyebrow">MUZICĂ · TEHNICĂ · PRODUCȚIE EVENIMENTE</span>
          <h1 id="gs170-title"><span>EVENIMENTE</span><em>DE NEUITAT.</em></h1>
          <div className="gs297-cover-aside">
            <span className="gs170-kicker">MUZICĂ · SUNET · LUMINĂ</span>
            <p className="gs170-hero__lead">DJ & MC, trupă live, sonorizare și lumini pentru nunți, petreceri și concerte. Din Pitești, pentru evenimentul tău.</p>
            <Link to="/contact" className="gs170-btn gs170-btn--green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM7 2v5m10-5v5M3 9h18M7 13h.1m5 0h.1m5 0h.1M7 17h.1m5 0h.1m5 0h.1"/></svg><span>Planifică evenimentul</span> <Arrow /></Link>
            <button type="button" className="gs300-showreel" onClick={event => openFilm(1, event.currentTarget)}><Play /> Vezi showreel</button>
          </div>
        </div>
        <div className="gs297-diptych">
          <figure className="gs170-stage">
            <img src={images.concert.src} alt={images.concert.alt} width={images.concert.w}
              height={images.concert.h} className="gs170-stage__image" decoding="async" fetchPriority="high" />
            <figcaption><span>01 / PRODUCȚIE LIVE</span><span>ARHIVA GREEN SOUND</span></figcaption>
          </figure>
          <figure className="gs297-portrait gs-live-deck" aria-hidden="true">
            <LiveDeck />
            <figcaption>GREEN SOUND / SIGNAL</figcaption>
          </figure>
        </div>
        <StageWave />
        <div className="gs297-cover-bottom">
          <a href="#gs-production-index" className="gs170-inline">Explorează serviciile <Arrow /></a>
          <a href="#gs170-films" className="gs170-inline">Vezi portofoliul <Play /></a>
          <div className="gs170-hero__control" role="group" aria-label="Atmosfera vizuală a site-ului">
            <span className="gs297-control-label">ATMOSFERĂ</span>
            <button type="button" aria-pressed={lightsOn} onClick={() => setLightsOn(value => !value)}>{lightsOn ? "Efect ON" : "Efect OFF"}</button>
            <button type="button" aria-pressed={lightHue === "green"} onClick={() => setLightHue("green")}>Verde</button>
            <button type="button" aria-pressed={lightHue === "cool"} onClick={() => setLightHue("cool")}>Rece</button>
          </div>
        </div>
      </div>
    </section>
    <ProductionIndex />
    <section className="gs170-films" id="gs170-films" aria-labelledby="gs170-films-title">
      <div className="gs297-shell">
        <div className="gs297-film-heading">
          <div>
            <span className="gs170-kicker">03 / FILME GREEN SOUND</span>
            <h2 id="gs170-films-title">În <em>cadru.</em></h2>
          </div>
          <div>
            <p>Un ring de dans, un show de lumini și o apariție TV. Trei filmări publicate de Green Sound Music.</p>
            <Link to="/portofoliu" className="gs170-inline">Toată arhiva <Arrow diagonal /></Link>
          </div>
        </div>
        <div className="gs170-films__cards">
          {films.map((item, index) => <button className="gs170-film-card" key={item.video.id} type="button"
            onClick={event => openFilm(index, event.currentTarget)} aria-label={"Deschide filmul: " + item.label}>
            <span className="gs170-film-card__image">
              <img src={item.video.poster || ytThumb(item.video, "sd")} alt="" width={640} height={360} loading="lazy" decoding="async" />
              <span className="gs170-film-card__play"><Play /> <span>Redă filmul</span></span>
              <span className="gs170-film-card__number">0{index + 1} / 03</span>
            </span>
            <span className="gs170-film-card__title">
              <span><small>{item.eyebrow}</small><strong>{item.label}</strong></span><Arrow diagonal />
            </span>
          </button>)}
        </div>
      </div>
    </section>
    <section className="gs170-final" aria-labelledby="gs170-final-title">
      <div className="gs297-shell gs170-final__inner">
        <div>
          <span className="gs170-kicker">04 / URMĂTORUL EVENIMENT</span>
          <h2 id="gs170-final-title">Spune-ne data.<br/><em>Stabilim detaliile.</em></h2>
        </div>
        <div>
          <p>Spune-ne unde și când are loc evenimentul, câți invitați aștepți și ce servicii te interesează.</p>
          <Link to="/contact" className="gs170-btn gs170-btn--green">Solicită o ofertă <Arrow diagonal /></Link>
        </div>
        <svg className="gs297-final-wave" viewBox="0 0 500 105" fill="none" aria-hidden="true">
          <path d="M0 52h90l10-10 10 20 14-38 14 56 15-75 17 98 15-75 15 56 14-38 12 16h274" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
    <Dialog open={filmIndex !== null} onOpenChange={open => { if (!open) setFilmIndex(null); }}>
      <DialogContent className="gs170-dialog w-[min(94vw,1000px)] max-w-none max-h-[85dvh] overflow-y-auto bg-[#0c1d15] text-white border-white/30" onCloseAutoFocus={event => {
        const trigger = filmTriggerRef.current;
        if (trigger?.isConnected) {
          event.preventDefault();
          trigger.focus({ preventScroll: true });
        }
        filmTriggerRef.current = null;
      }}>
        <DialogTitle className="pr-8 font-display text-xl">{film?.label ?? "Film Green Sound Music"}</DialogTitle>
        <DialogDescription className="text-white/80">Film real Green Sound Music. Apasă Play pentru a porni videoclipul.</DialogDescription>
        {film && <VideoLite video={film.video} className="aspect-video w-full" />}
      </DialogContent>
    </Dialog>
  </>;
}

/** Original deterministic vector ribbon; a decorative visual, not an audio meter. */
function StageWave() {
  const paths = Array.from({length: 21}, (_, line) => {
    const t = line / 20;
    return Array.from({length: 65}, (_, i) => {
      const u = i / 64;
      const x = u * 1000;
      const envelope = Math.sin(Math.PI*u);
      const y = 116 + Math.sin(u*Math.PI*3.7 + t*1.25)*envelope*(30+t*51) + (t-.5)*28*envelope;
      return (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }).join(" ");
  });
  return <svg className="gs300-wave" viewBox="0 0 1000 240" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    {paths.map((d,i)=><path key={i} d={d} stroke="currentColor" strokeWidth={i===10?1.5:.65} opacity={.25+Math.sin(i/20*Math.PI)*.65}/>)}
  </svg>;
}

/** Original decorative DJ-console illustration. No real audio input or equipment claim. */
function LiveDeck() {
  return <svg className="gs-live-deck__art" viewBox="0 0 300 220" fill="none" aria-hidden="true">
    <path d="M18 40V18h22m220 0h22v22M18 180v22h22m220 0h22v-22" stroke="#b7f843" strokeWidth="1.4"/>
    <path d="M24 62h252M24 170h252" stroke="#89b49b" strokeOpacity=".24"/>
    <g className="gs-live-deck__disc">
      <circle cx="92" cy="114" r="44" stroke="#91b6a5" strokeOpacity=".5"/>
      <circle cx="92" cy="114" r="37" stroke="#b7f843" strokeDasharray="54 12 2 14 28 123"/>
      <circle cx="92" cy="114" r="30" stroke="#91b6a5" strokeOpacity=".35"/>
      <circle cx="92" cy="114" r="11" stroke="#b7f843"/>
      <path d="M92 74v15m0 50v15M52 114h15m50 0h15" stroke="#a3c2ae" strokeOpacity=".55"/>
      <circle cx="92" cy="114" r="2" fill="#b7f843"/>
    </g>
    <g stroke="#91b6a5" strokeOpacity=".6">
      <path d="M162 80v68m36-68v68m36-68v68m30-68v68"/>
      <path d="M154 91h16m20 33h16m20-22h16m14 30h16" stroke="#c4fa55" strokeWidth="5"/>
    </g>
    <g className="gs-live-deck__meter" stroke="#c4fa55" strokeWidth="2.5" strokeLinecap="round">
      {[8,15,25,11,32,18,38,24,13,30,17,8,22,11,5].map((h,i)=><path key={i} style={{animationDelay:(i%5)*.08+"s"}} d={"M"+(36+i*16)+" "+(45-h/2)+"v"+h}/>)}
    </g>
    <path d="M32 184h40l6-5 6 10 8-18 8 18 6-5h160" stroke="#b7f843" strokeOpacity=".7"/>
  </svg>;
}
