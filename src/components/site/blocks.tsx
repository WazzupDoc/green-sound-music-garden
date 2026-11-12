import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { business, type ImageRef, process } from "@/data/site";
import { QuoteForm } from "./QuoteForm";
import type { eventTypeOptions } from "@/lib/quote";

export function Breadcrumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-foreground/70">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-2">
            {it.to ? (
              <Link to={it.to} className="link-underline hover:text-foreground">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">{it.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden className="text-foreground/40">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,title,lead,image,crumbs,children,transitionName,
}: {
  eyebrow:string;title:string;lead:string;image:ImageRef;
  crumbs:{name:string;to?:string}[];children?:ReactNode;transitionName?:string;
}) {
  return (
    <section className="atelier-inner-hero rs-inner-hero" aria-label={eyebrow}>
      <div className="container-site rs-inner-hero__layout">
        <div className="rs-inner-hero__copy">
          <Breadcrumbs items={crumbs} />
          <p className="rs-inner-hero__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="rs-inner-hero__lead">{lead}</p>
          <div className="rs-inner-hero__actions">{children ?? <HeroCtas />}</div>
        </div>
        <div className="rs-inner-hero__image">
          <img src={image.src} alt={image.alt} width={image.w} height={image.h}
            style={transitionName ? { viewTransitionName: transitionName } : undefined}
            fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  );
}

export function HeroCtas() {
  return (
    <>
      <Button asChild variant="hero" size="xl">
        <Link to="/contact">Cere ofertă pentru data ta</Link>
      </Button>
      <Button asChild variant="stage" size="xl">
        <a href={business.phoneHref}>
          <Phone aria-hidden /> {business.phoneDisplay}
        </a>
      </Button>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-lg mt-5">{title}</h2>
      {intro && <p className="lead mt-5 opacity-80">{intro}</p>}
    </div>
  );
}

export function FaqList({ faqs, tone = "stage" }: { faqs: { q: string; a: string }[]; tone?: "stage" | "paper" }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`f-${i}`} className={tone === "paper" ? "border-paper-border" : "border-border"}>
          <AccordionTrigger className="py-6 text-left font-display text-lg font-semibold hover:no-underline md:text-xl">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className={`pb-6 text-base leading-relaxed ${tone === "paper" ? "text-paper-muted" : "text-muted-foreground"}`}>
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-paper-border bg-paper-border md:grid-cols-4">
      {process.map((p, i) => (
        <li key={p.title} className="bg-paper p-7 md:p-8">
          <span className="serif-accent text-5xl text-paper-muted">0{i + 1}</span>
          <h3 className="mt-6 font-display text-xl font-semibold">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-paper-muted">{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function QuoteSection({
  title = "Spune-ne data. Restul îl construim împreună.",
  intro = "Completează detaliile și pregătește mesajul pentru WhatsApp sau email. Cererea nu se trimite automat.",
  defaultEventType,
  defaultServices,
}: {
  title?: string;
  intro?: string;
  defaultEventType?: (typeof eventTypeOptions)[number] | undefined;
  defaultServices?: string[] | undefined;
}) {
  return (
    <section aria-labelledby="oferta-titlu" className="section rs-quote-section scroll-mt-20">
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Cere ofertă</p>
          <h2 id="oferta-titlu" className="display-lg mt-5">{title}</h2>
          <p className="lead mt-6 text-foreground/75">{intro}</p>
          <dl className="mt-10 grid gap-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Telefon</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">
                <a href={business.phoneHref} className="link-underline">{business.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="mt-1 text-lg">
                <a href={`mailto:${business.email}`} className="link-underline">{business.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Sediu</dt>
              <dd className="mt-1 text-lg">{business.address.street}, {business.address.city}</dd>
            </div>
          </dl>
        </div>
        <div className="relative border border-border bg-card p-6 md:p-10">
          <ClientOnly fallback={<p role="status" className="py-14 text-sm text-muted-foreground">Pregătim formularul pentru evenimentul tău… Poți folosi și telefonul sau emailul din această secțiune.</p>}>
            <QuoteForm defaultEventType={defaultEventType} defaultServices={defaultServices} />
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}

export function LinkCard({ to, title, text, index }: { to: string; title: string; text: string; index?: number }) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
    >
      <div className="flex items-start justify-between gap-4">
        {index !== undefined && <span className="serif-accent text-3xl text-primary">0{index + 1}</span>}
        <ArrowUpRight className="ml-auto size-5 text-foreground/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </Link>
  );
}
