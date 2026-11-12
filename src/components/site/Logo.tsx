import { Link } from "@tanstack/react-router";

/** Green Sound Music's authentic emblem, re-art-directed without replacing its identity.
 * Lighting cue sweeps are decorative, keyboard-safe and disabled by reduced-motion CSS.
 */
export function Logo({ tone = "stage" }: { tone?: "stage" | "paper" }) {
  return (
    <Link to="/" className={`gs61-brand gs61-brand--${tone}`}
      aria-label="Green Sound Music — Acasă" title="Green Sound Music · Pitești · din 2008">
      <span className="gs61-brand__emblem" aria-hidden="true">
        <span className="gs61-brand__halo" />
        <img src="/favicon.png" width={72} height={72} decoding="async" alt="" />
        <span className="gs61-brand__flash" />
      </span>
      <span className="gs61-brand__lockup">
        <strong>GREEN <span>SOUND</span></strong>
        <span className="gs61-brand__baseline">
          <span className="gs61-brand__music">MUSIC</span>
          <span className="gs61-brand__meter" aria-hidden="true"><i/><i/><i/><i/><i/></span>
        </span>
      </span>
    </Link>
  );
}
