import { useEffect, useState } from "react";
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
  const [hydrated, setHydrated] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [lightHue, setLightHue] = useState<"green" | "cool">("green");
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const film = filmIndex === null ? null : films[filmIndex];
  useEffect(() => { setHydrated(true); }, []);

  return <>
    <section className="gs170-hero" aria-labelledby="gs170-title"
      data-hydrated={hydrated ? "true" : "false"} data-lights={lightsOn ? "on" : "off"} data-hue={lightHue}>
      <div className="gs297-shell">
        <div className="gs297-coverline">
          <span>GREEN SOUND MUSIC</span>
          <span className="gs297-signal" aria-hidden="true"><svg viewBox="0 0 90 22" width="90" height="22">
            <path d="M1 11h17l5-7 5 14 5-10 5 5h12l5-12 5 20 5-10h24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg></span>
          <span>PITEȘTI / ARGEȘ</span>
        </div>
        <div className="gs170-hero__content">
          <h1 id="gs170-title"><span>EVENIMENTE</span><em>de neuitat.</em></h1>
          <div className="gs297-cover-aside">
            <span className="gs170-kicker">MUZICĂ · SUNET · LUMINĂ</span>
            <p className="gs170-hero__lead">DJ & MC, trupă live și producție tehnică pentru nunți, petreceri și concerte.</p>
            <Link to="/contact" className="gs170-btn gs170-btn--green">Solicită o ofertă <Arrow diagonal /></Link>
          </div>
        </div>
        <div className="gs297-diptych">
          <figure className="gs170-stage">
            <img src={images.concert.src} alt={images.concert.alt} width={images.concert.w}
              height={images.concert.h} className="gs170-stage__image" decoding="async" fetchPriority="high" />
            <figcaption><span>01 / PRODUCȚIE LIVE</span><span>ARHIVA GREEN SOUND</span></figcaption>
          </figure>
          <figure className="gs297-portrait">
            <img src={images.dj.src} alt={images.dj.alt} width={images.dj.w} height={images.dj.h} decoding="async" loading="lazy" />
            <figcaption>02 / DJ & MC</figcaption>
          </figure>
        </div>
        <div className="gs297-cover-bottom">
          <a href="#gs-production-index" className="gs170-inline">Explorează serviciile <Arrow /></a>
          <a href="#gs170-films" className="gs170-inline">Vezi portofoliul <Play /></a>
          <div className="gs170-hero__control" role="group" aria-label="Atmosfera vizuală a site-ului">
            <span className="gs297-control-label">TON FOTO</span>
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
            onClick={() => setFilmIndex(index)} aria-label={"Deschide filmul: " + item.label}>
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
          <p>Locația, tipul evenimentului și serviciile dorite sunt suficiente pentru a începe discuția.</p>
          <Link to="/contact" className="gs170-btn gs170-btn--green">Solicită o ofertă <Arrow diagonal /></Link>
        </div>
        <svg className="gs297-final-wave" viewBox="0 0 500 105" fill="none" aria-hidden="true">
          <path d="M0 52h90l10-10 10 20 14-38 14 56 15-75 17 98 15-75 15 56 14-38 12 16h274" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
    <Dialog open={filmIndex !== null} onOpenChange={open => { if (!open) setFilmIndex(null); }}>
      <DialogContent className="gs170-dialog w-[min(94vw,1000px)] max-w-none bg-[#0c1d15] text-white border-white/30">
        <DialogTitle className="pr-8 font-display text-xl">{film?.label ?? "Film Green Sound Music"}</DialogTitle>
        <DialogDescription className="text-white/80">Film real Green Sound Music. Apasă Play pentru a porni videoclipul.</DialogDescription>
        {film && <VideoLite video={film.video} className="aspect-video w-full" />}
      </DialogContent>
    </Dialog>
  </>;
}
