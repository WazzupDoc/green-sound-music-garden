import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { business, images, process } from "@/data/site";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import aboutCss from "@/styles/about-production-v95.css?inline";

export const Route = createFileRoute("/despre-noi")({
  head: () => pageHead({
    title: "Despre Green Sound Music | Muzică și evenimente în Pitești, din 2008",
    description: "Green Sound Music este activă în Pitești din 2008. DJ, MC, trupă live, sunet, lumini, studio și producție pentru evenimente.",
    path: "/despre-noi",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Despre noi", path: "/despre-noi" }])],
  }),
  component: About,
});

function About() {
  return <>
    <style>{aboutCss}</style>
    <main className="gs-about-v95">
      <header className="gs-about-v95__hero">
        <div className="container-site gs-about-v95__hero-grid">
          <div className="gs-about-v95__intro">
            <nav aria-label="Fir de navigare" className="gs-about-v95__crumbs">
              <Link to="/">Acasă</Link><span aria-hidden="true">/</span><span aria-current="page">Despre noi</span>
            </nav>
            <p className="gs-about-v95__eyebrow">GREEN SOUND MUSIC <span aria-hidden="true">—</span> PITEȘTI</p>
            <h1>Din culise.<br /><em>În mijlocul</em><br />evenimentului.</h1>
            <p className="gs-about-v95__lead">Din {business.founded}, pregătim muzica, sunetul, luminile și momentele care țin un eveniment împreună. O discuție clară înainte, o echipă coordonată în ziua evenimentului.</p>
            <Link to="/servicii" className="gs-about-v95__text-link">Descoperă serviciile <ArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
          <figure className="gs-about-v95__photo">
            <BeamPhoto image={images.scena} className="gs-about-v95__photo-image" />
            <figcaption><span>01 / DIN ARHIVA GREEN SOUND</span><span>MUZICĂ · LUMINĂ · PRODUCȚIE</span></figcaption>
          </figure>
        </div>
        <div className="gs-about-v95__rail" aria-hidden="true"><span>BRIEF</span><span>MONTAJ</span><span>SHOW</span><span>FINAL</span></div>
      </header>
      <section className="gs-about-v95__statement container-site" aria-labelledby="gs-about-statement">
        <p className="gs-about-v95__section-index">01 / CUM LUCRĂM</p>
        <h2 id="gs-about-statement">Muzica și partea tehnică <em>nu sunt două povești separate.</em></h2>
        <div className="gs-about-v95__statement-copy">
          <p>Green Sound Music reunește DJ & MC, trupă live, studio de înregistrări, sonorizare, lumini, ecrane LED și efecte. Pentru anumite evenimente oferim și hostess, ursitoare sau animație pentru copii.</p>
          <p>Serviciile pot fi discutate separat. Înainte de ofertă stabilim tipul evenimentului, spațiul, data și programul, apoi oamenii și echipamentele necesare.</p>
        </div>
      </section>
      <section className="gs-about-v95__process" aria-labelledby="gs-about-process">
        <div className="container-site">
          <div className="gs-about-v95__process-heading"><p className="gs-about-v95__section-index">02 / FLUXUL DE PRODUCȚIE</p><h2 id="gs-about-process">De la primul detaliu<br /><em>la ultimul moment.</em></h2></div>
          <ol className="gs-about-v95__steps">{process.map((step, index) => <li key={step.title}>
            <span className="gs-about-v95__step-no">{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{step.title}</h3><p>{step.text}</p></div>
            <span className="gs-about-v95__step-mark" aria-hidden="true">↗</span>
          </li>)}</ol>
        </div>
      </section>
      <section className="gs-about-v95__closing container-site" aria-labelledby="gs-about-close">
        <figure><BeamPhoto image={images.dj} className="gs-about-v95__closing-photo" /><figcaption>Din arhiva Green Sound Music</figcaption></figure>
        <div><p className="gs-about-v95__section-index">03 / URMĂTORUL EVENIMENT</p><h2 id="gs-about-close">Spune-ne ce <em>pregătești.</em></h2><p>Data, locul și câteva detalii despre eveniment sunt suficiente pentru a începe discuția.</p><Link to="/contact" className="gs-about-v95__cta">Pregătește cererea <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
      </section>
    </main>
  </>;
}
