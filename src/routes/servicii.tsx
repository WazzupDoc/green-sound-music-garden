import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHero, QuoteSection } from "@/components/site/blocks";
import { images, services } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/servicii")({
  head: () =>
    pageHead({
      title: "Servicii pentru evenimente: DJ, trupă, sonorizare, lumini | Green Sound Music",
      description:
        "DJ & MC, trupă live, sonorizare, lumini, ecrane LED, fum greu, hostess, ursitoare, Start Veselia și studio de înregistrări — toate de la Green Sound Music, Pitești.",
      path: "/servicii",
      jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Servicii", path: "/servicii" }])],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Servicii"
        title="Tot ce ține de muzică și tehnică, de la o singură echipă"
        lead="Green Sound Music a pornit în 2008 cu organizarea de evenimente. Între timp, am adăugat producția muzicală, efectele speciale și spectacolele pentru copii. Rezervă un singur serviciu sau combină-le."
        image={images.scena}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Servicii" }]}
      />
      <section className="section pt-8">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <LinkCard key={s.slug} to={`/${s.slug}`} title={s.name} text={s.short} index={i} />
          ))}
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
