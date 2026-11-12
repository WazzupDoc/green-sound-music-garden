import { createFileRoute } from "@tanstack/react-router";
import { RegiaPhotoRail, RegiaFilmArchive, galleryFrames } from "@/components/atelier/RegiaPortfolio";
import { QuoteSection } from "@/components/site/blocks";
import { images, videos, business } from "@/data/site";
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
    <section className="v60-portfolio-intro" aria-labelledby="rs-portfolio-title">
      <div className="v60-portfolio-intro__image" aria-hidden="true">
        <img src={videos.showLumini.poster ?? images.concert.src}
          width={1280} height={720} alt="" fetchPriority="high" decoding="async"/>
      </div>
      <div className="v60-portfolio-intro__content">
        <span>GREEN SOUND / PORTOFOLIU / EVENIMENTE REALE</span>
        <h1 id="rs-portfolio-title">NU SE POVESTEȘTE.<br/><em>SE VEDE.</em></h1>
        <p>Imagini și filmări reale, din spectacole, nunți, producții muzicale și momente pregătite cu Green Sound Music.</p>
        <div className="v60-portfolio-intro__footer">
          <span>FOTOGRAFII · FILMĂRI · ARHIVĂ</span>
          <a href={business.socials.find(s=>s.label==="TikTok")?.href ?? "https://www.tiktok.com/@greensoundmusic"}
            target="_blank" rel="noopener noreferrer">Urmărește proiectele pe TikTok ↗</a>
        </div>
      </div>
    </section>
    <RegiaPhotoRail activePhoto={photo} />
    <RegiaFilmArchive film={film} />
    <QuoteSection title="Ai un eveniment în pregătire?" intro="Spune-ne data și locația. Formularul doar pregătește mesajul, iar tu alegi dacă îl trimiți prin WhatsApp sau email." />
  </>;
}
