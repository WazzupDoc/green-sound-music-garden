import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { events, images, videos } from "@/data/site";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/evenimente/")({
 head:()=>pageHead({title:"Evenimente cu Green Sound Music | Nunți, botezuri, corporate, concerte",
  description:"DJ, muzică live, sunet, lumini și activități pentru nunți, botezuri, petreceri private, concerte, festivaluri și evenimente corporate.",
  path:"/evenimente",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Evenimente",path:"/evenimente"}])]}),
 component:Events,
});
function Events(){return <>
 <PageHero kind="index" tone="events" eyebrow="EVENIMENTE / MOMENTE"
   title="Seara ta are propriul ritm."
   lead="O petrecere privată nu seamănă cu un festival. Alege formatul și descoperă ce înseamnă producția unui eveniment Green Sound."
   image={images.concert} crumbs={[{name:"Acasă",to:"/"},{name:"Evenimente"}]}/>
 <section className="v60-events-index" aria-labelledby="v60-events-title">
  <div className="v60-events-index__intro">
    <span className="v60-index">UN UNIVERS / CINCI TIPURI DE EVENIMENTE</span>
    <h2 id="v60-events-title">FIECARE<br/><em>SEARĂ CONTEAZĂ.</em></h2>
    <p>Începem cu tipul evenimentului, continuăm cu locația, invitații, muzica și momentele importante.</p>
  </div>
  <div className="v60-events-index__grid">
   {events.map((event,index)=>{
     const poster=event.slug==="nunti" && videos.nuntaRamada.poster?
      {src:videos.nuntaRamada.poster,alt:"Cadru din filmarea reală Green Sound Music de la o nuntă la Ramada Pitești",w:1280,h:720}:event.image;
     return <Link key={event.slug} to="/evenimente/$slug" params={{slug:event.slug}}
       className={`v60-events-index__tile v60-events-index__tile--${index+1}`} viewTransition>
       <img src={poster.src} alt={poster.alt} width={poster.w} height={poster.h}
         loading={index===0?"eager":"lazy"} decoding="async"/>
       <span className="v60-events-index__tile-glass" aria-hidden="true"/>
       <span className="v60-events-index__tile-index">0{index+1} / GREEN SOUND</span>
       <strong>{event.name}</strong>
       <span className="v60-events-index__tile-bottom"><span>{event.short}</span><ArrowUpRight size={28} aria-hidden/></span>
     </Link>;
   })}
  </div>
  <div className="v60-events-index__footer">
    <p>Nu găsești exact formatul pe care îl pregătești?</p>
    <Link to="/contact">Hai să discutăm <ArrowDownRight size={21} aria-hidden/></Link>
  </div>
 </section>
 <QuoteSection title="Discutăm despre evenimentul tău"
    intro="Spune-ne data și locația. Îți pregătim mesajul pentru WhatsApp sau email, fără trimitere automată."/>
 </>}
