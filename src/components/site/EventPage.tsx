import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import { business, getService, type EventType } from "@/data/site";
import { FaqList, PageHero, QuoteSection } from "./blocks";
import { VideoLite } from "./VideoLite";
import type { eventTypeOptions } from "@/lib/quote";

export function EventPage({event}:{event:EventType}){
  // A native, shareable link: Contact allowlists the event and service labels.
  // Suggested services are editable there; this is not a booking or submission.
  const serviceLabels = [...new Set(event.recommended.map(item => getService(item.slug).formLabel))];
  const briefHref = `/contact?event=${encodeURIComponent(event.formLabel)}&services=${encodeURIComponent(serviceLabels.join("|"))}#contact-form-title`;
  return <>
    <PageHero eyebrow={`Evenimente · ${event.name}`} title={event.h1} lead={event.lead}
      image={event.image} transitionName={`gs-event-${event.slug}`}
      crumbs={[{name:"Acasă",to:"/"},{name:"Evenimente",to:"/evenimente"},{name:event.name}]}>
      <a href={briefHref} className="rs-inline-link" aria-label={`Pregătește cererea pentru ${event.name} cu servicii propuse; selecția se poate modifica în Contact`}>Pregătește cererea pentru {event.name.toLowerCase()} <ArrowUpRight size={18} aria-hidden /></a>
      <a href="#desfasurator-eveniment" className="rs-inline-link" onClick={(event) => { event.currentTarget.ownerDocument.getElementById("desfasurator-eveniment")?.focus({ preventScroll: true }); }}>Vezi desfășurătorul <ArrowUpRight size={18} aria-hidden /></a>
      <a href="#servicii-potrivite" className="rs-inline-link" onClick={(event) => { event.currentTarget.ownerDocument.getElementById("servicii-potrivite")?.focus({ preventScroll: true }); }}>Vezi serviciile potrivite <ArrowUpRight size={18} aria-hidden /></a>
      <a href={business.phoneHref} className="rs-inline-link"><Phone size={18} aria-hidden /> Sună Green Sound</a>
    </PageHero>
    <section id="desfasurator-eveniment" className="rs-event-timeline" aria-labelledby="desfasurator-titlu" tabIndex={-1}>
      <div className="container-site">
        <div className="rs-event-timeline__title">
          <p>Desfășurătorul</p><h2 id="desfasurator-titlu">De la primele pregătiri <em>până la ultimul moment.</em></h2>
          <p>Un parcurs în {event.moments.length} etape, de la primele pregătiri la încheiere. Ordinea este orientativă; programul și serviciile se stabilesc împreună cu organizatorul.</p>
        </div>
        <ol>{event.moments.map((moment,index)=>{
          const service=getService(moment.service);
          return <li key={moment.title}>
            <span className="rs-event-timeline__counter" aria-label={`Etapa ${index + 1} din ${event.moments.length}`} role="img"><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span><small aria-hidden="true">/{String(event.moments.length).padStart(2,"0")}</small></span>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
            <Link to={`/${service.slug}`} viewTransition>
              Descoperă {service.name} <ArrowUpRight size={18} aria-hidden />
            </Link>
          </li>;
        })}</ol>
      </div>
    </section>
    <section id="servicii-potrivite" className="rs-event-offerings gs241-mix" aria-labelledby="servicii-potrivite-titlu" tabIndex={-1}>
      <div className="container-site rs-event-offerings__inside">
        <div className="gs241-mix__intro">
          <p>GREEN SOUND / MIX DE SERVICII</p>
          <h2 id="servicii-potrivite-titlu">Un eveniment. <em>Mai multe posibilități.</em></h2>
          <p>O selecție orientativă pentru {event.name.toLowerCase()}. Alegem împreună doar ce se potrivește spațiului și programului.</p>
          <div className="gs241-mix__handoff">
            <span className="gs241-mix__cue">BRIEF / {String(serviceLabels.length).padStart(2, "0")} PROPUNERI</span>
            <a href={briefHref} className="gs241-mix__brief">
              Pregătește cererea cu aceste servicii <ArrowUpRight size={22} aria-hidden />
            </a>
            <p>Selecția se poate modifica în Contact. Mesajul nu se trimite automat.</p>
          </div>
        </div>
        <ol className="gs241-mix__list" aria-label="Servicii propuse pentru eveniment">
          {event.recommended.map((item, index)=>{
            const service=getService(item.slug);
            return <li key={item.slug}>
              <span className="gs241-mix__number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
              <div className="gs241-mix__service">
                <h3>{service.name}</h3>
                <p>{item.why}</p>
              </div>
              <Link to={`/${service.slug}`} viewTransition className="gs241-mix__detail" aria-label={`Detalii despre ${service.name}`}>
                <span>Detalii serviciu</span><ArrowUpRight size={20} aria-hidden />
              </Link>
            </li>;
          })}
        </ol>
      </div>
    </section>
    {event.videos.length>0 && <section className="rs-event-film" aria-labelledby="filmari-eveniment-titlu">
      <div className="container-site">
        <h2 id="filmari-eveniment-titlu">Filmări disponibile</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">Filmele nu pornesc automat. Dacă alegi „Redă filmarea”, se încarcă playerul YouTube; îl poți opri oricând din butonul „Oprește”.</p>
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
