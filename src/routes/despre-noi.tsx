import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { business, images, people } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/despre-noi")({
  head: () => pageHead({
    title: "Despre Green Sound Music — echipă și experiență din 2008, Pitești",
    description: "Cunoaște Green Sound Music: echipă de evenimente din Pitești, activă din 2008, cu servicii muzicale și producție tehnică.",
    path: "/despre-noi",
    jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Despre noi", path: "/despre-noi" }])],
  }),
  component: Page,
});

function Page() {
  return <>
    <PageHero
      eyebrow="Despre / Oamenii din spatele scenei"
      title="Muzica, luminile și oamenii din spatele fiecărui eveniment."
      lead="Green Sound Music a pornit în 2008 din pasiunea pentru muzică. Astăzi, îmbinăm experiența artiștilor cu echipamentele și organizarea tehnică."
      image={images.concert}
      crumbs={[{ name: "Acasă", to: "/" }, { name: "Despre noi" }]}
    />
    <section className="surface-paper section">
      <div className="container-site grid items-start gap-16 lg:grid-cols-[.9fr_1fr]">
        <div><p className="eyebrow">Din {business.founded}</p><h2 className="mt-7 font-display text-4xl font-semibold tracking-tight md:text-6xl">Am pornit cu muzica. Am construit experiențe complete.</h2></div>
        <div className="space-y-6 text-lg leading-relaxed text-paper-muted">
          <p>Ne ocupăm de concerte, nunți, botezuri, evenimente corporate și petreceri private. DJ, MC, trupă live, sonorizare, lumini, ecrane LED și efecte speciale pot lucra împreună într-un plan coerent.</p>
          <p>Pe lângă evenimente, studioul Green Sound Music oferă servicii de înregistrare și producție muzicală. Ne place să înțelegem fiecare proiect înainte să propunem soluția.</p>
          <Link to="/servicii" className="inline-flex items-center gap-3 border-b border-paper-foreground pb-2 font-semibold text-paper-foreground">Descoperă serviciile <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container-site">
        <p className="eyebrow">Echipa</p>
        <h2 className="display-lg mt-5">Oamenii fac diferența.</h2>
        <ul className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((person) => <li key={person.name} className="border-t border-border py-6"><h3 className="font-display text-2xl font-semibold">{person.name}</h3><p className="mt-2 text-sm text-muted-foreground">{person.role}</p></li>)}
        </ul>
        <figure className="mt-14"><img src={images.dj.src} alt={images.dj.alt} width={images.dj.w} height={images.dj.h} loading="lazy" className="max-h-[640px] w-full object-cover object-[50%_40%]" /><figcaption className="mt-4 text-sm text-muted-foreground">Green Sound Music — oameni și muzică.</figcaption></figure>
      </div>
    </section>
    <QuoteSection title="Ne cunoaștem la următorul eveniment?" />
  </>;
}
