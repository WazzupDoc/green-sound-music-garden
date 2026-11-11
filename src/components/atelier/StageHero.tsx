import { useMemo, useState, type PointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, CirclePlay, Radio, Volume2 } from "lucide-react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { business, images, videos } from "@/data/site";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type StageMode = "live" | "private" | "production";
const modes = [
  { key: "live", label: "Live stage", number: "01", tag: "Public & emoție", src: images.concert.src, alt: images.concert.alt },
  { key: "private", label: "Private party", number: "02", tag: "Momente personale", src: images.dj.src, alt: images.dj.alt },
  { key: "production", label: "Technical show", number: "03", tag: "Lumini & scenotehnică", src: images.scena.src, alt: images.scena.alt },
] as const;

/** All footage is sourced from Green Sound's project. Stage light cones are decorative CSS. */
export function StageHero() {
  const [active, setActive] = useState<StageMode>("live");
  const [showReel, setShowReel] = useState(false);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(ellipse 33% 39% at ${pointerX}% ${pointerY}%, rgba(166,244,146,.20), transparent 80%)`;
  const scene = useMemo(() => modes.find((mode) => mode.key === active) ?? modes[0], [active]);
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <section aria-labelledby="crafted-hero-title" className="crafted-hero" data-scene={active}>
      <div className="crafted-hero__canvas" onPointerMove={onMove}
        onPointerLeave={() => { pointerX.set(50); pointerY.set(50); }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={scene.key} src={scene.src} alt={scene.alt}
            width={active === "live" ? images.concert.w : active === "private" ? images.dj.w : images.scena.w}
            height={active === "live" ? images.concert.h : active === "private" ? images.dj.h : images.scena.h}
            fetchPriority={active === "live" ? "high" : undefined}
            decoding="async"
            className="crafted-hero__image" initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : .68, ease: [.16, 1, .3, 1] }} />
        </AnimatePresence>
        <div className="crafted-hero__shade" aria-hidden />
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
            <button type="button" className="crafted-text-action" onClick={() => setShowReel(true)}>
              <CirclePlay aria-hidden className="size-5" /> Privește un show real
            </button>
          </div>
        </div>

        <div className="crafted-hero__label" aria-hidden="true"><span className="crafted-hero__label-line" /> EXPERIENCE / SOUND / LIGHT</div>
        <div className="crafted-hero__bottom">
          <div className="crafted-hero__modes" role="group" aria-label="Schimbă atmosfera vizuală a scenei">
            {modes.map((mode) => (
              <button key={mode.key} type="button" aria-pressed={mode.key === active}
                className="crafted-hero__mode" onClick={() => setActive(mode.key)}>
                <span className="crafted-hero__mode-nr">{mode.number}</span>
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
          <a className="crafted-hero__scroll" href="#crafted-experiences">
            Explorează <ArrowDownRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
      <div className="crafted-hero__side-label" aria-hidden><Radio className="size-4" /> GREEN SOUND / {scene.tag.toUpperCase()}</div>

      <Dialog open={showReel} onOpenChange={setShowReel}>
        <DialogContent className="max-h-[92dvh] max-w-4xl overflow-y-auto rounded-none border-[#c7e3ba]/35 bg-[#08120b] p-4 sm:p-6">
          <DialogTitle className="pr-8 font-display text-xl font-semibold">Green Sound Music / Show de lumini</DialogTitle>
          <DialogDescription className="text-sm text-foreground/60">Filmări reale. Redarea videoclipului încarcă YouTube doar după ce ai apăsat butonul de vizionare.</DialogDescription>
          {showReel && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videos.showLumini.id}?autoplay=1&rel=0`}
              title={videos.showLumini.title}
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
