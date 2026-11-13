import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clapperboard, Headphones, RadioTower } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VideoLite } from "@/components/site/VideoLite";
import { videos, type Video } from "@/data/site";

const cuts: { id: string; title: string; context: string; subtitle: string; video: Video }[] = [
  {
    id: "nunta",
    title: "O seară care contează",
    context: "01 / NUNTĂ · DJ & MC",
    subtitle: "Nuntă la Ramada Pitești",
    video: videos.nuntaRamada,
  },
  {
    id: "show",
    title: "Lumina schimbă tot",
    context: "02 / STAGE · SHOW",
    subtitle: "DJ Green Sound · MC Dana · LJ Dom",
    video: videos.showLumini,
  },
  {
    id: "studio",
    title: "Muzica merge mai departe",
    context: "03 / STUDIO · LIVE",
    subtitle: "Green Sound Music · producție & TV",
    video: videos.neatza,
  },
];

/**
 * An original interaction model: choose a real published Green Sound film,
 * then explicitly choose to play it. No background video/audio, no cloned
 * animated agency template, and no footage from unrelated performers.
 */
export function EditorialPortfolio() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const active = cuts[selected]!;

  // Native buttons remain individually tabbable; arrow keys offer a faster
  // optional film-directory interaction without trapping keyboard focus.
  const onFilmKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowDown" ? (index + 1) % cuts.length
      : event.key === "ArrowUp" ? (index + cuts.length - 1) % cuts.length
      : event.key === "Home" ? 0
      : event.key === "End" ? cuts.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(".director-reel__choice");
    buttons?.[next]?.focus();
  };

  return (
    <section className="director-reel section" aria-labelledby="director-reel-title" id="director-reel">
      <div className="container-site">
        <div className="crafted-section-intro">
          <span className="crafted-index"><Clapperboard className="mr-2 inline size-4" aria-hidden /> 02 / FILME REALE</span>
          <div>
            <h2 id="director-reel-title" className="crafted-heading">Ai văzut serviciile. <em>Acum privește momentele.</em></h2>
            <p className="crafted-section-intro__copy">
              Trei filmări publicate de Green Sound Music. Fără montaje inventate sau galerii de fotografii repetate.
            </p>
          </div>
        </div>
        <div className="director-reel__layout">
          <div className="director-reel__display" aria-live="polite">
            <div className="director-reel__chrome">
              <span><span className="director-reel__record" aria-hidden /> GREEN SOUND / ARCHIVE</span>
              <span>FILM 0{selected + 1} / 03</span>
            </div>
            <div className="gs-film-slate" aria-live="polite" aria-atomic="true">
              <div className="gs-film-slate__meta">
                <span>PRODUCTION FILE / 0{selected + 1}</span>
                <span>REAL GREEN SOUND FOOTAGE</span>
              </div>
              <div className="gs-film-slate__story">
                <span className="gs-film-slate__index" aria-hidden="true">0{selected + 1}</span>
                <div>
                  <p>{active.context}</p>
                  <h3>{active.title}</h3>
                  <span>{active.subtitle}</span>
                </div>
              </div>
              <div className="gs-film-slate__timeline" aria-hidden="true">
                {cuts.map((cut, index) => (
                  <span key={cut.id} className={index === selected ? "is-current" : ""} />
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id}
                className="director-reel__video"
                initial={reduced ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : .32, ease: [.16, 1, .3, 1] }}>
                <VideoLite video={active.video} className="director-reel__player" />
              </motion.div>
            </AnimatePresence>
            <div className="director-reel__caption">
              <Headphones className="size-4 text-primary" aria-hidden />
              <span>Sunetul pornește numai după ce apeși Play.</span>
            </div>
          </div>
          <div className="director-reel__list" role="group" aria-label="Selectează videoclipul Green Sound">
            <span className="crafted-index">Alege un capitol</span>
            <p id="director-reel-keyboard-hint" className="sr-only">Folosește săgețile sus și jos pentru a schimba filmul; Home și End merg la primul sau ultimul film. Apasă Tab pentru a continua navigarea.</p>
            {cuts.map((cut, index) => (
              <button key={cut.id} type="button" className="director-reel__choice"
                aria-pressed={selected === index} aria-describedby="director-reel-keyboard-hint" onKeyDown={(event) => onFilmKeyDown(event, index)} aria-label={`Film 0${index + 1}: ${cut.title} — ${cut.subtitle}`}
                onClick={() => setSelected(index)}>
                <span className="director-reel__choice-no">0{index + 1}</span>
                <span className="director-reel__choice-body">
                  <span className="director-reel__choice-overline">{cut.context}</span>
                  <strong>{cut.title}</strong>
                  <small>{cut.subtitle}</small>
                </span>
                <ArrowUpRight className="size-5 director-reel__choice-arrow" aria-hidden />
              </button>
            ))}
            <div className="director-reel__foot">
              <RadioTower className="size-5 text-primary" aria-hidden />
              <p>Un singur partener pentru muzică, sunet și lumini, de la idee până la ultima piesă.</p>
            </div>
            <Link to="/portofoliu" hash="portfolio-films"
              search={{ film: active.video.id }}
              className="crafted-text-link director-reel__all">
              Vezi tot portofoliul <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
