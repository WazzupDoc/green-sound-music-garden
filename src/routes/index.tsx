import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight, Play, Volume2 } from "lucide-react";
import { FaqList, ProcessSteps, QuoteSection } from "@/components/site/blocks";
import { VideoLite } from "@/components/site/VideoLite";
import { business, events, generalFaqs, images, services, videos } from "@/data/site";
import { faqLd, localBusinessLd, pageHead } from "@/lib/seo";

/**
 * GREEN SOUND / STAGE NOTES
 * Bespoke editorial homepage, no full-bleed photographic hero.
 * Progressive enhancement: all content remains visible without JS.
 */
export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Green Sound Music — DJ, muzică live, sonorizare și lumini | Pitești",
      description:
        "Green Sound Music, din Pitești, din 2008. DJ & MC, trupe live, sonorizare, lumini și producție tehnică pentru evenimente. Solicită o ofertă.",
      path: "/",
      jsonLd: [localBusinessLd(), faqLd(generalFaqs)],
    }),
  component: EditorialHome,
});

const serviceIndex = services.slice(0, 5);
const eventIndex = events.slice(0, 3);

function useReveal() {
  useEffect(() => {
    const root = document.querySelector(".gs2-home");
    if (!root || !("IntersectionObserver" in window)) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-gs2-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("gs2-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    root.classList.add("gs2-motion-ready");
    return () => observer.disconnect();
  }, []);
}

function EditorialHome() {
  useReveal();
  const [activeService, setActiveService] = useState(0);
  const serviceImage = serviceIndex[activeService]?.image ?? images.dj;

  return (
    <div className="gs2-home">
      <section className="gs2-hero" aria-labelledby="gs2-hero-title">
        <div className="gs2-hero-grid gs2-shell">
          <div className="gs2-hero-copy">
            <div className="gs2-overline">
              <span>EVENT PRODUCTION / PITEȘTI</span>
              <span>EST. {business.founded}</span>
            </div>
            <p className="gs2-chapter gs2-hero-chapter"><span className="gs2-chapter-dot" /> SUNET · MUZICĂ · LUMINĂ</p>
            <h1 id="gs2-hero-title" className="gs2-hero-title">
              FIECARE<br />
              EVENIMENT<br />
              <span>ARE UN</span><br />
              <em>SUNET.</em>
            </h1>
            <div className="gs2-hero-bottom">
              <p>Din primul acord până la ultima lumină, construim atmosfera evenimentului tău.</p>
              <a href="#gs2-servicii" className="gs2-round-link" aria-label="Descoperă serviciile">
                <ArrowDown size={25} strokeWidth={1.5} aria-hidden />
              </a>
            </div>
            <div className="gs2-hero-cta-row">
              <a className="gs2-cta-primary" href="#cerere-oferta">Hai să vorbim despre eveniment <ArrowUpRight size={18} aria-hidden /></a>
              <Link to="/portofoliu" className="gs2-link-inline">Vezi portofoliul <ArrowUpRight size={15} aria-hidden /></Link>
            </div>
          </div>

          <div className="gs2-hero-visual">
            <div className="gs2-visual-label"><span>01 / 03</span><span>GREEN SOUND / ÎN ACȚIUNE</span></div>
            <figure className="gs2-hero-frame">
              <img src={images.scena.src} alt={images.scena.alt} width={images.scena.w} height={images.scena.h} fetchPriority="high" />
              <figcaption>ATMOSFERĂ REALĂ. EVENIMENTE REALE.</figcaption>
            </figure>
            <div className="gs2-frame-footer"><span>SCENE / LIGHT / ENERGY</span><span>↓ EXPLORE</span></div>
          </div>
        </div>
        <div className="gs2-hero-edge" aria-hidden="true">GS—08</div>
      </section>

      <div className="gs2-signal" aria-label="Muzică live, sonorizare, lumini și evenimente">
        <div className="gs2-signal-track" aria-hidden="true">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>LIVE MUSIC <i /> SOUND DESIGN <i /> STAGE LIGHTING <i /> EVENT EXPERIENCES <i /></span>
          ))}
        </div>
      </div>

      <section className="gs2-manifesto gs2-shell" aria-labelledby="gs2-manifesto-title">
        <div className="gs2-kicker" data-gs2-reveal><span className="gs2-num">01 /</span> O SINGURĂ ECHIPĂ. MAI MULTE DIMENSIUNI.</div>
        <div className="gs2-manifesto-row" data-gs2-reveal>
          <h2 id="gs2-manifesto-title">Ceea ce<br />rămâne <em>după</em><br />eveniment.</h2>
          <div className="gs2-manifesto-aside">
            <span className="gs2-aside-mark" aria-hidden="true">✳</span>
            <p>Nu e doar despre ce se aude pe scenă. E despre cum se simte fiecare moment. De aceea reunim muzica, tehnica și lumina într-o singură experiență.</p>
            <Link to="/despre-noi" className="gs2-link-arrow">Descoperă echipa <ArrowUpRight size={18} aria-hidden /></Link>
          </div>
        </div>
      </section>

      <section id="gs2-servicii" className="gs2-services" aria-labelledby="gs2-services-title">
        <div className="gs2-shell">
          <div className="gs2-section-top" data-gs2-reveal>
            <span className="gs2-kicker"><span className="gs2-num">02 /</span> CE FACEM</span>
            <span className="gs2-section-meta">CINCI DIRECȚII. O SINGURĂ VIZIUNE.</span>
          </div>
          <div className="gs2-services-layout">
            <div className="gs2-services-left">
              <h2 id="gs2-services-title" className="gs2-section-display" data-gs2-reveal>PRODUCEM<br /><em>atmosferă.</em></h2>
              <p className="gs2-services-intro" data-gs2-reveal>De la DJ & MC și artiști live până la echipamente profesionale, fiecare serviciu poate fi ales separat sau integrat într-un concept complet.</p>
              <div className="gs2-services-list">
                {serviceIndex.map((s, i) => (
                  <Link
                    key={s.slug}
                    to={"/" + s.slug}
                    className={"gs2-service-line" + (activeService === i ? " gs2-active" : "")}
                    onMouseEnter={() => setActiveService(i)}
                    onFocus={() => setActiveService(i)}
                    data-gs2-reveal
                  >
                    <span className="gs2-service-no">0{i + 1}</span>
                    <span className="gs2-service-name">{s.name}</span>
                    <ArrowUpRight className="gs2-service-arrow" size={22} strokeWidth={1.5} aria-hidden />
                  </Link>
                ))}
              </div>
              <Link to="/servicii" className="gs2-link-arrow gs2-services-all">Toate serviciile <ArrowUpRight size={18} aria-hidden /></Link>
            </div>
            <div className="gs2-service-preview" data-gs2-reveal>
              <div className="gs2-preview-tape"><span>IN FRAME / 0{activeService + 1}</span><span>GREEN SOUND MUSIC</span></div>
              <img src={serviceImage.src} alt={serviceImage.alt} width={serviceImage.w} height={serviceImage.h} loading="lazy" decoding="async" key={activeService} />
              <span className="gs2-preview-caption">{serviceIndex[activeService]?.short}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gs2-works gs2-shell" aria-labelledby="gs2-works-title">
        <div className="gs2-section-top" data-gs2-reveal>
          <span className="gs2-kicker"><span className="gs2-num">03 /</span> MOMENTE, NU ȘABLOANE</span>
          <Link to="/evenimente" className="gs2-link-arrow">Toate evenimentele <ArrowUpRight size={18} aria-hidden /></Link>
        </div>
        <h2 id="gs2-works-title" className="gs2-works-title" data-gs2-reveal>FIECARE<br /><em>scenă</em> E ALTFEL.</h2>
        <div className="gs2-event-grid">
          {eventIndex.map((e, i) => (
            <Link key={e.slug} to="/evenimente/$slug" params={{ slug: e.slug }} className={"gs2-event gs2-event-" + (i + 1)} data-gs2-reveal>
              <div className="gs2-event-image">
                <img src={e.image.src} alt="" width={e.image.w} height={e.image.h} loading="lazy" decoding="async" />
                <span className="gs2-event-jump"><ArrowUpRight size={24} strokeWidth={1.5} aria-hidden /></span>
              </div>
              <div className="gs2-event-foot"><span>0{i + 1} / {e.name}</span><span>DETALII <ArrowRight size={15} aria-hidden /></span></div>
            </Link>
          ))}
        </div>
        <p className="gs2-works-outro" data-gs2-reveal>Nunți, petreceri, evenimente corporate, festivaluri.<br />Nu repetăm aceeași atmosferă. O construim pentru fiecare ocazie.</p>
      </section>

      <section className="gs2-film" aria-labelledby="gs2-film-title">
        <div className="gs2-shell">
          <div className="gs2-section-top" data-gs2-reveal>
            <span className="gs2-kicker"><span className="gs2-num">04 /</span> ÎN MIȘCARE</span>
            <Link to="/portofoliu" className="gs2-link-arrow">Portofoliu complet <ArrowUpRight size={18} aria-hidden /></Link>
          </div>
          <div className="gs2-film-head" data-gs2-reveal>
            <h2 id="gs2-film-title">NU POVESTIM<br /><em>energia.</em><br />O ARĂTĂM.</h2>
            <p>Imagini și sunet de la evenimente. Apasă play și vezi atmosfera, nu doar echipamentele.</p>
          </div>
          <div className="gs2-film-stage" data-gs2-reveal>
            <div className="gs2-film-number">GS / FILM 001</div>
            <VideoLite video={videos.nuntaRamada} />
          </div>
          <div className="gs2-film-foot"><span>SELECTED LIVE MOMENTS</span><span>© GREEN SOUND MUSIC</span></div>
        </div>
      </section>

      <section className="gs2-process gs2-shell" aria-labelledby="gs2-process-title">
        <div className="gs2-section-top" data-gs2-reveal><span className="gs2-kicker"><span className="gs2-num">05 /</span> ÎN SPATELE FIECĂRUI MOMENT</span><span className="gs2-section-meta">SIMPLU. CLAR. PROFESIONIST.</span></div>
        <div className="gs2-process-grid">
          <h2 id="gs2-process-title" data-gs2-reveal>O IDEE.<br />UN PLAN.<br /><em>O experiență.</em></h2>
          <div data-gs2-reveal><ProcessSteps /></div>
        </div>
      </section>

      <section className="gs2-questions" aria-labelledby="gs2-faq-title">
        <div className="gs2-shell gs2-faq-layout">
          <div data-gs2-reveal>
            <span className="gs2-kicker"><span className="gs2-num">06 /</span> BINE DE ȘTIUT</span>
            <h2 id="gs2-faq-title">ÎNAINTE<br />DE <em>primul</em><br />ACORD.</h2>
          </div>
          <div data-gs2-reveal><FaqList faqs={generalFaqs} /></div>
        </div>
      </section>

      <div className="gs2-quote-intro gs2-shell" data-gs2-reveal>
        <span className="gs2-kicker"><span className="gs2-num">07 /</span> ÎNCEPE CU O CONVERSAȚIE</span>
        <h2>SCENA E A TA.<br /><em>Noi aducem energia.</em></h2>
        <p>Spune-ne data, locul și ce ai în minte. Construim oferta în jurul evenimentului tău.</p>
      </div>
      <QuoteSection />
    </div>
  );
}
