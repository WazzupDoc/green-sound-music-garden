import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/data/site";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-screen viewer for real Green Sound videos and photos.
 * Arrow keys, swipe and the filmstrip move between items; videos load only once opened.
 */
export function MediaLightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: MediaItem[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const item = open ? items[index] : undefined;
  const touchX = useRef<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (index === null) return;
    strip.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1", playsinline: "1" });
  if (item?.video?.start) params.set("start", String(item.video.start));

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col text-foreground outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          {item && (
            <>
              <div className="container-site flex items-center justify-between gap-4 py-4">
                <p className="label-tech text-foreground/60">
                  <span className="text-primary">{pad((index ?? 0) + 1)}</span> / {pad(items.length)} · {item.kind === "video" ? "Video" : "Foto"}
                </p>
                <Dialog.Close className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary" aria-label="Închide">
                  <X className="size-5" aria-hidden />
                </Dialog.Close>
              </div>

              <div
                className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
                onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
                onTouchEnd={(e) => {
                  const start = touchX.current;
                  const end = e.changedTouches[0]?.clientX;
                  touchX.current = null;
                  if (start == null || end == null || Math.abs(end - start) < 50) return;
                  go(end < start ? 1 : -1);
                }}
              >
                {item.kind === "video" && item.video ? (
                  <div key={item.key} className="aspect-video w-full max-w-6xl overflow-hidden rounded-lg bg-card">
                    <iframe
                      className="size-full"
                      src={`https://www.youtube-nocookie.com/embed/${item.video.id}?${params}`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    key={item.key}
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    className="max-h-full w-auto max-w-full animate-in fade-in-0 rounded-lg object-contain duration-500"
                  />
                )}
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Anterior"
                  className="absolute left-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-border bg-ink/60 transition-colors hover:border-primary hover:text-primary md:grid"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Următorul"
                  className="absolute right-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-border bg-ink/60 transition-colors hover:border-primary hover:text-primary md:grid"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>

              <div className="container-site flex items-end justify-between gap-6 pb-3 pt-5">
                <div className="min-w-0">
                  <Dialog.Title className="font-display text-lg font-semibold leading-tight md:text-2xl">{item.title}</Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-muted-foreground">{item.caption}</Dialog.Description>
                </div>
                <div className="flex shrink-0 gap-2 md:hidden">
                  <button type="button" onClick={() => go(-1)} aria-label="Anterior" className="grid size-11 place-items-center rounded-full border border-border">
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Următorul" className="grid size-11 place-items-center rounded-full border border-border">
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                </div>
              </div>

              <div ref={strip} className="no-scrollbar flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)] pb-[max(1rem,env(safe-area-inset-bottom))]">
                {items.map((it, i) => (
                  <button
                    key={it.key}
                    type="button"
                    data-i={i}
                    onClick={() => onIndex(i)}
                    aria-label={`Deschide: ${it.title}`}
                    aria-current={i === index}
                    className={`relative h-14 shrink-0 overflow-hidden rounded-md transition-all md:h-16 ${
                      i === index ? "opacity-100 ring-2 ring-primary" : "opacity-45 hover:opacity-80"
                    }`}
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <img src={it.video ? `https://i.ytimg.com/vi/${it.video.id}/mqdefault.jpg` : it.src} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
                    {it.kind === "video" && <Play className="absolute bottom-1.5 left-1.5 size-3 fill-current" aria-hidden />}
                  </button>
                ))}
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Convenience hook: `const lb = useLightbox(items)` → `lb.open(i)` and render `lb.node`. */
export function useLightbox(items: MediaItem[]) {
  const [index, setIndex] = useState<number | null>(null);
  return {
    open: (i: number) => setIndex(i),
    node: <MediaLightbox items={items} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />,
  };
}
