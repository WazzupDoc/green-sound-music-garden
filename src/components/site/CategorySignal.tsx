import type { ReactNode } from "react";
import type { EventSlug, ServiceSlug } from "@/data/site";

/** First-party vector cues: decorative representations of the real service catalogue,
 * never logos, actual audio meters, real stage machinery or customer photographs.
 * Animation is a short CSS-only acknowledgement of an explicit selection.
 */
export type CategoryCueKind = EventSlug | ServiceSlug;

const artwork: Record<CategoryCueKind, ReactNode> = {
  nunti: <>
    <g className="gs198-cue__rings"><circle cx="37" cy="51" r="18"/><circle cx="59" cy="51" r="18"/></g>
    <path className="gs198-cue__twinkle" d="M48 11v16m-8-8h16M48 30l3 5-3 5-3-5z"/>
  </>,
  botezuri: <>
    <path className="gs198-cue__cradle" d="M23 55c4 15 16 23 25 23s22-8 25-23M30 54h36M26 53c0-21 13-34 22-34s22 13 22 34" />
    <g className="gs198-cue__twinkle"><path d="M48 21v15m-8-8h16"/><path d="M27 34l4 5-4 5-4-5zM70 34l4 5-4 5-4-5z"/></g>
  </>,
  "evenimente-corporate": <>
    <rect x="17" y="20" width="62" height="55" rx="3" className="gs198-cue__console"/>
    <path d="M28 64V46m14 18V31m14 33V42m14 22V36"/>
    <g className="gs198-cue__faders"><path d="M22 47h12M36 35h12M50 51h12M64 42h12"/></g>
    <path d="M22 25h18"/>
  </>,
  "concerte-festivaluri": <>
    <path className="gs198-cue__beam gs198-cue__beam--left" d="M31 30L8 78h38z"/>
    <path className="gs198-cue__beam gs198-cue__beam--right" d="M66 30L50 78h39z"/>
    <path d="M19 76h58M30 27h36M38 19h20M28 77V70m40 7v-7"/>
    <path d="M37 63v-8m11 8V46m11 17v-8" />
  </>,
  "petreceri-private": <>
    <path className="gs198-cue__party-core" d="M27 71L64 34l11 37-39-8z"/>
    <path className="gs198-cue__party-core" d="M38 61l13 9m-2-20 12 11"/>
    <g className="gs198-cue__confetti">
      <path d="M29 28l-5-10" /><path d="M47 24v-12" /><path d="M63 22l7-10" />
      <path d="M74 36l11-5" /><path d="M19 43 9 38" /><path d="M72 52l11 3"/>
      <circle cx="25" cy="13" r="2" /><circle cx="81" cy="18" r="2"/><circle cx="15" cy="65" r="2"/>
    </g>
  </>,
  "dj-mc": <>
    <g className="gs198-cue__record">
      <circle cx="44" cy="50" r="28" /><circle cx="44" cy="50" r="18" /><circle cx="44" cy="50" r="5"/>
      <path d="M44 25c12 0 22 10 22 22M23 49c0 10 7 18 14 20"/>
    </g>
    <path className="gs198-cue__needle" d="M70 18h12v13l-18 21-5-5 16-20" />
  </>,
  trupa: <>
    <path d="M22 31c10-5 15-5 24 0l11-13 6 5-9 14c6 7 9 19-1 29-10 9-24 7-32-1s-8-26 1-34z"/>
    <path className="gs198-cue__strings" d="M42 31 28 61m20-25L33 66m20-25L39 68"/>
    <path d="m61 22 14-8 5 8-15 9"/>
  </>,
  "echipamente-de-sunet-si-lumini": <>
    <rect x="18" y="18" width="39" height="59" rx="3"/>
    <circle cx="38" cy="57" r="12" /><circle cx="38" cy="33" r="5"/>
    <path className="gs198-cue__sound" d="M64 35c7 5 7 21 0 26m7-34c12 10 12 30 0 41"/>
  </>,
  "masina-fum-greu-cu-gheata-carbonica": <>
    <path className="gs198-cue__smoke" d="M20 69c-13-8-2-24 8-20 0-14 17-21 27-11 10-7 23 4 18 15 17 0 16 21-1 21H26"/>
    <path className="gs198-cue__smoke" d="M34 27c-4-7 7-10 3-18m15 21c-4-7 8-13 3-21"/>
  </>,
  "studio-inregistrari": <>
    <rect x="16" y="22" width="64" height="53" rx="3"/>
    <circle className="gs198-cue__rec" cx="26" cy="33" r="4"/>
    <path className="gs198-cue__wave" d="M22 54h10l4-9 6 18 7-30 6 28 5-9h13"/>
  </>,
  hostess: <>
    <path d="M20 78V35c0-24 56-24 56 0v43M29 78V36c0-14 38-14 38 0v42"/>
    <path className="gs198-cue__welcome" d="M45 45l4-10 4 10 10 3-10 4-4 10-4-10-10-4z"/>
  </>,
  "ursitoare-botez": <>
    <path className="gs198-cue__stars" d="M48 10 55 31 76 38 55 45 48 66 41 45 20 38 41 31z"/>
    <path className="gs198-cue__stars" d="M20 58l3 8 8 3-8 3-3 8-3-8-8-3 8-3zm57-25 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
  </>,
  "start-veselia": <>
    <path className="gs198-cue__ribbon" d="M22 17c22 6 31 16 53 3M22 17v59m3-36 16 6-16 8m20-14 18 6-18 9m25-20 13 5-13 8"/>
    <path d="M17 77h12"/>
  </>,
};

export function CategorySignal({ kind, play = false, className = "" }: {
  kind: CategoryCueKind;
  play?: boolean;
  className?: string;
}) {
  return <span className={`gs198-cue ${className}`} data-kind={kind} data-play={play ? "true" : "false"} aria-hidden="true">
    <svg viewBox="0 0 96 96" className="gs198-cue__drawing" fill="none"
      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {artwork[kind]}
    </svg>
  </span>;
}
