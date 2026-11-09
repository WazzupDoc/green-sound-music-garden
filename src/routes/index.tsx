import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList, ProcessSteps, QuoteSection, SectionHeading } from "@/components/site/blocks";
import { VideoLite } from "@/components/site/VideoLite";
import { business, events, generalFaqs, images, people, services, videos } from "@/data/site";
import { faqLd, localBusinessLd, pageHead } from "@/lib/seo";

const yearsActive = new Date().getFullYear() - business.founded;

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Green Sound Music Pitești — DJ, trupă live, sonorizare și lumini pentru evenimente",
      description:
        "Din 2008, în Pitești: DJ & MC, trupă live, sonorizare, lumini, ecrane LED, fum greu, hostess, ursitoare și studio de înregistrări. Cere o ofertă pentru evenimentul tău.",
      path: "/",
      jsonLd: [localBusinessLd(), faqLd(generalFaqs)],
    }),
  component: Index,
});

const marquee = ["DJ & MC", "Trupă live", "Sonorizare", "Lumini", "Ecrane LED", "Fum greu", "Hostess", "Ursitoare", "Studio", "Start Veselia"];

function Index() {
  const featured = services.slice(0, 5);
  const more = services.slice(5);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={images.scena.src}
            alt={images.scena.alt}
            width={images.scena.w}
            height={images.scena.h}
            fetchPriority="high"
            className="size-full object-cover object-[50%_35%] md:object-center"
          />
          <div className="hero-fade absolute inset-0" />
          <div className="side-fade absolute inset-0 opacity-90" />
        </div>
        <div className="container-site pb-16 pt-36 md:pb-24">
          <p className="eyebrow animate-rise">
            <span className="equalizer" aria-hidden><span /><span /><span /></span>
            Pitești · evenimente din {business.founded}
          </p>
          <h1 className="display-xl mt-6 max-w-5xl animate-rise [animation-delay:80ms]">
            Muzica, sunetul și luminile evenimentului tău.{" "}
            <span className="serif-accent font-normal text-primary">De la aceeași echipă.</span>
          </h1>
          <p className="lead mt-7 max-w-xl text-foreground/80 animate-rise [animation-delay:160ms]">
            DJ & MC, trupă live, sonorizare, lumini, ecrane LED și efecte speciale pentru nunți, botezuri, evenimente corporate și festivaluri.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-rise [animation-delay:240ms]">
            <Button asChild variant="hero" size="xl">
              <a href="#cerere-oferta">Cere ofertă pentru data ta</a>
            </Button>
            <Button asChild variant="stage" size="xl">
              <a href={business.phoneHref}>
                <Phone aria-hidden /> {business.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div aria-hidden className="overflow-hidden border-y border-border bg-ink py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-semibold text-foreground/70">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m}
              <span className="size-2 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>

      {/* EVENTS CHOOSER */}
      <section aria-labelledby="ev-titlu" className="section">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Ce sărbătorești?"
              title={<span id="ev-titlu">Alege evenimentul. <span className="serif-accent font-normal text-primary">Îți arătăm ce se potrivește.</span></span>}
            />
            <Link to="/evenimente" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Toate evenimentele <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-14 grid gap-4 md:grid-cols-6">
            {events.map((e, i) => (
              <li key={e.slug} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
                <Link
                  to="/evenimente/$slug"
                  params={{ slug: e.slug }}
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-border p-7 md:h-96"
                >
                  <img src={e.image.src} alt="" width={e.image.w} height={e.image.h} loading="lazy" decoding="async" className="absolute inset-0 -z-10 size-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80" />
                  <span className="hero-fade absolute inset-0 -z-10" />
                  <span className="flex items-end justify-between gap-4">
                    <span>
                      <span className="block font-display text-3xl font-bold">{e.name}</span>
                      <span className="mt-2 block max-w-sm text-sm text-foreground/75">{e.short}</span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-foreground/30 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="size-5" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted-foreground">
            Nu știi încă de ce ai nevoie?{" "}
            <a href="#cerere-oferta" className="font-semibold text-foreground underline decoration-primary underline-offset-4">
              Spune-ne data și locația — îți propunem noi combinația.
            </a>
          </p>
        </div>
      </section>

      {/* SERVICES — editorial index */}
      <section aria-labelledby="serv-titlu" className="section surface-paper">
        <div className="container-site">
          <SectionHeading
            eyebrow="Servicii"
            title={<span id="serv-titlu">Tot ce se aude și se vede <span className="serif-accent font-normal">la un eveniment.</span></span>}
            intro="Fiecare serviciu se poate rezerva separat. Împreună, înseamnă un singur interlocutor pentru tot ce ține de muzică și tehnică."
          />
          <ol className="mt-16 border-t border-paper-border">
            {featured.map((s, i) => (
              <li key={s.slug}>
                <Link
                  to={`/${s.slug}`}
                  className="group grid items-center gap-5 border-b border-paper-border py-8 md:grid-cols-[5rem_1.1fr_1fr_8rem] md:gap-10"
                >
                  <span className="serif-accent text-3xl text-paper-muted">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
                    {s.name}
                  </span>
                  <span className="text-paper-muted">{s.short}</span>
                  <span className="relative hidden h-20 overflow-hidden rounded-lg md:block">
                    <img src={s.image.src} alt="" width={s.image.w} height={s.image.h} loading="lazy" decoding="async" className="size-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            {more.map((s) => (
              <Link key={s.slug} to={`/${s.slug}`} className="rounded-full border border-paper-foreground/25 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-paper-foreground hover:text-paper">
                {s.name}
              </Link>
            ))}
            <Link to="/servicii" className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-semibold">
              Toate serviciile <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* SHOWREEL */}
      <section aria-labelledby="video-titlu" className="section surface-stage">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Video"
              title={<span id="video-titlu">Vezi și auzi <span className="serif-accent font-normal text-primary">înainte să rezervi.</span></span>}
              intro="Filmări reale de la evenimentele și producțiile noastre. Videoclipurile pornesc doar când apeși play."
            />
            <Link to="/portofoliu" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Tot portofoliul <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <VideoLite video={videos.nuntaRamada} />
            <div className="grid gap-8">
              <VideoLite video={videos.showLumini} />
              <VideoLite video={videos.fumGreu} />
            </div>
          </div>
        </div>
      </section>

      {/* WHY — facts only */}
      <section aria-labelledby="de-ce-titlu" className="section border-t border-border">
        <div className="container-site grid gap-16 lg:grid-cols-2">
          <div className="relative">
            <img src={images.dj.src} alt={images.dj.alt} width={images.dj.w} height={images.dj.h} loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card" />
            <div className="absolute -bottom-6 right-6 rounded-2xl bg-primary p-6 text-primary-foreground md:-right-6">
              <p className="font-display text-5xl font-bold leading-none">{yearsActive}+</p>
              <p className="mt-1 text-sm font-medium">ani de evenimente, din {business.founded}</p>
            </div>
          </div>
          <div className="lg:pt-10">
            <SectionHeading
              eyebrow="De ce Green Sound"
              title={<span id="de-ce-titlu">Mai puțini furnizori de coordonat. <span className="serif-accent font-normal text-primary">Mai multă liniște în ziua evenimentului.</span></span>}
            />
            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
              {[
                { t: "O singură echipă", d: "Artiști, sunet, lumini și efecte de la același furnizor, cu un singur plan pentru seară." },
                { t: "Tehnică proprie", d: "Sisteme audio TW Audio, DYNACORD, FBT, lumini LS și moving head-uri BEAM și WASH." },
                { t: "Sunet mixat live", d: "La trupa live, un inginer de sunet echilibrează mixul pe tot parcursul evenimentului." },
                { t: "Muzicieni full-time", d: "Soliști și instrumentiști cu experiență în emisiuni TV, radio, concursuri și turnee." },
              ].map((x) => (
                <div key={x.t} className="border-t border-border pt-5">
                  <dt className="font-display text-xl font-semibold">{x.t}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section aria-labelledby="echipa-titlu" className="section pt-12">
        <div className="container-site">
          <p className="eyebrow">Oamenii din spatele scenei</p>
          <h2 id="echipa-titlu" className="sr-only">Echipa</h2>
          <ul className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {people.map((p) => (
              <li key={p.name} className="border-b border-border py-7 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <p className="font-display text-2xl font-bold">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
              </li>
            ))}
          </ul>
          <Link to="/despre-noi" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Povestea Green Sound Music <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* PROCESS */}
      <section aria-labelledby="proces-titlu" className="section surface-paper">
        <div className="container-site">
          <SectionHeading eyebrow="Cum lucrăm" title={<span id="proces-titlu">De la primul mesaj <span className="serif-accent font-normal">la ultimul dans.</span></span>} />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-titlu" className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Întrebări frecvente" title={<span id="faq-titlu">Răspunsuri rapide</span>} />
          <FaqList faqs={generalFaqs} />
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
