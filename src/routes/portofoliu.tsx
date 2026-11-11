import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { VideoLite } from "@/components/site/VideoLite";
import { images, videos } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/portofoliu")({
  head:()=>pageHead({title:"Portofoliu real foto și video | Green Sound Music Pitești",
    description:"Vezi filmări și imagini reale de la nunți, DJ & MC, show-uri de lumini, concerte și producții muzicale realizate de Green Sound Music în Pitești și Argeș.",
    path:"/portofoliu",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Portofoliu",path:"/portofoliu"}])]}),
  component:Portfolio,
});
const filters=[{id:"toate",label:"Toate"},{id:"nunti",label:"Nunți"},{id:"dj-mc",label:"DJ & MC"},{id:"sonorizare",label:"Lumini & sunet"},{id:"fum-greu",label:"Efecte"},{id:"trupa",label:"Trupă"},{id:"studio",label:"Studio"}];
const photos=[
 {image:images.dj,label:"DJ & MC",credit:"DIN EVENIMENTE"},
 {image:images.scena,label:"Lumini de scenă",credit:"LIVE PRODUCTION"},
 {image:images.concert,label:"Concerte",credit:"PUBLIC & ENERGIE"},
 {image:images.ursitoare2,label:"Botezuri",credit:"MOMENTE SPECIALE"},
 {image:images.hostess,label:"Primirea invitaților",credit:"EVENT SERVICES"},
 {image:images.copii,label:"Petreceri pentru copii",credit:"START VESELIA"},
];
function Portfolio(){
 const [active,setActive]=useState("toate");
 const list=useMemo(()=>Object.values(videos).filter(v=>active==="toate"||v.tags.includes(active)),[active]);
 return <>
 <PageHero eyebrow="PORTOFOLIU / EVENIMENTE REALE" title="Aici se vede atmosfera. Fără imagini de catalog."
   lead="Filmări și fotografii din evenimentele, spectacolele și producțiile Green Sound Music. Vezi cum arată un show în realitate."
   image={images.concert} crumbs={[{name:"Acasă",to:"/"},{name:"Portofoliu"}]}/>
 <section className="section" aria-labelledby="portfolio-photos"><div className="container-site">
 <div className="crafted-section-intro"><span className="crafted-index">01 / FOTO</span><div><h2 id="portfolio-photos" className="crafted-heading">Momente autentice, <em>nu decoruri imaginare.</em></h2></div></div>
 <div className="atelier-asymmetric">{photos.map(({image,label,credit},i)=><figure key={image.src} className="atelier-project-photo">
 <img src={image.src} alt={image.alt} width={image.w} height={image.h} loading="lazy" decoding="async" />
 <figcaption><span className="label-tech text-primary">{credit}</span><strong className="mt-2 block">{label}</strong></figcaption>
 </figure>)}</div>
 </div></section>
 <section className="section surface-stage" aria-labelledby="portfolio-films"><div className="container-site">
 <div className="crafted-section-intro"><span className="crafted-index">02 / VIDEO REAL</span><div>
 <h2 id="portfolio-films" className="crafted-heading">Lasă imaginile <em>să vorbească.</em></h2><p className="crafted-section-intro__copy">Clipurile pornesc doar când apeși play.</p></div></div>
 <div role="group" aria-label="Filtrează videoclipurile" className="flex flex-wrap gap-2">
  {filters.map(f=><button key={f.id} type="button" aria-pressed={active===f.id} onClick={()=>setActive(f.id)}
   className={`border px-4 py-2 text-sm transition-colors ${active===f.id?"border-primary bg-primary text-primary-foreground":"border-border hover:border-primary"}`}>{f.label}</button>)}
 </div>
 <div aria-live="polite" className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {list.map(v=><VideoLite key={v.id} video={v}/>)}
 </div>
 {list.length===0&&<p className="mt-7 text-muted-foreground">Nu există videoclipuri în această categorie.</p>}
 </div></section>
 <QuoteSection title="Ai în minte o atmosferă asemănătoare?" intro="Descrie-ne evenimentul și găsim împreună formatul potrivit."/>
 </>}
