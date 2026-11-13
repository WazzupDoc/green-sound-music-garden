import { ArrowUpRight, CalendarDays, Check, MapPin, Sparkles } from "lucide-react";
import { getService, type EventType } from "@/data/site";

/**
 * An in-page brief derived solely from known, event-specific services.
 * Native GET → the contact route validates and pre-fills the actual quote form.
 * No scheduling/availability claims and no automated message submission.
 */
export function EventBriefCard({ event }: { event: EventType }) {
  const services = event.recommended.map((recommendation) => getService(recommendation.slug));
  return (
    <section className="event-brief section" aria-labelledby="event-brief-heading">
      <div className="container-site event-brief__grid">
        <div className="event-brief__intro">
          <span className="event-brief__eyebrow"><Sparkles className="size-4" aria-hidden /> GREEN SOUND / EVENT BRIEF</span>
          <h2 id="event-brief-heading">Din inspirație, <em>spre un plan concret.</em></h2>
          <p>
            Pentru {event.name.toLowerCase()}, acestea sunt serviciile de la care putem porni.
            Selecția nu este un pachet fix: le poți modifica în cererea de ofertă.
          </p>
          <div className="event-brief__visual">
            <img src={event.image.src} alt="" width={event.image.w} height={event.image.h}
              loading="lazy" decoding="async" />
            <span>CURATED FOR / {event.name.toUpperCase()}</span>
          </div>
        </div>
        <div className="event-brief__panel">
          <div className="event-brief__panel-top">
            <span>BRIEF 01 / {event.name.toUpperCase()}</span>
            <span>{String(services.length).padStart(2, "0")} SERVICII SUGERATE</span>
          </div>
          <ul className="event-brief__items">
            {services.map((service, index) => (
              <li key={service.slug}>
                <span className="event-brief__number">{String(index + 1).padStart(2, "0")}</span>
                <span>{service.name}</span>
                <Check className="size-4" aria-hidden />
              </li>
            ))}
          </ul>
          <form action="/contact" method="get" className="event-brief__form" aria-label={`Continuă cu serviciile propuse pentru ${event.name.toLowerCase()}`}>
            <input name="event" type="hidden" value={event.formLabel} />
            <input name="services" type="hidden" value={services.map((service) => service.formLabel).join("|")} />
            <div className="event-brief__fields">
              <label><CalendarDays className="size-4" aria-hidden /> DATA EVENIMENTULUI
                <input type="date" name="date" aria-label="Data evenimentului" />
              </label>
              <label><MapPin className="size-4" aria-hidden /> LOCALITATEA
                <input type="text" name="location" maxLength={120} placeholder="Pitești, Argeș..." autoComplete="address-level2" />
              </label>
            </div>
            <button type="submit" className="event-brief__submit">
              Continuă spre ofertă <ArrowUpRight className="size-5" aria-hidden />
            </button>
            <p className="event-brief__note">
              Oferta și disponibilitatea se confirmă doar după discuția cu echipa.
              Formularul următor pregătește un mesaj WhatsApp sau email; îl trimiți tu.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
