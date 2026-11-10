import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { business, images } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { defaultWhatsappText, whatsappUrl } from "@/lib/quote";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({
    title: "Contact și cerere ofertă evenimente Pitești | Green Sound Music",
    description: "Spune-ne data, locația și tipul evenimentului. Contactează Green Sound Music Pitești pentru DJ, trupă live, lumini și sonorizare.",
    path: "/contact",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Contact", path: "/contact" }])],
  }),
  component: Page,
});

function Page() {
  return <>
    <PageHero
      eyebrow="Contact / Green Sound Music"
      title="Povestește-ne evenimentul tău."
      lead="O atmosferă bună începe cu o discuție. Spune-ne unde, când și ce ai în minte."
      image={images.dj}
      crumbs={[{ name: "Acasă", to: "/" }, { name: "Contact" }]}
    />
    <section className="section surface-paper">
      <div className="container-site grid gap-8 md:grid-cols-3">
        <a href={business.phoneHref} className="border-t border-paper-border pt-6"><Phone className="mb-5 size-6" aria-hidden="true" /><h2 className="font-display text-2xl font-semibold">Sună-ne</h2><p className="mt-2 text-paper-muted">{business.phoneDisplay}</p></a>
        <a href={whatsappUrl(defaultWhatsappText)} target="_blank" rel="noopener noreferrer" className="border-t border-paper-border pt-6"><MessageCircle className="mb-5 size-6" aria-hidden="true" /><h2 className="font-display text-2xl font-semibold">WhatsApp</h2><p className="mt-2 text-paper-muted">Scrie-ne despre eveniment</p></a>
        <a href={"mailto:" + business.email} className="border-t border-paper-border pt-6"><Mail className="mb-5 size-6" aria-hidden="true" /><h2 className="font-display text-2xl font-semibold">Email</h2><p className="mt-2 text-paper-muted break-all">{business.email}</p></a>
      </div>
    </section>
    <QuoteSection title="Hai să-i dăm formă." intro="Completează detaliile și alege WhatsApp sau email. Cererea este pregătită automat, iar tu apeși «Trimite» în aplicația deschisă pentru a o expedia." />
  </>;
}
