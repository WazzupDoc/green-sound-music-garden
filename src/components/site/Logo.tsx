import { Link } from "@tanstack/react-router";

/** Digital lockup: original signal monogram; existing favicon remains untouched. */
export function Logo({ tone = "stage" }: { tone?: "stage" | "paper" }) {
  const ink = tone === "paper" ? "#13251b" : "#f4f2e9";
  const signal = tone === "paper" ? "#17643e" : "#bafa36";
  return (
    <Link to="/" className="group inline-flex shrink-0 items-center gap-2.5 gs299-brand" aria-label="Green Sound Music — pagina principală">
      <svg className="gs299-brand__mark" width="52" height="44" viewBox="0 0 48 44" fill="none" aria-hidden="true" style={{ color: signal }}>
        <path d="M43 5H23C12 5 3 15 3 26c0 8 5 13 14 13h15l7-17H23l-3 7h9l-2 4h-8c-5 0-7-3-6-8 1-7 6-12 13-12h13z" fill="currentColor"/>
        <path d="M10 8h29l-2 3H9z" fill={ink}/>
        <path d="M17 22h7l2-4 2 9 3-15 3 18 3-13 2 7 2-2h5" stroke={tone === "paper" ? "#0d5331" : "#d7ff8c"} strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
      <span className="flex flex-col leading-none" style={{color:ink}}>
        <span className="font-display italic font-extrabold text-[1.08rem] tracking-[-.055em] whitespace-nowrap">GREEN SOUND</span>
        <span className="mt-1.5 flex items-center gap-2 text-[.62rem] font-semibold tracking-[.32em]">MUSIC <span aria-hidden="true" style={{background:signal,width:24,height:1}} /></span>
      </span>
    </Link>
  );
}
