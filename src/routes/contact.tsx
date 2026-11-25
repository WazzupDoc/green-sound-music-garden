import { ClientOnly, createFileRoute, useHydrated } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, ClipboardList, ScanText, Send } from "lucide-react";
import { QuoteForm } from "@/components/site/QuoteForm";
import { business, services as serviceCatalogue } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { eventTypeOptions } from "@/lib/quote";
import { isValidBriefDate } from "@/lib/brief-date";

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
 * All query fields are optional, so ordinary `<Link to="/contact" />`
 * calls stay valid. Only trusted allowed enum values and bounded text survive.
 */
export function validateBrief(search: Record<string, unknown>): BriefQuery {
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
  if (typeof locationValue === "string" && locationValue.length <= 2000) {
    const safeLocation = locationValue.replace(/[\u0000-\u001F\u007F-\u009F\u061C\u200B-\u200F\u2028-\u202E\u2060\u2066-\u2069\uFEFF]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
    // Control-only input must not produce an empty, apparently prefilled brief.
    if (safeLocation) brief.location = safeLocation;
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
    <>
      <section className="director-contact-intro gs-contact-v298" aria-labelledby="director-contact-title">
        <style>{contactSheetCss}</style>
        <div className="container-site">
          <div className="gs-contact-v298__heading">
          <span className="crafted-index">GREEN SOUND / CERERE DE OFERTĂ</span>
          <h1 id="director-contact-title">Spune-ne povestea. <em>Noi aducem atmosfera.</em></h1>
          <p>
            {fromBrief
              ? "Am precompletat opțiunile alese mai devreme. Verifică serviciile, completează datele de contact și pregătește mesajul pentru WhatsApp sau email."
              : "Spune-ne ce eveniment pregătești, data și locul. Împreună alegem muzica, sunetul, luminile și detaliile care fac atmosfera."}
          </p>
          </div>
          <div className="director-contact-signal" aria-label="Etapele cererii de ofertă">
            <ol className="director-contact-signal__steps">
              <li><ClipboardList aria-hidden="true" className="gs-contact-v298__icon" /><div><span>01 / DETALII</span><strong>Spui ce pregătești</strong></div></li>
              <li><ScanText aria-hidden="true" className="gs-contact-v298__icon" /><div><span>02 / VERIFICARE</span><strong>Verifici mesajul</strong></div></li>
              <li><Send aria-hidden="true" className="gs-contact-v298__icon" /><div><span>03 / DESCHIDERE</span><strong>Tu confirmi trimiterea în aplicație</strong></div></li>
            </ol>
            <a href="#contact-form-title" className="director-contact-signal__action" onClick={() => {
              // Keep the native fragment navigation while moving keyboard focus to the form heading.
              document.getElementById("contact-form-title")?.focus({ preventScroll: true });
            }}>
              Începe cererea <ArrowUpRight className="size-5" aria-hidden />
            </a>
          </div>
        </div>
      </section>
      <section className="section director-contact-brief-flow gs-contact-v298-flow" aria-labelledby="contact-form-title">
        <div className="container-site grid items-start gap-14 lg:grid-cols-[.72fr_1.28fr] xl:gap-24 director-contact-brief-layout">
          <aside className="gs-contact-v298__direct">
            <span className="crafted-index">01 / CONTACT DIRECT</span>
            <h2 className="crafted-heading mt-6">O discuție bună <em>pornește totul.</em></h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">Trimite detaliile evenimentului. Formularul pregătește mesajul în WhatsApp sau email; îl trimiți tu din aplicația aleasă.</p>
            <div className="mt-12 space-y-7 border-t border-border pt-8">
              <a href={business.phoneHref} className="group flex items-center gap-4 text-xl font-semibold"><Phone className="size-5 text-primary" aria-hidden /> {business.phoneDisplay}<ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden /></a>
              <a href={whatsappUrl(defaultWhatsappText)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-lg"><MessageCircle className="size-5 text-primary" aria-hidden /> Scrie-ne pe WhatsApp<ArrowUpRight className="size-4 text-primary" aria-hidden /></a>
              <a href={`mailto:${business.email}`} className="flex items-center gap-4 text-lg"><Mail className="size-5 text-primary" aria-hidden /> {business.email}</a>
              <p className="flex gap-4 text-foreground/70"><MapPin className="size-5 shrink-0 text-primary" aria-hidden /> {business.address.street}, {business.address.city}, jud. {business.address.region}</p>
            </div>
          </aside>
          <div className="director-contact-quote border border-border bg-[#121c15] p-5 sm:p-8 lg:p-11">
            <span className="crafted-index">02 / CERERE DE OFERTĂ</span>
            {fromBrief && (
              <div className="mb-7 mt-5 border-l-2 border-primary bg-primary/[0.06] px-4 py-4" role="status" aria-live="polite" aria-atomic="true" aria-label="Selecția preluată din paginile de evenimente și servicii">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Selecția ta a fost preluată</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {event ? <span className="font-semibold">{event}</span> : "Cerere personalizată"}
                  {date ? <span> · {date}</span> : null}
                  {location ? <span> · {location}</span> : null}
                </p>
                {selectedServices.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Servicii preselectate">
                    {selectedServices.map(service => (
                      <li key={service} className="border border-primary/30 px-2.5 py-1 text-xs text-foreground">{service}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Poți schimba orice alegere în formular. Nu am trimis nimic automat.</p>
              </div>
            )}
            <h2 id="contact-form-title" tabIndex={-1} className="scroll-mt-28 font-display mt-4 mb-9 text-3xl font-semibold tracking-tight md:text-4xl">Povestește-ne despre eveniment.</h2>
            <ClientOnly fallback={
              <div aria-label="Alternative de contact fără JavaScript" className="flex min-h-[250px] flex-col justify-center gap-3 text-muted-foreground">
                <p>Formularul interactiv se afișează după activarea JavaScript.</p>
                <p className="text-sm">Dacă nu apare, poți cere oferta direct, fără formular:</p>
                <a className="w-fit underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={whatsappUrl(defaultWhatsappText)} target="_blank" rel="noopener noreferrer">Deschide WhatsApp pentru ofertă</a>
                <a className="w-fit underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={`mailto:${business.email}?subject=${encodeURIComponent("Cerere de ofertă Green Sound Music")}`}>Trimite un email pentru ofertă</a>
                <a className="w-fit underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={business.phoneHref}>Sună pentru detalii</a>
              </div>
            }>
              <QuoteForm key={`${event ?? ""}|${date ?? ""}|${location ?? ""}|${selectedServices.join("|")}`}
                id="cerere-oferta" defaultEventType={event} defaultDate={date ?? ""}
                defaultLocation={location ?? ""} defaultServices={selectedServices} />
            </ClientOnly>
          </div>
        </div>
      </section>
    </>
  );
}

/** V298: original production-sheet composition; isolated to Contact, SSR-visible. */
const contactSheetCss = `
main .director-contact-intro.gs-contact-v298 {
  background: #101c16; color: #f4f0e6;
  padding: clamp(104px, 9vw, 156px) 0 clamp(30px, 4vw, 60px);
  border-bottom: 1px solid #617367;
}
main .director-contact-intro.gs-contact-v298::after { display: none; }
main .gs-contact-v298 > .container-site {
  display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(280px, .55fr);
  gap: clamp(24px, 5vw, 76px); align-items: end;
}
main .gs-contact-v298 .gs-contact-v298__heading { min-width: 0; }
main .gs-contact-v298 .crafted-index { color: #b9e7a8; }
main .gs-contact-v298 h1 {
  font-size: clamp(2.85rem, 5.3vw, 6.4rem); line-height: .98;
  letter-spacing: -.065em; margin: 18px 0 0; max-width: 14ch;
  font-weight: 650; text-wrap: balance;
}
main .gs-contact-v298 h1 em {
  display: block; font-family: var(--font-serif); color: #cce8ac;
  font-size: .98em; font-style: italic; font-weight: 400; letter-spacing: -.025em;
}
main .gs-contact-v298 p {
  color: #e0e7dc; max-width: 55ch; margin-top: 18px;
  font-size: clamp(.98rem, 1.2vw, 1.13rem); line-height: 1.55;
}
main .gs-contact-v298 .director-contact-signal {
  display: grid; grid-template-columns: minmax(0,1fr); align-items: stretch;
  gap: 20px; border-top: 0; border-left: 1px solid #617367;
  padding: 0 0 0 24px; margin: 0; max-width: none;
}
main .gs-contact-v298 .director-contact-signal__steps {
  display: grid; grid-template-columns: minmax(0,1fr); gap: 0;
}
main .gs-contact-v298 .director-contact-signal__steps li {
  display: grid; grid-template-columns: 25px minmax(0,1fr); gap: 14px;
  align-items: center; padding: 12px 0; border: 0; border-bottom: 1px solid #52645a;
}
main .gs-contact-v298 .gs-contact-v298__icon { width: 22px; height: 22px; color: #cce8ac; stroke-width: 1.5; }
main .gs-contact-v298 .director-contact-signal__steps span { color: #b9e7a8; font-size: .68rem; letter-spacing: .1em; }
main .gs-contact-v298 .director-contact-signal__steps strong { color: #f4f0e6; font-size: .95rem; line-height: 1.3; margin-top: 4px; }
main .gs-contact-v298 .director-contact-signal__action {
  width: 100%; min-width: 0; min-height: 54px; background: #d6f3a9; color: #101c16;
  font-size: .95rem; font-weight: 750; border-radius: 2px; padding: 14px 18px;
}
main .gs-contact-v298 .director-contact-signal__action svg { transition: transform .22s ease; }
main .gs-contact-v298 .director-contact-signal__action:hover { background: #effbd6; }
main .gs-contact-v298 .director-contact-signal__action:focus-visible { outline: 3px solid #f4f0e6; outline-offset: 4px; }
main .gs-contact-v298-flow { padding-top: clamp(32px, 5vw, 72px); }
main .gs-contact-v298-flow .director-contact-brief-layout { gap: clamp(32px,5vw,72px); }
main .gs-contact-v298-flow .director-contact-quote { border-top: 3px solid #b9e7a8; box-shadow: none; }
main .gs-contact-v298-flow .gs-contact-v298__direct a { min-height: 44px; overflow-wrap: anywhere; }
main .gs-contact-v298-flow .gs-contact-v298__direct a svg { flex-shrink: 0; }
@media (hover:hover) and (pointer:fine) {
  main .gs-contact-v298 .director-contact-signal__action:hover svg { transform: translate(3px,-3px); }
}
@media (max-width: 930px) {
  main .gs-contact-v298 > .container-site { grid-template-columns: minmax(0,1fr); gap: 22px; }
  main .gs-contact-v298 h1 { max-width: 18ch; }
  main .gs-contact-v298 .director-contact-signal { border-left: 0; padding: 0; gap: 14px; }
  main .gs-contact-v298 .director-contact-signal__steps { grid-template-columns: repeat(3,minmax(0,1fr)); gap: 12px; }
  main .gs-contact-v298 .director-contact-signal__steps li { grid-template-columns: minmax(0,1fr); align-content: start; gap: 6px; padding: 8px 0; }
  main .gs-contact-v298 .director-contact-signal__steps strong { font-size: .83rem; }
}
@media (max-width: 680px) {
  main .director-contact-intro.gs-contact-v298 { padding: 100px 0 28px; }
  main .gs-contact-v298 h1 { font-size: clamp(2.65rem, 10vw, 4rem); }
  main .gs-contact-v298 .director-contact-signal__steps { gap: 9px; }
  main .gs-contact-v298 .director-contact-signal__steps span { font-size: .59rem; letter-spacing: .015em; }
  main .gs-contact-v298 .director-contact-signal__steps strong { font-size: .82rem; }
  main .gs-contact-v298-flow .director-contact-brief-layout { display: flex; flex-direction: column; }
  main .gs-contact-v298-flow .director-contact-quote { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  main .gs-contact-v298 .director-contact-signal__action,
  main .gs-contact-v298 .director-contact-signal__action svg { transition: none; transform: none; }
}
html[data-gs-performance="lite"] main .gs-contact-v298 .director-contact-signal__action,
html[data-gs-performance="lite"] main .gs-contact-v298 .director-contact-signal__action svg { transition: none; transform: none; }
`;
