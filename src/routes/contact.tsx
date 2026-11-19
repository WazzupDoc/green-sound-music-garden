import { ClientOnly, createFileRoute, useHydrated } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
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
    const safeLocation = locationValue.replace(/[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
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
      <section className="director-contact-intro" aria-labelledby="director-contact-title">
        <div className="container-site">
          <span className="crafted-index">GREEN SOUND / CERERE DE OFERTĂ</span>
          <h1 id="director-contact-title">Pregătești un eveniment? <em>Hai să discutăm detaliile.</em></h1>
          <p>
            {fromBrief
              ? "Am precompletat opțiunile alese mai devreme. Verifică serviciile, completează datele de contact și pregătește mesajul pentru WhatsApp sau email."
              : "Spune-ne tipul evenimentului, data, locația și serviciile dorite. Pregătești un mesaj pe care îl poți trimite tu prin WhatsApp sau email."}
          </p>
          <div className="director-contact-signal" aria-label="Etapele cererii de ofertă">
            <ol className="director-contact-signal__steps">
              <li><span>01 / INPUT</span><strong>Spui ce pregătești</strong></li>
              <li><span>02 / REVIEW</span><strong>Verifici mesajul</strong></li>
              <li><span>03 / DESCHIDERE</span><strong>Trimiți tu prin WhatsApp sau email</strong></li>
            </ol>
            <a id="contact-start-brief" href="#contact-form-title" className="director-contact-signal__action" onClick={() => {
              // Keep the native fragment navigation while moving keyboard focus to the form heading.
              document.getElementById("contact-form-title")?.focus({ preventScroll: true });
            }}>
              Începe cererea <ArrowUpRight className="size-5" aria-hidden />
            </a>
            <noscript>
              <style>{`#contact-start-brief { display: none !important; }`}</style>
              <a className="director-contact-signal__action" href={business.phoneHref}>Sună pentru ofertă <ArrowUpRight className="size-5" aria-hidden /></a>
            </noscript>
          </div>
        </div>
      </section>
      <section className="section director-contact-brief-flow" aria-labelledby="contact-form-title">
        <div className="container-site grid items-start gap-14 lg:grid-cols-[.72fr_1.28fr] xl:gap-24 director-contact-brief-layout">
          <aside>
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
              <div className="mb-7 mt-5 border-l-2 border-primary bg-primary/[0.06] px-4 py-4" aria-label="Selecția preluată din paginile de evenimente și servicii">
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
              <div role="status" className="flex min-h-[250px] flex-col justify-center gap-3 text-muted-foreground">
                <p>Pregătim formularul pentru evenimentul tău…</p>
                <noscript><p className="text-sm">Formularul interactiv necesită JavaScript. Pentru o cerere fără JavaScript, folosește telefonul, WhatsApp sau emailul afișate în această pagină; mesajul nu se trimite automat.</p></noscript>
                <p className="text-sm">Poți folosi și telefonul sau WhatsApp din zona de contact.</p>
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
