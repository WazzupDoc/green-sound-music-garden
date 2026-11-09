import { Link } from "@tanstack/react-router";

export function Logo({ tone = "stage" }: { tone?: "stage" | "paper" }) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-3"
      aria-label="Green Sound Music — pagina principală"
    >
      <span
        aria-hidden
        className="relative grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-[20deg]"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M5 10v4M9 7v10M13 4v16M17 8v8M21 11v2" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold tracking-tight ${tone === "paper" ? "text-paper-foreground" : "text-foreground"}`}
        >
          Green Sound
        </span>
        <span className="serif-accent text-sm text-primary">music · din 2008</span>
      </span>
    </Link>
  );
}
