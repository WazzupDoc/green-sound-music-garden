import { Link } from "@tanstack/react-router";
import signalLedgerCss from "@/styles/production-signal-v83.css?inline";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { images, services, type ServiceSlug } from "@/data/site";

type Chapter = {
  index: string;
  overline: string;
  title: string;
  note: string;
  image: { src: string; alt: string; w: number; h: number };
  serviceSlugs: readonly ServiceSlug[];
  art: "sound" | "stage" | "people";
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
const editorialServiceSlugs = chapters.flatMap((chapter) => chapter.serviceSlugs);
if (new Set(editorialServiceSlugs).size !== editorialServiceSlugs.length) {
  throw new Error("Editorial programme contains duplicate service links");
}
const catalogueSlugList = services.map((service) => service.slug);
const catalogueSlugs = new Set(catalogueSlugList);
if (catalogueSlugs.size !== catalogueSlugList.length) {
  throw new Error("Service catalogue contains duplicate slugs");
}
if (editorialServiceSlugs.length !== catalogueSlugs.size ||
    editorialServiceSlugs.some((slug) => !catalogueSlugs.has(slug))) {
  throw new Error("Editorial programme must link to every catalogue service exactly once");
}

// Resolve services once by slug after the duplicate-source guard; preserve chapter order.
const servicesBySlug = new Map(services.map((service) => [service.slug, service] as const));

export const editorialChapters = chapters.map((chapter) => ({
  ...chapter,
  linkedServices: chapter.serviceSlugs.map((slug) => {
    const service = servicesBySlug.get(slug);
    if (!service) throw new Error(`Editorial programme references unknown service: ${slug}`);
    return service;
  }),
}));


/** A typographic, deliberately non-reactive signal engraving. These bars are
 * visual identity, not an audio analyser; keep every service usable without JS. */
const chapterSignalLevels = {
  sound: [18, 45, 72, 41, 88, 64, 28, 96, 58, 79, 33, 66, 24, 51, 84, 38, 71],
  stage: [77, 72, 66, 54, 33, 26, 19, 16, 19, 26, 33, 54, 66, 72, 77, 62, 43],
  people: [19, 26, 43, 61, 76, 89, 81, 62, 37, 21, 28, 53, 74, 91, 58, 33, 20],
} as const;

export function ProductionIndex() {
  return (
    <section id="gs-production-index" className="gs-index" aria-labelledby="gs-index-title">
      {/* CSS is component-scoped and SSR-included, preserving the 52kB shared-CSS cap. */}
      <style>{signalLedgerCss}</style>
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
                {/* A three-channel production engraving, not a fake live audio meter. */}
                <div className="gs-index__signal-ledger" aria-hidden="true">
                  <div className="gs-index__signal-ledger-head">
                    <span>CH.{chapter.index} / GS</span>
                    <span className="gs-index__signal-ledger-dot" />
                  </div>
                  <div className="gs-index__signal-ledger-bars">
                    {chapterSignalLevels[chapter.art].map((level, i) => (
                      <i key={i} style={{ height: `${level}%` }} />
                    ))}
                  </div>
                  <span className="gs-index__signal-ledger-foot">SOUND / LIGHT / PEOPLE</span>
                </div>
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
                <div className="gs-index__routing" aria-hidden="true">
                  <span>GS / PRODUCTION CHANNEL {chapter.index}</span>
                  <span className="gs-index__routing-rail"><i /></span>
                  <span>0{chapter.linkedServices.length} TRACKS</span>
                </div>
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
