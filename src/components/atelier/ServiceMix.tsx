import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, AudioLines, Check, CircleHelp, Layers3, X } from "lucide-react";
import { services, type ServiceSlug } from "@/data/site";

const firstService = services[0]!;
const maxServices = services.length;

/**
 * A genuinely useful, non-priced service brief. Every item is drawn from the
 * existing verified service catalogue, and /contact allowlists the form labels.
 * Nothing is booked, sent or claimed available at this stage.
 */
export function ServiceMix() {
  const [activeSlug, setActiveSlug] = useState<ServiceSlug>(firstService.slug);
  const [selected, setSelected] = useState<ServiceSlug[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const active = services.find((item) => item.slug === activeSlug) ?? firstService;
  const selectedServices = services.filter((item) => selected.includes(item.slug));
  const selectedLabels = selectedServices.map((item) => item.formLabel);
  const chosen = selected.includes(active.slug);

  const toggle = (slug: ServiceSlug) => {
    setSelected((previous) =>
      previous.includes(slug) ? previous.filter((item) => item !== slug) : [...previous, slug]);
    setActiveSlug(slug);
  };

  return (
    <section className="gs-service-mix section" aria-labelledby="gs-service-mix-title"
      data-hydrated={hydrated ? "true" : "false"}>
      <div className="container-site">
        <header className="gs-service-mix__heading">
          <div>
            <span className="gs-service-mix__eyebrow"><AudioLines className="size-4" aria-hidden /> GREEN SOUND / SERVICE MIX</span>
            <h2 id="gs-service-mix-title">Alege ingredientele. <em>Noi construim atmosfera.</em></h2>
          </div>
          <p>De la muzică la scenotehnică și efecte. Selectează serviciile care te interesează, explorează detaliile și continuă cu o cerere de ofertă personalizată.</p>
        </header>

        <div className="gs-service-mix__layout">
          <div className="gs-service-mix__catalogue" role="group" aria-label="Selectează serviciile pentru ofertă">
            <div className="gs-service-mix__list-head">
              <span>01 / CAPABILITĂȚILE NOASTRE</span>
              <span>{String(services.length).padStart(2,"0")} SERVICII</span>
            </div>
            {services.map((item,index) => {
              const isSelected = selected.includes(item.slug);
              return (
                <div className="gs-service-mix__item" key={item.slug}
                  data-active={active.slug===item.slug} data-selected={isSelected}>
                  <button className="gs-service-mix__pick" type="button" aria-pressed={isSelected}
                    aria-label={`${isSelected ? "Elimină" : "Adaugă"}: ${item.name}`}
                    data-service-slug={item.slug} onClick={() => toggle(item.slug)}
                    data-cursor-label={isSelected ? "REMOVE" : "ADD SERVICE"}>
                    <span className="gs-service-mix__number">{String(index+1).padStart(2,"0")}</span>
                    <span className="gs-service-mix__item-name">{item.name}</span>
                    <span className="gs-service-mix__check" aria-hidden>
                      {isSelected ? <Check className="size-5"/> : <span>+</span>}
                    </span>
                  </button>
                  <button className="gs-service-mix__inspect" type="button"
                    aria-label={`Previzualizează serviciul ${item.name}`}
                    onClick={() => setActiveSlug(item.slug)}
                    data-cursor-label="EXPLOREAZĂ">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </button>
                </div>
              );
            })}
            <p className="gs-service-mix__list-note"><CircleHelp className="size-4" aria-hidden />
              Selecția este orientativă. Echipa confirmă configurația și disponibilitatea după discuție.</p>
          </div>

          <div className="gs-service-mix__spotlight">
            <div className="gs-service-mix__visual">
              <img key={active.slug} src={active.image.src} alt={active.image.alt}
                width={active.image.w} height={active.image.h} loading="lazy" decoding="async" />
              <div className="gs-service-mix__visual-shade" aria-hidden />
              <div className="gs-service-mix__visual-top" aria-hidden>
                <span>GREEN SOUND / THE MIX</span><span>PREVIEW / {String(services.indexOf(active)+1).padStart(2,"0")}</span>
              </div>
              <div className="gs-service-mix__visual-title">
                <span>{active.eyebrow}</span>
                <h3>{active.name}</h3>
              </div>
            </div>
            <div className="gs-service-mix__insight" aria-live="polite" aria-atomic="true">
              <p>{active.short}</p>
              <ul>
                {active.highlights.slice(0,2).map((point) => (
                  <li key={point.title}><Check className="size-4" aria-hidden />{point.title}</li>
                ))}
              </ul>
              <div className="gs-service-mix__insight-actions">
                <Link to={`/${active.slug}`} className="gs-service-mix__detail">
                  Detalii complete <ArrowUpRight className="size-4" aria-hidden />
                </Link>
                <button type="button" className="gs-service-mix__add"
                  data-selected={chosen} aria-pressed={chosen}
                  onClick={() => toggle(active.slug)}>
                  {chosen ? <><Check className="size-4" aria-hidden /> Selectat</> :
                    <><span aria-hidden>+</span> Adaugă în ofertă</>}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="gs-service-mix__brief" aria-labelledby="gs-service-mix-brief-title">
          <div className="gs-service-mix__brief-label">
            <span><Layers3 className="size-4" aria-hidden/> YOUR PRODUCTION BRIEF</span>
            <span className="gs-service-mix__brief-counter" aria-live="polite">
              {String(selectedServices.length).padStart(2,"0")} / {String(maxServices).padStart(2,"0")} SELECTATE
            </span>
          </div>
          <div className="gs-service-mix__brief-inner">
            <div>
              <h3 id="gs-service-mix-brief-title">Mixul evenimentului <em>tău.</em></h3>
              <p>{selectedServices.length
                ? "Am pregătit selecția. O poți modifica acum sau în formularul de ofertă."
                : "Alege unul sau mai multe servicii de mai sus. Le vei găsi precompletate în formular."}</p>
              <div className="gs-service-mix__tokens" aria-live="polite" aria-label="Servicii selectate">
                {selectedServices.length ? selectedServices.map((item) => (
                  <button type="button" className="gs-service-mix__token" key={item.slug}
                    onClick={() => toggle(item.slug)} aria-label={`Elimină ${item.name} din selecție`}>
                    <span>{item.formLabel}</span><X className="size-3.5" aria-hidden />
                  </button>
                )) : <span className="gs-service-mix__empty">Niciun serviciu selectat încă</span>}
              </div>
            </div>
            <form action="/contact" method="get" className="gs-service-mix__form"
              aria-label="Continuă cu serviciile selectate">
              <input type="hidden" name="services" value={selectedLabels.join("|")} />
              <button type="submit" className="gs-service-mix__submit"
                disabled={selectedServices.length===0}>
                Continuă spre ofertă <ArrowUpRight className="size-5" aria-hidden />
              </button>
              <p>Nimic nu se trimite automat. Urmează un formular în care confirmi datele și alegi WhatsApp sau email.</p>
              {selectedServices.length>0 && (
                <button type="button" className="gs-service-mix__clear"
                  onClick={() => setSelected([])}>Golește selecția</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
