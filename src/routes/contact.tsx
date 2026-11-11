import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { QuoteForm } from "@/components/site/QuoteForm";
import { business, images } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { PageHero } from "@/components/site/blocks";
import { eventTypeOptions } from "@/lib/quote";

const allowedTypes: readonly string[] = eventTypeOptions;
type EventOption = (typeof eventTypeOptions)[number];

/** Whitelisted, bounded query parameters; never blindly reflect URL data. */
type BriefQuery = { event?: EventOption; date?: string; location?: string };

/**
 * All query fields are optional, so ordinary `<Link to="/contact" />`
 * calls stay valid. Only trusted allowed enum values and bounded text survive.
 */
function validateBrief(search: Record<string, unknown>): BriefQuery {
  const brief: BriefQuery = {};
  const eventValue = search["event"];
  const dateValue = search["date"];
  const locationValue = search["location"];
  if (typeof eventValue === "string" && allowedTypes.includes(eventValue)) {
    brief.event = eventValue as EventOption;
  }
  if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    brief.date = dateValue;
  }
  if (typeof locationValue === "string" && locationValue.trim()) {
    brief.location = locationValue.trim().slice(0, 120);
  }
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
  const { event, date, location } = Route.useSearch();
  const fromBrief = Boolean(event || date || location);
  return (
    <>
      {fromBrief ? (
        <section className="director-contact-intro" aria-labelledby="director-contact-title">
          <div className="container-site">
            <span className="crafted-index">GREEN SOUND / CERERE DE OFERTĂ</span>
            <h1 id="director-contact-title">Avem începutul. <em>Completăm detaliile.</em></h1>
            <p>Am păstrat evenimentul, data și locația alese mai devreme. Completează datele de contact și selectează serviciile care te interesează.</p>
          </div>
        </section>
      ) : (
        <PageHero eyebrow="CONTACT / HAI SĂ VORBIM" title="Spune-ne ce ai în minte. De atmosferă ne ocupăm noi."
          lead="Alegem muzica, sunetul și luminile în funcție de eveniment, spațiu și oamenii pentru care pregătești totul."
          image={images.dj} crumbs={[{ name: "Acasă", to: "/" }, { name: "Contact" }]} />
      )}
      <section className={`section ${fromBrief ? "director-contact-brief-flow" : ""}`} aria-labelledby="contact-form-title">
        <div className={`container-site grid items-start gap-14 lg:grid-cols-[.72fr_1.28fr] xl:gap-24 ${fromBrief ? "director-contact-brief-layout" : ""}`}>
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
            <QuoteForm key={`${event ?? ""}|${date ?? ""}|${location ?? ""}`} id="cerere-oferta"
              defaultEventType={event} defaultDate={date ?? ""} defaultLocation={location ?? ""} />
          </div>
        </div>
      </section>
    </>
  );
}
