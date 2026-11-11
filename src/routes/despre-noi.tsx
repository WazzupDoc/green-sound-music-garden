import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/blocks";
import { ProductionJourney } from "@/components/atelier/ProductionJourney";
import { business, images } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/despre-noi")({
  head:()=>pageHead({title:"Despre Green Sound Music | Muzică și producție live din Pitești",description:"Green Sound Music este activă din 2008, din Pitești. Descoperă echipa și serviciile de DJ & MC, muzică live, sunet, lumini și producție pentru evenimente.",path:"/despre-noi",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Despre noi",path:"/despre-noi"}])]}),
  component:About,
});
function About(){
 return <><PageHero eyebrow="DESPRE NOI / GREEN SOUND MUSIC" title="Din Pitești. Pentru momente care se simt oriunde."
   lead={`Green Sound Music lucrează în muzică și producție de evenimente din ${business.founded}. Artistul și tehnicianul urmăresc același lucru: atmosfera potrivită.`}
   image={images.scena} crumbs={[{name:"Acasă",to:"/"},{name:"Despre noi"}]}/>
 <section className="section atelier-paper"><div className="container-site grid gap-12 md:grid-cols-[.55fr_1fr]">
 <span className="crafted-index">GREEN SOUND / DIN {business.founded}</span><div>
 <h2 className="crafted-heading">Muzică, lumină <em>și oameni.</em></h2>
 <p className="atelier-prose mt-7">Activitatea Green Sound Music reunește DJ & MC, trupă live, producție muzicală, sonorizare profesională, scenotehnică, lumini și efecte speciale. Pentru fiecare eveniment căutăm echilibrul dintre idee și execuție.</p>
 <p className="atelier-prose mt-5">Lucrăm cu publicul, spațiul și programul evenimentului în minte. Aceeași echipă poate coordona muzica și partea tehnică, astfel încât fiecare moment să se desfășoare natural.</p>
 <Link to="/servicii" className="mt-8 inline-flex items-center gap-3 font-semibold text-[#295637]">Descoperă serviciile <ArrowUpRight className="size-5" aria-hidden /></Link>
 </div></div></section>
 <ProductionJourney />
 <section className="section"><div className="container-site grid gap-12 lg:grid-cols-2">
 <img src={images.dj.src} width={images.dj.w} height={images.dj.h} alt={images.dj.alt} loading="lazy" className="aspect-[4/3] w-full object-cover"/>
 <div className="self-center"><span className="crafted-index">ÎN CENTRUL EVENIMENTULUI</span><h2 className="crafted-heading mt-6">Totul începe <em>cu o conversație.</em></h2>
 <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Spune-ne ce pregătești, unde și când. Îți recomandăm serviciile potrivite, fără să complicăm inutil organizarea.</p>
 <Link to="/contact" className="crafted-button crafted-button--light mt-8">Discută cu noi <ArrowUpRight className="size-4" aria-hidden /></Link></div>
 </div></section></>
}
