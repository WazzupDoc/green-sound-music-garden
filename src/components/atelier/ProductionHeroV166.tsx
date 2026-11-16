import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, CirclePlay, SlidersHorizontal } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { images, videos, type EventSlug } from "@/data/site";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { VideoLite } from "@/components/site/VideoLite";

/** V166 retains the first-party scene/film/light interactions while replacing the entire visual art direction.
 * All photographic material and links originate in the first-party catalogue.
 */
const editions = [
  { key: "live", id: "01", label: "Live", image: images.concert,
    eyebrow: "CONCERTE / FESTIVALURI", title: "Sunetul unui public.",
    description: "Sonorizare, lumină și scenă coordonate pentru momentul live.",
    event: "concerte-festivaluri", link: "Producție live", video: videos.showLumini },
  { key: "private", id: "02", label: "Privat", image: images.dj,
    eyebrow: "NUNȚI / PETRECERI PRIVATE", title: "Ritmul unei seri.",
    description: "DJ, MC și muzică live pentru serile în care fiecare detaliu contează.",
    event: "nunti", link: "Evenimente private", video: videos.nuntaRamada },
  { key: "production", id: "03", label: "Producție", image: images.scena,
    eyebrow: "SUNET / LUMINI / SCENĂ", title: "Dincolo de scenă.",
    description: "Tehnică, sisteme audio, ecrane LED și lumină adaptate locului.",
    event: "evenimente-corporate", link: "Producție evenimente", video: videos.showLumini },
] as const;

type Edition = (typeof editions)[number]["key"];
type LightTone = "green" | "warm" | "cool";

export function ProductionHeroV166() {
  const [selected, setSelected] = useState<Edition>("live");
  const [hydrated, setHydrated] = useState(false);
  const [lightOn, setLightOn] = useState(true);
  const [tone, setTone] = useState<LightTone>("green");
  const [power, setPower] = useState(65);
  const [filmOpen, setFilmOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const hero = useRef<HTMLElement>(null);
  const desk = useRef<HTMLDetailsElement>(null);
  const deviceReduced = useReducedMotion();
  const reduced = hydrated && Boolean(deviceReduced);

  useEffect(() => { setHydrated(true); }, []);
  useEffect(() => {
    const node = hero.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(Boolean(entry?.isIntersecting) && !document.hidden);
    }, { threshold: .03 });
    observer.observe(node);
    const onVisibility = () => setVisible(!document.hidden &&
      node.getBoundingClientRect().bottom > 0 &&
      node.getBoundingClientRect().top < window.innerHeight);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  const scene = editions.find(item => item.key === selected) ?? editions[0];
  const lighting = lightOn && !reduced && visible;
  return (
    <section className="gs160-stage" aria-labelledby="gs160-title" ref={hero}
      data-scene={selected} data-hydrated={hydrated ? "true" : "false"}
      data-lights={lighting ? "on" : "off"} data-light-tone={tone}
      data-stage-visible={visible ? "true" : "false"}
      style={{ "--gs160-intensity": power / 100 } as CSSProperties}>
      <div className="gs160-stage__media">
        <img key={selected} src={scene.image.src} alt={scene.image.alt}
          width={scene.image.w} height={scene.image.h}
          decoding="async" fetchPriority={selected === "live" ? "high" : undefined}
          className="gs160-stage__photo" />
        <div className="gs160-stage__veil" aria-hidden="true" />
        <div className="gs160-stage__light" aria-hidden="true" />
      </div>

      <div className="gs160-stage__content">
        <div className="gs160-stage__masthead">
          <span className="gs160-stage__company">GREEN SOUND <b>MUSIC</b></span>
          <span className="gs160-stage__territory">MUZICĂ / SUNET / LUMINĂ<br />PITEȘTI · ARGEȘ</span>
        </div>

        <div className="gs160-stage__editorial">
          <span className="gs160-stage__chapter">GSM / REGIE DE EVENIMENT</span>
          <h1 id="gs160-title">Evenimente.<br /><em>Cu ritm.</em></h1>
          <div className="gs160-stage__statement">
            <p>DJ & MC, muzică live, sonorizare și lumini. Totul în jurul evenimentului tău, de la Pitești în toată țara.</p>
            <Link to="/contact" className="gs160-stage__primary">
              Cere o ofertă <ArrowUpRight aria-hidden className="size-5" />
            </Link>
            <button type="button" className="gs160-stage__film" onClick={() => setFilmOpen(true)}>
              <CirclePlay aria-hidden className="size-5" /> Vezi un film real
            </button>
          </div>
        </div>

        <div className="gs160-stage__index">
          <div className="gs160-stage__description" aria-live="polite" aria-atomic="true">
            <span>{scene.eyebrow}</span>
            <strong>{scene.title}</strong>
            <p>{scene.description}</p>
            <Link to="/evenimente/$slug" params={{ slug: scene.event as EventSlug }}>
              {scene.link} <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>

          <div className="gs160-stage__control">
            <div role="group" className="gs160-stage__choices" aria-label="Schimbă tipul evenimentului afișat">
              {editions.map(item => (
                <button type="button" key={item.key}
                  aria-pressed={selected === item.key} onClick={() => setSelected(item.key)}
                  className="gs160-stage__choice">
                  <small>{item.id}</small><span>{item.label}</span>
                </button>
              ))}
            </div>
            <a href="#gs-production-index" className="gs160-stage__discover">
              Serviciile noastre <ArrowDownRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="gs160-stage__desk">
          <details ref={desk} onKeyDown={event => {
            if (event.key !== "Escape" || !desk.current?.open) return;
            event.preventDefault(); desk.current.open = false;
            desk.current.querySelector<HTMLElement>("summary")?.focus();
          }}>
            <summary><SlidersHorizontal className="size-4" aria-hidden /> LIGHT DESK <span>+</span></summary>
            <div className="gs160-stage__desk-panel">
              <p>Reglează atmosfera vizuală — fără sunet sau control asupra echipamentelor reale.</p>
              <div role="group" aria-label="Tonul luminii">
                {(["green", "warm", "cool"] as const).map(key => (
                  <button key={key} type="button" aria-pressed={tone === key}
                    onClick={() => setTone(key)}>{key === "green" ? "Verde" : key === "warm" ? "Cald" : "Rece"}</button>
                ))}
              </div>
              <label htmlFor="gs160-power">Intensitate <output>{power}%</output></label>
              <input id="gs160-power" type="range" min="15" max="100" step="5"
                value={power} onChange={event => setPower(Number(event.target.value))}
                disabled={reduced} />
              <button type="button" aria-pressed={lightOn && !reduced} disabled={reduced}
                onClick={() => setLightOn(v => !v)}>
                {reduced ? "Mișcare redusă" : lightOn ? "Efect ON" : "Efect OFF"}
              </button>
            </div>
          </details>
        </div>
      </div>

      <Dialog open={filmOpen} onOpenChange={setFilmOpen}>
        <DialogContent className="max-h-[92dvh] max-w-4xl overflow-y-auto rounded-none border-[#c7e3ba]/35 bg-[#071610] p-5">
          <DialogTitle className="pr-8 font-display text-xl">{scene.video.title}</DialogTitle>
          <DialogDescription>Film real Green Sound Music. Videoclipul pornește doar după ce apeși Play.</DialogDescription>
          {filmOpen && <VideoLite video={scene.video} className="aspect-video w-full" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
