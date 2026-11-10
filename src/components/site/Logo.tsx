import { Link } from "@tanstack/react-router";

/**
 * Refined logotype for the web redesign.
 * Static stage-aperture G mark; legible at small sizes, no equalizer or motion dependency.
 */
export function Logo({ tone = "stage" }: { tone?: "stage" | "paper" }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Green Sound Music — pagina principală">
      <span aria-hidden="true" className="relative grid size-10 shrink-0 place-items-center border border-primary/55 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <svg viewBox="0 0 44 44" width="28" height="28" fill="none" stroke="currentColor" strokeLinecap="square">
          <path d="M32.5 13.2A14 14 0 1 0 34 27.7H22.8" strokeWidth="3.1" />
          <path d="M34 20.8V27.7" strokeWidth="3.1" />
          <path d="M36 6.5L39 3.5" strokeWidth="1.4" opacity=".7" />
          <path d="M8 37.5L5 40.5" strokeWidth="1.4" opacity=".7" />
        </svg>
      </span>
      <span className="flex flex-col gap-1 leading-none">
        <span className={"font-display text-[1rem] font-bold uppercase tracking-[.045em] sm:text-[1.05rem] " + (tone === "paper" ? "text-paper-foreground" : "text-foreground")}>
          Green Sound
        </span>
        <span className="text-[.58rem] font-semibold uppercase tracking-[.28em] text-primary">Music / Since 2008</span>
      </span>
    </Link>
  );
}
