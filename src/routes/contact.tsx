import { ClientOnly, createFileRoute, useHydrated } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { QuoteForm } from "@/components/site/QuoteForm";
import { business, services as serviceCatalogue } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { eventTypeOptions } from "@/lib/quote";

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
function validateBrief(search: Record<string, unknown>): BriefQuery {
  const brief: BriefQuery = {};
  const eventValue = search["event"];
  const dateValue = search["date"];
  const locationValue = search["location"];
  const serviceValue = search["services"];
  if (typeof eventValue === "string" && allowedTypes.includes(eventValue)) {
    brief.event = eventValue as EventOption;
  }
  if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
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
    <>
      <section className="director-contact-intro" aria-labelledby="director-contact-title">
        <div className="container-site">
          <span className="crafted-index">GREEN SOUND / CERERE DE OFERTĂ</span>
          <h1 id="director-contact-title">Spune-ne povestea. <em>Noi aducem atmosfera.</em></h1>
          <p>
            {fromBrief
              ? "Am precompletat opțiunile alese mai devreme. Verifică serviciile, completează datele de contact și pregătește mesajul pentru WhatsApp sau email."
              : "Spune-ne ce eveniment pregătești, data și locul. Împreună alegem muzica, sunetul, luminile și detaliile care fac atmosfera."}
          </p>
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
            <h2 id="contact-form-title" className="font-display mt-4 mb-9 text-3xl font-semibold tracking-tight md:text-4xl">Povestește-ne despre eveniment.</h2>
            <ClientOnly fallback={
              <div role="status" className="flex min-h-[250px] flex-col justify-center gap-3 text-muted-foreground">
                <p>Pregătim formularul pentru evenimentul tău…</p>
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
