import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarCheck2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { events, type EventSlug } from "@/data/site";

export function EventsSelector() {
  const [slug, setSlug] = useState<EventSlug>("nunti");
  const reduce = useReducedMotion();
  const current = events.find((event) => event.slug === slug) ?? events[0]!;
  const briefLink = `/contact?event=${encodeURIComponent(current.formLabel)}`;
  return (
    <section id="crafted-experiences" className="crafted-experiences section" aria-labelledby="crafted-events-title">
      <div className="container-site">
        <div className="crafted-section-intro">
          <span className="crafted-index">01 / EXPERIENȚE</span>
          <div>
            <h2 id="crafted-events-title" className="crafted-heading">Fiecare eveniment are <em>propria energie.</em></h2>
            <p className="crafted-section-intro__copy">Tu alegi momentul. Noi construim ce se aude, ce se vede și ce rămâne în amintire.</p>
          </div>
        </div>
        <div className="crafted-experiences__layout">
          <div className="crafted-experiences__options" role="group" aria-label="Selectează tipul evenimentului">
            {events.map((event, index) => (
              <button key={event.slug} type="button" onClick={() => setSlug(event.slug)}
                className="crafted-experiences__option" aria-pressed={slug === event.slug}>
                <span className="crafted-experiences__count">0{index + 1}</span>
                <span className="crafted-experiences__name">{event.name}</span>
                <ArrowUpRight aria-hidden className="size-5 shrink-0" />
              </button>
            ))}
          </div>
          <div className="crafted-experiences__preview">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.slug} className="crafted-experiences__frame"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reduce ? 0 : .36, ease: [.16, 1, .3, 1] }}>
                <img src={current.image.src} alt={current.image.alt}
                  width={current.image.w} height={current.image.h} loading="lazy" decoding="async" />
                <div className="crafted-experiences__overlay">
                  <span className="label-tech">DIN IDEE, ÎN ATMOSFERĂ</span>
                  <p>{current.short}</p>
                  <Link to="/evenimente/$slug" params={{ slug: current.slug }} className="crafted-button crafted-button--light">
                    Vezi experiența <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                  <a href={briefLink} className="crafted-experiences__brief-link">
                    <CalendarCheck2 className="size-4" aria-hidden /> Cere ofertă pentru {current.name.toLowerCase()}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
