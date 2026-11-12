import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { business, images, process } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { PageHero } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/despre-noi")({
 head:()=>pageHead({
  title:"Despre Green Sound Music | Muzică și evenimente în Pitești, din 2008",
  description:"Green Sound Music este activă în Pitești din 2008. DJ, MC, trupă live, sunet, lumini, studio și producție pentru evenimente.",
  path:"/despre-noi",
  jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Despre noi",path:"/despre-noi"}])],
 }),
 component:About,
});
function About(){return <>
 <PageHero kind="about" tone="echipa" eyebrow="Despre Green Sound Music"
  title="Muzica și partea tehnică lucrează în aceeași echipă."
  lead={`Green Sound Music este activă din ${business.founded}, din Pitești. Pregătim muzica, sonorizarea, luminile și momentele evenimentului.`}
  image={images.scena} crumbs={[{name:"Acasă",to:"/"},{name:"Despre noi"}]}/>
 <section className="rs-about-copy">
  <div className="container-site rs-about-copy__inside">
   <div><p>Ce facem</p><h2>De la montaj la ultimul moment al serii.</h2></div>
   <div><p>Green Sound Music reunește DJ & MC, trupe live, studio de înregistrări, sonorizare, lumini, ecrane LED și efecte. Pentru anumite evenimente oferim și hostess, ursitoare sau animație pentru copii.</p>
   <p>Serviciile pot fi discutate separat. La început stabilim tipul evenimentului, spațiul, data și programul, apoi ce oameni și echipamente sunt necesare.</p>
   <Link to="/servicii" className="rs-inline-link">Serviciile disponibile <ArrowUpRight size={18} aria-hidden /></Link></div>
  </div>
 </section>
 <section className="rs-about-steps">
  <div className="container-site">
   <h2>Pregătirea, pas cu pas</h2>
   <ol>{process.map((step,index)=><li key={step.title}>
    <span>{String(index+1).padStart(2,"0")}</span><h3>{step.title}</h3><p>{step.text}</p>
   </li>)}</ol>
  </div>
 </section>
 <section className="rs-about-photo">
   <BeamPhoto image={images.dj} className="rs-about-photo__image"/>
   <div><p>Din arhiva Green Sound Music</p><h2>Vrei să vedem cum se potrivește echipa la evenimentul tău?</h2>
   <Link to="/contact" className="rs-button rs-button--chalk">Discută cu noi <ArrowUpRight size={18} aria-hidden /></Link></div>
 </section>
 </>}
