import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StageHero } from "@/components/atelier/StageHero";
import { QuickBrief } from "@/components/atelier/QuickBrief";
import { EventsSelector } from "@/components/atelier/EventsSelector";
import { ServicesAtelier } from "@/components/atelier/ServicesAtelier";
import { EditorialPortfolio } from "@/components/atelier/EditorialPortfolio";
import { EventSoundcheck } from "@/components/atelier/EventSoundcheck";
import { AtmosphereInterlude } from "@/components/atelier/AtmosphereInterlude";
import { FaqList, QuoteSection } from "@/components/site/blocks";
import { generalFaqs } from "@/data/site";
import { faqLd, localBusinessLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "Green Sound Music Pitești | DJ & MC, muzică live, sunet și lumini",
    description: "Atmosfere create prin muzică și lumină. DJ & MC, trupă live, sonorizare, scenotehnică, LED și efecte pentru nunți, botezuri, petreceri și concerte în Pitești și Argeș.",
    path: "/",
    jsonLd: [localBusinessLd(), faqLd(generalFaqs)],
  }),
  component: Home,
});
function Home() {
  return (
    <>
      <StageHero />
      <QuickBrief />
      <EventsSelector />
      <ServicesAtelier />
      <EventSoundcheck />
      <AtmosphereInterlude />
      <EditorialPortfolio />
      <section className="crafted-finale" aria-labelledby="crafted-finale-title">
        <div className="container-site crafted-finale__grid">
          <span className="crafted-index">05 / URMĂTORUL EVENIMENT</span>
          <div>
            <h2 id="crafted-finale-title">Povestea următoarei seri <em>poate fi a ta.</em></h2>
            <p>Spune-ne data și locul. Construim o ofertă pornind de la atmosfera pe care vrei să o creezi.</p>
          </div>
          <Link to="/contact" className="crafted-finale__link" aria-label="Solicită o ofertă personalizată">
            <ArrowUpRight className="size-9" aria-hidden />
          </Link>
        </div>
      </section>
      <section className="section crafted-questions" aria-labelledby="crafted-faq-title">
        <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><span className="crafted-index">06 / ÎNTREBĂRI</span>
            <h2 id="crafted-faq-title" className="crafted-heading mt-5">Tot ce vrei să știi <em>înainte de eveniment.</em></h2>
          </div>
          <FaqList faqs={generalFaqs} />
        </div>
      </section>
      <QuoteSection title="Hai să punem lucrurile în mișcare." intro="Completează câteva detalii și pregătim împreună o propunere pentru evenimentul tău. Mesajul se deschide în WhatsApp sau în aplicația de email, de unde îl trimiți tu." />
    </>
  );
}
