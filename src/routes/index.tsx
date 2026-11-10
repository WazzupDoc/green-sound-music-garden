import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import { FaqList, QuoteSection } from "@/components/site/blocks";
import { VideoLite } from "@/components/site/VideoLite";
import { business, events, generalFaqs, images, services, videos } from "@/data/site";
import { faqLd, localBusinessLd, pageHead } from "@/lib/seo";

/**
 * ATMOSPHERES IN MOTION
 * Editorial / scenographic experience using only Green Sound's real imagery
 * and existing verified services. No stock photos, fake projects or auto-play audio.
 */

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Green Sound Music Pitești — muzică, scenotehnică și atmosferă pentru evenimente",
      description:
        "Din 2008, Green Sound Music Pitești creează atmosfera evenimentelor cu DJ & MC, trupă live, sunet, lumini, ecrane LED și efecte. Vezi lucrările și cere ofertă.",
      path: "/",
      jsonLd: [localBusinessLd(), faqLd(generalFaqs)],
    }),
  component: Home,
});

const atmospheres = [
  {
    label: "01 / LIVE",
    title: "Lumina scenei",
    image: images.scena,
    note: "Scenotehnică • live",
  },
  {
    label: "02 / PEOPLE",
    title: "Energia oamenilor",
    image: images.dj,
    note: "DJ • MC • momente",
  },
  {
    label: "03 / CROWD",
    title: "Emoția publicului",
    image: images.concert,
    note: "Concerte • evenimente",
  },
] as const;

const filmChoices = [
  { label: "Nuntă / DJ & MC", video: videos.nuntaRamada },
  { label: "Sunet / Lumini", video: videos.showLumini },
  { label: "Moment / Fum greu", video: videos.fumGreu },
] as const;

