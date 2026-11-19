import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowUpRight, AudioLines, CalendarDays, CirclePlay, Headphones,
  Layers3, MessageCircle, Mic2, Play, RadioTower, Settings2, SlidersHorizontal,
  Sparkles, Star
} from "lucide-react";
import { images, videos, services, type ServiceSlug, type Video } from "@/data/site";
import { VideoLite } from "@/components/site/VideoLite";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/** Reference-inspired design. Real first-party media and business catalogue only.
 * CSS/SVG console is a decorative UI illustration, not a client installation.
 */
type Feature = { slug: ServiceSlug; title: string; detail: string; src: string; alt: string; icon: typeof Headphones };
const featured: readonly Feature[] = [
  { slug: "dj-mc", title: "DJ & MC", detail: "Muzică, energie și prezentarea momentelor importante.", src: images.dj.src, alt: images.dj.alt, icon: Headphones },
  { slug: "trupa", title: "Trupă live", detail: "Soliști, instrumentiști și show live.", src: images.scena.src, alt: images.scena.alt, icon: Mic2 },
  { slug: "echipamente-de-sunet-si-lumini", title: "Sunet, lumini & LED", detail: "Sonorizare, lumini scenice și ecrane LED.", src: images.concert.src, alt: images.concert.alt, icon: RadioTower },
  { slug: "masina-fum-greu-cu-gheata-carbonica", title: "Fum greu", detail: "Efecte speciale pentru momente memorabile.", src: images.fum.src, alt: images.fum.alt, icon: Sparkles },
  { slug: "studio-inregistrari", title: "Studio audio", detail: "Înregistrare, mixaj și producție muzicală.", src: videos.neatza.poster!, alt: "Cadru Green Sound Music din emisiunea Neatza", icon: AudioLines },
];
const secondarySlugs: readonly ServiceSlug[] = ["hostess", "ursitoare-botez", "start-veselia"];
const allSlugs = [...featured.map(item => item.slug), ...secondarySlugs];
if (allSlugs.length !== services.length || new Set(allSlugs).size !== services.length ||
    services.some(service => !allSlugs.includes(service.slug))) {
  throw new Error("V170 must display all real services exactly once");
}
const secondary = secondarySlugs.map(slug => {
  const service = services.find(item => item.slug === slug);
  if (!service) throw new Error("Missing service " + slug);
  return service;
});
const process = [
  { title: "Discuție & brief", detail: "Ne spui ce pregătești și ce contează pentru tine.", icon: MessageCircle },
  { title: "Propunere", detail: "Alegem muzica și soluția tehnică potrivită.", icon: Layers3 },
  { title: "Pregătire", detail: "Organizăm echipa, echipamentele și probele.", icon: Settings2 },
  { title: "Eveniment", detail: "Sunet, lumini și coordonare pe durata evenimentului.", icon: Star },
] as const;
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
        </div>
        <div className="gs170-hero__content container-site">
          <div className="gs244-hero__body">
            <span className="gs170-kicker gs170-hero__eyebrow">
              GREEN SOUND MUSIC <span aria-hidden="true">/</span> PITEȘTI · ARGEȘ
            </span>
            <h1 id="gs170-title" className="gs244-hero__title">
              <span>Evenimente</span>
              <em>memorabile.</em>
            </h1>
            <div className="gs244-hero__statement">
              <p className="gs170-hero__lead">
                Muzica ține seara în mișcare. Noi aducem DJ & MC, trupă live,
                sonorizare și lumini, potrivite evenimentului tău.
              </p>
              <div className="gs170-hero__actions">
                <Link to="/contact" className="gs170-btn gs170-btn--green">
                  Discută cu noi <ArrowUpRight size={19} aria-hidden />
                </Link>
                <a href="#gs170-films" className="gs170-btn gs170-btn--outline">
                  Vezi filmările <ArrowRight size={19} aria-hidden />
                </a>
              </div>
            </div>
          </div>
          <div className="gs244-hero__photo-caption" aria-hidden="true">
            <span>GREEN SOUND / LIVE</span>
            <span>MUZICĂ <b>×</b> LUMINĂ <b>×</b> ATMOSFERĂ</span>
          </div>
          <div className="gs244-hero__foot">
            <div className="gs244-hero__foot-title">
              <span>THE SOUND OF YOUR EVENT</span>
              <strong>De la primul acord. Până la ultimul dans.</strong>
            </div>
            <div className="gs170-hero__control" role="group" aria-label="Atmosfera vizuală a site-ului">
              <span className="gs170-hero__control-label"><SlidersHorizontal size={15} aria-hidden /> LUMINĂ</span>
              <button type="button" aria-pressed={lightsOn} onClick={() => setLightsOn(value => !value)}>
                {lightsOn ? "Efect ON" : "Efect OFF"}
              </button>
              <button type="button" aria-pressed={lightHue === "green"} onClick={() => setLightHue("green")}>Verde</button>
              <button type="button" aria-pressed={lightHue === "cool"} onClick={() => setLightHue("cool")}>Rece</button>
            </div>
          </div>
        </div>
      </section>

      <section className="gs170-services" id="gs-production-index" aria-labelledby="gs170-services-title">
        <div className="container-site">
          <div className="gs170-services__grid">
            <header className="gs170-services__intro">
              <span className="gs170-kicker">SERVICIILE NOASTRE / 01—08</span>
              <h2 id="gs170-services-title">Producție<br />completă<br />pentru <em>tine.</em></h2>
              <p>De la muzică până la ultimul detaliu tehnic.</p>
              <Link to="/servicii" className="gs170-inline">Toate serviciile <ArrowUpRight size={17} aria-hidden /></Link>
            </header>
            {featured.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link to={`/${item.slug}`} className="gs170-service-card" key={item.slug}>
                  <img src={item.src} alt={item.alt} width={400} height={320} loading="lazy" decoding="async" />
                  <span className="gs170-service-card__veil" aria-hidden="true" />
                  <span className="gs170-service-card__number">0{index + 1}</span>
                  <span className="gs170-service-card__body">
                    <Icon size={23} strokeWidth={1.6} aria-hidden />
                    <strong>{item.title}</strong><small>{item.detail}</small>
                    <ArrowUpRight size={20} className="gs170-service-card__arrow" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="gs170-services__extras">
            <span>ALTE MOMENTE SPECIALE</span>
            <nav aria-label="Alte servicii Green Sound Music">
              {secondary.map(item => (
                <Link key={item.slug} to={`/${item.slug}`}>{item.name} <ArrowUpRight size={16} aria-hidden /></Link>
              ))}
            </nav>
          </div>
          <div className="gs170-process" aria-labelledby="gs170-process-title">
            <div className="gs170-process__intro">
              <span className="gs170-kicker">DE LA IDEE LA EVENIMENT</span>
              <h2 id="gs170-process-title">Cum <em>lucrăm.</em></h2>
            </div>
            <ol className="gs170-process__steps">
              {process.map((step, index) => {
                const Icon = step.icon;
                return <li key={step.title}>
                  <Icon size={29} strokeWidth={1.5} aria-hidden />
                  <div><strong>0{index + 1}. {step.title}</strong><p>{step.detail}</p></div>
                  {index < process.length - 1 && <ArrowRight size={17} aria-hidden className="gs170-process__next" />}
                </li>;
              })}
            </ol>
          </div>
        </div>
      </section>

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
