import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { events, getService, type ServiceSlug } from "@/data/site";
import { serviceCompanions, uniqueServiceGallery } from "@/lib/service-discovery";
import { pageHead, breadcrumbLd, serviceLd, faqLd } from "@/lib/seo";
import { FaqList, PageHero, QuoteSection, SectionHeading } from "./blocks";
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
  const related = serviceCompanions(slug);
  const { side: sidebarGallery, after: additionalGallery } = uniqueServiceGallery(s);
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
              : sidebarGallery.map((img) => (
                  <img key={img.src} src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" decoding="async" data-service-gallery="sidebar" className="w-full rounded-2xl object-cover shadow-card" />
                ))}
          </div>
        </div>
      </section>

      {additionalGallery.length > 0 && (
        <section aria-label="Alte fotografii din activitatea Green Sound Music" className="gs-service-photo-journal">
          <div className="container-site">
            <div className="gs-service-photo-journal__heading">
              <span>GREEN SOUND / REAL MOMENTS</span>
              <h2>Din culisele <em>evenimentelor.</em></h2>
            </div>
            <div className="gs-service-photo-journal__grid">
              {additionalGallery.map((img) => (
                <figure key={img.src}>
                  <img src={img.src} alt={img.alt} width={img.w} height={img.h}
                    loading="lazy" decoding="async" data-service-gallery="additional" />
                  <figcaption>{img.alt}</figcaption>
                </figure>
              ))}
            </div>
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

      <section className="gs-service-relations section border-t border-border"
        aria-labelledby="gs-service-relations-title">
        <div className="container-site">
          <div className="gs-service-relations__heading">
            <div>
              <span className="gs-service-relations__eyebrow">GREEN SOUND / PRODUCȚIA COMPLETĂ</span>
              <h2 id="gs-service-relations-title">Pune împreună <em>momentele.</em></h2>
            </div>
            <p>Fiecare eveniment are propria combinație. Iată câteva servicii complementare, din oferta noastră reală.</p>
          </div>
          <div className="gs-service-relations__grid">
            {related.map(({ service: item, why }, index) => (
              <Link key={item.slug} to={`/${item.slug}`} className="gs-service-relations__card"
                data-related-service={item.slug}>
                <div className="gs-service-relations__photo">
                  <img src={item.image.src} alt="" width={item.image.w} height={item.image.h}
                    loading="lazy" decoding="async" />
                  <span className="gs-service-relations__number">0{index + 1} / 03</span>
                  <ArrowUpRight className="gs-service-relations__arrow size-5" aria-hidden />
                </div>
                <div className="gs-service-relations__body">
                  <span>SE POTRIVEȘTE CU</span>
                  <h3>{item.name}</h3>
                  <p>{why}</p>
                  <span className="gs-service-relations__detail">
                    Descoperă serviciul <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/servicii" className="gs-service-relations__all">
            Vezi toate serviciile <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