function Home() {
  const [activeAtmosphere, setActiveAtmosphere] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activeFilm, setActiveFilm] = useState(0);
  const atmosphere = atmospheres[activeAtmosphere] ?? atmospheres[0]!;
  const featured = services.slice(0, 5);
  const featuredService = featured[activeService] ?? featured[0]!;

  return (
    <div className="gs-home">
      <section className="gs-intro" aria-labelledby="gs-intro-title">
        <div className="gs-intro__grid container-site">
          <div className="gs-intro__copy">
            <p className="gs-kicker gs-intro__eyebrow">
              <span className="gs-signal" aria-hidden="true" />
              GREEN SOUND MUSIC / PITEȘTI
            </p>
            <div className="gs-intro__headline">
              <span className="gs-issue">Art direction for real-life moments — Est. 2008</span>
              <h1 id="gs-intro-title">
                Un eveniment.<br />
                <em>O atmosferă.</em><br />
                O amintire.
              </h1>
            </div>
            <div className="gs-intro__base">
              <p>
                Muzică, sunet și lumină puse în scenă cu grijă. De la
                primul invitat până la ultimul moment al serii.
              </p>
              <div className="gs-intro__actions">
                <Link to="/portofoliu" className="gs-cta gs-cta--solid">
                  Descoperă atmosfera <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="gs-text-link">
                  Vorbim despre eveniment <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          <div className="gs-intro__stage">
            <div className="gs-light-beam" aria-hidden="true" />
            <div className="gs-intro__art">
              <img
                key={atmosphere.image.src}
                src={atmosphere.image.src}
                alt={atmosphere.image.alt}
                width={atmosphere.image.w}
                height={atmosphere.image.h}
                className="gs-intro__photo"
                fetchPriority="high"
              />
              <div className="gs-intro__art-shade" />
              <div className="gs-intro__art-top">
                <span>GREEN SOUND / FIELD NOTES</span>
                <span>01 — 03</span>
              </div>
              <div className="gs-intro__art-bottom">
                <span>{atmosphere.title}</span>
                <span>{atmosphere.note}</span>
              </div>
            </div>
            <div className="gs-intro__thumb">
              <img src={images.concert.src} alt="" loading="lazy" width={images.concert.w} height={images.concert.h} />
              <span>LIVE / EXPERIENCE</span>
            </div>
            <span className="gs-intro__aside" aria-hidden="true">SOUND · LIGHT · ATMOSPHERE</span>
          </div>
        </div>
        <div className="gs-intro__switcher container-site">
          <span className="gs-switcher__caption">O singură echipă. Mai multe feluri de a simți.</span>
          <div role="group" aria-label="Schimbă atmosfera din deschidere" className="gs-switcher__buttons">
            {atmospheres.map((m, i) => (
              <button
                type="button"
                key={m.label}
                className={i === activeAtmosphere ? "is-active" : ""}
                onClick={() => setActiveAtmosphere(i)}
                aria-pressed={i === activeAtmosphere}
              >
                {m.label}
              </button>
            ))}
          </div>
          <a href="#gs-story" className="gs-intro__scroll" aria-label="Derulează spre poveste">
            <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="gs-manifesto" id="gs-story" aria-labelledby="gs-story-title">
        <div className="container-site gs-manifesto__grid">
          <div className="gs-section-index"><span>01 / POVESTEA NOASTRĂ</span><span>2008 — PREZENT</span></div>
          <div>
            <p className="gs-overline">Mai mult decât muzică</p>
            <h2 id="gs-story-title">
              Nu aducem doar echipamente.
              <span> Construim felul în care se simte o seară.</span>
            </h2>
            <div className="gs-manifesto__foot">
              <p>
                Unele momente încep cu o melodie. Altele, cu lumina care se
                aprinde exact când trebuie. Noi le aducem împreună.
              </p>
              <Link to="/despre-noi" className="gs-round-link" aria-label="Povestea echipei Green Sound">
                <ArrowUpRight size={23} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="gs-services" id="servicii" aria-labelledby="gs-services-title">
        <div className="container-site">
          <div className="gs-section-top">
            <div>
              <p className="gs-overline">02 / EXPERTIZA NOASTRĂ</p>
              <h2 id="gs-services-title">Totul începe <em>cu un sunet.</em></h2>
            </div>
            <p>
              Artă și tehnică, în același loc. Alege ce ai nevoie sau lasă-ne
              să construim formula potrivită pentru eveniment.
            </p>
          </div>
          <div className="gs-services__stage">
            <div className="gs-services__rows">
              {featured.map((service, i) => (
                <Link
                  key={service.slug}
                  to={"/" + service.slug}
                  className={"gs-service-row " + (activeService === i ? "is-active" : "")}
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                >
                  <span className="gs-service-row__number">0{i + 1}</span>
                  <span className="gs-service-row__name">{service.name}</span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </Link>
              ))}
              <Link to="/servicii" className="gs-services__all">Explorează toate serviciile <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <div className="gs-services__visual">
              <img
                key={featuredService.image.src}
                src={featuredService.image.src}
                alt={featuredService.image.alt}
                width={featuredService.image.w}
                height={featuredService.image.h}
                loading="lazy"
              />
              <div className="gs-services__visual-overlay">
                <span>GREEN SOUND / EXPERTISE</span>
                <p>{featuredService.short}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gs-portfolio" aria-labelledby="gs-portfolio-title">
        <div className="container-site">
          <div className="gs-portfolio__intro">
            <div>
              <p className="gs-overline">03 / DIN CULISE</p>
              <h2 id="gs-portfolio-title">Momente reale.<br /><em>Atmosfere diferite.</em></h2>
            </div>
            <Link to="/portofoliu" className="gs-text-link">Tot portofoliul <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="gs-portfolio__composition">
            <figure className="gs-portfolio__large">
              <img src={images.concert.src} alt={images.concert.alt} width={images.concert.w} height={images.concert.h} loading="lazy" decoding="async" />
              <figcaption><span>01 / LIVE EXPERIENCE</span><strong>Energia din fața scenei.</strong></figcaption>
            </figure>
            <div className="gs-portfolio__stack">
              <figure className="gs-portfolio__small">
                <img src={images.dj.src} alt={images.dj.alt} width={images.dj.w} height={images.dj.h} loading="lazy" decoding="async" />
                <figcaption><span>02 / PEOPLE</span><strong>Oameni care dau tonul.</strong></figcaption>
              </figure>
              <p className="gs-portfolio__aside">
                Fotografiile și înregistrările noastre spun mai mult despre un eveniment
                decât orice promisiune.
              </p>
            </div>
          </div>
          <div className="gs-reel">
            <div className="gs-reel__head">
              <div><span className="gs-overline">SHOWREEL / SELECTED FOOTAGE</span><h3>Vezi atmosfera <em>în mișcare.</em></h3></div>
              <span className="gs-reel__hint"><Play size={14} aria-hidden="true" /> Redare doar la apăsare</span>
            </div>
            <div className="gs-reel__choices" role="group" aria-label="Alege videoclipul">
              {filmChoices.map((choice, i) => (
                <button key={choice.video.id} type="button" aria-pressed={activeFilm === i} className={activeFilm === i ? "is-active" : ""} onClick={() => setActiveFilm(i)}>
                  <span>0{i + 1}</span> {choice.label}
                </button>
              ))}
            </div>
            <div className="gs-reel__video">
              <VideoLite key={filmChoices[activeFilm]!.video.id} video={filmChoices[activeFilm]!.video} />
            </div>
          </div>
        </div>
      </section>

      <section className="gs-events" aria-labelledby="gs-events-title">
        <div className="container-site">
          <div className="gs-events__heading">
            <div><p className="gs-overline">04 / PENTRU MOMENTUL TĂU</p><h2 id="gs-events-title">Ce urmează <em>să sărbătorim?</em></h2></div>
            <Link to="/evenimente" className="gs-text-link">Toate evenimentele <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="gs-events__list">
            {events.map((event, i) => (
              <Link to="/evenimente/$slug" params={{ slug: event.slug }} key={event.slug} className="gs-event">
                <span className="gs-event__num">0{i + 1}</span>
                <span className="gs-event__image"><img src={event.image.src} alt="" loading="lazy" width={event.image.w} height={event.image.h} /></span>
                <span className="gs-event__text"><strong>{event.name}</strong><small>{event.short}</small></span>
                <span className="gs-event__arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gs-since" aria-labelledby="gs-since-title">
        <div className="gs-since__photo">
          <img src={images.scena.src} alt={images.scena.alt} width={images.scena.w} height={images.scena.h} loading="lazy" />
          <div className="gs-since__shade" />
        </div>
        <div className="container-site gs-since__content">
          <p className="gs-overline">GREEN SOUND / DIN PITEȘTI</p>
          <h2 id="gs-since-title">Din <span>{business.founded}</span><br />în ritmul evenimentelor.</h2>
          <p>DJ & MC, trupă live, sonorizare, lumini și scenotehnică. O echipă care îmbină experiența cu energia fiecărui eveniment.</p>
          <Link to="/despre-noi" className="gs-cta gs-cta--light">Cunoaște echipa <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="gs-questions section">
        <div className="container-site gs-questions__grid">
          <div><p className="gs-overline">05 / DETALII IMPORTANTE</p><h2>Întrebări înainte de <em>prima discuție?</em></h2></div>
          <FaqList faqs={generalFaqs} />
        </div>
      </section>
      <QuoteSection title="Povestește-ne ce pregătești." intro="Spune-ne data, locul și atmosfera dorită. Pregătim împreună combinația de servicii potrivită. Formularul deschide WhatsApp sau email — mesajul se trimite de acolo." />
    </div>
  );
}
