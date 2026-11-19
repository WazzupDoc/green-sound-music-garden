import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Play, SlidersHorizontal } from "lucide-react";
import { images, videos, services, type ServiceSlug, type Video } from "@/data/site";
import { VideoLite } from "@/components/site/VideoLite";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Real first-party media and links to the Green Sound service catalogue.
const serviceGroups: readonly { title: string; slugs: readonly ServiceSlug[] }[] = [
  { title: "Muzică live", slugs: ["dj-mc", "trupa"] },
  {
    title: "Scenotehnică",
    slugs: ["echipamente-de-sunet-si-lumini", "masina-fum-greu-cu-gheata-carbonica"],
  },
  { title: "Invitați și copii", slugs: ["hostess", "ursitoare-botez", "start-veselia"] },
  { title: "Studio", slugs: ["studio-inregistrari"] },
];

const allSlugs = serviceGroups.flatMap(group => group.slugs);
if (allSlugs.length !== services.length || new Set(allSlugs).size !== services.length ||
    services.some(service => !allSlugs.includes(service.slug))) {
  throw new Error("Homepage directory must display all services exactly once");
}

const serviceDirectory = serviceGroups.map(({ title, slugs }) => ({
  title,
  items: slugs.map(slug => {
    const service = services.find(item => item.slug === slug);
    if (!service) throw new Error("Missing service " + slug);
    return service;
  }),
}));

const process = [
  { title: "Discuție și brief", detail: "Ne spui ce pregătești și ce contează pentru tine." },
  { title: "Propunere", detail: "Alegem muzica și soluția tehnică potrivită." },
  { title: "Pregătire", detail: "Organizăm echipa, echipamentele și probele." },
  { title: "Eveniment", detail: "Sunet, lumini și coordonare pe durata evenimentului." },
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
              <span className="gs244-hero__script">de neuitat.</span>
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
          <header className="gs170-services__intro">
            <div>
              <span className="gs170-kicker">Servicii</span>
              <h2 id="gs170-services-title">Muzică și <span className="gs170-services__title-accent">producție live.</span></h2>
            </div>
            <div className="gs170-services__summary">
              <p>Pentru nunți, botezuri, petreceri, evenimente corporate și concerte. Poți alege serviciile separat sau le poți combina.</p>
              <Link to="/servicii" className="gs170-services__all">
                Toate serviciile <ArrowUpRight size={17} aria-hidden />
              </Link>
            </div>
          </header>

          <div className="gs170-services__layout">
            <figure className="gs170-services__photo">
              <div className="gs170-services__photo-frame">
                <img src={images.scena.src} alt={images.scena.alt} width={images.scena.w}
                  height={images.scena.h} loading="lazy" decoding="async" />
              </div>
              <figcaption>Scenă și lumini <span>Green Sound Music</span></figcaption>
            </figure>

            <nav className="gs170-services__directory" aria-label="Servicii Green Sound Music">
              {serviceDirectory.map(({ title, items }) => (
                <div className="gs170-services__group" key={title}>
                  <h3>{title}</h3>
                  <ul role="list">
                    {items.map(({ slug, name }) => (
                      <li key={slug}>
                        <Link to={`/${slug}`}>
                          <span>{name}</span>
                          <ArrowUpRight size={17} aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="gs170-process">
            <h3>Cum lucrăm</h3>
            <ol className="gs170-process__steps">
              {process.map(step => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </li>
              ))}
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
