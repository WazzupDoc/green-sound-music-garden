import { Play } from "lucide-react";
import { useState } from "react";
import type { Video } from "@/data/site";

/**
 * Click-to-load YouTube player: shows a poster only, so no third-party scripts,
 * cookies or sound load until the visitor presses play (youtube-nocookie).
 */
export function VideoLite({ video, className = "", priority = false }: { video: Video; className?: string; priority?: boolean }) {
  const [active, setActive] = useState(false);
  const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1" });
  if (video.start) params.set("start", String(video.start));

  return (
    <figure className={className}>
      <div className="group relative aspect-video overflow-hidden rounded-xl bg-card">
        {active ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?${params}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            data-cursor-label="PLAY FILM"
            className="absolute inset-0 size-full text-left"
            aria-label={`Redă videoclipul: ${video.title}`}
          >
            <img
              src={video.poster ?? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              width={video.poster ? 1280 : 480}
              height={video.poster ? 720 : 360}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="hero-fade absolute inset-0 opacity-80" />
            <span className="absolute left-5 top-5 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 size-5 fill-current" aria-hidden />
            </span>
            <span className="absolute inset-x-5 bottom-4 font-display text-lg font-semibold leading-tight text-foreground">
              {video.title}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">{video.caption}</figcaption>
    </figure>
  );
}
