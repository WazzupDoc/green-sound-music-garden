import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import { business, getService, type EventType } from "@/data/site";
import { FaqList, PageHero, QuoteSection } from "./blocks";
import { VideoLite } from "./VideoLite";
import type { eventTypeOptions } from "@/lib/quote";

export function EventPage({event}:{event:EventType}){
  return <>
    <PageHero eyebrow={`Evenimente · ${event.name}`} title={event.h1} lead={event.lead}
      image={event.image} transitionName={`gs-event-${event.slug}`}
      crumbs={[{name:"Acasă",to:"/"},{name:"Evenimente",to:"/evenimente"},{name:event.name}]}>
      <a href="#oferta-titlu" className="rs-inline-link">Pregătește cererea pentru {event.name.toLowerCase()} <ArrowUpRight size={18} aria-hidden /></a>
      <a href={business.phoneHref} className="rs-inline-link"><Phone size={18} aria-hidden /> Sună Green Sound</a>
    </PageHero>
    <nav aria-label="Explorează pagina evenimentului" className="border-y border-white/15 bg-[#09241c] text-white">
      <div className="container-site flex flex-wrap items-center gap-x-7 gap-y-3 py-5">
        <span className="mr-auto text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">În această pagină</span>
        <a className="text-sm underline-offset-8 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300" href="#etape-eveniment">01 / Desfășurător</a>
        <a className="text-sm underline-offset-8 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300" href="#servicii-eveniment">02 / Servicii</a>
        {event.videos.length>0 && <a className="text-sm underline-offset-8 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300" href="#filme-eveniment">03 / Filmări</a>}
        <a className="text-sm underline-offset-8 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300" href="#oferta-titlu">Cerere de ofertă <ArrowUpRight size={15} className="inline" aria-hidden /></a>
      </div>
    </nav>
    <section id="etape-eveniment" className="rs-event-timeline scroll-mt-24">
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
    <section id="servicii-eveniment" className="rs-event-offerings scroll-mt-24">
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
    {event.videos.length>0 && <section id="filme-eveniment" className="rs-event-film scroll-mt-24">
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
