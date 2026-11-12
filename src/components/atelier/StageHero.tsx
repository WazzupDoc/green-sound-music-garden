import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, CirclePlay, Radio, Lightbulb, LightbulbOff, MoveUpRight, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { business, images, videos, type EventSlug } from "@/data/site";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type StageMode = "live" | "private" | "production";
type StageLightTone = "mint" | "gold" | "ice";
const modes: ReadonlyArray<{
  key: StageMode; label: string; number: string; tag: string; src: string; alt: string;
  eyebrow: string; headline: string; description: string; eventSlug: EventSlug; eventLabel: string;
}> = [
  {
    key: "live", label: "Live stage", number: "01", tag: "Public & emoție",
    src: images.concert.src, alt: images.concert.alt,
    eyebrow: "CONCERTE / FESTIVALURI",
    headline: "Un public. Un ritm. O energie comună.",
    description: "Sunet, lumini și scenă, gândite ca o singură producție pentru fiecare moment live.",
    eventSlug: "concerte-festivaluri", eventLabel: "Explorează concertele",
  },
  {
    key: "private", label: "Private party", number: "02", tag: "Momente personale",
    src: images.dj.src, alt: images.dj.alt,
    eyebrow: "NUNȚI / PETRECERI PRIVATE",
    headline: "Serile speciale merită o atmosferă a lor.",
    description: "DJ & MC, muzică live și lumină coordonate în ritmul oamenilor și al poveștii.",
    eventSlug: "nunti", eventLabel: "Descoperă nunțile",
  },
  {
    key: "production", label: "Technical show", number: "03", tag: "Lumini & scenotehnică",
    src: images.scena.src, alt: images.scena.alt,
    eyebrow: "PRODUCȚIE / EVENIMENTE CORPORATE",
    headline: "Tehnologia din spatele emoției.",
    description: "Ecrane LED, sisteme audio și lumini transformate într-o experiență coerentă.",
    eventSlug: "evenimente-corporate", eventLabel: "Descoperă producția",
  },
];

