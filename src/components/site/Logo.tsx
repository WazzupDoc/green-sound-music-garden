import { Link } from "@tanstack/react-router";

/** Digital lockup: original signal monogram; existing favicon remains untouched. */
export function Logo({ tone = "stage" }: { tone?: "stage" | "paper" }) {
  const ink = tone === "paper" ? "#13251b" : "#f4f2e9";
  const signal = tone === "paper" ? "#17643e" : "#c7f29b";
  return (
    <Link to="/" className="group inline-flex shrink-0 items-center gap-2.5 gs299-brand" aria-label="Green Sound Music — pagina principală">
      <svg className="gs299-brand__mark" width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" style={{ color: signal }}>
        <path d="M34 9H17L7 19V33H27L36 24H24" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="miter" />
        <path d="M12 25H17L21 14L25 30L29 19H37" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="bevel" />
        <path d="M7 37H37" stroke="currentColor" strokeWidth="1" opacity=".5"/>
      </svg>
      <span className="flex flex-col leading-none" style={{color:ink}}>
        <span className="font-display font-extrabold text-[1.08rem] tracking-[-.065em] whitespace-nowrap">GREEN<span style={{color:signal}}> SOUND</span></span>
        <span className="mt-1.5 flex items-center gap-2 text-[.62rem] font-semibold tracking-[.32em]">MUSIC <span aria-hidden="true" style={{background:signal,width:24,height:1}} /></span>
      </span>
    </Link>
  );
}
