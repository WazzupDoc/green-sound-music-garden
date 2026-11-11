import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Check, CirclePlay, SlidersHorizontal } from "lucide-react";
import { images, type ImageRef } from "@/data/site";

type Step = {
  no: string;
  title: string;
  label: string;
  heading: string;
  copy: string;
  note: string;
  image: ImageRef;
};

const steps: readonly Step[] = [
  {
    no:"01", title:"Ideea", label:"PRIMA CONVERSAȚIE",
    heading:"Începem cu povestea ta.",
    copy:"O nuntă, un concert sau o petrecere privată au ritmuri diferite. Discutăm despre oameni, loc și momentele care contează pentru tine.",
    note:"TIPUL EVENIMENTULUI · DATA · LOCAȚIA", image:images.dj,
  },
  {
    no:"02", title:"Atmosfera", label:"MUZICĂ ȘI IDENTITATE",
    heading:"Alegem ce se aude.",
    copy:"DJ & MC, trupă live sau o combinație între ele. Pornim de la tipul evenimentului și ajustăm muzica pentru atmosfera pe care ți-o dorești.",
    note:"DJ & MC · LIVE · MOMENTE SPECIALE", image:images.concert,
  },
  {
    no:"03", title:"Producția", label:"SUNET, LUMINĂ, SCENĂ",
    heading:"Punem tehnica în acord.",
    copy:"Sunetul, luminile, scena și efectele pot face parte din aceeași viziune. Discutăm configurația potrivită spațiului și programului.",
    note:"AUDIO · LIGHT DESIGN · ECHIPAMENTE", image:images.scena,
  },
  {
    no:"04", title:"Momentul", label:"ATMOSFERĂ LIVE",
    heading:"Iar ideea devine experiență.",
    copy:"Scopul este ca oamenii să se bucure de eveniment, nu să se gândească la ceea ce se întâmplă în spatele scenei. Vezi exemple reale în portofoliul nostru.",
    note:"EXPERIENȚĂ · PUBLIC · EMOȚIE", image:images.ursitoare2,
  },
];

/** Visual storytelling, not a booking wizard or a claim of fixed project deliverables. */
export function ProductionJourney() {
  const [active, setActive] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const step = steps[active]!;

  return (
    <section className="gs-journey section" aria-labelledby="gs-journey-title" data-hydrated={hydrated ? "true" : "false"}>
      <div className="container-site">
        <div className="gs-journey__intro">
          <div>
            <span className="gs-journey__eyebrow"><SlidersHorizontal className="size-4" aria-hidden /> GREEN SOUND / THE PRODUCTION JOURNEY</span>
            <h2 id="gs-journey-title">Dintr-o idee, <em>o atmosferă întreagă.</em></h2>
          </div>
          <p>Așa poate prinde contur un eveniment, de la primele întrebări până la muzică, lumină și emoția de pe scenă. Explorează fiecare etapă.</p>
        </div>

        <div className="gs-journey__body">
          <div className="gs-journey__navigator" role="group" aria-label="Explorează etapele unei producții">
            {steps.map((item,index) => (
              <button type="button" key={item.no} className="gs-journey__step" aria-pressed={active === index}
                onClick={() => setActive(index)} data-cursor-label="EXPLOREAZĂ">
                <span className="gs-journey__step-no">{item.no}</span>
                <span className="gs-journey__step-text"><strong>{item.title}</strong><small>{item.label}</small></span>
                <span className="gs-journey__step-indicator" aria-hidden>
                  {active === index ? <Check className="size-5"/> : <ArrowUpRight className="size-5"/>}
                </span>
              </button>
            ))}
            <div className="gs-journey__nav-foot" aria-hidden>
              <span>GREEN SOUND / PITEȘTI</span><span>{step.no} / 04</span>
            </div>
          </div>
          <div className="gs-journey__stage" aria-live="polite" aria-atomic="true">
            <div className="gs-journey__image">
              <img key={step.no} src={step.image.src} alt={step.image.alt}
                width={step.image.w} height={step.image.h} loading="lazy" decoding="async" />
              <div className="gs-journey__image-overlay" aria-hidden />
              <div className="gs-journey__image-chrome" aria-hidden>
                <span>PRODUCTION NOTES / {step.no}</span><span>GREEN SOUND MUSIC</span>
              </div>
              <span className="gs-journey__image-id" aria-hidden>{step.no}</span>
            </div>
            <div key={step.no} className="gs-journey__chapter">
              <span className="gs-journey__chapter-tag">{step.label}</span>
              <h3>{step.heading}</h3>
              <p>{step.copy}</p>
              <div className="gs-journey__chapter-bottom">
                <span>{step.note}</span>
                <button type="button" onClick={() => setActive(index => (index+1) % steps.length)}
                  aria-label={active === steps.length - 1 ? "Revino la prima etapă" : "Vezi etapa următoare"}>
                  {active === steps.length - 1 ? "De la început" : "Următoarea etapă"}
                  <ArrowDownRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="gs-journey__cta">
          <p><CirclePlay className="size-5" aria-hidden /> Fiecare eveniment este diferit. Discutăm soluțiile potrivite împreună.</p>
          <div>
            <Link to="/portofoliu">Vezi filmările reale <ArrowUpRight className="size-4" aria-hidden /></Link>
            <Link to="/contact" className="gs-journey__cta-primary">Spune-ne ce pregătești <ArrowUpRight className="size-4" aria-hidden /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
