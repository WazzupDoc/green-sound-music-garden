import serviceIndexEditorialCss from "@/styles/service-index-editorial-v91.css?inline";
import categorySignalCss from "@/styles/category-signature-v198.css?inline";
import illustratedCategoryCss from "@/styles/category-illustrated-v201.css?inline";
import chapterArtCss from "@/styles/service-chapter-art-v226.css?inline";
import { CategorySignal } from "@/components/site/CategorySignal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services, images, type ServiceSlug } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { QuoteSection, PageHero } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";
type ChapterKind = "music" | "tech" | "people";
const groups:ReadonlyArray<{name:string;intro:string;slugs:readonly ServiceSlug[];kind:ChapterKind;art:string;caption:string}>=[
 {name:"Muzică",intro:"Cine cântă, mixează și construiește programul muzical.",slugs:["dj-mc","trupa","studio-inregistrari"],kind:"music",art:"/media/greensound/v226-concept-muzica.webp",caption:"Muzică · vibrație și ritm"},
 {name:"Tehnică",intro:"Sonorizarea, luminile și efectele care susțin programul.",slugs:["echipamente-de-sunet-si-lumini","masina-fum-greu-cu-gheata-carbonica"],kind:"tech",art:"/media/greensound/v226-concept-tehnica.webp",caption:"Tehnică · lumină și spațiu"},
 {name:"Oameni",intro:"Cei care întâmpină invitații sau pregătesc momente pentru copii.",slugs:["hostess","ursitoare-botez","start-veselia"],kind:"people",art:"/media/greensound/v226-concept-oameni.webp",caption:"Oameni · detalii și atmosferă"},
];
/** First-party original editorial glyphs: one visual cue per real category.
 * No claims about equipment ownership, no animated meters or third-party assets. */
function ChapterMark({ kind }: { kind: ChapterKind }) {
  return <svg className="gs226-chapter__mark" viewBox="0 0 90 90" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"
    focusable="false" aria-hidden="true">
    {kind === "music" ? <>
      <circle cx="42" cy="44" r="27" /><circle cx="42" cy="44" r="19" />
      <circle cx="42" cy="44" r="5" /><path d="M69 12h10v12L59 48M19 44h10M55 44h8" />
    </> : kind === "tech" ? <>
      <path d="M17 19h56M20 27h50M24 35h42M32 19v38m26-38v38" />
      <path d="M18 55 6 79h34zm54 0L50 79h34z" />
      <path d="M26 57h12m22 0h12" />
    </> : <>
      <path d="M22 69c5-25 15-36 23-36s18 11 23 36M14 73h62" />
      <path d="M45 10 51 25 66 31 51 37 45 52 39 37 24 31 39 25z" />
    </>}
  </svg>;
}

export const Route=createFileRoute("/servicii")({
 head:()=>pageHead({title:"Servicii Green Sound Music | DJ, trupă, sunet, lumini și evenimente în Pitești",
  description:"Serviciile Green Sound Music, organizate în Muzică, Tehnică și Oameni. DJ & MC, trupă, studio, sonorizare, lumini, fum greu, hostess, ursitoare și Start Veselia.",
  path:"/servicii",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Servicii",path:"/servicii"}])]}),
 component:Services,
});
function Services(){
 return <>
  <style>{serviceIndexEditorialCss + "\n" + categorySignalCss}</style><style>{illustratedCategoryCss + "\n" + chapterArtCss}</style>
  <PageHero eyebrow="Serviciile noastre" title="Alegem oamenii și echipamentele după eveniment."
    lead="Poți discuta cu noi despre un serviciu separat sau despre o combinație de muzică, scenă și activități pentru invitați."
    image={images.scena} crumbs={[{name:"Acasă",to:"/"},{name:"Servicii"}]}/>
  <section className="rs-service-index gs198-services gs201-services" aria-labelledby="rs-services-title">
   <div className="container-site">
    <div className="rs-service-index__lead"><p>Oferta Green Sound Music</p><h2 id="rs-services-title">Ce putem pregăti</h2></div>
    {groups.map((group,index)=>(
     <div className="rs-service-index__group" key={group.name}>
      <div className="rs-service-index__group-title">
       <span aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
       <h3>{group.name}</h3><p>{group.intro}</p><span className="v91-service-count">{group.slugs.length} direcții de producție</span>
       <figure className="gs226-chapter__figure" data-kind={group.kind}>
         <div className="gs226-chapter__artwork">
           <img src={group.art} alt="" width={1152} height={252} loading="lazy" decoding="async" />
           <ChapterMark kind={group.kind} />
         </div>
         <figcaption><span>{group.caption}</span><small>Ilustrație conceptuală</small></figcaption>
       </figure>
      </div>
      <ul>{group.slugs.map(slug=>{
        const service=services.find(item=>item.slug===slug)!;
        return <li key={service.slug}>
          <Link to={`/${service.slug}`} viewTransition>
            <span className="v91-service-row-index" aria-hidden="true">{String(group.slugs.indexOf(slug)+1).padStart(2,"0")}</span>
            <CategorySignal kind={service.slug} />
            <strong>{service.name}</strong>
            <span>{service.short}</span>
            <ArrowUpRight size={20} aria-hidden />
          </Link>
        </li>;
      })}</ul>
     </div>
    ))}
   </div>
  </section>
  <section className="rs-service-pause" aria-label="Echipamente și pregătiri">
    <BeamPhoto image={images.dj} className="rs-service-pause__image"/>
    <div><p>Nu știi încă de ce ai nevoie?</p>
      <h2>Începem cu data, locul și tipul evenimentului.</h2>
      <Link to="/evenimente" className="rs-inline-link">Vezi tipurile de evenimente <ArrowUpRight size={19} aria-hidden /></Link>
    </div>
  </section>
  <QuoteSection title="Spune-ne ce pregătești"
   intro="Formularul pregătește mesajul pentru WhatsApp sau email. Cererea nu se trimite automat." />
 </>;
}
