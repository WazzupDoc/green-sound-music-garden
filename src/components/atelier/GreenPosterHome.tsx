import { useState } from "react";
import { Link, useHydrated } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { events, getService, images, videos, type EventSlug, type ServiceSlug } from "@/data/site";
import { VideoLite } from "@/components/site/VideoLite";

const featuredServices: readonly ServiceSlug[] = [
  "dj-mc", "trupa", "echipamente-de-sunet-si-lumini",
  "masina-fum-greu-cu-gheata-carbonica", "ursitoare-botez", "start-veselia",
];
const eventOrder: readonly EventSlug[] = [
  "nunti", "botezuri", "evenimente-corporate", "concerte-festivaluri", "petreceri-private",
];
const filmList = [
  { video: videos.showLumini, kind: "LIVE / LIGHTS", title: "Lumina e parte din muzică." },
  { video: videos.nuntaRamada, kind: "DJ / MC", title: "O seară în care ringul nu tace." },
  { video: videos.neatza, kind: "STUDIO / TV", title: "Din studio, pe scenă." },
];

/** A different art direction, not a V53 layout patch: three-photo show poster,
 * typographic service catalogue, event-led photo panorama and film features.
 * Existing site routes, verified data, performance, contact and SEO stay intact.
 */
export function GreenPosterHome() {
  const hydrated = useHydrated();
  const [activeService, setActiveService] = useState<ServiceSlug>("echipamente-de-sunet-si-lumini");
  const [activeEvent, setActiveEvent] = useState<EventSlug>("nunti");
  const service = getService(activeService);
  const event = events.find(item => item.slug === activeEvent)!;
  // Use an authentic wedding frame here instead of repeating the hero DJ photo.
  const eventVisual = activeEvent === "nunti" && videos.nuntaRamada.poster
    ? { src: videos.nuntaRamada.poster, alt: "Cadru din filmarea unei nunți Green Sound Music la Ramada Pitești", w: 1280, h: 720 }
    : event.image;
  return (
    <div className="gp" data-gp-hydrated={hydrated ? "true" : "false"}>
      <section className="gp-opening" aria-labelledby="gp-title">
        <div className="gp-opening__eyebrow">
          <span>GREEN SOUND MUSIC</span>
          <span>PI<span aria-hidden="true">·</span>TEȘTI / ARGEȘ / EST. 2008</span>
          <span>MUZICĂ + PRODUCȚIE DE EVENIMENTE</span>
        </div>
        <div className="gp-opening__art">
          <figure className="gp-opening__frame gp-opening__frame--one">
            <img src={images.scena.src} alt={images.scena.alt} width={images.scena.w}
              height={images.scena.h} fetchPriority="high" decoding="async"/>
            <figcaption>01 — LIVE PRODUCTION</figcaption>
          </figure>
          <figure className="gp-opening__frame gp-opening__frame--two">
            <img src={images.dj.src} alt={images.dj.alt} width={images.dj.w}
              height={images.dj.h} fetchPriority="high" decoding="async"/>
            <figcaption>02 — DJ &amp; MC</figcaption>
          </figure>
          <figure className="gp-opening__frame gp-opening__frame--three">
            <img src={images.concert.src} alt={images.concert.alt} width={images.concert.w}
              height={images.concert.h} fetchPriority="high" decoding="async"/>
            <figcaption>03 — THE CROWD</figcaption>
          </figure>
          <div className="gp-opening__headline">
            <span className="gp-opening__intro">Ai sala. Ai invitații. Restul începe aici.</span>
            <h1 id="gp-title"><span>DĂM</span><span>TONUL</span><em>SERII.</em></h1>
          </div>
          <div className="gp-opening__bottom">
            <p>DJ &amp; MC. Trupe live. Sonorizare. Lumini. Efecte. De la prima probă la ultima piesă.</p>
            <Link to="/contact" className="gp-opening__cta">Cere o ofertă <ArrowUpRight aria-hidden size={22}/></Link>
          </div>
        </div>
        <a href="#gp-servicii" className="gp-opening__scroll">
          Descoperă ce facem <ArrowDownRight aria-hidden size={21}/>
        </a>
      </section>

      <section className="gp-stripe" aria-label="Servicii de muzică și evenimente">
        <div className="gp-stripe__flow" aria-hidden="true">
          <span>MUZICĂ</span><b>✳</b><span>OAMENI</span><b>✳</b><span>LUMINĂ</span><b>✳</b>
          <span>MUZICĂ</span><b>✳</b><span>OAMENI</span><b>✳</b><span>LUMINĂ</span><b>✳</b>
        </div>
      </section>

      <section id="gp-servicii" className="gp-services" aria-labelledby="gp-services-title">
        <div className="gp-section-kicker">
          <span>01 / CE FACEM</span>
          <span>MUZICĂ / TEHNICĂ / DIVERTISMENT</span>
        </div>
        <div className="gp-services__heading">
          <h2 id="gp-services-title">Nu un pachet.<br/><em>O echipă.</em></h2>
          <p>De la muzică și prezentare până la scenă și efecte. Selectează un serviciu și vezi unde intrăm noi în joc.</p>
        </div>
        <div className="gp-services__layout">
          <div className="gp-services__list" role="group" aria-label="Serviciile Green Sound Music">
            {featuredServices.map((slug,index)=>{
              const item=getService(slug);
              return <button key={slug} type="button" className="gp-services__choice"
                onClick={()=>setActiveService(slug)} aria-pressed={slug===activeService}>
                <span>{String(index+1).padStart(2,"0")}</span><strong>{item.name}</strong>
                <ArrowUpRight aria-hidden size={22}/>
              </button>;
            })}
            <Link to="/servicii" className="gp-services__all">Toate serviciile <ArrowRight aria-hidden size={20}/></Link>
          </div>
          <div className="gp-services__feature" key={service.slug}>
            <img src={service.image.src} alt={service.image.alt} width={service.image.w}
              height={service.image.h} loading="lazy" decoding="async"/>
            <div className="gp-services__feature-copy">
              <span>ÎN PRIM-PLAN / {service.name.toUpperCase()}</span>
              <p>{service.short}</p>
              <Link to={`/${service.slug}`}>Descoperă serviciul <ArrowUpRight aria-hidden size={20}/></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="gp-event" aria-labelledby="gp-event-title">
        <div className="gp-section-kicker gp-section-kicker--inverse">
          <span>02 / UNDE NE ÎNTÂLNIM</span>
          <span>ALEGE ATMOSFERA</span>
        </div>
        <div className="gp-event__top">
          <h2 id="gp-event-title">Fiecare seară<br/>are alt <em>ritm.</em></h2>
          <p>Un concert nu seamănă cu o nuntă. Nici petrecerea ta nu trebuie să semene cu alta.</p>
        </div>
        <div className="gp-event__stage">
          <img key={event.slug} src={eventVisual.src} alt={eventVisual.alt}
            width={eventVisual.w} height={eventVisual.h} loading="lazy" decoding="async"/>
          <div className="gp-event__stage-shade" aria-hidden="true" />
          <div className="gp-event__stage-text">
            <span>EVENIMENT SELECTAT</span>
            <h3>{event.name}</h3>
            <p>{event.short}</p>
            <Link to="/evenimente/$slug" params={{slug:event.slug}} viewTransition>
              Explorează evenimentul <ArrowUpRight aria-hidden size={21}/>
            </Link>
          </div>
          <div className="gp-event__tabs" role="group" aria-label="Alege un eveniment">
            {eventOrder.map((slug,i)=>{
              const item=events.find(ev=>ev.slug===slug)!;
              return <button key={slug} type="button" aria-pressed={activeEvent===slug}
                onClick={()=>setActiveEvent(slug)}>
                <small>{String(i+1).padStart(2,"0")}</small><span>{item.name}</span>
              </button>;
            })}
          </div>
        </div>
      </section>

      <section className="gp-film" aria-labelledby="gp-film-title">
        <div className="gp-section-kicker">
          <span>03 / DIN ARHIVA NOASTRĂ</span>
          <span>IMAGINI DIN EVENIMENTE REALE</span>
        </div>
        <div className="gp-film__lead">
          <h2 id="gp-film-title">Lasă imaginile<br/><em>să vorbească.</em></h2>
          <Link to="/portofoliu">Intră în portofoliu <ArrowUpRight size={22} aria-hidden/></Link>
        </div>
        <div className="gp-film__grid">
          {filmList.map(({video,kind,title},i)=>(
            <article className={`gp-film__item gp-film__item--${i+1}`} key={video.id}>
              <div className="gp-film__topline"><span>{kind}</span><Play size={16} aria-hidden/></div>
              <VideoLite video={video}/>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="gp-end" aria-labelledby="gp-end-title">
        <div className="gp-end__year"><span>DIN</span><strong>2008.</strong></div>
        <div className="gp-end__body">
          <p>Mai ai doar de ales data.</p>
          <h2 id="gp-end-title">NE VEDEM<br/>LA <em>EVENIMENT.</em></h2>
          <Link to="/contact" className="gp-end__button">Hai să vorbim <ArrowUpRight size={28} aria-hidden/></Link>
        </div>
        <div className="gp-end__foot">
          <span>GREEN SOUND MUSIC</span><span>PI<span aria-hidden="true">·</span>TEȘTI / ARGEȘ</span>
        </div>
      </section>
    </div>
  );
}
