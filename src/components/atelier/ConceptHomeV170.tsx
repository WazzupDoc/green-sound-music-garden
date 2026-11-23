import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CalendarDays, CirclePlay, Play, SlidersHorizontal } from "lucide-react";
import { images, videos, type Video } from "@/data/site";
import { ProductionIndex } from "@/components/atelier/ProductionIndex";
import { VideoLite } from "@/components/site/VideoLite";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/** Reference-inspired design. Real first-party media and business catalogue only.
 * CSS/SVG console is a decorative UI illustration, not a client installation.
 */
const films: { label: string; eyebrow: string; video: Video }[] = [
  { label: "Nuntă la Ramada Pitești", eyebrow: "NUNTĂ / DJ & MC", video: videos.nuntaRamada },
  { label: "Show de lumini Green Sound", eyebrow: "LUMINI / DJ / MC", video: videos.showLumini },
  { label: "Green Sound Music la TV", eyebrow: "LIVE / STUDIO", video: videos.neatza },
];

export function ConceptHomeV170() {
  const [hydrated, setHydrated] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [stageVisible, setStageVisible] = useState(true);
  const stageRef = useRef<HTMLElement>(null);
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const [lightHue, setLightHue] = useState<"green" | "cool">("green");
  const film = filmIndex === null ? null : films[filmIndex];
  useEffect(() => { setHydrated(true); }, []);
  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setStageVisible(Boolean(entry?.isIntersecting) && !document.hidden);
    }, { threshold: .01 });
    observer.observe(node);
    const onVisibility = () => {
      const rect = node.getBoundingClientRect();
      setStageVisible(!document.hidden && rect.bottom > 0 && rect.top < window.innerHeight);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return (
    <>
      <section className="gs170-hero" aria-labelledby="gs170-title" ref={stageRef}
        data-lights={lightsOn ? "on" : "off"} data-hue={lightHue}
        data-hydrated={hydrated ? "true" : "false"}
        data-stage-visible={stageVisible ? "true" : "false"}>
        <div className="gs170-stage" aria-hidden="true">
          <img src={images.concert.src} alt="" width={images.concert.w}
            height={images.concert.h} className="gs170-stage__image"
            decoding="async" fetchPriority="high" />
          <div className="gs170-stage__shade" />
          <div className="gs170-stage__beams">
            {Array.from({ length: 5 }, (_, index) => <i key={index} style={{ "--beam": index } as CSSProperties} />)}
          </div>
          <div className="gs170-stage__console">
            <div className="gs170-stage__console-top"><span>GREEN SOUND / LIVE MIX</span><span className="gs170-stage__live">● SIGNAL</span></div>
            <div className="gs170-stage__eq">
              {Array.from({ length: 25 }, (_, i) => <span key={i} style={{ "--bar": i } as CSSProperties} />)}
            </div>
            <div className="gs170-stage__channels">
              {Array.from({ length: 10 }, (_, i) =>
                <span key={i} className="gs170-stage__channel" style={{ "--channel": i } as CSSProperties}><i /><b /><small /></span>
              )}
            </div>
            <span className="gs170-stage__console-end">DECORATIVE VISUAL / SOUND · LIGHT · PRODUCTION</span>
          </div>
        </div>
        <div className="gs170-hero__content container-site">
          <span className="gs170-kicker gs170-hero__eyebrow">GREEN SOUND MUSIC / PRODUCȚIE DE EVENIMENTE</span>
          <h1 id="gs170-title">Sunet. Muzică. Lumini.<br />
            <span className="gs279-title-serif">Evenimente memorabile.</span></h1>
          <p className="gs170-hero__lead">
            DJ & MC, trupă live, sonorizare, lumini și efecte pentru nunți, botezuri, petreceri și concerte.
            Alegem împreună muzica și soluția tehnică potrivite spațiului și programului.
          </p>
          <div className="gs170-hero__actions">
            <Link to="/contact" className="gs170-btn gs170-btn--green">
              <CalendarDays size={19} aria-hidden /> Solicită o ofertă <ArrowRight size={19} aria-hidden />
            </Link>
            <a href="#gs170-films" className="gs170-btn gs170-btn--outline">
              <CirclePlay size={20} aria-hidden /> Vezi portofoliul
            </a>
          </div>
          <div className="gs170-hero__control" role="group" aria-label="Atmosfera vizuală a site-ului">
            <span className="gs170-hero__control-label"><SlidersHorizontal size={15} aria-hidden /> LUMINI SCENICE</span>
            <button type="button" aria-pressed={lightsOn} onClick={() => setLightsOn(value => !value)}>
              {lightsOn ? "Efect ON" : "Efect OFF"}
            </button>
            <button type="button" aria-pressed={lightHue === "green"} onClick={() => setLightHue("green")}>Verde</button>
            <button type="button" aria-pressed={lightHue === "cool"} onClick={() => setLightHue("cool")}>Rece</button>
          </div>
        </div>
        <div className="gs170-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" focusable="false">
            <path className="gs170-wave__soft" d="M0 45C118 2 210 90 351 47S563 11 704 46 886 88 1021 43 1225 3 1440 47" />
            <path className="gs170-wave__main" d="M0 45C118 2 210 90 351 47S563 11 704 46 886 88 1021 43 1225 3 1440 47" />
            <path className="gs170-wave__pulse" d="M0 45C118 2 210 90 351 47S563 11 704 46 886 88 1021 43 1225 3 1440 47" />
          </svg>
        </div>
      </section>

      {/* V280: three genuine photographic chapters, all eight direct service links. No duplicate process cards. */}
      <ProductionIndex />

      <section className="gs170-films" id="gs170-films" aria-labelledby="gs170-films-title">
        <div className="container-site gs170-films__grid">
          <div className="gs170-films__intro">
            <span className="gs170-kicker">PORTOFOLIU / FILME REALE</span>
            <h2 id="gs170-films-title">Momente care<br /><em>vorbesc</em><br />de la sine.</h2>
            <p>Trei filmări publicate de Green Sound Music. Sunetul pornește numai la cererea ta.</p>
            <Link to="/portofoliu" className="gs170-inline">Vezi toate proiectele <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
          <div className="gs170-films__cards">
            {films.map((item, index) => (
              <button className="gs170-film-card" key={item.video.id} type="button"
                onClick={() => setFilmIndex(index)}
                aria-label={"Deschide filmul: " + item.label}>
                <span className="gs170-film-card__image">
                  <img src={item.video.poster!} alt="" width={640} height={360}
                    loading="lazy" decoding="async" />
                  <span className="gs170-film-card__play"><Play size={23} fill="currentColor" aria-hidden /></span>
                  <span className="gs170-film-card__number">0{index + 1} / 03</span>
                </span>
                <span className="gs170-film-card__title">
                  <span><small>{item.eyebrow}</small><strong>{item.label}</strong></span>
                  <ArrowUpRight size={18} aria-hidden />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gs170-final" aria-labelledby="gs170-final-title">
        <img src={images.concert.src} alt="" width={images.concert.w}
          height={images.concert.h} loading="lazy" decoding="async" />
        <div className="container-site gs170-final__inner">
          <div><span className="gs170-kicker">GREEN SOUND MUSIC / PITEȘTI</span>
            <h2 id="gs170-final-title">Planifică acum<br /><em>evenimentul tău.</em></h2></div>
          <p>Hai să discutăm despre ideile tale și să construim împreună o seară memorabilă.</p>
          <Link to="/contact" className="gs170-btn gs170-btn--green">
            Solicită o ofertă <ArrowRight size={19} aria-hidden />
          </Link>
        </div>
      </section>

      <Dialog open={filmIndex !== null} onOpenChange={open => { if (!open) setFilmIndex(null); }}>
        <DialogContent className="gs170-dialog">
          <DialogTitle className="pr-8 font-display text-xl">{film?.label ?? "Film Green Sound Music"}</DialogTitle>
          <DialogDescription className="gs170-dialog__description">
            Film real Green Sound Music. Apasă Play pentru a porni videoclipul.
          </DialogDescription>
          {film && <VideoLite video={film.video} className="aspect-video w-full" />}
        </DialogContent>
      </Dialog>
    </>
  );
}
