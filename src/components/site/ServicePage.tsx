import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { events, getService, services, type ServiceSlug } from "@/data/site";
import { pageHead, breadcrumbLd, serviceLd, faqLd } from "@/lib/seo";
import { FaqList, LinkCard, PageHero, QuoteSection, SectionHeading } from "./blocks";
import { VideoLite } from "./VideoLite";
import type { eventTypeOptions } from "@/lib/quote";

export function serviceHead(slug: ServiceSlug) {
  const s = getService(slug);
  const path = `/${s.slug}`;
  return pageHead({
    title: s.seoTitle,
    description: s.seoDescription,
    image: s.image,
    path,
    jsonLd: [
      serviceLd(s.name, s.seoDescription, path),
      breadcrumbLd([
        { name: "Acasă", path: "/" },
        { name: "Servicii", path: "/servicii" },
        { name: s.name, path },
      ]),
      ...(s.faqs.length ? [faqLd(s.faqs)] : []),
    ],
  });
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const s = getService(slug);
  const related = services.filter((x) => x.slug !== slug).slice(0, 3);
  const fitEvents = events.filter((e) => s.events.includes(e.slug));
  const defaultEvent: (typeof eventTypeOptions)[number] | undefined =
    slug === "studio-inregistrari" ? "Studio înregistrări" : slug === "ursitoare-botez" ? "Botez" : undefined;

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.h1}
        lead={s.lead}
        image={s.image}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Servicii", to: "/servicii" }, { name: s.name }]}
      />

      <section aria-label="Pe scurt" className="border-y border-border">
        <div className="container-site grid md:grid-cols-3">
          {s.highlights.map((h, i) => (
            <div key={h.title} className={`py-10 md:px-8 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : "md:pl-0"}`}>
              <Check className="size-5 text-primary" aria-hidden />
              <h2 className="mt-4 font-display text-xl font-semibold">{h.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-site grid gap-16 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-16">
            {s.sections.map((sec) => (
              <article key={sec.title}>
                <h2 className="display-md">{sec.title}</h2>
                <div className="prose-site mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                  {sec.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                </div>
                {sec.list && (
                  <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {sec.list.map((li) => (
                      <li key={li} className="flex gap-3 border-b border-border pb-3 text-foreground/85">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
            {s.external && (
              <div>
                <h2 className="display-md">Urmărește {s.name.split(" —")[0]}</h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {s.external.map((e) => (
                    <li key={e.href}>
                      <a href={e.href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-border px-5 py-2.5 text-sm hover:border-primary hover:text-primary">
                        {e.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {s.videos.length > 0
              ? s.videos.slice(0, 2).map((v) => <VideoLite key={v.id} video={v} />)
              : s.gallery?.slice(0, 2).map((img) => (
                  <img key={img.src} src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" decoding="async" className="w-full rounded-2xl object-cover shadow-card" />
                ))}
          </div>
        </div>
      </section>

      {s.gallery && s.gallery.length > 2 && (
        <section aria-label="Galerie foto" className="pb-24">
          <div className="container-site grid gap-4 sm:grid-cols-3">
            {s.gallery.map((img) => (
              <img key={img.src} src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl object-cover" />
            ))}
          </div>
        </section>
      )}

      {s.videos.length > 2 && (
        <section aria-label="Mai multe producții" className="pb-24">
          <div className="container-site grid gap-8 md:grid-cols-3">
            {s.videos.slice(2).map((v) => <VideoLite key={v.id} video={v} />)}
          </div>
        </section>
      )}

      {fitEvents.length > 0 && (
        <section className="section surface-paper">
          <div className="container-site">
            <SectionHeading eyebrow="Potrivit pentru" title={<>Unde se potrivește <span className="serif-accent">{s.name.split(",")[0]!.toLowerCase()}</span></>} />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-paper-border bg-paper-border sm:grid-cols-2 lg:grid-cols-5">
              {fitEvents.map((e) => (
                <li key={e.slug} className="bg-paper">
                  <Link to="/evenimente/$slug" params={{ slug: e.slug }} className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-paper-border/40">
                    <span className="font-display text-xl font-semibold">{e.name}</span>
                    <span className="inline-flex items-center gap-2 text-sm text-paper-muted">
                      Vezi ce include <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {s.faqs.length > 0 && (
        <section className="section">
          <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow="Întrebări frecvente" title="Ce ne întreabă clienții" />
            <FaqList faqs={s.faqs} />
          </div>
        </section>
      )}

      <QuoteSection
        title={`Vrei ${s.name.split(" —")[0]!.toLowerCase()} la evenimentul tău?`}
        defaultServices={[s.formLabel]}
        defaultEventType={defaultEvent}
      />

      <section className="section border-t border-border">
        <div className="container-site">
          <SectionHeading eyebrow="Se combină bine cu" title="Alte servicii" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <LinkCard key={r.slug} to={`/${r.slug}`} title={r.name} text={r.short} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
