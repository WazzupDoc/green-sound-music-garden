import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { images, services } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/servicii")({
  head:()=>pageHead({title:"Servicii DJ & MC, trupă live, sonorizare și lumini | Green Sound Music Pitești",
    description:"DJ & MC, trupă live, sonorizare profesională, lumini și LED, fum greu, studio, hostess și ursitoare pentru evenimente în Pitești, Argeș și România.",
    path:"/servicii",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Servicii",path:"/servicii"}])]}),
  component:Services,
});
function Services(){return <>
 <PageHero eyebrow="SERVICII / CAPABILITĂȚI" title="Un singur partener. Toată atmosfera."
   lead="De la DJ și muzică live până la lumini, sunet, scenotehnică și producție. Selectezi exact ce ai nevoie, fără pachete complicate."
   image={images.scena} crumbs={[{name:"Acasă",to:"/"},{name:"Servicii"}]}/>
 <section className="section" aria-labelledby="services-catalogue">
   <div className="container-site">
     <div className="crafted-section-intro"><span className="crafted-index">01 / SERVICII</span>
     <div><h2 id="services-catalogue" className="crafted-heading">O orchestră de competențe, <em>un singur ritm.</em></h2>
     <p className="crafted-section-intro__copy">Fiecare serviciu are rolul său. Împreună construim un eveniment în care totul funcționează firesc.</p></div></div>
     <ol className="atelier-service-index">{services.map((s,i)=><li key={s.slug}><Link to={`/${s.slug}`}>
       <span>0{i+1}</span><strong>{s.name}</strong><p>{s.short}</p><ArrowUpRight className="size-6" aria-hidden />
     </Link></li>)}</ol>
   </div>
 </section>
 <section className="section atelier-paper"><div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
  <div><span className="crafted-index">02 / ÎMPREUNĂ SAU SEPARAT</span><h2 className="crafted-heading mt-5">Fără complicații. <em>Doar spectacol.</em></h2></div>
  <div><p className="atelier-prose">Poți discuta cu noi despre DJ & MC, o trupă live, sonorizare, lumini sau un show complet. Ne spui data, locația și ce fel de eveniment pregătești; stabilim împreună configurația potrivită.</p>
  <Link to="/evenimente" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#2d5c35]">Alege tipul evenimentului <ArrowUpRight className="size-4" aria-hidden /></Link></div>
 </div></section>
 <QuoteSection title="Hai să construim configurația potrivită." intro="Alege serviciile care te interesează și trimite-ne detaliile. Formularul pregătește un mesaj prin WhatsApp sau email, pe care îl trimiți personal." />
 </>}
