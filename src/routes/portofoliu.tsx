import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, QuoteSection } from "@/components/site/blocks";
import { VideoLite } from "@/components/site/VideoLite";
import { images, videos } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portofoliu")({
  head: () =>
    pageHead({
      title: "Portofoliu video și foto — nunți, show de lumini, studio | Green Sound Music",
      description:
        "Filmări și fotografii reale Green Sound Music: nunta de la Ramada Pitești, show de lumini, fum greu, producții de studio și apariția TV la Neatza.",
      path: "/portofoliu",
      jsonLd: [breadcrumbLd([{ name: "Acasă", path: "/" }, { name: "Portofoliu", path: "/portofoliu" }])],
    }),
  component: Page,
});

const filters = [
  { id: "toate", label: "Toate" },
  { id: "nunti", label: "Nunți" },
  { id: "dj-mc", label: "DJ & MC" },
  { id: "sonorizare", label: "Sunet & lumini" },
  { id: "fum-greu", label: "Fum greu" },
  { id: "trupa", label: "Trupă" },
  { id: "studio", label: "Studio" },
];

const photos = [images.scena, images.concert, images.dj, images.hostess, images.ursitoare2, images.copii];

function Page() {
  const [active, setActive] = useState("toate");
  const list = useMemo(
    () => Object.values(videos).filter((v) => active === "toate" || v.tags.includes(active)),
    [active],
  );

  return (
    <>
      <PageHero
        eyebrow="Portofoliu"
        title="Evenimente și producții reale, nu imagini de catalog"
        lead="Tot ce vezi aici a fost filmat sau fotografiat la evenimentele și în studioul Green Sound Music."
        image={images.concert}
        crumbs={[{ name: "Acasă", to: "/" }, { name: "Portofoliu" }]}
      />

      <section aria-labelledby="video-port" className="section pt-8">
        <div className="container-site">
          <h2 id="video-port" className="display-md">Video</h2>
          <div role="group" aria-label="Filtrează după tip" className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={active === f.id}
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active === f.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/80 hover:border-foreground/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {list.map((v) => <VideoLite key={v.id} video={v} />)}
          </div>
        </div>
      </section>

      <section aria-labelledby="foto-port" className="section border-t border-border">
        <div className="container-site">
          <h2 id="foto-port" className="display-md">Foto</h2>
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>img]:mb-5">
            {photos.map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" className="w-full break-inside-avoid rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      <QuoteSection title="Vrei un eveniment ca acestea?" />
    </>
  );
}
