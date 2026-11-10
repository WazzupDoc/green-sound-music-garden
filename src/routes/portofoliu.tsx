import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { VideoLite } from "@/components/site/VideoLite";
import { images, videos } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portofoliu")({
  head: () =>
    pageHead({
      title: "Portofoliu video și foto — evenimente Green Sound Music Pitești",
      description:
        "Filmări și fotografii Green Sound Music de la nunți, show-uri de lumini și producții muzicale. Descoperă atmosfera evenimentelor reale.",
      path: "/portofoliu",
      jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Portofoliu", path: "/portofoliu" }])],
    }),
  component: Page,
});

const filters = [
  { id: "toate", label: "Toate" },
  { id: "nunti", label: "Nunți" },
  { id: "dj-mc", label: "DJ & MC" },
  { id: "sonorizare", label: "Sunet & lumini" },
  { id: "fum-greu", label: "Efecte speciale" },
  { id: "trupa", label: "Trupă" },
  { id: "studio", label: "Studio" },
];

const photos = [images.concert, images.scena, images.dj, images.hostess, images.ursitoare2, images.copii];

function Page() {
  const [active, setActive] = useState("toate");
  const list = useMemo(
    () => Object.values(videos).filter((video) => active === "toate" || video.tags.includes(active)),
    [active],
  );

  return (
    <>
      <PageHero
        eyebrow="Portofoliu / filme și fotografii reale"
        title="Seara trece. Atmosfera rămâne."
        lead="O selecție de momente de la evenimente, apariții și producții muzicale Green Sound Music. Toate materialele reprezintă activități reale ale echipei."
        image={images.concert}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Portofoliu" }]}
      />
      <section className="section gs-gallery" aria-labelledby="video-port">
        <div className="container-site">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">01 / Mișcare și sunet</p>
              <h2 id="video-port" className="display-lg mt-4">
                Momente <span className="serif-accent text-primary">în mișcare.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Selectează un tip de eveniment. Videoclipurile se încarcă doar după ce apeși play.
            </p>
          </div>
          <div role="group" aria-label="Filtrează videoclipurile" className="mb-10 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active === filter.id}
                onClick={() => setActive(filter.id)}
                className={
                  "border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
                  (active === filter.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground/80 hover:border-foreground/60")
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
          {list.length > 0 ? (
            <div className="gs-gallery__grid" aria-live="polite">
              {list.map((video) => (
                <VideoLite key={video.id} video={video} className="gs-gallery__video" />
              ))}
            </div>
          ) : (
            <p role="status" className="py-12 text-muted-foreground">
              Nu avem încă videoclipuri publicate în această categorie. Poți explora celelalte selecții.
            </p>
          )}
        </div>
      </section>
      <section className="section surface-paper" aria-labelledby="foto-port">
        <div className="container-site">
          <div className="mb-12">
            <p className="eyebrow">02 / Cadre reale</p>
            <h2 id="foto-port" className="display-lg mt-4">
              Un detaliu, o lumină, <span className="serif-accent">un moment.</span>
            </h2>
          </div>
          <div className="gs-gallery__photos">
            {photos.map((image) => (
              <figure key={image.src} className="m-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.w}
                  height={image.h}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="mt-3 text-xs leading-relaxed text-paper-muted">{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <QuoteSection title="Pregătim și atmosfera evenimentului tău?" />
    </>
  );
}
