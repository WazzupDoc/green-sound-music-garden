import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
});
function Services(){
  const [selected,setSelected]=useState<ServiceSlug>("echipamente-de-sunet-si-lumini");
  const active = services.find(item=>item.slug===selected)!;
  return <>
    <PageHero eyebrow="Servicii · Green Sound Music"
      title="Muzica se aude. Producția se simte."
      lead="Opt servicii reale, o singură echipă. De la DJ și trupă live la sunet, lumină, fum și momente pentru invitați."
      image={images.scena} crumbs={[{name:"Acasă",to:"/"},{name:"Servicii"}]}/>
    <section className="gsx-services-portal" aria-labelledby="gsx-services-title">
      <div className="container-site">
        <div className="gsx-services-portal__intro">
          <h2 id="gsx-services-title">Ce aducem<br/>la eveniment.</h2>
          <p>Fiecare tip de eveniment are altă scară, altă energie și alte nevoi. Alege un serviciu și descoperă ce pregătim.</p>
        </div>
        <div className="gsx-services-portal__feature">
          <div className="gsx-services-portal__photo">
            <img key={active.slug} src={active.image.src} alt={active.image.alt}
              width={active.image.w} height={active.image.h} loading="lazy" decoding="async"/>
            <span>GREEN SOUND MUSIC / {active.name.toUpperCase()}</span>
          </div>
          <div className="gsx-services-portal__nav">
            <p>EXPLOREAZĂ DOMENIILE</p>
            {groups.map((group,i)=>{
              const item=services.find(s=>s.slug===group.slugs[0])!;
              const isActive=group.slugs.includes(selected);
              return <button type="button" aria-pressed={isActive} key={group.name}
                onClick={()=>setSelected(item.slug)}>
                <span>0{i+1}</span><strong>{group.name}</strong><ArrowUpRight size={21} aria-hidden/>
              </button>;
            })}
            <div className="gsx-services-portal__selected" key={active.slug}>
              <p>{active.short}</p>
              <Link to={`/${active.slug}`}>Descoperă {active.name} <ArrowUpRight size={20} aria-hidden/></Link>
            </div>
          </div>
        </div>
        <div className="gsx-services-portal__grid" aria-label="Catalogul complet de servicii">
          {services.map((item,i)=><Link to={`/${item.slug}`} viewTransition
            className="gsx-services-portal__tile" key={item.slug}>
            <img src={item.image.src} alt="" width={item.image.w} height={item.image.h}
              loading="lazy" decoding="async"/>
            <span>{String(i+1).padStart(2,"0")} / {item.eyebrow.toUpperCase()}</span>
            <strong>{item.name}</strong><ArrowUpRight size={20} aria-hidden/>
          </Link>)}
        </div>
      </div>
    </section>
    <section className="rs-service-pause" aria-label="Echipamente și pregătiri">
      <BeamPhoto image={images.dj} className="rs-service-pause__image"/>
      <div><p>Nu știi încă de ce ai nevoie?</p>
        <h2>Începem cu data, locul și tipul evenimentului.</h2>
        <Link to="/evenimente" className="rs-inline-link">Vezi tipurile de evenimente <ArrowUpRight size={19} aria-hidden/></Link>
      </div>
    </section>
    <QuoteSection title="Spune-ne ce pregătești"
      intro="Formularul pregătește mesajul pentru WhatsApp sau email. Cererea nu se trimite automat."/>
  </>;
}
