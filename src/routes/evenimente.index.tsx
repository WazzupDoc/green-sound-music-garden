import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { events, images } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/evenimente/")({
  head: () => pageHead({
    title: "Evenimente: nunți, botezuri, corporate, concerte | Green Sound Music",
    description:
      "Descoperă servicii Green Sound Music pentru nunți, botezuri, evenimente corporate, concerte, festivaluri și petreceri private în Pitești.",
    path: "/evenimente",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Evenimente", path: "/evenimente" }])],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Evenimente / fiecare cu atmosfera sa"
        title="Fiecare moment are ritmul lui."
        lead="De la emoția primului dans la energia unui concert. Descoperă serviciile potrivite pentru tipul tău de eveniment."
        image={images.concert}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Evenimente" }]}
      />
      <section className="gs-directory" aria-labelledby="event-list-title">
        <div className="container-site">
          <div className="gs-directory__intro">
            <h2 id="event-list-title">Ce pregătim <span className="serif-accent">împreună?</span></h2>
            <p>Fiecare ocazie are alte nevoi. Începem cu data, locul și oamenii, apoi alegem muzica și soluțiile tehnice potrivite.</p>
          </div>
          <div className="gs-directory__list">
            {events.map((event, i) => (
              <Link
                key={event.slug}
                to="/evenimente/$slug"
                params={{ slug: event.slug }}
                className="gs-directory__item"
              >
                <span className="gs-directory__item-index">0{i + 1}</span>
                <span><h3>{event.name}</h3><p>{event.short}</p></span>
                <img src={event.image.src} alt="" loading="lazy" decoding="async" width={event.image.w} height={event.image.h} />
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <QuoteSection title="Spune-ne ce urmează să sărbătorești." />
    </>
  );
}
