import { createFileRoute } from "@tanstack/react-router";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { EventsSelector } from "@/components/atelier/EventsSelector";
import { images } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
export const Route=createFileRoute("/evenimente/")({
  head:()=>pageHead({title:"Nunți, botezuri, petreceri, concerte, corporate | Green Sound Music Pitești",
    description:"Experiențe muzicale și producție tehnică pentru nunți, botezuri, petreceri private, evenimente corporate și concerte. Alege evenimentul tău în Pitești sau Argeș.",
    path:"/evenimente",jsonLd:[breadcrumbLd([{name:"Acasă",path:"/"},{name:"Evenimente",path:"/evenimente"}])]}),
  component:Events,
});
function Events(){return <>
 <PageHero eyebrow="EXPERIENȚE / EVENIMENTE" title="Nu există două evenimente cu aceeași energie."
   lead="O nuntă, un concert sau un eveniment corporate au ritmuri diferite. Selectează experiența și descoperă muzica, luminile și soluțiile care i se potrivesc."
   image={images.dj} crumbs={[{name:"Acasă",to:"/"},{name:"Evenimente"}]}/>
 <EventsSelector />
 <QuoteSection title="Ai ales data. Hai să pregătim atmosfera." intro="Spune-ne tipul evenimentului și ce îți dorești. Îți propunem combinația potrivită de muzică și tehnică." />
 </>}
