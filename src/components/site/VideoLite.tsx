import { Play, Square } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { Video } from "@/data/site";

/**
 * Click-to-load YouTube player: shows a poster only, so no third-party scripts,
 * cookies or sound load until the visitor presses play (youtube-nocookie).
 */
export function VideoLite({ video, className = "", priority = false }: { video: Video; className?: string; priority?: boolean }) {
  const [active, setActive] = useState(false);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);
  useLayoutEffect(() => {
    // React has committed the poster button before focus is restored.
    if (!active && restoreFocusRef.current) {
      restoreFocusRef.current = false;
      playButtonRef.current?.focus();
    }
  }, [active]);
  const stopPlayback = () => {
    // Unmounting the iframe stops both audio and network playback immediately.
    restoreFocusRef.current = true;
    setActive(false);
  };
  const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1" });
  if (video.start) params.set("start", String(video.start));

  return (
    <figure className={className}>
      <div className="group relative aspect-video overflow-hidden bg-card">
        {active ? (
          <>
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?${params}`}
            title={video.title}
            referrerPolicy="no-referrer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button type="button" onClick={stopPlayback}
            className="absolute right-3 top-3 z-10 inline-flex min-h-11 items-center gap-2 border border-white/60 bg-[#0A0F15] px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`Oprește filmarea: ${video.title}`}>
            <Square className="size-4 fill-current" aria-hidden /> Oprește
          </button>
          </>
        ) : (
          <button
            type="button"
            ref={playButtonRef}
            onClick={() => setActive(true)}
            className="absolute inset-0 size-full text-left"
            aria-label={`Redă videoclipul: ${video.title}`}
          >
            {video.poster ? (
              <img
                src={video.poster}
                alt=""
                width={1280}
                height={720}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 bg-[#0A0F15]" />
            )}
            <span className="hero-fade absolute inset-0 opacity-80" />
            <span className="absolute left-5 top-5 inline-flex min-h-11 items-center gap-3 border border-[#F3F0E9a8] bg-[#0A0F15e8] px-4 py-2 text-base font-semibold text-[#F3F0E9]">
              <Play className="size-5 fill-current" aria-hidden /> Redă filmarea
            </span>
            <span className="absolute inset-x-5 bottom-4 font-display text-lg font-semibold leading-tight text-[#F3F0E9]">
              {video.title}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">{video.caption}</figcaption>
    </figure>
  );
}
