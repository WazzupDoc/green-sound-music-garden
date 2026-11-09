import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { events, images } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/evenimente/")({
  head: () =>
    pageHead({
      title: "Evenimente: nunți, botezuri, corporate, festivaluri | Green Sound Music",
      description:
        "Alege tipul evenimentului și vezi ce servicii se potrivesc: nunți, botezuri, evenimente corporate, concerte, festivaluri și petreceri private în Pitești.",
      path: "/evenimente",
      jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Evenimente", path: "/evenimente" }])],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Evenimente"
        title="Ce sărbătorești? Pornim de la eveniment, nu de la listă de prețuri."
        lead="Fiecare tip de eveniment are momentele lui. Alege-l pe al tău și vezi ce servicii îl fac să curgă."
        image={images.concert}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Evenimente" }]}
      />
      <section className="section pt-8">
        <div className="container-site">
          <ul className="border-t border-border">
            {events.map((e) => (
              <li key={e.slug}>
                <Link
                  to="/evenimente/$slug"
                  params={{ slug: e.slug }}
                  className="group grid items-center gap-6 border-b border-border py-8 md:grid-cols-[12rem_1fr_auto] md:gap-10"
                >
                  <img src={e.image.src} alt="" width={e.image.w} height={e.image.h} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover md:w-48" />
                  <div>
                    <h2 className="display-md transition-colors group-hover:text-primary">{e.name}</h2>
                    <p className="mt-2 max-w-xl text-muted-foreground">{e.short}</p>
                  </div>
                  <ArrowUpRight className="hidden size-7 text-foreground/50 transition-all group-hover:text-primary md:block" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
