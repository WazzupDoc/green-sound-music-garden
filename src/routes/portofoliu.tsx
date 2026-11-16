import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import portfolioDirectorCss from "@/styles/portfolio-directors-cut-v161.css?inline";
import { RegiaPhotoRail, RegiaFilmArchive, galleryFrames } from "@/components/atelier/RegiaPortfolio";
import { QuoteSection } from "@/components/site/blocks";
import { images, videos } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
const filmIds = new Set(Object.values(videos).map(item => item.id));
const photoIds = new Set(galleryFrames.map(item => item.id));
function validSearch(search:Record<string,unknown>):{film?:string;photo?:string} {
  if(typeof search["photo"]==="string" && photoIds.has(search["photo"])) return {photo:search["photo"]};
  if(typeof search["film"]==="string" && filmIds.has(search["film"])) return {film:search["film"]};
  return {};
}
export const Route=createFileRoute("/portofoliu")({
  validateSearch:validSearch,
  head:()=>pageHead({
    title:"Portofoliu Green Sound Music | Fotografii și filmări din evenimente",
    description:"Fotografii și videoclipuri Green Sound Music din concerte, nunți, spectacole, studio, lumini și petreceri din Pitești și nu numai.",
    path:"/portofoliu",image:images.concert,
    jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Portofoliu",path:"/portofoliu"}])],
  }),
  component:Portfolio,
});
function Portfolio(){
  const {film,photo}=Route.useSearch();
  return <div className="gs161-portfolio">
    <style>{portfolioDirectorCss}</style>
    <section className="gs161-hero" aria-labelledby="rs-portfolio-title">
      <div className="gs161-hero__media">
        <img src={images.concert.src} width={images.concert.w} height={images.concert.h}
          alt={images.concert.alt} fetchPriority="high" decoding="async" />
        <span className="gs161-hero__media-index" aria-hidden="true">GSM / REAL EVENTS ARCHIVE</span>
      </div>
      <div className="gs161-hero__copy">
        <span className="gs161-hero__eyebrow">GREEN SOUND MUSIC — ARHIVA VIZUALĂ</span>
        <h1 id="rs-portfolio-title">DINCOLO<br/>DE <em>SCENĂ.</em></h1>
        <div className="gs161-hero__foot">
          <p>Momente reale, văzute dinspre public, scenă și echipă. Fotografii și filme din arhiva Green Sound Music.</p>
          <nav aria-label="Explorează portofoliul">
            <a href="#portfolio-photos">Fotografii <ArrowDownRight className="size-4" aria-hidden /></a>
            <a href="#portfolio-films">Filme <ArrowUpRight className="size-4" aria-hidden /></a>
          </nav>
        </div>
      </div>
      <div className="gs161-hero__footer" aria-hidden="true">
        <span>FOTO / FILM / MUZICĂ / PRODUCȚIE</span>
        <span>01 / THE ARCHIVE</span>
      </div>
    </section>
    <RegiaPhotoRail activePhoto={photo} />
    <RegiaFilmArchive film={film} />
    <QuoteSection title="Ai un eveniment în pregătire?" intro="Spune-ne data și locația. Formularul doar pregătește mesajul, iar tu alegi dacă îl trimiți prin WhatsApp sau email." />
  </div>;
}
