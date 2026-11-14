import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clapperboard, Headphones, RadioTower } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VideoLite } from "@/components/site/VideoLite";
import { videos, ytThumb, type Video } from "@/data/site";
import filmContactCss from "@/styles/film-contact-sheet-v87.css?inline";

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

  return (
    <section className="director-reel section" aria-labelledby="director-reel-title" id="director-reel">
      {/* The three source-backed film posters are a real cinematic contact sheet. */}
      <style>{filmContactCss}</style>
      <div className="container-site">
        <div className="crafted-section-intro">
          <span className="crafted-index"><Clapperboard className="mr-2 inline size-4" aria-hidden /> 02 / FILME REALE</span>
          <div>
            <h2 id="director-reel-title" className="crafted-heading">Ai văzut serviciile. <em>Acum privește momentele.</em></h2>
            <p className="crafted-section-intro__copy">
              Trei momente reale, trei atmosfere diferite. Alege filmarea și pornește-o când vrei.
            </p>
          </div>
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Film selectat: {active.title}. {active.subtitle}. Apasă Play pentru a porni filmarea.</p>
        <div className="director-reel__layout">
          <div className="director-reel__display">
            <div className="director-reel__chrome">
              <span><span className="director-reel__record" aria-hidden /> GREEN SOUND / ARCHIVE</span>
              <span>FILM 0{selected + 1} / 03</span>
            </div>
            <div className="gs-film-slate">
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
            {cuts.map((cut, index) => (
              <button key={cut.id} type="button" className="director-reel__choice"
                aria-pressed={selected === index} aria-label={`Film 0${index + 1}: ${cut.title} — ${cut.subtitle}`}
                onClick={() => setSelected(index)}>
                <span className="gs-v87-film-thumb" aria-hidden="true">
                  <img src={cut.video.poster ?? ytThumb(cut.video, "sd")} alt=""
                    width={1280} height={720} loading="lazy" decoding="async" />
                </span>
                <span className="gs-v87-film-thumb__shade" aria-hidden="true" />
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
