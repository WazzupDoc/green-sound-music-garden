import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StageHero } from "@/components/atelier/StageHero";
import { ProductionIndex } from "@/components/atelier/ProductionIndex";
import { EditorialPortfolio } from "@/components/atelier/EditorialPortfolio";
import { localBusinessLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({
    title: "Green Sound Music Pitești | DJ & MC, muzică live, sunet și lumini",
    description: "Atmosfere create prin muzică și lumină. DJ & MC, trupă live, sonorizare, scenotehnică, LED și efecte pentru nunți, botezuri, petreceri și concerte în Pitești și Argeș.",
    path: "/",
    jsonLd: [localBusinessLd()],
  }),
  component: Home,
});

/**
 * V48 / Editorial reset: a visitor should understand the brand, discover
 * every genuine service, see real evidence and find Contact. ONE purpose
 * per section. No overlapping event/scene/service configurators or repeated
 * quote forms on the homepage. Existing deeper catalogue, contact and
 * event pages remain live at their original canonical routes.
 */
function Home() {
  return (
    <>
      <StageHero />
      <ProductionIndex />
      <EditorialPortfolio />
      <section className="crafted-finale gs-finale" aria-labelledby="crafted-finale-title">
        <div className="container-site crafted-finale__grid">
          <span className="crafted-index">URMĂTORUL EVENIMENT / ÎNCEPE AICI</span>
          <div>
            <h2 id="crafted-finale-title">Povestea următoarei seri <em>poate fi a ta.</em></h2>
            <p>Spune-ne unde și când. Noi găsim ritmul potrivit evenimentului tău.</p>
          </div>
          <Link to="/contact" className="crafted-finale__link" aria-label="Solicită o ofertă personalizată">
            <ArrowUpRight className="size-9" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}