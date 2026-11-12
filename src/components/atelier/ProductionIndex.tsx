import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { images, services, type ServiceSlug } from "@/data/site";

type Chapter = {
  index: string;
  overline: string;
  title: string;
  note: string;
  image: { src: string; alt: string; w: number; h: number };
  serviceSlugs: readonly ServiceSlug[];
  art: string;
};

/**
 * V48. A readable, non-interactive service architecture.
 * All eight real company services are visible and clickable without a
 * selector, carousel or animation. No fake bundles, prices or availability.
 */
export const chapters: readonly Chapter[] = [
  {
    index: "01",
    overline: "THE SOUND",
    title: "Muzica.",
    note: "DJ & MC, trupă live și înregistrări în studio — trei moduri de a construi partea muzicală.",
    image: images.dj,
    serviceSlugs: ["dj-mc", "trupa", "studio-inregistrari"],
    art: "sound",
  },
  {
    index: "02",
    overline: "THE STAGE",
    title: "Producția.",
    note: "Sunet, lumini și efect de fum greu — servicii tehnice pe care le poți discuta separat.",
    image: images.scena,
    serviceSlugs: ["echipamente-de-sunet-si-lumini", "masina-fum-greu-cu-gheata-carbonica"],
    art: "stage",
  },
  {
    index: "03",
    overline: "THE PEOPLE",
    title: "Momentele.",
    note: "Hostess, ursitoare la botez și animație pentru copii — fiecare cu rolul său la eveniment.",
    image: images.ursitoare,
    serviceSlugs: ["hostess", "ursitoare-botez", "start-veselia"],
    art: "people",
  },
];

/** Resolve the editorial programme once, not on every render. Missing catalogue
 * entries are a build-time content regression, never silently omitted links. */
export const editorialChapters = chapters.map((chapter) => ({
  ...chapter,
  linkedServices: chapter.serviceSlugs.map((slug) => {
    const service = services.find((item) => item.slug === slug);
    if (!service) throw new Error(`Editorial programme references unknown service: ${slug}`);
    return service;
  }),
}));

export function ProductionIndex() {
  return (
    <section id="gs-production-index" className="gs-index" aria-labelledby="gs-index-title">
      <div className="container-site">
        <header className="gs-index__intro">
          <div className="gs-index__overline">
            <span>GREEN SOUND MUSIC / CE FACEM</span>
            <span>01 — 08 / SERVICII</span>
          </div>
          <div className="gs-index__intro-grid">
            <h2 id="gs-index-title">Sunetul. Scena. <em>Oamenii.</em></h2>
            <div className="gs-index__intro-note">
              <p>Alege serviciul de care ai nevoie: DJ & MC, trupă live, sonorizare, lumini sau servicii pentru invitați. Detaliile de montaj și desfășurare le stabilim în funcție de eveniment.</p>
              <Link to="/servicii">Explorează toate serviciile <ArrowUpRight className="size-4" aria-hidden /></Link>
            </div>
          </div>
        </header>

        <div className="gs-index__chapters">
          {editorialChapters.map((chapter) => (
            <article key={chapter.index} className="gs-index__chapter" data-chapter={chapter.art}>
              <div className="gs-index__photo">
                <img src={chapter.image.src} alt={chapter.image.alt} width={chapter.image.w}
                  height={chapter.image.h} loading="lazy" decoding="async" />
                <span className="gs-index__photo-mark" aria-hidden="true">GS / {chapter.index}</span>
                <span className="gs-index__photo-label" aria-hidden="true">{chapter.overline}</span>
              </div>
              <div className="gs-index__chapter-body">
                <div className="gs-index__chapter-head">
                  <span>{chapter.index} / 03</span>
                  <span className="gs-index__chapter-line" aria-hidden="true" />
                  <span>{chapter.overline}</span>
                </div>
                <h3 id={`gs-index-chapter-${chapter.index}`}>{chapter.title}</h3>
                <p id={`gs-index-note-${chapter.index}`}>{chapter.note}</p>
                <ul className="gs-index__links" aria-labelledby={`gs-index-chapter-${chapter.index}`} aria-describedby={`gs-index-note-${chapter.index}`}>
                  {chapter.linkedServices.map((service) => (
                    <li key={service.slug}>
                      <Link to={`/${service.slug}`} className="gs-index__service">
                        <span>{service.name}</span>
                        <MoveUpRight className="size-4" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="gs-index__footer">
          <span>DIN PITEȘTI / ÎN TOATĂ ROMÂNIA</span>
          <span>MUZICĂ · LUMINĂ · PRODUCȚIE</span>
        </div>
      </div>
    </section>
  );
}
