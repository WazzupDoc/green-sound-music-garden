import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Waves, Radio, Sparkles } from "lucide-react";
import { services, images, type ServiceSlug } from "@/data/site";
import { QuoteSection, PageHero } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const chapters:ReadonlyArray<{heading:string;eyebrow:string;icon:"wave"|"radio"|"star";slugs:readonly ServiceSlug[]}>=[
 {heading:"Muzică & oameni pe scenă",eyebrow:"MUSIC / 01",icon:"wave",slugs:["dj-mc","trupa","studio-inregistrari"]},
 {heading:"Sunet, lumini & efecte",eyebrow:"TECH / 02",icon:"radio",slugs:["echipamente-de-sunet-si-lumini","masina-fum-greu-cu-gheata-carbonica"]},
 {heading:"Momente & divertisment",eyebrow:"MOMENTS / 03",icon:"star",slugs:["hostess","ursitoare-botez","start-veselia"]},
];
export const Route=createFileRoute("/servicii")({
 head:()=>pageHead({title:"Servicii Green Sound Music | DJ, trupă, sunet, lumini și evenimente în Pitești",
  description:"Serviciile Green Sound Music, organizate în Muzică, Tehnică și Oameni. DJ & MC, trupă, studio, sonorizare, lumini, fum greu, hostess, ursitoare și Start Veselia.",
  path:"/servicii",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Servicii",path:"/servicii"}])]}),
 component:Services,
});
function Services(){
 const [selected,setSelected]=useState<ServiceSlug>("echipamente-de-sunet-si-lumini");
 const current=services.find(service=>service.slug===selected)!;
 return <>
  <PageHero kind="index" tone="services" eyebrow="SERVICII / GREEN SOUND"
   title="Tot ce trebuie să se audă. Și să se simtă."
   lead="De la DJ și trupe până la scenă, lumini și oameni care pregătesc momentele serii. Alege ce te interesează."
   image={images.scena} crumbs={[{name:"Acasă",to:"/"},{name:"Servicii"}]}/>
  <section className="v60-services" aria-labelledby="v60-services-title">
   <div className="v60-services__header">
    <span className="v60-index">OUR WORK / PARTEA CARE FACE DIFERENȚA</span>
    <h2 id="v60-services-title">DIN CULISE,<br/><em>DIRECT ÎN SHOW.</em></h2>
    <p>Fiecare serviciu are rolul lui. Explorează catalogul sau intră direct pe pagina care te interesează.</p>
   </div>
   <div className="v60-services__body">
    <div className="v60-services__directory" aria-label="Catalogul complet de servicii">
     {chapters.map(group=><div key={group.eyebrow} className="v60-services__chapter">
       <div className="v60-services__chapter-head">
        {group.icon==="wave"?<Waves size={20} aria-hidden/>:group.icon==="radio"?<Radio size={20} aria-hidden/>:<Sparkles size={20} aria-hidden/>}
        <span>{group.eyebrow}</span><strong>{group.heading}</strong>
       </div>
       {group.slugs.map(slug=>{
        const item=services.find(s=>s.slug===slug)!;
        return <Link key={slug} to={`/${slug}`} viewTransition className="v60-services__item"
          data-selected={selected===slug}
          onPointerEnter={e=>{if(e.pointerType==="mouse")setSelected(slug)}}
          onFocus={()=>setSelected(slug)}>
         <span>{String(services.findIndex(s=>s.slug===slug)+1).padStart(2,"0")}</span>
         <strong>{item.name}</strong><ArrowUpRight aria-hidden size={22}/>
        </Link>;
       })}
     </div>)}
    </div>
    <div className="v60-services__theatre">
      <div className="v60-services__theatre-photo">
       <img key={current.slug} src={current.image.src} alt={current.image.alt}
         width={current.image.w} height={current.image.h} loading="lazy" decoding="async"/>
       <div className="v60-services__theatre-shade"/>
       <div className="v60-services__theatre-copy">
        <span>ÎN FOCUS / {String(services.findIndex(s=>s.slug===current.slug)+1).padStart(2,"0")}</span>
        <h3>{current.name}</h3>
        <p>{current.short}</p>
        <Link to={`/${current.slug}`} viewTransition>Descoperă serviciul <ArrowUpRight size={21} aria-hidden/></Link>
       </div>
      </div>
      <div className="v60-services__theatre-foot"><span>FOTOGRAFII / ARHIVA GREEN SOUND</span><span>2008 — PREZENT</span></div>
    </div>
   </div>
  </section>
  <section className="v60-services__closing" aria-labelledby="v60-services-closing">
    <div>
     <span className="v60-index">NU ȘTII CE SĂ ALEGI?</span>
     <h2 id="v60-services-closing">ÎNCEPEM CU<br/><em>TIPUL EVENIMENTULUI.</em></h2>
    </div>
    <Link to="/evenimente">Descoperă evenimentele <ArrowRight aria-hidden size={23}/></Link>
  </section>
  <QuoteSection title="Spune-ne ce pregătești"
    intro="Mesajul se pregătește pentru WhatsApp sau email. Cererea nu este trimisă automat."/>
 </>;
}
