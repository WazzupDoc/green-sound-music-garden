import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { images, services } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/servicii")({
  head: () => pageHead({
    title: "Servicii pentru evenimente — DJ, trupă, sunet, lumini | Green Sound Music",
    description:
      "DJ & MC, trupă live, sonorizare, lumini, ecrane LED, fum greu, hostess, ursitoare, Start Veselia și studio de înregistrări în Pitești.",
    path: "/servicii",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Servicii", path: "/servicii" }])],
  }),
  component: Page,
});

function Page() {
  return <>
    <PageHero
      eyebrow="Servicii / ce facem"
      title="Artiști, sunet și lumină. O experiență coerentă."
      lead="Un serviciu sau producția completă a unui eveniment. Fiecare element poate avea propriul rol, dar cele mai bune momente apar când funcționează împreună."
      image={images.scena}
      crumbs={[{ name: "Acasă", to: "/" }, { name: "Servicii" }]}
    />
    <section className="gs-directory" aria-labelledby="gs-directory-title">
      <div className="container-site">
        <div className="gs-directory__intro">
          <h2 id="gs-directory-title">Ce putem construi <em className="serif-accent">împreună.</em></h2>
          <p>Explorează fiecare serviciu și fotografiile reale. Pentru o combinație potrivită, spune-ne data și tipul evenimentului.</p>
        </div>
        <div className="gs-directory__list">
          {services.map((service, i) => (
            <Link to={"/" + service.slug} key={service.slug} className="gs-directory__item">
              <span className="gs-directory__item-index">0{i + 1}</span>
              <span><h3>{service.name}</h3><p>{service.short}</p></span>
              <img src={service.image.src} alt="" width={service.image.w} height={service.image.h} loading="lazy" decoding="async" />
              <ArrowUpRight size={22} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
    <QuoteSection title="Începem cu o discuție." />
  </>;
}
