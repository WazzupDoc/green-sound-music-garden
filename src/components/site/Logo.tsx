import { Link } from "@tanstack/react-router";

/** Uses the actual Green Sound project favicon, never a generated placeholder logo. */
export function Logo({ tone = "stage" }: { tone?: "stage" | "paper" }) {
  return (
    <Link to="/" className="group inline-flex shrink-0 items-center gap-3" aria-label="Green Sound Music — pagina principală">
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden ">
        <img src="/favicon.png" width={40} height={40} decoding="async" alt="" className="size-full object-contain " />
      </span>
      <span className="flex flex-col leading-[1.03]">
        <span className={`font-display text-base font-bold tracking-tight ${tone === "paper" ? "text-paper-foreground" : "text-foreground"}`}>GREEN SOUND</span>
        <span className="mt-1 text-xs font-bold tracking-[.24em] text-[#B8BCB9]">MUSIC</span>
      </span>
    </Link>
  );
}
