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
                <span className="gs301-photo-signal" aria-hidden="true"><i/><i/><i/><i/><i/></span>
                <span className="gs-index__photo-label" aria-hidden="true">{chapter.overline}</span>
              </div>
              <div className="gs-index__chapter-body">
                <div className="gs-index__chapter-head">
                  <span className="gs301-chapter-number">{chapter.index} / 03</span>
                  <span className="gs-index__chapter-line" aria-hidden="true" />
                  <span>{chapter.overline}</span>
                </div>
                <h3 id={`gs-index-chapter-${chapter.index}`}>{chapter.title}</h3>
                <p id={`gs-index-note-${chapter.index}`}>{chapter.note}</p>
                <ul className="gs-index__links" aria-labelledby={`gs-index-chapter-${chapter.index}`} aria-describedby={`gs-index-note-${chapter.index}`}>
                  {chapter.linkedServices.map((service) => (
                    <li key={service.slug}>
                      <Link to={`/${service.slug}`} className="gs-index__service">
                        <ServiceGlyph slug={service.slug} />
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

/** Original 24-unit service pictograms, decorative; the native link owns the name. */
function ServiceGlyph({slug}: {slug: ServiceSlug}) {
  const marks: Record<ServiceSlug,string> = {
    "dj-mc":"M3 5h18v14H3zM6 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 8v8m3-8v8M14 10h2m1 4h2",
    "trupa":"M9 4v12m0-12 10-2v12M9 16c0 2-2 4-4 4s-3-1-3-2 2-4 5-4h2m10 0c0 2-2 4-4 4s-3-1-3-2 2-4 5-4h2",
    "studio-inregistrari":"M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0zM6 10v2a6 6 0 0 0 12 0v-2M12 18v4M8 22h8",
    "echipamente-de-sunet-si-lumini":"M3 3h9v18H3zM7.5 7h.01M5 15a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0M15 3h6v5h-6zM16 10l-2 8m4-8v11m2-11 2 8",
    "masina-fum-greu-cu-gheata-carbonica":"M3 15c0-3 4-4 6-2 1-4 7-4 8 0 4-1 6 3 3 5H4m0 3h15M5 8c2-3 5-3 7-1m3-3 1-2",
    "hostess":"M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8M4 22v-4a8 8 0 0 1 16 0v4M8 14l4 4 4-4",
    "ursitoare-botez":"M4 21 18 7M18 2v4m0 4v4m-6-8h4m4 0h3M6 3l1 3 3 1-3 1-1 3-1-3-3-1 3-1z",
    "start-veselia":"M5 20 9 4l11 11zM13 2l1 3m6 0-2 3m4 4-3 1M2 4l2 2m16 15 2 1",
  };
  return <svg className="gs301-service-glyph" width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.45" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={marks[slug]}/></svg>;
}
