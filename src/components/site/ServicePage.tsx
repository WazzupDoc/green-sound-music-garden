import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { events, getService, type ServiceSlug } from "@/data/site";
import { pageHead, breadcrumbLd, serviceLd, faqLd } from "@/lib/seo";
import { FaqList, QuoteSection } from "./blocks";
import { ServiceStage } from "./ServiceStage";
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
    <ServiceStage service={service} />
    <div id="din-culise" className="scroll-mt-20">
      <ServiceSignature service={service} />
    </div>
    <section className="rs-service-detail" aria-labelledby="rs-service-detail-title">
      <div className="container-site">
        <div className="rs-service-detail__header">
          <p>Mai multe despre serviciu</p>
          <h2 id="rs-service-detail-title">Cum se pregătește</h2>
        </div>
        <div className="rs-service-detail__stories">
          {service.sections.map((section,index)=>(
            <article key={section.title}>
              <span>{String(index+1).padStart(2,"0")}</span>
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
