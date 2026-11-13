import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { ImageRef } from "@/data/site";

type Props = {
  image: ImageRef;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  transitionName?: string;
};

/** The same real photo remains visible without JavaScript and reduced motion. */
export function BeamPhoto({ image, className = "", priority = false, decorative = false, transitionName }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVisible(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.12, rootMargin: "20px" });
    io.observe(element);
    // On touch the centered photo receives the light; this observer is cheap
    // and changes state only when the centered frame changes.
    const touch = window.matchMedia("(hover: none)");
    let centerObserver: IntersectionObserver | undefined;
    if (touch.matches) {
      centerObserver = new IntersectionObserver(([entry]) => {
        setFocused(Boolean(entry?.isIntersecting));
      }, {rootMargin: "-32% 0px -32% 0px", threshold: 0});
      centerObserver.observe(element);
    }
    setReady(true);
    return () => {io.disconnect();centerObserver?.disconnect();};
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || document.documentElement.dataset['gsPerformance'] === "lite") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--beam-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--beam-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={host} className={`gs-beam-photo ${className}`} data-ready={ready}
      data-visible={visible} data-focused={focused} onPointerMove={move}>
      <img src={image.src} alt={decorative ? "" : image.alt}
        width={image.w} height={image.h} fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"} decoding="async"
        style={transitionName ? ({ viewTransitionName: transitionName } as CSSProperties) : undefined} />
      <span className="gs-beam-photo__light" aria-hidden="true" />
    </div>
  );
}
