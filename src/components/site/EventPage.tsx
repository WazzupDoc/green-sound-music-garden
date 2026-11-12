import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getService, type EventType } from "@/data/site";
import { FaqList, PageHero, QuoteSection } from "./blocks";
import { VideoLite } from "./VideoLite";
import type { eventTypeOptions } from "@/lib/quote";

export function EventPage({event}:{event:EventType}){
  return <>
    <PageHero eyebrow={`Evenimente · ${event.name}`} title={event.h1} lead={event.lead}
      image={event.image}
      crumbs={[{name:"Acasă",to:"/"},{name:"Evenimente",to:"/evenimente"},{name:event.name}]}/>
    <section className="rs-event-timeline">
      <div className="container-site">
        <div className="rs-event-timeline__title">
          <p>Desfășurătorul</p><h2>De la pregătiri până la finalul evenimentului</h2>
          <p>Ordinea este orientativă. Programul și serviciile se stabilesc împreună cu organizatorul.</p>
        </div>
        <ol>{event.moments.map((moment,index)=>{
          const service=getService(moment.service);
          return <li key={moment.title}>
            <span>{String(index+1).padStart(2,"0")}</span>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
            <Link to={`/${service.slug}`} viewTransition>
              {service.name} <ArrowUpRight size={18} aria-hidden />
            </Link>
          </li>;
        })}</ol>
      </div>
    </section>
    <section className="rs-event-offerings">
      <div className="container-site rs-event-offerings__inside">
        <div><p>Servicii potrivite</p><h2>Ce putem pregăti</h2>
          <p>Poți discuta separat despre fiecare serviciu, în funcție de spațiu și de program.</p></div>
        <ul>{event.recommended.map(item=>{
          const service=getService(item.slug);
          return <li key={item.slug}>
            <Link to={`/${service.slug}`} viewTransition><strong>{service.name}</strong>
              <span>{item.why}</span><ArrowUpRight size={18} aria-hidden /></Link>
          </li>;
        })}</ul>
      </div>
    </section>
    {event.videos.length>0 && <section className="rs-event-film">
      <div className="container-site">
        <h2>Filmări din arhiva Green Sound</h2>
        <div>{event.videos.map(video=><VideoLite key={video.id} video={video}/>)}</div>
      </div>
    </section>}
    {event.faqs.length>0 && <section className="rs-service-faq"><div className="container-site">
      <h2>Întrebări frecvente</h2><FaqList faqs={event.faqs}/>
    </div></section>}
    <QuoteSection title={`Organizezi ${event.name.toLowerCase()}?`}
      intro="Spune-ne data, locația și ce servicii te interesează. Mesajul nu se trimite automat."
      defaultEventType={event.formLabel as (typeof eventTypeOptions)[number]}/>
  </>;
}
