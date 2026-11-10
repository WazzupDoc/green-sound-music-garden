import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaqList, QuoteSection } from "@/components/site/blocks";
import { VideoLite } from "@/components/site/VideoLite";
import { business, events, generalFaqs, images, services, videos } from "@/data/site";
import { faqLd, localBusinessLd, pageHead } from "@/lib/seo";

/**
 * GREEN SOUND / LIVE EXPERIENCES — V12
 * An immersive, image-led portfolio built on real Green Sound media.
 * Inspired by the cinematic language of event-production studios, never their assets.
 */
export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Green Sound Music Pitești | DJ, scenotehnică, sunet, lumini și evenimente",
      description:
        "Din 2008, Green Sound Music creează experiențe live: DJ & MC, trupă live, sunet, lumini, ecrane LED, efecte și evenimente în Pitești și nu numai.",
      path: "/",
      jsonLd: [localBusinessLd(), faqLd(generalFaqs)],
    }),
  component: Home,
});

const scenes = [
  { image: images.concert, title: "Energia publicului", tag: "LIVE / CONCERTE", index: "01" },
  { image: images.scena, title: "Lumina spectacolului", tag: "STAGE / PRODUCTION", index: "02" },
  { image: images.dj, title: "Ritmul petrecerii", tag: "MUSIC / PEOPLE", index: "03" },
] as const;

const spotlights = [
  {
    number: "01",
    name: "Concerte & festivaluri",
    tagline: "Energie care se simte în fiecare colț al publicului.",
    image: images.concert,
    destination: "/evenimente/concerte-festivaluri",
    disciplines: "SUNET / LUMINI / SCENOTEHNICĂ",
  },
  {
    number: "02",
    name: "Nunți & petreceri",
    tagline: "Fiecare intrare, fiecare dans, fiecare moment.",
    image: images.dj,
    destination: "/evenimente/nunti",
    disciplines: "DJ & MC / SHOW / ATMOSFERĂ",
  },
  {
    number: "03",
    name: "Producție de eveniment",
    tagline: "Tot ce nu se vede în culise. Tot ce se simte în sală.",
    image: images.scena,
    destination: "/echipamente-de-sunet-si-lumini",
    disciplines: "TEHNICĂ / LUMINI / LED",
  },
] as const;

const films = [
  { label: "Un eveniment în mișcare", video: videos.nuntaRamada },
  { label: "Luminile vorbesc", video: videos.showLumini },
  { label: "Momentul special", video: videos.fumGreu },
] as const;

