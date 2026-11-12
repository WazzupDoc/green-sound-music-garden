import { createFileRoute } from "@tanstack/react-router";
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
  return <>
    <section className="gsx-portfolio-intro" aria-labelledby="rs-portfolio-title">
      <div className="gsx-portfolio-intro__image">
        <img src={images.concert.src} alt={images.concert.alt}
          width={images.concert.w} height={images.concert.h}
          fetchPriority="high" decoding="async"/>
      </div>
      <div className="gsx-portfolio-intro__graphic" aria-hidden="true">
        <img src="/creative/sonic-ribbon.svg" alt="" width={1600} height={720}/>
      </div>
      <div className="container-site gsx-portfolio-intro__copy">
        <span>GREEN SOUND / PORTOFOLIU REAL</span>
        <h1 id="rs-portfolio-title">Ce se întâmplă când se aprind luminile.</h1>
        <p>Cadre autentice din evenimente, oameni și filmări ale proiectului. Galeria de mai jos este reală; luminile abstracte sunt doar un element grafic.</p>
        <a href="#portfolio-photos">Intră în galerie ↓</a>
      </div>
    </section>
    <RegiaPhotoRail activePhoto={photo} />
    <RegiaFilmArchive film={film} />
    <QuoteSection title="Ai un eveniment în pregătire?" intro="Spune-ne data și locația. Formularul doar pregătește mesajul, iar tu alegi dacă îl trimiți prin WhatsApp sau email." />
  </>;
}
