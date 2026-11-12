import { useEffect, useRef } from "react";
import { BeamPhoto } from "@/components/site/BeamPhoto";
import type { ImageRef } from "@/data/site";

/** A rig drawing supports actual equipment photography; it is not a claim
 * about the precise layout used at a particular Green Sound event. */
export function StageRig({ image }: { image: ImageRef }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport * 0.95)));
      element.style.setProperty("--rig-progress", progress.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={host} className="rs-stage-rig">
      <BeamPhoto image={image} className="rs-stage-rig__image" decorative />
      <svg className="rs-stage-rig__drawing" viewBox="0 0 800 300"
        fill="none" stroke="#1CD10C" strokeWidth="2" aria-hidden="true">
        <path pathLength={1} d="M40 60H760M80 60V280M720 60V280"/>
        <path pathLength={1} d="M160 60l-40 120M320 60l-20 140M480 60l20 140M640 60l40 120"
          stroke="#FFFFFF" opacity=".78"/>
        <rect pathLength={1} x="90" y="190" width="60" height="90"/>
        <rect pathLength={1} x="650" y="190" width="60" height="90"/>
        <path pathLength={1} d="M60 280H740"/>
      </svg>
      <span className="rs-stage-rig__caption">Schiță ilustrativă de scenă · Configurația se stabilește după locație</span>
    </div>
  );
}

/** Three lightweight atmospheric shapes, displayed only on the actual
 * smoke-effect service and paused when the image leaves the viewport. */
export function SmokePhoto({ image }: { image: ImageRef }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const io = new IntersectionObserver(([entry]) => {
      element.dataset["visible"] = entry?.isIntersecting ? "true" : "false";
    }, { threshold: 0, rootMargin: "80px" });
    const setPause = () => {
      element.dataset["paused"] = document.hidden ? "true" : "false";
    };
    io.observe(element);
    document.addEventListener("visibilitychange", setPause);
    setPause();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", setPause);
    };
  }, []);
  return <div ref={host} className="rs-effect-photo" data-visible="false">
    <BeamPhoto image={image} />
    <div className="rs-effect-smoke" aria-hidden="true"><span /><span /><span /></div>
  </div>;
}
