import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Clapperboard, Film, MapPin, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { images, videos, type EventSlug, type ImageRef, type Video } from "@/data/site";
import { VideoLite } from "@/components/site/VideoLite";

type Frame = {
  id: string; image: ImageRef; category: string; title: string; description: string;
  eventSlug: EventSlug; linkLabel: string;
};

/* Only proven first-party imagery from the company's event library. No fabricated clients or metrics. */
const frames: Frame[] = [
  { id: "dj", image: images.dj, category: "01 / DJ & MC", title: "Ritmul serii", description: "Muzică, prezentare și lumini pentru momente care aduc oamenii pe ring.", eventSlug: "nunti", linkLabel: "Evenimente de nuntă" },
  { id: "scena", image: images.scena, category: "02 / SCENOTEHNICĂ", title: "Scena se transformă", description: "Lumini și echipamente pentru producții și spectacole live.", eventSlug: "concerte-festivaluri", linkLabel: "Concerte și festivaluri" },
  { id: "concert", image: images.concert, category: "03 / LIVE EVENTS", title: "Energia publicului", description: "Atmosferă de concert, lumini și public la un eveniment real.", eventSlug: "concerte-festivaluri", linkLabel: "Producție de concerte" },
  { id: "ursitoare", image: images.ursitoare2, category: "04 / BOTEZURI", title: "Momente cu poveste", description: "Ursitoare și momente speciale dedicate celor mici.", eventSlug: "botezuri", linkLabel: "Evenimente de botez" },
  { id: "hostess", image: images.hostess, category: "05 / EVENT SERVICES", title: "Prima impresie", description: "Primirea invitaților, cu atenție la experiența de la intrare.", eventSlug: "evenimente-corporate", linkLabel: "Evenimente corporate" },
  { id: "copii", image: images.copii, category: "06 / START VESELIA", title: "Bucuria celor mici", description: "Personaje și animație pentru petreceri în care copiii sunt în centrul atenției.", eventSlug: "petreceri-private", linkLabel: "Petreceri private" },
];

