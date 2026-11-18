import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, AudioLines, Pause, Play, SlidersHorizontal } from "lucide-react";
import type { EventSlug } from "@/data/site";

const baseSignal = [
  18, 27, 38, 24, 55, 78, 41, 63, 35, 22, 74, 92,
  58, 36, 81, 54, 39, 96, 61, 27, 49, 72, 40, 88,
  57, 31, 66, 94, 46, 73, 35, 18, 54, 87, 61, 26,
] as const;

type Scene = {
  id: "opening" | "live" | "afterglow";
  index: string;
  name: string;
  tag: string;
  tempo: number;
  heading: string;
  caption: string;
  eventSlug: EventSlug;
  eventLabel: string;
};

const scenes: readonly Scene[] = [
  {
    id: "opening",
    index: "01",
    name: "THE OPENING",
    tag: "WARM / EMOTIONAL",
    tempo: 78,
    heading: "Înaintea primului dans.",
    caption: "Lumina se așază, oamenii se adună, iar un moment simplu capătă atmosferă.",
    eventSlug: "nunti",
    eventLabel: "Explorează evenimentele de nuntă",
  },
  {
    id: "live",
    index: "02",
    name: "THE DROP",
    tag: "STAGE / LIVE ENERGY",
    tempo: 128,
    heading: "Când scena prinde viață.",
    caption: "Lumini, sunet și energie. Într-un concert, ritmul se simte până în ultimul rând.",
    eventSlug: "concerte-festivaluri",
    eventLabel: "Descoperă concertele și festivalurile",
  },
  {
    id: "afterglow",
    index: "03",
    name: "AFTERGLOW",
    tag: "NIGHT / DANCE FLOOR",
    tempo: 104,
    heading: "Noaptea mai are un refren.",
    caption: "Pe ring, atmosfera rămâne vie. Fiecare seară poate avea propria ei amprentă.",
    eventSlug: "petreceri-private",
    eventLabel: "Vezi petrecerile private",
  },
];

/**
 * V37 Frequency Studio.
 * Visual choreography only — not an audio recording, audio player,
 * music library, real audio spectrum or predictor of a booked event.
 * Uses existing, factual event pages rather than invented experiences.
 */
function profileHeight(mode: Scene["id"], height: number, index: number): number {
  if (mode === "live") return Math.min(100, Math.max(18, Math.round(height * 1.12 + (index % 5) * 5)));
  if (mode === "afterglow") return Math.min(90, Math.max(16, Math.round(height * 0.65 + ((index * 7) % 18))));
  return Math.max(14, Math.round(height * 0.74));
}

