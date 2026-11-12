import { createFileRoute } from "@tanstack/react-router";
import { RegiaPhotoRail, RegiaFilmArchive, galleryFrames } from "@/components/atelier/RegiaPortfolio";
import { QuoteSection } from "@/components/site/blocks";
import { images, videos } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
const filmIds = new Set(Object.values(videos).map(item => item.id));
const photoIds = new Set(galleryFrames.map(item => item.id));
function validSearch(search:Record<string,unknown>):{film?:string;photo?:string} {
  if(typeof search.photo==="string" && photoIds.has(search.photo)) return {photo:search.photo};
  if(typeof search.film==="string" && filmIds.has(search.film)) return {film:search.film};
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
    <section className="rs-page-intro" aria-labelledby="rs-portfolio-title">
      <div className="container-site"><p>Portofoliu</p><h1 id="rs-portfolio-title">Nu prezentări. Evenimentele, așa cum au fost.</h1>
      <p>Fotografii și filmări din arhiva Green Sound Music. Imaginile și videoclipurile sunt cele ale proiectului, nu fotografii de catalog.</p></div>
    </section>
    <RegiaPhotoRail activePhoto={photo} />
    <RegiaFilmArchive film={film} />
    <QuoteSection title="Ai un eveniment în pregătire?" intro="Spune-ne data și locația. Formularul doar pregătește mesajul, iar tu alegi dacă îl trimiți prin WhatsApp sau email." />
  </>;
}
