import serviceIndexEditorialCss from "@/styles/service-index-editorial-v91.css?inline";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services, images, type ServiceSlug } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { QuoteSection, PageHero } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";
const groups:ReadonlyArray<{name:string;intro:string;slugs:readonly ServiceSlug[]}>=[
 {name:"Muzică",intro:"Cine cântă, mixează și construiește programul muzical.",slugs:["dj-mc","trupa","studio-inregistrari"]},
 {name:"Tehnică",intro:"Sonorizarea, luminile și efectele care susțin programul.",slugs:["echipamente-de-sunet-si-lumini","masina-fum-greu-cu-gheata-carbonica"]},
 {name:"Oameni",intro:"Cei care întâmpină invitații sau pregătesc momente pentru copii.",slugs:["hostess","ursitoare-botez","start-veselia"]},
];
export const Route=createFileRoute("/servicii")({
 head:()=>pageHead({title:"Servicii Green Sound Music | DJ, trupă, sunet, lumini și evenimente în Pitești",
  description:"Serviciile Green Sound Music, organizate în Muzică, Tehnică și Oameni. DJ & MC, trupă, studio, sonorizare, lumini, fum greu, hostess, ursitoare și Start Veselia.",
  path:"/servicii",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Servicii",path:"/servicii"}])]}),
 component:Services,
 styles: [{children:serviceIndexEditorialCss}],
});
function Services(){
 return <>
  <PageHero eyebrow="Serviciile noastre" title="Alegem oamenii și echipamentele după eveniment."
    lead="Poți discuta cu noi despre un serviciu separat sau despre o combinație de muzică, scenă și activități pentru invitați."
    image={images.scena} crumbs={[{name:"Acasă",to:"/"},{name:"Servicii"}]}/>
  <section className="rs-service-index" aria-labelledby="rs-services-title">
   <div className="container-site">
    <div className="rs-service-index__lead"><p>Oferta Green Sound Music</p><h2 id="rs-services-title">Ce putem pregăti</h2></div>
    {groups.map((group,index)=>(
     <div className="rs-service-index__group" key={group.name}>
      <div className="rs-service-index__group-title">
       <span aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
       <h3>{group.name}</h3><p>{group.intro}</p><span className="v91-service-count">{group.slugs.length} direcții de producție</span>
      </div>
      <ul>{group.slugs.map(slug=>{
        const service=services.find(item=>item.slug===slug)!;
        return <li key={service.slug}>
          <Link to={`/${service.slug}`} viewTransition>
            <span className="v91-service-row-index" aria-hidden="true">{String(group.slugs.indexOf(slug)+1).padStart(2,"0")}</span><strong>{service.name}</strong>
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
