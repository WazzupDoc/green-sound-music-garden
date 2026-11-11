import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { PortfolioJournal, PortfolioFilmArchive } from "@/components/atelier/PortfolioJournal";
import { business, images } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portofoliu")({
  head: () => pageHead({
    title: "Portofoliu foto video real | Nunți, DJ, concerte și lumini — Green Sound Music",
    description: "Explorează fotografii reale, filmări de nuntă, DJ, concerte și lumini din portofoliul Green Sound Music Pitești. Selectează proiectele și cere o ofertă.",
    path: "/portofoliu",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Portofoliu", path: "/portofoliu" }])],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHero eyebrow="THE EVENT JOURNAL / GREEN SOUND MUSIC"
        title="Nu doar imagini frumoase. Atmosfere care au existat."
        lead="Fotografii și filmări din evenimentele, spectacolele și producțiile Green Sound Music. Dincolo de promisiuni: vezi experiența reală."
        image={images.concert}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Portofoliu" }]} />
      <nav className="journal__quicknav" aria-label="Explorează portofoliul">
        <div className="container-site journal__quicknav-inner">
          <span>GREEN SOUND / {business.address.city.toUpperCase()} / DIN {business.founded}</span>
          <a href="#portfolio-photos">Fotografii <ArrowDownRight className="size-4" aria-hidden /></a>
          <a href="#portfolio-films">Filme reale <ArrowDownRight className="size-4" aria-hidden /></a>
        </div>
      </nav>
      <PortfolioJournal />
      <div className="journal__manifesto" aria-label="Atmosfera Green Sound Music">
        <div className="container-site">
          <span>DIN IMAGINI ÎN AMINTIRI / GREEN SOUND MUSIC</span>
          <p>Se aude. <em>Se vede.</em> Se simte.</p>
        </div>
      </div>
      <PortfolioFilmArchive />
      <QuoteSection
        title="Vrei o atmosferă asemănătoare la evenimentul tău?"
        intro="Spune-ne tipul evenimentului, data și locul. Îți pregătim împreună o propunere de muzică, sunet, lumini sau efecte, fără rezervare automată." />
    </>
  );
}
