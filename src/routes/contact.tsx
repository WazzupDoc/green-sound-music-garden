import { ClientOnly, createFileRoute, useHydrated } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { QuoteForm } from "@/components/site/QuoteForm";
import { business, services as serviceCatalogue } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { eventTypeOptions } from "@/lib/quote";
import { isValidBriefDate } from "@/lib/brief-date";
import contactProductionCss from "@/styles/contact-production-v92.css?inline";

const allowedTypes: readonly string[] = eventTypeOptions;
type EventOption = (typeof eventTypeOptions)[number];

/** Whitelisted, bounded query parameters; never blindly reflect URL data. */
type BriefQuery = { event?: EventOption; date?: string; location?: string; services?: string[] };
const allowedServices = new Set<string>(serviceCatalogue.map((service) => service.formLabel));
/** A short pipe-separated GET value, bounded and allowlisted against actual company services. */
function parseServices(raw: unknown): string[] {
  if (typeof raw !== "string" || raw.length > 900) return [];
  return [...new Set(raw.split("|").map((part) => part.trim()))]
    .filter((value) => allowedServices.has(value))
    .slice(0, 8);
}

/**
 * All query fields are optional, so ordinary <Link to="/contact" /> calls
 * stay valid. Only trusted allowed enum values and bounded text survive.
 */
function validateBrief(search: Record<string, unknown>): BriefQuery {
  const brief: BriefQuery = {};
  const eventValue = search["event"];
  const dateValue = search["date"];
  const locationValue = search["location"];
  const serviceValue = search["services"];
  if (typeof eventValue === "string" && allowedTypes.includes(eventValue)) {
    brief.event = eventValue as EventOption;
  }
  if (isValidBriefDate(dateValue)) {
    brief.date = dateValue;
  }
  if (typeof locationValue === "string" && locationValue.trim()) {
    brief.location = locationValue.trim().slice(0, 120);
  }
  const selectedServices = parseServices(serviceValue);
  if (selectedServices.length) brief.services = selectedServices;
  return brief;
}

export const Route = createFileRoute("/contact")({
  validateSearch: validateBrief,
  head: () => pageHead({
    title: "Contact Green Sound Music Pitești | Ofertă DJ, muzică, sunet și lumini",
    description: "Cere ofertă pentru nunți, botezuri, corporate și concerte. Contact Green Sound Music Pitești prin telefon, WhatsApp sau email. Muzică, sunet și lumini pentru evenimente.",
    path: "/contact",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Contact", path: "/contact" }])],
  }),
  component: Contact,
});

