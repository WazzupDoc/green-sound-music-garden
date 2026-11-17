import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { events, getService, type ServiceSlug } from "@/data/site";
import { pageHead, breadcrumbLd, serviceLd, faqLd } from "@/lib/seo";
import { FaqList, PageHero, QuoteSection } from "./blocks";
import { ServiceSignature } from "./ServiceSignature";
import type { eventTypeOptions } from "@/lib/quote";

export function serviceHead(slug: ServiceSlug) {
  const s = getService(slug);
  const path = `/${s.slug}`;
  return pageHead({
    title:s.seoTitle,description:s.seoDescription,image:s.image,path,
    jsonLd:[
      serviceLd(s.name,s.seoDescription,path),
      breadcrumbLd([{name:"Acasă",path:"/"},{name:"Servicii",path:"/servicii"},{name:s.name,path}]),
      ...(s.faqs.length?[faqLd(s.faqs)]:[]),
    ],
  });
}

export function ServicePage({slug}:{slug:ServiceSlug}) {
  const service=getService(slug);
  const matching=events.filter(item=>service.events.includes(item.slug));
  const defaultEvent:(typeof eventTypeOptions)[number]|undefined =
    slug==="studio-inregistrari"?"Studio înregistrări":slug==="ursitoare-botez"?"Botez":undefined;
  return <>
    <PageHero eyebrow={service.eyebrow} title={service.h1} lead={service.lead}
      image={service.image}
      crumbs={[{name:"Acasă",to:"/"},{name:"Servicii",to:"/servicii"},{name:service.name}]}/>
    <ServiceSignature service={service} />
    <section className="rs-service-detail" aria-labelledby="rs-service-detail-title">
      <div className="container-site">
        <div className="rs-service-detail__header">
          <p>Mai multe despre serviciu</p>
          <h2 id="rs-service-detail-title">{slug === "studio-inregistrari" ? "De la pregătire la sesiunea de studio" : "Cum se pregătește"}</h2>
          {slug === "studio-inregistrari" && <div className="rs-studio-signal" aria-hidden="true">
            <span>INPUT</span>
            <svg viewBox="0 0 320 48" preserveAspectRatio="none" focusable="false">
              <path d="M0 24H22L29 18L36 30L44 9L53 39L62 19L70 25H94L102 14L110 34L119 5L128 43L138 17L147 24H172L182 12L191 35L201 8L211 40L221 24H246L255 18L264 30L273 15L282 33L292 24H320" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <span>OUTPUT</span>
          </div>}
        </div>
        <div className="rs-service-detail__stories">
          {service.sections.map((section,index)=>(
            <article key={section.title}>
              <span>{slug === "studio-inregistrari" ? `ETAPA ${String(index+1).padStart(2,"0")} / ${String(service.sections.length).padStart(2,"0")}` : String(index+1).padStart(2,"0")}</span>
              <div><h3>{section.title}</h3>
                {section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
                {section.list && <ul>{section.list.map(text=><li key={text}>{text}</li>)}</ul>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    {matching.length>0 && <section className="rs-service-events">
      <div className="container-site">
        <h2>Evenimente în care se potrivește</h2>
        <ul>{matching.map(item=><li key={item.slug}>
          <Link to="/evenimente/$slug" params={{slug:item.slug}} viewTransition>
            {item.name}<ArrowUpRight size={20} aria-hidden />
          </Link></li>)}</ul>
      </div>
    </section>}
    {service.faqs.length>0 && <section className="rs-service-faq">
      <div className="container-site"><h2>Întrebări frecvente</h2><FaqList faqs={service.faqs}/></div>
    </section>}
    <QuoteSection title={`Întreabă despre ${service.name}`}
      intro="Descrie data și locația. Mesajul este pregătit pentru WhatsApp sau email și îl trimiți tu."
      defaultServices={[service.formLabel]} defaultEventType={defaultEvent}/>
  </>;
}
