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
            <h2 id="gs-index-title">Muzică. Lumini. <em>Experiență.</em></h2>
            <div className="gs-index__intro-note">
              <p>DJ & MC, trupă live, sunet, lumini și momente pentru invitați. O producție construită în jurul evenimentului tău.</p>
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
                <ChapterGlyph art={chapter.art} />
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
          <span>DIN PITEȘTI / ALTE LOCALITĂȚI, LA CERERE</span>
          <span>MUZICĂ · LUMINĂ · PRODUCȚIE</span>
        </div>
      </div>
    </section>
  );
}

/** The three chapter marks from the approved visual reference, recreated as vectors. */
function ChapterGlyph({art}: {art: Chapter["art"]}) {
  const paths = {
    sound: "M1 14h3m3-6v12m4-17v22m4-25v28m4-21v14m4-10v6m3-3h3",
    stage: "M15 9a6 6 0 1 0 0 12 6 6 0 1 0 0-12zM15 1v5m0 18v5M1 15h5m18 0h5M5 5l4 4m12 12 4 4M5 25l4-4M21 9l4-4",
    people: "M10 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM2 28v-4a8 8 0 0 1 16 0v4zM21 4a5 5 0 0 1 0 10M21 17a8 8 0 0 1 8 8v3h-7",
  } as const;
  return <svg className="gs302-chapter-glyph" width="32" height="32" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[art]}/></svg>;
}
