import { useState, type KeyboardEvent } from "react";
import eventIndexCss from "@/styles/event-index-v172.css?inline";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { events, getService } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { QuoteSection } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/evenimente/")({
  head: () => pageHead({
    title: "Evenimente cu Green Sound Music | Nunți, botezuri, corporate, concerte",
    description: "DJ, muzică live, sunet, lumini și activități pentru nunți, botezuri, petreceri private, concerte, festivaluri și evenimente corporate.",
    path: "/evenimente",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Evenimente", path: "/evenimente" }])],
  }),
  component: Events,
});

/** V172: event direction console. All five dedicated routes stay reachable
 * through SSR links, even if the optional React preview never hydrates. */
function requireInitialEvent() {
  const first = events[0];
  if (!first) throw new Error("Event catalogue must not be empty");
  return first;
}
const initialEvent = requireInitialEvent();

function Events() {
  const [activeSlug, setActiveSlug] = useState(initialEvent.slug);
  const activeEvent = events.find((event) => event.slug === activeSlug) ?? initialEvent;
  const selectedIndex = events.findIndex((event) => event.slug === activeEvent.slug);

  function onProgrammeKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = events.length;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % count;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    const nextEvent = events[next];
    if (!nextEvent) return;
    setActiveSlug(nextEvent.slug);
    event.currentTarget.closest(".gs172-programme__options")
      ?.querySelectorAll<HTMLButtonElement>(".gs172-programme__select")[next]?.focus();
  }

  return <>
    <style>{eventIndexCss}</style>
    <div className="gs172-events">
      <section className="gs172-intro" aria-labelledby="gs172-title">
        <div className="container-site gs172-intro__inner">
          <div className="gs172-intro__topline">
            <Link to="/" className="gs172-intro__back">Green Sound Music <span aria-hidden="true">/</span> Evenimente</Link>
            <span>PRODUCȚIE DE EVENIMENTE · PITEȘTI / ARGEȘ</span>
          </div>
          <div className="gs172-intro__headline">
            <h1 id="gs172-title">Fiecare eveniment.<br /><em>Alt ritm.</em></h1>
            <p>De la muzică la lumini și momentele dintre ele. Alege tipul de eveniment și vezi cum îl putem construi împreună.</p>
          </div>
          <div className="gs172-intro__signal" aria-hidden="true">
            <span>GS / LIVE EVENT DIRECTION</span>
            <svg viewBox="0 0 420 34" preserveAspectRatio="none" focusable="false">
              <path d="M0 17H35L46 13L55 21L64 7L75 27L87 17H113L126 10L138 23L148 17H185L196 3L209 31L220 17H251L264 12L274 22L286 8L299 27L308 17H338L350 13L362 21L376 17H420" />
            </svg>
            <span>01 — {String(events.length).padStart(2, "0")}</span>
          </div>
        </div>
      </section>
      <section className="gs172-programme" aria-labelledby="gs172-programme-title">
        <div className="container-site gs172-programme__container">
          <div className="gs172-programme__heading">
            <span className="gs172-overline">01 / SELECTEAZĂ FORMATUL</span>
            <h2 id="gs172-programme-title">Regia serii.</h2>
            <p>Previzualizează fiecare format. Detaliile și cererea de ofertă se deschid separat — fără rezervări sau trimitere automată.</p>
          </div>
          <div className="gs172-programme__layout">
            <ol className="gs172-programme__options" aria-label="Tipuri de evenimente">
              {events.map((event, index) => {
                const selected = event.slug === activeEvent.slug;
                return <li className="gs172-programme__item" data-active={selected} key={event.slug}>
                  <button type="button" className="gs172-programme__select"
                    aria-pressed={selected}
                    aria-controls="gs172-stage"
                    aria-label={`Previzualizează: ${event.name}`}
                    onClick={() => setActiveSlug(event.slug)}
                    onKeyDown={(keyboardEvent) => onProgrammeKeyDown(keyboardEvent, index)}>
                    <span className="gs172-programme__number">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{event.name}</strong>
                    <span className="gs172-programme__cue" aria-hidden="true"><i/><i/><i/><i/><i/></span>
                  </button>
                  <Link to="/evenimente/$slug" params={{ slug: event.slug }} viewTransition
                    className="gs172-programme__detail"
                    aria-label={`Detalii despre ${event.name}`}>
                    Detalii <ChevronRight size={18} aria-hidden="true" />
                  </Link>
                </li>;
              })}
            </ol>
            <div className="gs172-stage" id="gs172-stage" aria-labelledby="gs172-stage-title">
              <div className="gs172-stage__frame" data-active-index={selectedIndex}>
                <BeamPhoto key={activeEvent.slug} image={activeEvent.image}
                  priority className="gs172-stage__photo" />
                <div className="gs172-stage__photo-shade" aria-hidden="true" />
                <div className="gs172-stage__frame-top" aria-hidden="true">
                  <span>GREEN SOUND / EVENT PREVIEW</span><span>{String(selectedIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}</span>
                </div>
                <div className="gs172-stage__image-caption">
                  <span>EVENIMENT SELECTAT</span>
                  <h3 id="gs172-stage-title">{activeEvent.name}</h3>
                </div>
                <div className="gs172-stage__meter" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
              </div>
              <div className="gs172-stage__details">
                <p className="gs172-stage__live" aria-live="polite">Selectat: {activeEvent.name}</p>
                <p className="gs172-stage__description">{activeEvent.short}</p>
                <div className="gs172-stage__actions">
                  <Link to="/evenimente/$slug" params={{ slug: activeEvent.slug }} viewTransition className="gs172-stage__link">
                    Vezi desfășurătorul <ArrowUpRight size={19} aria-hidden="true" />
                  </Link>
                  <a className="gs172-stage__brief" href={`/contact?event=${encodeURIComponent(activeEvent.formLabel)}#contact-form-title`}>
                    Cere ofertă <ArrowUpRight size={19} aria-hidden="true" />
                  </a>
                </div>
                <div className="gs172-stage__services">
                  <span>POȚI INCLUDE</span>
                  {activeEvent.recommended.slice(0, 3).map((recommended) => {
                    const service = getService(recommended.slug);
                    return <Link key={recommended.slug} to={`/${service.slug}`} viewTransition>{service.name}</Link>;
                  })}
                </div>
              </div>
            </div>
          </div>
          <p className="gs172-programme__note">Fotografiile provin din galeria Green Sound. Previzualizarea este orientativă, nu reprezintă o ofertă sau o disponibilitate confirmată.</p>
        </div>
      </section>
      <QuoteSection title="Punem la punct evenimentul tău"
        intro="Spune-ne data, locația și serviciile dorite. Mesajul se pregătește pentru WhatsApp sau email, fără trimitere automată." />
    </div>
  </>;
}
