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
function Events(){return <>
 <PageHero eyebrow="Evenimente · Green Sound Music"
  title="Cinci lumi. Nicio seară identică."
  lead="De la primul dans și muzica live până la ecrane LED și producție de concert. Alege-ți scena."
  image={images.concert} crumbs={[{name:"Acasă",to:"/"},{name:"Evenimente"}]}/>
 <section className="rs-events-index gsx-event-worlds" aria-labelledby="rs-events-title">
  <div className="container-site">
    <div className="gsx-event-worlds__intro">
      <span>01 / ATMOSFERE</span>
      <h2 id="rs-events-title">Ce se întâmplă<br/>la evenimentul tău?</h2>
      <p>Nu avem un desfășurător universal. Organizăm fiecare moment în funcție de loc, oameni și muzică.</p>
    </div>
    <div className="gsx-event-worlds__rail">
      {events.map((event,index)=><article key={event.slug}
        className={`rs-events-index__row gsx-event-worlds__card gsx-event-worlds__card--${index+1}`}>
        <BeamPhoto image={event.image} className="gsx-event-worlds__image"
          transitionName={`gs-event-${event.slug}`} />
        <div className="gsx-event-worlds__content">
          <span>{String(index+1).padStart(2,"0")} / GREEN SOUND EVENTS</span>
          <h3>{event.name}</h3>
          <p>{event.short}</p>
          <Link to="/evenimente/$slug" params={{slug:event.slug}} viewTransition
            className="gsx-event-worlds__link">
            Descoperă evenimentul <ArrowUpRight size={21} aria-hidden />
          </Link>
        </div>
      </article>)}
    </div>
  </div>
 </section>
 <QuoteSection title="Spune-ne ce eveniment pregătești"
   intro="Data și locația sunt suficiente pentru început. Mesajul se pregătește pentru WhatsApp sau email, fără trimitere automată."/>
 </>}