import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Lenis is a progressive enhancement, never a requirement for scrolling.
 * Desktop pointer devices only; touch, reduced-motion and data-saver remain native.
 */
export function ClientMotion() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced.matches || !mouse.matches || saveData) return;
    let disposed = false;
    let instance: import("lenis").default | undefined;
    void import("lenis").then(({ default: Lenis }) => {
      if (disposed || reduced.matches || !mouse.matches) return;
      instance = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true, wheelMultiplier: 0.86 });
    }).catch(() => { /* the native browser scrollbar is the fallback */ });
    const disable = () => { instance?.destroy(); instance = undefined; };
    reduced.addEventListener("change", disable);
    mouse.addEventListener("change", disable);
    return () => {
      disposed = true;
      reduced.removeEventListener("change", disable);
      mouse.removeEventListener("change", disable);
      instance?.destroy();
    };
  }, []);

  useEffect(() => {
    // Router handles scroll restoration; don't override position after back/forward.
    // Only close lingering scroll locks from an old mobile route.
    document.body.classList.remove("atelier-menu-locked");
  }, [pathname]);
  return null;
}
