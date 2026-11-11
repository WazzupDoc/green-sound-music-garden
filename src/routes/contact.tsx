import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { QuoteForm } from "@/components/site/QuoteForm";
import { business, images } from "@/data/site";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { PageHero } from "@/components/site/blocks";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({
    title: "Contact Green Sound Music Pitești | Ofertă DJ, muzică, sunet și lumini",
    description: "Cere ofertă pentru nunți, botezuri, corporate și concerte. Contact Green Sound Music Pitești prin telefon, WhatsApp sau email. Muzică, sunet și lumini pentru evenimente.",
    path: "/contact",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Contact", path: "/contact" }])],
  }),
  component: Contact,
});
function Contact() {
  return (
    <>
      <PageHero eyebrow="CONTACT / HAI SĂ VORBIM" title="Spune-ne ce ai în minte. De atmosferă ne ocupăm noi."
        lead="Alegem muzica, sunetul și luminile în funcție de eveniment, spațiu și oamenii pentru care pregătești totul."
        image={images.dj} crumbs={[{ name: "Acasă", to: "/" }, { name: "Contact" }]} />
      <section className="section" aria-labelledby="contact-form-title">
        <div className="container-site grid items-start gap-14 lg:grid-cols-[.72fr_1.28fr] xl:gap-24">
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
          <div className="border border-border bg-[#121c15] p-5 sm:p-8 lg:p-11">
            <span className="crafted-index">02 / CERERE DE OFERTĂ</span>
            <h2 id="contact-form-title" className="font-display mt-4 mb-9 text-3xl font-semibold tracking-tight md:text-4xl">Povestește-ne despre eveniment.</h2>
            <QuoteForm id="cerere-oferta" />
          </div>
        </div>
      </section>
    </>
  );
}