export function AtmosphereInterlude() {
  const [mode, setMode] = useState<Scene["id"]>("opening");
  const [tempo, setTempo] = useState(78);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const scene = scenes.find(item => item.id === mode) ?? scenes[0]!;
  const animate = playing && visible;

  // Pause DOM/CSS animation whenever the section or browser tab is offscreen.
  // No perpetual requestAnimationFrame, audio, microphone or server calls.
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(!document.hidden);
      const onVisibility = () => setVisible(!document.hidden);
      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }
    const observer = new IntersectionObserver(
      entries => setVisible(Boolean(entries[0]?.isIntersecting) && !document.hidden),
      { threshold: 0.06 },
    );
    observer.observe(element);
    const onVisibility = () => {
      const bounds = element.getBoundingClientRect();
      setVisible(!document.hidden && bounds.bottom > 0 && bounds.top < window.innerHeight);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const selectScene = (item: Scene) => {
    setMode(item.id);
    setTempo(item.tempo);
  };

  return (
    <section ref={stage} className="gs-pulse" aria-labelledby="gs-pulse-title"
      data-mode={scene.id} data-playing={animate ? "true" : "false"}
      style={{ "--gs-tempo": `${(120 / tempo).toFixed(3)}s` } as CSSProperties}>
      <div className="gs-pulse__head">
        <div className="container-site gs-pulse__heading">
          <span className="gs-pulse__index">
            <AudioLines className="size-4" aria-hidden /> GREEN SOUND / FREQUENCY STUDIO
          </span>
          <span className="gs-pulse__number">EST. 2008 · PITEȘTI · VISUAL ONLY</span>
        </div>
      </div>
      <div className="container-site gs-pulse__body">
        <div className="gs-pulse__text">
          <span className="gs-pulse__eyebrow">THE SOUND HAS A SHAPE / 04</span>
          <h2 id="gs-pulse-title">Nu doar se aude. <em>Se simte.</em></h2>
          <p>Fiecare eveniment are propriul ritm. Explorează trei atmosfere vizuale și descoperă ce ar putea însemna muzica, lumina și energia pentru evenimentul tău.</p>
          <Link to="/portofoliu" className="gs-pulse__link">
            Descoperă momente reale <ArrowUpRight className="size-5" aria-hidden />
          </Link>
          <p className="gs-pulse__safety">
            Simulare vizuală, fără redare audio, microfon sau înregistrare. Ritmul afișat nu reprezintă muzică sau măsurători dintr-un eveniment real.
          </p>
        </div>
        <div className="gs-pulse__art" aria-label="Studio vizual de ritm Green Sound">
          <div className="gs-pulse__console">
            <span className="gs-pulse__console-tag">
              <SlidersHorizontal className="size-4" aria-hidden /> GS / STUDIO MIX
            </span>
            <span className="gs-pulse__console-index">{scene.index} / 03</span>
          </div>
          <div className="gs-pulse__modes" role="group" aria-label="Alege atmosfera vizuală">
            {scenes.map(item => (
              <button key={item.id} type="button" className="gs-pulse__mode"
                aria-pressed={mode === item.id} data-active={mode === item.id}
                onClick={() => selectScene(item)}>
                <span>{item.index}</span>
                {item.name}
              </button>
            ))}
          </div>
          <div className="gs-pulse__visual">
            <div className="gs-pulse__readout">
              <span className="gs-pulse__readout-title">{scene.tag}</span>
              <span className="gs-pulse__readout-signal" aria-hidden>
                <i /><i /><i />
              </span>
            </div>
            <div className="gs-pulse__wave" aria-hidden="true">
              {baseSignal.map((height,index) => (
                <span key={index} style={{
                  height: `${profileHeight(mode, height, index)}%`,
                  "--gs-delay": `${(-index % 7) * 0.06}s`,
                } as CSSProperties} />
              ))}
            </div>
            <div className="gs-pulse__visual-floor" aria-hidden>
              <span>SIGNAL / NON-AUDIO</span>
              <span>{scene.index} / GREEN SOUND</span>
            </div>
          </div>
          <div className="gs-pulse__controls">
            <div className="gs-pulse__tempo">
              <div className="gs-pulse__tempo-head">
                <label htmlFor="gs-pulse-tempo">VITEZA ANIMAȚIEI</label>
                <output htmlFor="gs-pulse-tempo">{tempo} <small>BPM*</small></output>
              </div>
              <input id="gs-pulse-tempo" type="range" min="68" max="140" step="2"
                value={tempo} onChange={event => setTempo(Number(event.target.value))}
                aria-label="Viteza vizuală a pulsului, în bătăi pe minut" />
              <div className="gs-pulse__scale" aria-hidden><span>SLOW</span><span>FAST</span></div>
            </div>
            <button type="button" className="gs-pulse__transport" aria-pressed={playing}
              onClick={() => setPlaying(value => !value)}
              aria-label={playing ? "Oprește animația ritmului" : "Pornește animația ritmului"}>
              {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              <span>{playing ? "PAUZĂ" : "ANIMEAZĂ"}</span>
            </button>
          </div>
          <div className="gs-pulse__footer">
            <div className="gs-pulse__scene-note" aria-live="polite" aria-atomic="true">
              <strong>{scene.heading}</strong>
              <p>{scene.caption}</p>
            </div>
            <Link className="gs-pulse__scene-link" to="/evenimente/$slug" params={{ slug: scene.eventSlug }}
              aria-label={scene.eventLabel}>
              <span>EVENIMENT</span>
              <ArrowUpRight className="size-5" aria-hidden />
            </Link>
          </div>
          <p className="gs-pulse__motion-note">
            *BPM este doar o unitate orientativă pentru viteza efectului vizual.
            <span className="gs-pulse__accessible-note"> Mișcarea este dezactivată automat dacă dispozitivul solicită reducerea animațiilor sau economisirea resurselor.</span>
          </p>
          <div className="gs-pulse__art-foot">
            <span>STAGE / ENERGY / EMOTION</span>
            <span>GS — FREQUENCY STUDIO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