/** All footage is sourced from Green Sound's project. Stage light cones are decorative CSS. */
export function StageHero() {
  const [active, setActive] = useState<StageMode>("live");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [showReel, setShowReel] = useState(false);
  const [lightsEnabled, setLightsEnabled] = useState(true);
  const [lightTone, setLightTone] = useState<StageLightTone>("mint");
  const [lightPower, setLightPower] = useState(65);
  const [stageVisible, setStageVisible] = useState(true);
  const stageRef = useRef<HTMLElement>(null);

  // Never keep running stage animations while the hero is offscreen or the tab is hidden.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setStageVisible(Boolean(entry?.isIntersecting) && !document.hidden),
      { threshold: 0.025 });
    observer.observe(el);
    const onVisibility = () => {
      const rect = el.getBoundingClientRect();
      setStageVisible(!document.hidden && rect.bottom > 0 && rect.top < window.innerHeight);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(ellipse 33% 39% at ${pointerX}% ${pointerY}%, rgba(166,244,146,.20), transparent 80%)`;
  const scene = useMemo(() => modes.find((mode) => mode.key === active) ?? modes[0]!, [active]);
  const reel = active === "private" ? videos.nuntaRamada : videos.showLumini;
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    // In adaptive lite mode stop updating expensive radial-gradient motion values.
    if (event.pointerType !== "mouse" || reduced ||
      document.documentElement.dataset["gsPerformance"] === "lite") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <section aria-labelledby="crafted-hero-title" ref={stageRef} className="crafted-hero" data-scene={active}
      data-lights={lightsEnabled && !reduced ? "on" : "off"} data-stage-visible={stageVisible ? "true" : "false"}
      data-hydrated={hydrated ? "true" : "false"} data-light-tone={lightTone}
      data-light-power={lightPower} style={{ "--gs-energy": lightPower / 100 } as CSSProperties}>
      <div className="crafted-hero__canvas" onPointerMove={onMove}
        onPointerLeave={() => { pointerX.set(50); pointerY.set(50); }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={scene.key} src={scene.src} alt={scene.alt}
            width={active === "live" ? images.concert.w : active === "private" ? images.dj.w : images.scena.w}
            height={active === "live" ? images.concert.h : active === "private" ? images.dj.h : images.scena.h}
            fetchPriority={active === "live" ? "high" : undefined}
            decoding="async"
            className="crafted-hero__image" initial={false}
            animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : .68, ease: [.16, 1, .3, 1] }} />
        </AnimatePresence>
        <div className="crafted-hero__shade" aria-hidden />
        <div className="director-stage-ambient" aria-hidden>
          <span className="director-stage-ambient__ring" />
          <span className="director-stage-ambient__ring director-stage-ambient__ring--two" />
          <span className="director-stage-ambient__grid" />
        </div>
        <div className="crafted-stage-lights" aria-hidden>
          <span className="crafted-stage-lights__beam crafted-stage-lights__beam--one" />
          <span className="crafted-stage-lights__beam crafted-stage-lights__beam--two" />
          <span className="crafted-stage-lights__beam crafted-stage-lights__beam--three" />
          <span className="crafted-stage-lights__flare" />
        </div>
        <motion.div className="crafted-hero__pointer" style={{ background: spotlight }} aria-hidden />
      </div>

      <div className="container-site crafted-hero__layout">
        <div className="crafted-hero__intro">
          <div className="crafted-hero__eyebrow"><span className="crafted-live-dot" aria-hidden /> EST. {business.founded} / PITEȘTI / LIVE EXPERIENCES</div>
          <h1 id="crafted-hero-title" className="crafted-hero__title">
            Nu facem doar <span className="crafted-outline-word">zgomot.</span>
            <em> Construim atmosfera.</em>
          </h1>
          <p className="crafted-hero__lead">Muzică live, DJ & MC, sunet și scenotehnică. Lumini care schimbă un spațiu. O echipă care le aduce împreună.</p>
          <div className="crafted-hero__actions">
            <Link to="/evenimente" className="crafted-button crafted-button--light">
              Descoperă experiențele <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <button type="button" className="crafted-text-action" onClick={() => setShowReel(true)} data-cursor-label="PLAY FILM">
              <CirclePlay aria-hidden className="size-5" /> Privește un show real
            </button>
          </div>
        </div>

        <div className="scene-console" aria-live="polite" aria-atomic="true">
          <div className="scene-console__top">
            <span className="scene-console__icon" aria-hidden="true"><Radio className="size-4" /></span>
            <span className="scene-console__top-label">GREEN SOUND / SCENE NOTES</span>
            <span className="scene-console__counter">{scene.number} / 03</span>
          </div>
          <div key={scene.key} className="scene-console__content">
            <span className="scene-console__eyebrow">{scene.eyebrow}</span>
            <h2>{scene.headline}</h2>
            <p>{scene.description}</p>
            <Link to="/evenimente/$slug" params={{ slug: scene.eventSlug }}
              className="scene-console__link" aria-label={scene.eventLabel}>
              {scene.eventLabel} <MoveUpRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="scene-console__bottom" aria-hidden="true">
            <span>G / S</span>
            <span>PRODUCTION / PITEȘTI</span>
          </div>
        </div>
        <div className="crafted-hero__bottom">
          <div className="crafted-hero__modes" role="group" aria-label="Schimbă atmosfera vizuală a scenei">
            {modes.map((mode) => (
              <button key={mode.key} type="button" aria-pressed={mode.key === active}
                className="crafted-hero__mode" onClick={() => setActive(mode.key)} data-cursor-label="MIX SCENE">
                <span className="crafted-hero__mode-nr">{mode.number}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
          <div className="director-hero__utilities">
            <button type="button" className="director-hero__lights" aria-pressed={lightsEnabled && !reduced}
              disabled={Boolean(reduced)} onClick={() => setLightsEnabled(value => !value)}
              title={reduced ? "Animațiile sunt dezactivate în setările dispozitivului" : "Activează sau dezactivează efectele de lumină"}>
              {lightsEnabled && !reduced ? <Lightbulb className="size-4" aria-hidden /> : <LightbulbOff className="size-4" aria-hidden />}
              {reduced ? "Mișcare redusă" : lightsEnabled ? "Lumini: ON" : "Lumini: OFF"}
            </button>
            <details className="gs-lightboard">
              <summary className="gs-lightboard__summary" data-cursor-label="LIGHT DESK">
                <SlidersHorizontal className="size-4" aria-hidden />
                <span>LIGHT DESK</span>
                <span className="gs-lightboard__chevron" aria-hidden>+</span>
              </summary>
              <div className="gs-lightboard__panel">
                <span className="gs-lightboard__eyebrow">GREEN SOUND / VISUAL MIXER</span>
                <p className="gs-lightboard__title">Tu regizezi <em>lumina.</em></p>
                <p className="gs-lightboard__description">Explorează trei tonuri și intensitatea efectelor scenice. Efectul este doar vizual, fără sunet.</p>
                <fieldset className="gs-lightboard__tones">
                  <legend>TONUL SCENEI</legend>
                  {([
                    {value:"mint",label:"ELECTRIC GREEN"},
                    {value:"gold",label:"WARM GOLD"},
                    {value:"ice",label:"BLUE HOUR"},
                  ] as const).map(tone => (
                    <button type="button" key={tone.value} aria-pressed={lightTone===tone.value}
                      className="gs-lightboard__tone" onClick={() => setLightTone(tone.value)}
                      data-cursor-label="SET TONE">
                      <span aria-hidden className={`gs-lightboard__swatch gs-lightboard__swatch--${tone.value}`} />
                      {tone.label}
                    </button>
                  ))}
                </fieldset>
                <label className="gs-lightboard__power" htmlFor="gs-light-power">
                  <span>INTENSITATEA LUMINII</span>
                  <output htmlFor="gs-light-power">{lightPower}%</output>
                </label>
                <input type="range" id="gs-light-power" min="15" max="100" step="5"
                  value={lightPower} onChange={(event) => setLightPower(Number(event.target.value))}
                  aria-label="Intensitatea efectelor vizuale de scenă" disabled={Boolean(reduced)} />
                <p className="gs-lightboard__disclaimer">
                  {reduced ? "Animațiile sunt reduse prin setarea dispozitivului." :
                    !lightsEnabled ? "Pornește luminile pentru a vedea modificările." :
                    "Tonul și intensitatea schimbă doar efectele decorative ale acestei pagini."}
                </p>
              </div>
            </details>
            <a className="crafted-hero__scroll" href="#gs-production-index">
              Explorează <ArrowDownRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className="crafted-hero__side-label" aria-hidden><Radio className="size-4" /> GREEN SOUND / {scene.tag.toUpperCase()}</div>

      <Dialog open={showReel} onOpenChange={setShowReel}>
        <DialogContent className="max-h-[92dvh] max-w-4xl overflow-y-auto rounded-none border-[#c7e3ba]/35 bg-[#08120b] p-4 sm:p-6">
          <DialogTitle className="pr-8 font-display text-xl font-semibold">{reel.title}</DialogTitle>
          <DialogDescription className="text-sm text-foreground/60">Filmări reale. Redarea videoclipului încarcă YouTube doar după ce ai apăsat butonul de vizionare.</DialogDescription>
          {showReel && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&rel=0${active === "private" ? `&start=${videos.nuntaRamada.start}` : ""}`}
              title={reel.title}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="aspect-video w-full border-0"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
