import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getService, type EventType } from "@/data/site";
import { FaqList, PageHero, QuoteSection } from "./blocks";
import { VideoLite } from "./VideoLite";
import type { eventTypeOptions } from "@/lib/quote";
import eventDetailCss from "@/styles/event-detail-v89.css?inline";

/**
 * A real production brief based only on this event's existing service catalogue.
 * Visitors can choose relevant services; a native GET form passes allowlisted
 * formLabels to /contact. No reservation, message send or availability claim.
 */
export function EventPage({ event }: { event: EventType }) {
  const [selected, setSelected] = useState<string[]>([]);
  const recommended = event.recommended.map((item) => ({
    ...item,
    service: getService(item.slug),
  }));
  const chosen = recommended.filter((item) => selected.includes(item.slug));
  const selectedLabels = chosen.map((item) => item.service.formLabel);

  const toggleService = (slug: string) => {
    setSelected((previous) =>
      previous.includes(slug)
        ? previous.filter((entry) => entry !== slug)
        : [...previous, slug],
    );
  };

  return (
    <>
      <style>{eventDetailCss}</style>
      <PageHero
        eyebrow={`Evenimente · ${event.name}`}
        title={event.h1}
        lead={event.lead}
        image={event.image}
        transitionName={`gs-event-${event.slug}`}
        crumbs={[
          { name: "Acasă", to: "/" },
          { name: "Evenimente", to: "/evenimente" },
          { name: event.name },
        ]}
      />

      <section
        className="rs-event-timeline gs-event-v89__timeline"
        aria-labelledby="gs-event-v89-run-title"
      >
        <div className="container-site gs-event-v89__run">
          <div className="rs-event-timeline__title gs-event-v89__run-intro">
            <p className="gs-event-v89__eyebrow">GREEN SOUND / DESFĂȘURĂTOR ORIENTATIV</p>
            <h2 id="gs-event-v89-run-title">De la pregătiri până la finalul evenimentului</h2>
            <p>
              Ordinea este orientativă. Programul și serviciile se stabilesc
              împreună cu organizatorul, în funcție de locație și de invitați.
            </p>
            <div className="gs-event-v89__signal" aria-hidden="true">
              <svg viewBox="0 0 280 44" fill="none" role="presentation">
                <path d="M0 22H28L36 16L44 28L52 6L61 38L72 11L83 33L93 20L102 24L112 22H140" />
                <path d="M140 22H157L166 10L175 34L185 2L195 42L207 17L218 27L230 22H280" />
              </svg>
              <span>01 / RUN OF SHOW</span>
            </div>
          </div>
          <ol className="gs-event-v89__run-list">
            {event.moments.map((moment, index) => {
              const service = getService(moment.service);
              return (
                <li key={`${moment.title}-${index}`} className="gs-event-v89__cue">
                  <span className="gs-event-v89__cue-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="gs-event-v89__cue-copy">
                    <h3>{moment.title}</h3>
                    <p>{moment.text}</p>
                  </div>
                  <Link to={`/${service.slug}`} viewTransition className="gs-event-v89__cue-link">
                    <span>{service.name}</span>
                    <ArrowUpRight size={19} strokeWidth={1.4} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        className="rs-event-offerings gs-event-v89__offers"
        aria-labelledby="gs-event-v89-offers-title"
      >
        <div className="container-site rs-event-offerings__inside gs-event-v89__offers-layout">
          <div className="gs-event-v89__offers-intro">
            <p className="gs-event-v89__eyebrow">GREEN SOUND / SERVICE SELECTION</p>
            <h2 id="gs-event-v89-offers-title">
              Ce putem <em>pregăti.</em>
            </h2>
            <p>
              Alege serviciile care te interesează. Le precompletăm în formularul
              de Contact; selecția este orientativă și nu reprezintă o rezervare.
            </p>
            <span className="gs-event-v89__selection-guide">
              Poți selecta mai multe servicii sau poți cere o ofertă fără o selecție.
            </span>
          </div>

          <div className="gs-event-v89__offer-panel">
            <ul className="gs-event-v89__offer-list">
              {recommended.map((item, index) => {
                const isSelected = selected.includes(item.slug);
                return (
                  <li key={item.slug} className="gs-event-v89__offering" data-selected={isSelected}>
                    <span className="gs-event-v89__offer-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="gs-event-v89__offer-copy">
                      <Link to={`/${item.service.slug}`} viewTransition className="gs-event-v89__detail">
                        {item.service.name}
                        <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" />
                      </Link>
                      <p>{item.why}</p>
                    </div>
                    <button
                      type="button"
                      className="gs-event-v89__pick"
                      aria-pressed={isSelected}
                      aria-label={`${isSelected ? "Elimină din ofertă" : "Adaugă în ofertă"}: ${item.service.name}`}
                      onClick={() => toggleService(item.slug)}
                    >
                      <span aria-hidden="true">{isSelected ? "−" : "+"}</span>
                      <span>{isSelected ? "Selectat" : "Selectează"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <form action="/contact" method="get" className="gs-event-detail-brief gs-event-v89__brief">
              <input type="hidden" name="event" value={event.formLabel} />
              <input type="hidden" name="services" value={selectedLabels.join("|")} />
              <div>
                <span className="gs-event-v89__brief-kicker">BRIEF / {event.name}</span>
                <p role="status" aria-live="polite">
                  {selectedLabels.length
                    ? `${selectedLabels.length} ${selectedLabels.length === 1 ? "serviciu selectat" : "servicii selectate"}`
                    : "Niciun serviciu selectat încă"}
                </p>
                <span className="gs-event-v89__brief-note">
                  Următorul pas pregătește mesajul. Nu trimitem nimic automat.
                </span>
              </div>
              <button type="submit" className="gs-event-v89__brief-action">
                Continuă spre ofertă
                <ArrowUpRight size={20} strokeWidth={1.3} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {event.videos.length > 0 && (
        <section className="rs-event-film">
          <div className="container-site">
            <h2>Filmări din arhiva Green Sound</h2>
            <div>
              {event.videos.map((video) => (
                <VideoLite key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      )}

      {event.faqs.length > 0 && (
        <section className="rs-service-faq">
          <div className="container-site">
            <h2>Întrebări frecvente</h2>
            <FaqList faqs={event.faqs} />
          </div>
        </section>
      )}

      <QuoteSection
        title={`Organizezi ${event.name.toLowerCase()}?`}
        intro="Spune-ne data, locația și ce servicii te interesează. Mesajul nu se trimite automat."
        defaultEventType={event.formLabel as (typeof eventTypeOptions)[number]}
      />
    </>
  );
}