function Contact() {
  // On native GET navigation the dev SSR/router may initially omit validated
  // search values; the client must not render different initial markup.
  // useHydrated is false on the server AND the first client render.
  const hydrated = useHydrated();
  const search = Route.useSearch();
  const event = hydrated ? search.event : undefined;
  const date = hydrated ? search.date : undefined;
  const location = hydrated ? search.location : undefined;
  const selectedServices = hydrated ? search.services ?? [] : [];
  const fromBrief = Boolean(event || date || location || selectedServices.length);

  return (
    <div className="gs-contact-v92">
      <style>{contactProductionCss}</style>

      <section className="director-contact-intro gs-contact-v92__hero"
        aria-labelledby="director-contact-title">
        <div className="container-site gs-contact-v92__hero-grid">
          <div className="gs-contact-v92__headline">
            <span className="gs-contact-v92__eyebrow">GREEN SOUND MUSIC / CONTACT & PRODUCȚIE · PITEȘTI</span>
            <h1 id="director-contact-title">
              <span>PLANUL</span>
              <span>TĂU.</span>
              <em>RITMUL NOSTRU.</em>
            </h1>
            <p>
              {fromBrief
                ? "Am păstrat selecția făcută pe site. Verifică detaliile evenimentului și pregătește mesajul pentru canalul pe care îl alegi."
                : "O petrecere, un concert sau un eveniment de firmă? Spune-ne data, locația și ce îți dorești. Pregătim împreună muzica, sonorizarea și luminile potrivite."}
            </p>
            <a className="gs-contact-v92__jump" href="#contact-form-title">
              Începe cererea <ArrowDownRight size={21} strokeWidth={1.3} aria-hidden />
            </a>
          </div>

          <div className="gs-contact-v92__score" aria-hidden="true">
            <div className="gs-contact-v92__score-top">
              <span>GS / 02</span><span>SIGNAL → BRIEF</span>
            </div>
            <svg className="gs-contact-v92__score-art" viewBox="0 0 650 510"
              fill="none" role="presentation" focusable="false">
              <g className="gs-contact-v92__staff" stroke="#C6FFAE" strokeWidth="1">
                <path d="M0 96H650M0 177H650M0 258H650M0 339H650M0 420H650"
                  strokeOpacity=".14" strokeDasharray="4 14" />
                <path d="M80 0V510M216 0V510M352 0V510M488 0V510M624 0V510"
                  strokeOpacity=".08" />
              </g>
              <g className="gs-contact-v92__frequency" strokeLinecap="round" strokeLinejoin="round">
                <path d="M-80 296L36 296L78 218L112 352L153 103L197 400L242 149L289 319L329 183L374 339L416 95L460 411L500 221L536 290L580 188L620 278L725 278"
                  stroke="#D5FFAD" strokeWidth="3.4" />
                <path d="M-80 317L36 317L78 263L112 369L153 156L197 432L242 201L289 348L329 226L374 364L416 142L460 446L500 254L536 315L580 229L620 310L725 310"
                  stroke="#89F4AA" strokeWidth="1.5" strokeOpacity=".65" />
                <path d="M-80 275L36 275L78 175L112 322L153 65L197 372L242 105L289 283L329 142L374 304L416 47L460 373L500 182L536 266L580 146L620 245L725 245"
                  stroke="#F1FFD0" strokeWidth="1.1" strokeOpacity=".37" />
              </g>
              <g fill="#D9FFB4">
                <rect x="147" y="96" width="11" height="11" transform="rotate(45 152.5 101.5)" />
                <rect x="409" y="89" width="10" height="10" transform="rotate(45 414 94)" />
              </g>
              <path d="M30 470H620" stroke="#D4FBBE" strokeOpacity=".35" strokeWidth="1" />
            </svg>
            <span className="gs-contact-v92__score-caption">FĂRĂ AUTOMATIZĂRI ASCUNSE. TU ALEGI CUM TRIMIȚI.</span>
          </div>

          <ol className="gs-contact-v92__route" aria-label="Cum funcționează cererea">
            <li><small>01 / DETALII</small><strong>Descrii evenimentul</strong></li>
            <li><small>02 / VERIFICARE</small><strong>Previzualizezi mesajul</strong></li>
            <li><small>03 / TRIMITERE</small><strong>Tu alegi WhatsApp sau email</strong></li>
          </ol>
        </div>
      </section>

      <section className="section director-contact-brief-flow gs-contact-v92__flow"
        aria-labelledby="contact-form-title">
        <div className="container-site gs-contact-v92__workbench">
          <aside className="gs-contact-v92__direct" aria-label="Contact direct Green Sound Music">
            <span className="gs-contact-v92__kicker">01 / LINIE DIRECTĂ</span>
            <h2>Preferi să <em>vorbim direct?</em></h2>
            <p>Spune-ne despre evenimentul tău în ritmul tău. Pentru o cerere detaliată, formularul din dreapta îți pregătește mesajul, fără să îl trimită automat.</p>
            <div className="gs-contact-v92__channels">
              <a href={business.phoneHref}>
                <span className="gs-contact-v92__channel-no">01</span>
                <span><small>SUNĂ</small><strong>{business.phoneDisplay}</strong></span>
                <Phone size={18} strokeWidth={1.5} aria-hidden />
              </a>
              <a href={whatsappUrl(defaultWhatsappText)} target="_blank" rel="noopener noreferrer">
                <span className="gs-contact-v92__channel-no">02</span>
                <span><small>WHATSAPP</small><strong>Scrie-ne direct</strong></span>
                <MessageCircle size={18} strokeWidth={1.5} aria-hidden />
              </a>
              <a href={`mailto:${business.email}`}>
                <span className="gs-contact-v92__channel-no">03</span>
                <span><small>EMAIL</small><strong>{business.email}</strong></span>
                <Mail size={18} strokeWidth={1.5} aria-hidden />
              </a>
            </div>
            <p className="gs-contact-v92__locality"><MapPin size={19} strokeWidth={1.5} aria-hidden />
              {business.address.street}, {business.address.city}, jud. {business.address.region}
            </p>
          </aside>

          <div className="director-contact-quote gs-contact-v92__quote">
            <div className="gs-contact-v92__form-heading">
              <span className="gs-contact-v92__kicker">02 / BRIEF DE EVENIMENT</span>
              <h2 id="contact-form-title">Hai să punem <em>detaliile cap la cap.</em></h2>
              <p>Alegi serviciile, verifici mesajul și apoi decizi unde îl trimiți. Nicio cerere nu pleacă automat de pe site.</p>
            </div>
            <ClientOnly fallback={
              <div role="status" className="gs-contact-v92__fallback">
                <p>Pregătim formularul pentru evenimentul tău…</p>
                <p>Între timp, poți folosi telefonul sau WhatsApp din secțiunea Contact direct.</p>
              </div>
            }>
              <QuoteForm key={`${event ?? ""}|${date ?? ""}|${location ?? ""}|${selectedServices.join("|")}`}
                id="cerere-oferta" defaultEventType={event} defaultDate={date ?? ""}
                defaultLocation={location ?? ""} defaultServices={selectedServices} />
            </ClientOnly>
          </div>
        </div>
      </section>
    </div>
  );
}
