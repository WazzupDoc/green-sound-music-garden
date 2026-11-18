import { useMemo } from "react";

/**
 * An original procedural vector score for the production process, not a live
 * audio meter or a photo of equipment. Paths are deterministic on SSR/client.
 * CSS motion is cosmetic, paused offscreen and disabled for Lite/reduced motion.
 */
export function makeScorePath(phase: number, scale: number) {
  const samples = 97;
  return Array.from({ length: samples }, (_, index) => {
    const x = (index * 480) / (samples - 1);
    const envelope = 8 + 35 * Math.exp(-Math.pow((x - 238) / 147, 2));
    const wave = Math.sin(x * 0.096 + phase) * 0.64 +
      Math.sin(x * 0.23 + phase * 0.63) * 0.24 +
      Math.sin(x * 0.038 - phase) * 0.12;
    const y = 74 - envelope * wave * scale;
    return (index === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
  }).join(" ");
}

export function SceneScoreV214() {
  const paths = useMemo(() => [
    makeScorePath(0.5, 0.48),
    makeScorePath(1.9, 0.82),
    makeScorePath(3.5, 1),
  ], []);

  return (
    <div className="gs214-score" data-artwork="procedural-svg" aria-hidden="true">
      <div className="gs214-score__heading">
        <span className="gs214-score__edition">G / S <b>—</b> 01</span>
        <span className="gs214-score__mode">PRODUCTION SCORE <i /></span>
      </div>
      <div className="gs214-score__title">
        <strong>Fiecare moment are <em>un ritm.</em></strong>
        <span>ATMOSFERĂ / SUNET / LUMINĂ</span>
      </div>
      <div className="gs214-score__plot">
        <svg viewBox="0 0 480 148" preserveAspectRatio="none" focusable="false">
          <defs>
            <linearGradient id="gs214-trace-gradient" x1="0" x2="1">
              <stop offset="0" stopColor="#94f9a4" stopOpacity=".25" />
              <stop offset=".48" stopColor="#d7f7c6" />
              <stop offset=".72" stopColor="#ffbf91" />
              <stop offset="1" stopColor="#b5b6fd" stopOpacity=".55" />
            </linearGradient>
          </defs>
          <g className="gs214-score__grid">
            <path d="M0 37H480M0 74H480M0 111H480" />
            <path d="M80 0V148M160 0V148M240 0V148M320 0V148M400 0V148" />
          </g>
          <path className="gs214-score__wave gs214-score__wave--back" d={paths[0]} />
          <path className="gs214-score__wave gs214-score__wave--mid" d={paths[1]} />
          <path className="gs214-score__wave gs214-score__wave--front" d={paths[2]} />
          <path className="gs214-score__baseline" d="M0 74H480" />
        </svg>
        <span className="gs214-score__playhead" />
      </div>
      <div className="gs214-score__timeline">
        <span><b>01</b><strong>Concept</strong></span>
        <span><b>02</b><strong>Producție</strong></span>
        <span><b>03</b><strong>Momentul live</strong></span>
      </div>
      <p className="gs214-score__disclosure">ILUSTRAȚIE VECTORIALĂ ORIGINALĂ · FĂRĂ AUDIO</p>
    </div>
  );
}