function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activeFilm, setActiveFilm] = useState(0);
  const [showReel, setShowReel] = useState(false);
  const scene = scenes[activeScene] ?? scenes[0]!;
  const service = services[activeService] ?? services[0]!;

  useEffect(() => {
    if (!showReel) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowReel(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [showReel]);

  return (
    <div className="gs12-site">
      <section className="gs12-hero" aria-labelledby="gs12-hero-title">
        <div className="gs12-hero__images" aria-hidden="true">
          {scenes.map((item, i) => (
            <img
              key={item.index}
              className={"gs12-hero__image " + (i === activeScene ? "is-active" : "")}
              src={item.image.src}
              width={item.image.w}
              height={item.image.h}
              alt=""
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          ))}
          <div className="gs12-hero__grade" />
        </div>

        <div className="gs12-hero__rail" aria-hidden="true">
          <span>EST. 2008 / PITEȘTI, RO</span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="gs12-hero__body container-site">
          <div className="gs12-hero__chapter">
            <span className="gs12-signal" />
            PRODUCTION · MUSIC · EXPERIENCE
          </div>
          <div className="gs12-hero__statement">
            <p className="gs12-hero__pretitle">Nu organizăm doar evenimente.</p>
            <h1 id="gs12-hero-title">
              CREĂM<br />
              <span>ATMOSFERĂ.</span>
            </h1>
            <div className="gs12-hero__under">
              <p>
                Sunetul potrivit. Lumina exact când trebuie. Oamenii care
                transformă o seară într-o experiență.
              </p>
              <button
                type="button"
                className="gs12-reel-trigger"
                onClick={() => setShowReel(true)}
                aria-label="Deschide showreel Green Sound Music"
              >
                <span className="gs12-reel-trigger__circle"><Play size={21} fill="currentColor" aria-hidden="true" /></span>
                <span>VEZI SHOWREEL <small>REAL FOOTAGE / GREEN SOUND</small></span>
              </button>
            </div>
          </div>
        </div>

        <div className="gs12-hero__bottom container-site">
          <a href="#poveste" className="gs12-hero__explore">
            <span>EXPLOREAZĂ EXPERIENȚA</span>
            <ArrowDown size={20} aria-hidden="true" />
          </a>
          <div className="gs12-scenes" role="group" aria-label="Alege scena din deschidere">
            {scenes.map((item, i) => (
              <button
                type="button"
                key={item.index}
                aria-pressed={activeScene === i}
                className={"gs12-scenes__item " + (activeScene === i ? "is-active" : "")}
                onClick={() => setActiveScene(i)}
              >
                <span className="gs12-scenes__count">{item.index}</span>
                <img src={item.image.src} alt="" width={80} height={80} loading="lazy" />
                <span className="gs12-scenes__name">{item.title}<small>{item.tag}</small></span>
              </button>
            ))}
          </div>
          <span className="gs12-hero__count">0{activeScene + 1} / 03</span>
        </div>
      </section>

      <section className="gs12-bridge" aria-label="Serviciile Green Sound Music">
        <div className="gs12-bridge__track" aria-hidden="true">
          SOUND <span>✳</span> LIGHT <span>✳</span> LIVE <span>✳</span> FEELING <span>✳</span>
          SOUND <span>✳</span> LIGHT <span>✳</span> LIVE <span>✳</span> FEELING <span>✳</span>
        </div>
      </section>

      <section className="gs12-intent" id="poveste" aria-labelledby="gs12-intent-title">
        <div className="container-site gs12-intent__layout">
          <div className="gs12-overline"><span className="gs12-dot" /> 01 / CE FACEM</div>
          <div className="gs12-intent__copy">
            <p className="gs12-intent__small">DINCOLO DE SCENĂ</p>
            <h2 id="gs12-intent-title">
              Tehnologia dă ritmul.<br />
              <em>Oamenii dau emoția.</em>
            </h2>
            <div className="gs12-intent__line">
              <p>De la o petrecere privată la un concert în aer liber, construim experiența completă: muzică live, DJ, sunet, lumini, efecte și coordonare tehnică.</p>
              <Link to="/despre-noi" className="gs12-round-action" aria-label="Descoperă echipa Green Sound">
                <ArrowUpRight size={28} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="gs12-expertise" aria-labelledby="gs12-expertise-title">
        <div className="container-site">
          <div className="gs12-section-head">
            <div>
              <p className="gs12-overline"><span className="gs12-dot" /> 02 / EXPERTIZA NOASTRĂ</p>
              <h2 id="gs12-expertise-title">UN SINGUR PARTENER.<br /><em>TOATĂ ENERGIA.</em></h2>
            </div>
            <p>Producție de eveniment, cap-coadă. Alege o direcție și descoperă ce putem face împreună.</p>
          </div>

          <div className="gs12-expertise__layout">
            <div className="gs12-expertise__list">
              {services.map((item, i) => (
                <Link
                  to={"/" + item.slug}
                  key={item.slug}
                  className={"gs12-expertise__row " + (activeService === i ? "is-active" : "")}
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                >
                  <span className="gs12-expertise__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="gs12-expertise__name">{item.name}</span>
                  <ArrowUpRight aria-hidden="true" size={20} />
                </Link>
              ))}
              <Link to="/servicii" className="gs12-expertise__all">TOATE SERVICIILE <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
            <div className="gs12-expertise__frame">
              <img key={service.image.src} src={service.image.src} alt={service.image.alt} width={service.image.w} height={service.image.h} loading="lazy" />
              <div className="gs12-expertise__info">
                <span>EXPERTISE / {String(activeService + 1).padStart(2, "0")}</span>
                <p>{service.short}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gs12-work" aria-labelledby="gs12-work-title">
        <div className="container-site gs12-work__head">
          <div>
            <p className="gs12-overline"><span className="gs12-dot" /> 03 / ÎN LUMINA REFLECTOARELOR</p>
            <h2 id="gs12-work-title">FIECARE MOMENT<br /><em>ARE O POVESTE.</em></h2>
          </div>
          <Link to="/portofoliu" className="gs12-plain-link">VEZI PORTOFOLIUL <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="gs12-work__items">
          {spotlights.map((item) => (
            <Link to={item.destination} key={item.number} className="gs12-work__item">
              <div className="gs12-work__visual">
                <img src={item.image.src} alt={item.image.alt} width={item.image.w} height={item.image.h} loading="lazy" />
                <span className="gs12-work__num">{item.number} / 03</span>
                <span className="gs12-work__open"><ArrowUpRight size={26} aria-hidden="true" /></span>
              </div>
              <div className="gs12-work__caption">
                <div>
                  <span>{item.disciplines}</span>
                  <h3>{item.name}</h3>
                  <p>{item.tagline}</p>
                </div>
                <ArrowUpRight size={24} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="gs12-film" aria-labelledby="gs12-film-title">
        <div className="gs12-film__image" aria-hidden="true">
          <img src={images.scena.src} alt="" width={images.scena.w} height={images.scena.h} loading="lazy" />
        </div>
        <div className="container-site gs12-film__content">
          <p className="gs12-overline"><span className="gs12-dot" /> 04 / ÎN MIȘCARE</p>
          <h2 id="gs12-film-title">NU DOAR VEZI.<br /><em>SIMȚI.</em></h2>
          <p>Imaginile adevărate spun cel mai bine povestea. Vezi fragmente din evenimente și spectacole Green Sound Music.</p>
          <div className="gs12-film__actions">
            <button type="button" onClick={() => setShowReel(true)} className="gs12-film__play">
              <Play fill="currentColor" size={25} aria-hidden="true" /> VEZI VIDEO
            </button>
            <span>REAL EVENTS / REAL MOMENTS</span>
          </div>
        </div>
      </section>

      <section className="gs12-occasions" aria-labelledby="gs12-occasions-title">
        <div className="container-site">
          <div className="gs12-occasions__heading">
            <div>
              <p className="gs12-overline"><span className="gs12-dot" /> 05 / EVENIMENTE</p>
              <h2 id="gs12-occasions-title">ORICE OCAZIE.<br /><em>ENERGIA POTRIVITĂ.</em></h2>
            </div>
            <p>Concerte, nunți, botezuri, corporate și petreceri private. Fiecare eveniment are propria lui scenă.</p>
          </div>
          <div className="gs12-occasions__grid">
            {events.map((event, i) => (
              <Link to="/evenimente/$slug" params={{ slug: event.slug }} key={event.slug} className={"gs12-occasion gs12-occasion--" + i}>
                <div className="gs12-occasion__image">
                  <img src={event.image.src} width={event.image.w} height={event.image.h} alt={event.image.alt} loading="lazy" />
                </div>
                <div className="gs12-occasion__footer">
                  <span>0{i + 1} / {event.name}</span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gs12-statement" aria-labelledby="gs12-statement-title">
        <div className="container-site gs12-statement__inner">
          <div className="gs12-overline"><span className="gs12-dot" /> DIN PITEȘTI / ÎN MIȘCARE DIN {business.founded}</div>
          <h2 id="gs12-statement-title">WE MAKE<br /><span>IT FEEL</span><br />ALIVE<span className="gs12-statement__period">.</span></h2>
          <div className="gs12-statement__last">
            <p>De {new Date().getFullYear() - business.founded} ani construim atmosfera, de la primele pregătiri până la ultimul bis.</p>
            <Link to="/contact" className="gs12-statement__link">HAI SĂ DISCUTĂM <ArrowUpRight size={30} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="gs12-faq" aria-labelledby="gs12-faq-title">
        <div className="container-site gs12-faq__layout">
          <div>
            <p className="gs12-overline"><span className="gs12-dot" /> 06 / ÎNAINTE DE EVENIMENT</p>
            <h2 id="gs12-faq-title">CÂTEVA<br /><em>RĂSPUNSURI.</em></h2>
          </div>
          <FaqList faqs={generalFaqs} />
        </div>
      </section>
      <QuoteSection title="Următorul moment memorabil începe aici." intro="Spune-ne ce pregătești, când și unde. Cererea se deschide în WhatsApp sau email, de unde o poți trimite." />

      {showReel && (
        <div className="gs12-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowReel(false);
        }}>
          <div className="gs12-modal__panel" role="dialog" aria-modal="true" aria-label="Showreel Green Sound Music">
            <div className="gs12-modal__top">
              <span>GREEN SOUND / SELECTED FOOTAGE</span>
              <button type="button" onClick={() => setShowReel(false)} aria-label="Închide video"><X size={26} aria-hidden="true" /></button>
            </div>
            <div className="gs12-modal__tabs" role="group" aria-label="Selectează clipul">
              {films.map((film, i) => (
                <button
                  type="button"
                  key={film.video.id}
                  className={i === activeFilm ? "is-active" : ""}
                  aria-pressed={i === activeFilm}
                  onClick={() => setActiveFilm(i)}
                >{String(i + 1).padStart(2, "0")} / {film.label}</button>
              ))}
            </div>
            <VideoLite key={films[activeFilm]!.video.id} video={films[activeFilm]!.video} className="gs12-modal__video" />
          </div>
        </div>
      )}
    </div>
  );
}
