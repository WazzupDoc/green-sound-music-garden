import { useState } from "react";
import { ArrowUpRight, Check, Plus, SlidersHorizontal } from "lucide-react";
import { events, services, type EventSlug, type ServiceSlug } from "@/data/site";

const eventServices = services.filter((service) => service.slug !== "studio-inregistrari");
const suggestedFor = (slug: EventSlug): ServiceSlug[] =>
  events.find((event) => event.slug === slug)?.recommended.map((item) => item.slug) ?? [];

/**
 * An honest, first-party event-service configurator.
 * The native GET form carries selections to the existing contact flow,
 * where all values are allowlisted before being used as form defaults.
 * It does not calculate prices or claim that a date is available.
 */
export function EventSoundcheck() {
  const [eventSlug, setEventSlug] = useState<EventSlug>("nunti");
  const [selected, setSelected] = useState<ServiceSlug[]>(() => suggestedFor("nunti"));
  const event = events.find((item) => item.slug === eventSlug) ?? events[0]!;
  const chosen = eventServices.filter((item) => selected.includes(item.slug));

  const changeEvent = (slug: EventSlug) => {
    setEventSlug(slug);
    // Explicitly replace the proposal with recommendations for this occasion.
    setSelected(suggestedFor(slug));
  };
  const toggle = (slug: ServiceSlug) =>
    setSelected((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );

  return (
    <section id="soundcheck" className="soundcheck section" aria-labelledby="soundcheck-title">
      <div className="container-site">
        <div className="crafted-section-intro soundcheck__intro">
          <span className="crafted-index"><SlidersHorizontal className="mr-2 inline size-4" aria-hidden /> 03 / SOUNDCHECK</span>
          <div>
            <h2 id="soundcheck-title" className="crafted-heading">Tu alegi piesele. <em>Noi construim show-ul.</em></h2>
            <p className="crafted-section-intro__copy">
              Creează o configurație de pornire pentru evenimentul tău. Personalizezi serviciile, iar noi discutăm detaliile și îți pregătim o ofertă.
            </p>
          </div>
        </div>

        <div className="soundcheck__grid">
          <div className="soundcheck__studio">
            <fieldset className="soundcheck__fieldset">
              <legend className="soundcheck__step"><span>01</span> CE ORGANIZĂM?</legend>
              <div className="soundcheck__events">
                {events.map((item) => (
                  <button key={item.slug} type="button" className="soundcheck__event"
                    aria-pressed={eventSlug === item.slug} onClick={() => changeEvent(item.slug)}>
                    {item.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="soundcheck__fieldset soundcheck__fieldset--services">
              <legend className="soundcheck__step"><span>02</span> CE FACE PARTE DIN ATMOSFERĂ?</legend>
              <p className="soundcheck__hint">Am pornit de la serviciile recomandate pentru {event.name.toLowerCase()}. Le poți modifica oricând.</p>
              <div className="soundcheck__service-grid">
                {eventServices.map((service, index) => {
                  const checked = selected.includes(service.slug);
                  return (
                    <label key={service.slug} className="soundcheck__service" data-checked={checked ? "yes" : "no"}>
                      <input type="checkbox" checked={checked} onChange={() => toggle(service.slug)} />
                      <span className="soundcheck__service-nr">{String(index + 1).padStart(2, "0")}</span>
                      <span className="soundcheck__service-copy">
                        <strong>{service.name}</strong>
                        <small>{service.short}</small>
                      </span>
                      <span className="soundcheck__service-indicator" aria-hidden>
                        {checked ? <Check className="size-4" /> : <Plus className="size-4" />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <aside className="soundcheck__preview" aria-label="Rezumatul configurației tale">
            <div className="soundcheck__visual">
              <img src={event.image.src} alt={event.image.alt} width={event.image.w} height={event.image.h}
                loading="lazy" decoding="async" />
              <div className="soundcheck__visual-label"><span>GREEN SOUND / CURATED FOR YOU</span><strong>{event.name}</strong></div>
            </div>
            <div className="soundcheck__summary">
              <div className="soundcheck__summary-head">
                <span className="soundcheck__step"><span>03</span> CONFIGURAȚIA TA</span>
                <span className="soundcheck__count" aria-live="polite">{chosen.length} {chosen.length === 1 ? "serviciu" : "servicii"}</span>
              </div>
              {chosen.length ? (
                <ul className="soundcheck__picks">
                  {chosen.map((service) => <li key={service.slug}><Check className="size-3.5" aria-hidden /> {service.name}</li>)}
                </ul>
              ) : (
                <p className="soundcheck__empty">Poți continua și fără selecție; îți recomandăm noi o configurație potrivită.</p>
              )}

              <form action="/contact" method="get" className="soundcheck__form" aria-label="Continuă cu configurația aleasă">
                <input type="hidden" name="event" value={event.formLabel} />
                <input type="hidden" name="services" value={chosen.map((service) => service.formLabel).join("|")} />
                <div className="soundcheck__details">
                  <label>DATA <span>(opțional)</span><input type="date" name="date" aria-label="Data evenimentului" /></label>
                  <label>LOCAȚIA <span>(opțional)</span><input type="text" name="location" maxLength={120} placeholder="Pitești, Argeș..." autoComplete="address-level2" /></label>
                </div>
                <button type="submit" className="soundcheck__cta">
                  Continuă spre ofertă <ArrowUpRight className="size-5" aria-hidden />
                </button>
                <p className="soundcheck__disclaimer">Fără rezervare automată și fără prețuri orientative inventate. Confirmăm disponibilitatea și oferta după discuție.</p>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
