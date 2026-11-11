import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getService, type EventType } from "@/data/site";
import { EventBriefCard } from "@/components/atelier/EventBriefCard";
import { FaqList, PageHero, QuoteSection, SectionHeading } from "./blocks";
import { VideoLite } from "./VideoLite";
import type { eventTypeOptions } from "@/lib/quote";

export function EventPage({ event }: { event: EventType }) {
  return (
    <>
      <PageHero
        eyebrow={`Evenimente · ${event.name}`}
        title={event.h1}
        lead={event.lead}
        image={event.image}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Evenimente", to: "/evenimente" }, { name: event.name }]}
      />

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Firul evenimentului"
            title={<>Momentele care contează <span className="serif-accent text-primary">și cine le face să iasă bine</span></>}
          />
          <ol className="mt-14 border-t border-border">
            {event.moments.map((m, i) => {
              const svc = getService(m.service);
              return (
                <li key={m.title} className="grid gap-4 border-b border-border py-8 md:grid-cols-[6rem_1fr_1fr_auto] md:items-center md:gap-8">
                  <span className="serif-accent text-4xl text-primary">0{i + 1}</span>
                  <h3 className="font-display text-2xl font-semibold">{m.title}</h3>
                  <p className="text-muted-foreground">{m.text}</p>
                  <Link to={`/${svc.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
                    {svc.name} <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section surface-paper">
        <div className="container-site">
          <SectionHeading eyebrow="Servicii recomandate" title={`Ce rezervă de obicei clienții pentru ${event.name.toLowerCase()}`} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {event.recommended.map((r) => {
              const svc = getService(r.slug);
              return (
                <li key={r.slug}>
                  <Link
                    to={`/${svc.slug}`}
                    className="group flex h-full items-center gap-6 rounded-2xl border border-paper-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-paper-foreground/40"
                  >
                    <img src={svc.image.src} alt="" width={svc.image.w} height={svc.image.h} loading="lazy" className="size-20 shrink-0 rounded-xl object-cover md:size-24" />
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold">{svc.name}</h3>
                      <p className="mt-1 text-sm text-paper-muted">{r.why}</p>
                    </div>
                    <ArrowUpRight className="size-5 shrink-0 text-paper-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <EventBriefCard event={event} />

      {event.videos.length > 0 && (
        <section className="section">
          <div className="container-site">
            <SectionHeading eyebrow="Din evenimentele noastre" title="Vezi cum arată pe viu" />
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {event.videos.map((v) => <VideoLite key={v.id} video={v} />)}
            </div>
          </div>
        </section>
      )}

      {event.faqs.length > 0 && (
        <section className="section border-t border-border">
          <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow="Întrebări frecvente" title={`Despre ${event.name.toLowerCase()}`} />
            <FaqList faqs={event.faqs} />
          </div>
        </section>
      )}

      <QuoteSection
        title={`Organizezi ${event.formLabel === "Nuntă" ? "o nuntă" : event.formLabel === "Botez" ? "un botez" : event.formLabel.toLowerCase().startsWith("eveniment") ? "un eveniment corporate" : event.formLabel === "Concert / festival" ? "un concert sau festival" : "o petrecere"}? Spune-ne data.`}
        defaultEventType={event.formLabel as (typeof eventTypeOptions)[number]}
      />
    </>
  );
}
