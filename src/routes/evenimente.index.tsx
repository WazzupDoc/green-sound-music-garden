import { useEffect, useState, type KeyboardEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { events, getService } from "@/data/site";
import { QuoteSection } from "@/components/site/blocks";
import { CategorySignal } from "@/components/site/CategorySignal";
import categorySignalCss from "@/styles/category-signature-v198.css?inline";
import illustratedCategoryCss from "@/styles/category-illustrated-v201.css?inline";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import eventPosterCss from "@/styles/event-show-poster-v173.css?inline";
import { preloadEventFrame } from "@/lib/preload-event-frame";

export const Route = createFileRoute("/evenimente/")({
  head: () => pageHead({
    title: "Evenimente cu Green Sound Music | Nunți, botezuri, corporate, concerte",
    description: "DJ, muzică live, sunet, lumini și activități pentru nunți, botezuri, petreceri private, concerte, festivaluri și evenimente corporate.",
    path: "/evenimente",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Evenimente", path: "/evenimente" }])],
  }),
  component: Events,
});

function firstEvent() {
  const event = events[0];
  if (!event) throw new Error("Event catalogue is empty");
  return event;
}
const initialEvent = firstEvent();

/** V173 Live Show Poster. All detail routes remain SSR links without JS.
 * Only existing owner media is used; no booking, sending or price is implied. */
function Events() {
  const [activeSlug, setActiveSlug] = useState(initialEvent.slug);
  const [cueRevision, setCueRevision] = useState(0);
  // A re-selection deliberately replays one short cue on a user action only.
  // Keep the previous authentic photo on stage until the selected one is decoded.
  // This avoids an empty black frame when switching on slow mobile networks.
  const [visualEvent, setVisualEvent] = useState(initialEvent);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const activeEvent = events.find((event) => event.slug === activeSlug) ?? initialEvent;
  const activeIndex = events.findIndex((event) => event.slug === activeEvent.slug) + 1;
  const indexText = String(activeIndex).padStart(2, "0");
  const visualIndex = events.findIndex((event) => event.slug === visualEvent.slug) + 1;
  const visualIndexText = String(visualIndex).padStart(2, "0");
  useEffect(() => {
    if (activeEvent.slug === visualEvent.slug) return;
    return preloadEventFrame(activeEvent.image.src, () => setVisualEvent(activeEvent));
  }, [activeEvent, visualEvent.slug]);

  function onSetlistKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = events.length;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    const nextEvent = events[next];
    if (!nextEvent) return;
    setActiveSlug(nextEvent.slug);
    setCueRevision(previous => previous + 1);
    event.currentTarget.closest(".gs173-setlist")
      ?.querySelectorAll<HTMLButtonElement>(".gs173-setlist__select")[next]?.focus();
  }

  return <>
    <style>{eventPosterCss}</style><style>{categorySignalCss}</style><style>{illustratedCategoryCss}</style>
    <div className="gs173-events gs198-events gs201-events" data-hydrated={hydrated}>
      <section className="gs173-live" aria-labelledby="gs173-title">
        <div className="container-site gs173-live__container">
          <div className="gs173-topline">
            <Link to="/" className="gs173-topline__crumb">GREEN SOUND MUSIC <span aria-hidden="true">/</span> EVENIMENTE</Link>
            <span>REGIA UNUI EVENIMENT — PITEȘTI / ARGEȘ</span>
          </div>
          <div className="gs173-live__layout">
            <div className="gs173-statement">
              <span className="gs173-statement__edition">GREEN SOUND / LIVE PRODUCTION <span>01—05</span></span>
              <h1 id="gs173-title"><span>NU TOATE</span><span>SERILE</span><span className="gs173-statement__script">SUNĂ LA FEL.</span></h1>
              <p>Nunți, botezuri, petreceri sau producții mari. Nu începem cu un pachet. Începem cu evenimentul tău.</p>
              <a href="#gs173-setlist-title" className="gs173-statement__jump">Alege atmosfera <ArrowDownRight size={20} aria-hidden="true" /></a>
              <div className="gs173-statement__registration" aria-hidden="true"><span>GS—M / LIVE</span><span>DIN 2008</span></div>
            </div>
            <div className="gs173-live__photobox">
              <div key={visualEvent.slug} className="gs173-stage-image">
                <img src={visualEvent.image.src} alt={visualEvent.image.alt} width={visualEvent.image.w} height={visualEvent.image.h} loading="eager"
                  fetchPriority={visualIndex === 1 ? "high" : undefined} decoding="async" />
                <div className="gs173-stage-image__gates" aria-hidden="true"><i/><i/><i/><i/></div>
              </div>
              <div className="gs173-photobox__top" aria-hidden="true"><span>GS / EVENT FRAME</span><span>{visualIndexText} / {String(events.length).padStart(2, "0")}</span></div>
              <div className="gs173-photobox__stamp" aria-hidden="true"><strong>{visualIndexText}</strong><span>SCENA SELECTATĂ</span></div>
              <div className="gs173-photobox__caption">
                <span>ACUM ÎN REGIE</span><h2>{visualEvent.name}</h2>
                <svg aria-hidden="true" viewBox="0 0 220 24" preserveAspectRatio="none">
                  <path d="M0 12H31L40 8L48 17L57 4L65 21L73 12H94L104 7L113 18L122 12H141L152 5L162 19L169 12H187L198 9L210 15L220 12"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="gs173-setlist__header" id="gs173-setlist-title">
            <span>01 / SETLIST DE EVENIMENTE</span>
            <p>Alege scena. Ilustrațiile reprezintă categoriile; fotografia reală și momentele se schimbă după selecție.</p>
          </div>
          <ol className="gs173-setlist" aria-label="Alege tipul de eveniment">
            {events.map((event, index) => {
              const selected = event.slug === activeEvent.slug;
              return <li className="gs173-setlist__item" key={event.slug} data-active={selected}>
                <button type="button" className="gs173-setlist__select"
                  aria-pressed={selected} aria-controls="gs173-selected-programme"
                  aria-label={"Previzualizează " + event.name}
                  onClick={() => { setActiveSlug(event.slug); setCueRevision(previous => previous + 1); }}
                  onKeyDown={(keyEvent) => onSetlistKeyDown(keyEvent, index)}>
                  <span className="gs173-setlist__index">{String(index + 1).padStart(2, "0")}.</span>
                  <CategorySignal key={selected ? `${event.slug}-${cueRevision}` : event.slug} kind={event.slug} play={selected && cueRevision > 0} />
                  <span className="gs173-setlist__name">{event.name}</span>
                  <span className="gs173-setlist__beat" aria-hidden="true"><i/><i/><i/><i/></span>
                </button>
                <Link to="/evenimente/$slug" params={{ slug: event.slug }} viewTransition className="gs173-setlist__route"
                  aria-label={"Detalii despre " + event.name}>Detalii <ArrowUpRight size={14} aria-hidden="true" /></Link>
              </li>;
            })}
          </ol>
        </div>
      </section>
      <section className="gs173-cues" id="gs173-selected-programme" aria-labelledby="gs173-cues-title">
        <div className="container-site">
          <div className="gs173-cues__top"><span>GREEN SOUND / PRODUCTION NOTES</span><span>EVENIMENT SELECTAT <b>{indexText} / {String(events.length).padStart(2, "0")}</b></span></div>
          <div className="gs173-cues__intro">
            <div className="gs173-cues__name">
              <span className="gs173-cues__eyebrow" aria-live="polite">În regie: {activeEvent.name}</span>
              <h2 id="gs173-cues-title">Fiecare detaliu.<span>La timpul lui.</span></h2>
            </div>
            <div className="gs173-cues__summary"><p>{activeEvent.short}</p><p>O schiță orientativă a momentelor și serviciilor care pot intra în desfășurător.</p></div>
          </div>
          <div className="gs173-cues__sheet">
            <div className="gs173-cues__sheet-heading"><span>MOMENT / REGIE</span><span>SERVICIU RELEVANT</span></div>
            <ol className="gs173-cues__moments">
              {activeEvent.moments.slice(0, 3).map((moment, index) => {
                const service = getService(moment.service);
                return <li key={activeEvent.slug + "-" + moment.title}>
                  <span className="gs173-cues__moment-index">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{moment.title}</h3><p>{moment.text}</p></div>
                  <Link to={"/" + service.slug} viewTransition className="gs173-cues__service">{service.name} <ArrowUpRight size={19} aria-hidden="true" /></Link>
                </li>;
              })}
            </ol>
          </div>
          <div className="gs173-cues__actions">
            <Link to="/evenimente/$slug" params={{ slug: activeEvent.slug }} viewTransition className="gs173-cues__details">
              Descoperă evenimentul <ArrowUpRight size={19} aria-hidden="true" /></Link>
            <a href={"/contact?event=" + encodeURIComponent(activeEvent.formLabel) + "#contact-form-title"} className="gs173-cues__contact">
              Cere ofertă pentru {activeEvent.name.toLowerCase()} <ArrowUpRight size={19} aria-hidden="true" /></a>
          </div>
          <p className="gs173-cues__note">Fotografii din materialele Green Sound existente. Prezentarea este orientativă, fără prețuri sau disponibilitate confirmată; nicio cerere nu se trimite automat.</p>
        </div>
      </section>
      <QuoteSection title="Pregătim împreună evenimentul tău"
        intro="Spune-ne data, locația și serviciile dorite. Mesajul se pregătește pentru WhatsApp sau email, fără trimitere automată." />
    </div>
  </>;
}