export function PortfolioJournal() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const frame = activeIndex === null ? null : frames[activeIndex]!;
  const move = (difference: number) =>
    setActiveIndex((index) => index === null ? null : (index + difference + frames.length) % frames.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <section className="journal section" id="portfolio-photos" aria-labelledby="journal-title"
      data-hydrated={hydrated ? "true" : "false"}>
      <div className="container-site">
        <div className="journal__heading">
          <div>
            <span className="journal__index"><Camera className="size-4" aria-hidden /> 01 / IMAGE JOURNAL</span>
            <h2 id="journal-title">Momente reale. <em>Fără regie de catalog.</em></h2>
          </div>
          <p>Șase cadre din arhiva Green Sound Music. Deschide fiecare fotografie pentru a vedea detaliile, apoi descoperă serviciile din spatele atmosferei.</p>
        </div>

        <div className="journal__grid" aria-label="Galerie foto Green Sound Music">
          {frames.map((item, index) => (
            <button key={item.id} type="button"
              className={`journal__photo journal__photo--${index + 1}`}
              onClick={() => setActiveIndex(index)}
              data-cursor-label="VIEW FRAME"
              aria-label={`Deschide fotografia ${index + 1}: ${item.title}`}>
              <img src={item.image.src} alt={item.image.alt} width={item.image.w} height={item.image.h}
                loading="lazy" decoding="async" />
              <span className="journal__photo-shade" aria-hidden />
              <span className="journal__photo-copy">
                <span className="journal__photo-cat">{item.category}</span>
                <strong>{item.title}</strong>
              </span>
              <span className="journal__photo-open" aria-hidden><ArrowUpRight className="size-5" /></span>
            </button>
          ))}
        </div>
        <p className="journal__foot"><span>GREEN SOUND / REAL ARCHIVE</span><span>SELECTEAZĂ UN CADRU PENTRU A-L EXPLORA</span></p>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => { if (!open) setActiveIndex(null); }}>
        <DialogContent className="journal-dialog max-h-[95dvh] w-[min(96vw,1150px)] max-w-none overflow-y-auto rounded-none border-[#d1e8c3]/30 bg-[#0b140e] p-3 sm:p-5">
          <DialogTitle className="journal-dialog__title">{frame?.title ?? "Arhiva Green Sound"}</DialogTitle>
          <DialogDescription className="journal-dialog__description">
            {frame?.description ?? "Fotografie din arhiva Green Sound Music."} Folosește săgețile pentru a parcurge galeria.
          </DialogDescription>
          {frame && (
            <>
              <div className="journal-dialog__visual">
                <img key={frame.id} src={frame.image.src} alt={frame.image.alt}
                  width={frame.image.w} height={frame.image.h} decoding="async" />
                <span className="journal-dialog__counter">{String(activeIndex! + 1).padStart(2, "0")} / 06</span>
              </div>
              <div className="journal-dialog__nav">
                <button type="button" className="journal-dialog__arrow" onClick={() => move(-1)}
                  aria-label="Fotografia anterioară"><ArrowLeft className="size-5" aria-hidden /> Anterior</button>
                <div className="journal-dialog__meta">
                  <span>{frame.category}</span>
                  <Link to="/evenimente/$slug" params={{ slug: frame.eventSlug }}
                    onClick={() => setActiveIndex(null)}
                    className="journal-dialog__event">{frame.linkLabel} <ArrowUpRight className="size-4" aria-hidden /></Link>
                </div>
                <button type="button" className="journal-dialog__arrow" onClick={() => move(1)}
                  aria-label="Fotografia următoare">Următor <ArrowRight className="size-5" aria-hidden /></button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

const filters = [
  { id: "toate", label: "Toate" },
  { id: "nunti", label: "Nunți" },
  { id: "dj-mc", label: "DJ & MC" },
  { id: "sonorizare", label: "Sunet & lumini" },
  { id: "trupa", label: "Live" },
  { id: "studio", label: "Studio" },
  { id: "fum-greu", label: "Efecte" },
] as const;

const films: Video[] = Object.values(videos);

export function PortfolioFilmArchive({ initialFilmId }: { initialFilmId?: string }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("toate");
  const [selected, setSelected] = useState(videos.nuntaRamada.id);
  // Deep links restore the selected published film after client hydration.
  // Selection never autoplays or preloads the YouTube iframe.
  useEffect(() => {
    if (initialFilmId && films.some(video => video.id === initialFilmId)) {
      setFilter("toate");
      setSelected(initialFilmId);
    }
  }, [initialFilmId]);
  const filtered = films.filter((video) => filter === "toate" || video.tags.includes(filter));
  const active = filtered.find((video) => video.id === selected) ?? filtered[0]!;

  return (
    <section className="film-archive section" id="portfolio-films" aria-labelledby="film-archive-title">
      <div className="container-site">
        <div className="film-archive__heading">
          <div>
            <span className="journal__index"><Film className="size-4" aria-hidden /> 02 / THE FILM ARCHIVE</span>
            <h2 id="film-archive-title">De pe scenă. <em>Direct în cadru.</em></h2>
          </div>
          <p>Filme publicate de Green Sound Music. Selectează o categorie și un capitol. Niciun videoclip și niciun sunet nu pornesc automat.</p>
        </div>

        <div className="film-archive__filters" role="group" aria-label="Filtrează filmările">
          {filters.map((option) => (
            <button type="button" key={option.id}
              className="film-archive__filter" aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}>{option.label}</button>
          ))}
        </div>
        <div className="film-archive__grid">
          <div className="film-archive__screen">
            <div className="film-archive__chrome">
              <span><span className="film-archive__signal" aria-hidden /> GREEN SOUND / ORIGINAL FOOTAGE</span>
              <span>{String(filtered.findIndex((v) => v.id === active.id) + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}</span>
            </div>
            <div className="film-archive__player" aria-live="polite" data-selected-film={active.id}>
              <VideoLite key={active.id} video={active} className="film-archive__video" />
            </div>
            <p className="film-archive__hint"><Play className="size-3.5" aria-hidden /> PLAY PORNEȘTE DOAR LA CERERE</p>
          </div>

          <div className="film-archive__list" role="group" aria-label="Alege filmarea">
            <span className="film-archive__list-label"><Clapperboard className="size-4" aria-hidden /> SELECTED FILMS / {String(filtered.length).padStart(2, "0")}</span>
            {filtered.map((video, index) => (
              <button type="button" key={video.id} className="film-archive__pick"
                aria-pressed={active.id === video.id} data-film-id={video.id} onClick={() => setSelected(video.id)}>
                <span className="film-archive__pick-no">{String(index + 1).padStart(2, "0")}</span>
                <span className="film-archive__pick-info"><strong>{video.title}</strong><small>{video.caption}</small></span>
                <ArrowUpRight className="size-4" aria-hidden />
              </button>
            ))}
          </div>
        </div>

        <div className="film-archive__closer">
          <div><MapPin className="size-5" aria-hidden /><p>Evenimente și producții realizate de Green Sound Music, Pitești.</p></div>
          <Link to="/contact" className="film-archive__cta">Hai să construim și atmosfera ta <ArrowUpRight className="size-5" aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}
