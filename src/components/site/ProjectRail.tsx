import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/data/site";
import { useLightbox } from "./MediaLightbox";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Horizontal, navigable project rail: swipe on phones, drag / arrows / buttons on desktop.
 * Every tile opens the full-screen viewer at that item.
 */
export function ProjectRail({ items, label = "Galerie proiecte" }: { items: MediaItem[]; label?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const lb = useLightbox(items);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    const tiles = Array.from(el.children) as HTMLElement[];
    const x = el.scrollLeft + 8;
    let idx = 0;
    tiles.forEach((t, i) => {
      if (t.offsetLeft - el.offsetLeft <= x + 1) idx = i;
    });
    if (max > 0 && el.scrollLeft >= max - 4) idx = tiles.length - 1;
    setActive(idx);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, items]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carusel" aria-label={label}>
      <div
        ref={track}
        onScroll={update}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (!d.moved && Math.abs(dx) > 6) {
            d.moved = true;
            setDragging(true);
          }
          if (d.moved) track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          setTimeout(() => (drag.current = null), 0);
          setDragging(false);
        }}
        onPointerLeave={() => {
          drag.current = null;
          setDragging(false);
        }}
        className={`no-scrollbar flex gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)] pb-2 outline-none focus-visible:ring-2 focus-visible:ring-ring md:gap-5 ${
          dragging ? "cursor-grabbing snap-none select-none" : "cursor-grab snap-x snap-mandatory"
        } scroll-px-[clamp(1.25rem,4vw,3rem)]`}
      >
        {items.map((it, i) => (
          <button
            key={it.key}
            type="button"
            onClick={(e) => {
              if (drag.current?.moved) {
                e.preventDefault();
                return;
              }
              lb.open(i);
            }}
            aria-label={`${it.kind === "video" ? "Redă videoclipul" : "Vezi fotografia"}: ${it.title}`}
            className="group relative h-[19rem] max-w-[86vw] shrink-0 snap-start overflow-hidden rounded-lg bg-card text-left sm:h-[24rem] lg:h-[28rem]"
            style={{ aspectRatio: `${it.w} / ${it.h}` }}
          >
            <img
              src={it.src}
              alt=""
              width={it.w}
              height={it.h}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <span className="scrim-bottom absolute inset-0" />
            <span className="label-tech absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-foreground/85 backdrop-blur-sm">
              {pad(i + 1)} · {it.kind === "video" ? "Video" : "Foto"}
            </span>
            {it.kind === "video" && (
              <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 size-4 fill-current" aria-hidden />
              </span>
            )}
            <span className="absolute inset-x-4 bottom-4 block translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
              <span className="block font-display text-lg font-semibold leading-tight md:text-xl">{it.title}</span>
              <span className="mt-1 line-clamp-1 block text-sm text-foreground/70">{it.caption}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="container-site mt-6 flex items-center gap-5">
        <p className="label-tech w-16 shrink-0 text-foreground/60" aria-live="polite">
          <span className="text-foreground">{pad(active + 1)}</span> / {pad(items.length)}
        </p>
        <div className="relative h-px flex-1 bg-border">
          <span
            className="absolute inset-y-0 left-0 w-full origin-left bg-primary transition-transform duration-200"
            style={{ transform: `scaleX(${Math.max(0.04, progress)})` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Înapoi" className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary">
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Înainte" className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary">
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
      {lb.node}
    </div>
  );
}
