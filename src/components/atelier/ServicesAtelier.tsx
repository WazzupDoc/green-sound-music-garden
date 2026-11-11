import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, AudioLines } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { services } from "@/data/site";

const featured = services.slice(0, 5);
export function ServicesAtelier() {
  const [selected, setSelected] = useState(featured[0]!.slug);
  const reduce = useReducedMotion();
  const active = featured.find((service) => service.slug === selected) ?? featured[0]!;
  return (
    <section className="crafted-services section" aria-labelledby="crafted-services-title">
      <div className="container-site">
        <div className="crafted-section-intro">
          <span className="crafted-index">02 / CE FACEM</span>
          <div>
            <h2 id="crafted-services-title" className="crafted-heading">Arta de a face un spațiu <em>să prindă viață.</em></h2>
            <p className="crafted-section-intro__copy">De la primul beat până la ultima lumină. Servicii independente, coordonate ca o singură producție.</p>
          </div>
        </div>
        <div className="crafted-services__layout">
          <div className="crafted-services__list">
            {featured.map((service, index) => (
              <div key={service.slug} className="crafted-services__row" data-selected={active.slug === service.slug}>
                <button type="button" onClick={() => setSelected(service.slug)} aria-pressed={active.slug === service.slug}
                  onFocus={() => setSelected(service.slug)} className="crafted-services__select">
                  <span className="crafted-services__number">0{index + 1}</span>
                  <span className="crafted-services__title">{service.name}</span>
                  <span className="crafted-services__indicator"><AudioLines className="size-4" aria-hidden /></span>
                </button>
                <Link to={`/${service.slug}`} className="crafted-services__link"
                  aria-label={`Detalii despre ${service.name}`}><ArrowUpRight className="size-5" aria-hidden /></Link>
              </div>
            ))}
            <Link to="/servicii" className="crafted-text-link mt-7 inline-flex items-center gap-2">
              Toate serviciile <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="crafted-services__visual" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.slug} initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : .45, ease: [.16, 1, .3, 1] }}
                className="crafted-services__image-wrap">
                <img src={active.image.src} alt={active.image.alt} width={active.image.w} height={active.image.h}
                  loading="lazy" decoding="async" />
                <div className="crafted-services__caption">
                  <span className="label-tech">GREEN SOUND MUSIC / PRODUCTION</span>
                  <p>{active.short}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
