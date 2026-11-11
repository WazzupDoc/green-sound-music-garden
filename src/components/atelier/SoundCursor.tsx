import { useEffect, useRef, useState } from "react";
import { Music2, WandSparkles } from "lucide-react";

/**
 * Brand-driven visual cursor accent.
 * Decorative only: the actual operating-system pointer and precise click hotspot
 * remain completely untouched. A single RAF writes composited transforms — no
 * React render per move, GSAP/canvas dependency, or tracking/analytics.
 */
export function SoundCursor() {
  const [enabled, setEnabled] = useState(true);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = followerRef.current;
    const label = labelRef.current;
    if (!node || !label || !enabled) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!fine.matches || reduced.matches || saveData) return;

    const target = { x: -150, y: -150 };
    const current = { x: -150, y: -150 };
    let raf = 0;
    let moving = false;
    let awake = false;

    const animate = () => {
      raf = 0;
      if (!awake) return;
      // The visual decoration eases; the real cursor never lags.
      current.x += (target.x - current.x) * 0.3;
      current.y += (target.y - current.y) * 0.3;
      node.style.transform = `translate3d(${current.x + 18}px,${current.y + 15}px,0)`;
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.6) {
        raf = window.requestAnimationFrame(animate);
      } else {
        moving = false;
      }
    };
    const tick = () => {
      if (!moving) {
        moving = true;
        raf = window.requestAnimationFrame(animate);
      }
    };
    const hide = () => {
      awake = false;
      node.dataset.visible = "false";
      window.cancelAnimationFrame(raf);
      raf = 0;
      moving = false;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced.matches || !fine.matches) return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!awake) {
        current.x = target.x;
        current.y = target.y;
        awake = true;
        node.dataset.visible = "true";
      }
      const element = event.target instanceof Element ? event.target : null;
      const excluded = element?.closest("input, textarea, select, [contenteditable='true'], [role='dialog']");
      node.dataset.visible = excluded ? "false" : "true";
      const interactive = element?.closest("a, button, summary, [data-cursor-label]");
      const hint = interactive?.getAttribute("data-cursor-label") ??
        (interactive?.matches("a") ? "EXPLOREAZĂ" :
          interactive?.matches("button, summary") ? "SELECTEAZĂ" : "");
      node.dataset.active = interactive && !excluded ? "true" : "false";
      label.textContent = excluded ? "" : hint.slice(0, 24);
      tick();
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const onVisibility = () => { if (document.hidden) hide(); };
    const onMotionChange = () => { if (reduced.matches || !fine.matches) hide(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotionChange);
    fine.addEventListener("change", onMotionChange);
    return () => {
      hide();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotionChange);
      fine.removeEventListener("change", onMotionChange);
    };
  }, [enabled]);

  return (
    <>
      <div ref={followerRef} className="gs-cursor" aria-hidden="true"
        data-visible="false" data-active="false">
        <div className="gs-cursor__halo" />
        <svg className="gs-cursor__note" width="23" height="25" viewBox="0 0 23 25" fill="none"
          aria-hidden="true" focusable="false">
          <path d="M8 17V5L19 2v11" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
          <ellipse cx="5" cy="19" rx="4.1" ry="2.8" transform="rotate(-18 5 19)" fill="currentColor"/>
          <ellipse cx="16" cy="15" rx="4.1" ry="2.8" transform="rotate(-18 16 15)" fill="currentColor"/>
          <path d="M8 8 19 5" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <span className="gs-cursor__meter" aria-hidden="true"><i/><i/><i/><i/></span>
        <span ref={labelRef} className="gs-cursor__label" />
      </div>
      <button type="button" className="gs-cursor__toggle" aria-pressed={enabled}
        aria-label={enabled ? "Dezactivează cursorul muzical decorativ" : "Activează cursorul muzical decorativ"}
        onClick={() => setEnabled(value => !value)}>
        {enabled ? <Music2 className="size-4" aria-hidden /> : <WandSparkles className="size-4" aria-hidden />}
        <span>CURSOR FX: {enabled ? "ON" : "OFF"}</span>
      </button>
    </>
  );
}
