import { images } from "@/data/site";

/**
 * Green Sound / Show Wall, V90.
 *
 * A real-image, perspective-built visual sequence, not a simulated event,
 * a video that autoplays, or an equipment mock-up. Every image is already
 * available in Green Sound's approved project catalogue. Decorative only;
 * actual event discovery and show selection stay in the native hero controls.
 */
type ShowScene = "live" | "private" | "production";

const pictures = [
  {
    key: "live",
    image: images.scena,
    title: "STAGE",
    caption: "01 / LUMINĂ",
  },
  {
    key: "private",
    image: images.dj,
    title: "PEOPLE",
    caption: "02 / MUZICĂ",
  },
  {
    key: "production",
    image: images.concert,
    title: "LIVE",
    caption: "03 / ENERGIE",
  },
] as const;

export function KineticShowWall({ active }: { active: ShowScene }) {
  return (
    <div className="gs-v90-show-wall" data-active={active} aria-hidden="true">
      <div className="gs-v90-show-wall__number">
        <span>GREEN SOUND</span>
        <strong>01—03</strong>
        <span>THE LIVE EDITION</span>
      </div>

      <div className="gs-v90-show-wall__rig">
        <div className="gs-v90-show-wall__backplane" />
        {pictures.map((picture, index) => (
          <figure
            className={`gs-v90-show-wall__frame gs-v90-show-wall__frame--${picture.key}`}
            data-depth={index + 1}
            key={picture.key}
          >
            <img
              src={picture.image.src}
              alt=""
              width={picture.image.w}
              height={picture.image.h}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>{picture.caption}</span>
              <strong>{picture.title}</strong>
            </figcaption>
            <span className="gs-v90-show-wall__frame-corner" />
          </figure>
        ))}
        <div className="gs-v90-show-wall__scan" />
        <div className="gs-v90-show-wall__rail">
          <span>GSM / CREATIVE PRODUCTION</span>
          <span>VISUAL SEQUENCE — 0{pictures.findIndex(p => p.key === active) + 1}</span>
        </div>
      </div>
      <span className="gs-v90-show-wall__axis">SOUND / LIGHT / PEOPLE — PITESTI</span>
    </div>
  );
}
