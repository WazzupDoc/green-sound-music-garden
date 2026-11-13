import eventIndexCss from "@/styles/event-index-v88.css?inline";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { events, images } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/evenimente/")({
 head:()=>pageHead({title:"Evenimente cu Green Sound Music | Nunți, botezuri, corporate, concerte",
  description:"DJ, muzică live, sunet, lumini și activități pentru nunți, botezuri, petreceri private, concerte, festivaluri și evenimente corporate.",
  path:"/evenimente",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Evenimente",path:"/evenimente"}])]}),
 component:Events,
});
function Events(){return <><style dangerouslySetInnerHTML={{__html:eventIndexCss}} />
 <PageHero eyebrow="Evenimente" title="Fiecare seară are alt program."
   lead="Alege ce organizezi. Îți arătăm momentele și serviciile care pot intra în desfășurător."
   image={images.concert} crumbs={[{name:"Acasă",to:"/"},{name:"Evenimente"}]}/>
 <section className="rs-events-index" aria-labelledby="rs-events-title">
  <div className="container-site">
   <div className="gs-event-index__heading"><span className="gs-event-index__kicker">GREEN SOUND / REGISTRU DE EVENIMENTE</span><h2 id="rs-events-title">Fiecare eveniment.<br /><em>Altă energie.</em></h2><p>Explorează tipurile de evenimente și descoperă serviciile potrivite, fără pachete prestabilite.</p></div>
   <div className="rs-events-index__list">
    {events.map((event,index)=><article key={event.slug} className="rs-events-index__row">
     <BeamPhoto image={event.image} className="rs-events-index__image" transitionName={`gs-event-${event.slug}`} />
     <div className="gs-event-index__copy"><span className="gs-event-index__number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><span className="gs-event-index__eyebrow">PROGRAM / {event.name}</span>
      <h3>{event.name}</h3><p>{event.short}</p>
      <Link to="/evenimente/$slug" params={{slug:event.slug}} viewTransition className="rs-inline-link">
       Vezi desfășurătorul <ArrowUpRight size={18} aria-hidden /></Link></div>
    </article>)}
   </div>
  </div>
 </section>
 <QuoteSection title="Discutăm despre evenimentul tău"
  intro="Spune-ne data, locația și ce îți dorești. Mesajul se pregătește pentru WhatsApp sau email, fără trimitere automată."/>
 </>}
