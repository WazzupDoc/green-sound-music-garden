import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getBrowserConnection, getPerformanceSignals, shouldUseLiteEffects } from "@/lib/performance";

/**
 * Native browser interaction is always the fallback. A low-power/Save-Data
 * profile only deactivates visual flourishes, never site content or controls.
 * Device signals are evaluated locally, never sent or stored.
 */
export function ClientMotion() {
  const pathname = useRouterState({ select: state => state.location.pathname });

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = getBrowserConnection();
    const apply = () => {
      document.documentElement.dataset["gsPerformance"] =
        shouldUseLiteEffects(getPerformanceSignals()) ? "lite" : "full";
    };
    apply();
    motion.addEventListener("change", apply);
    connection?.addEventListener?.("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      connection?.removeEventListener?.("change", apply);
      delete document.documentElement.dataset["gsPerformance"];
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const connection = getBrowserConnection();
    // Lenis is an optional enhancement for powerful desktop pointing devices.
    // Do not fetch its JS at all in adaptive lite mode.
    if (shouldUseLiteEffects(getPerformanceSignals()) || !mouse.matches) return;

    let disposed = false;
    let instance: import("lenis").default | undefined;
    void import("lenis").then(({ default: Lenis }) => {
      if (disposed || shouldUseLiteEffects(getPerformanceSignals()) || !mouse.matches) return;
      instance = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true, wheelMultiplier: 0.86 });
    }).catch(() => { /* native browser scrolling still works */ });

    const disable = () => {
      instance?.destroy();
      instance = undefined;
    };
    const onEnvironmentChange = () => {
      // If a user requests less motion/data after load, destroy Lenis immediately.
      // Native scrolling remains usable, and no extra script is downloaded.
      if (!mouse.matches || shouldUseLiteEffects(getPerformanceSignals())) disable();
    };
    reduced.addEventListener("change", onEnvironmentChange);
    mouse.addEventListener("change", onEnvironmentChange);
    connection?.addEventListener?.("change", onEnvironmentChange);
    return () => {
      disposed = true;
      reduced.removeEventListener("change", onEnvironmentChange);
      mouse.removeEventListener("change", onEnvironmentChange);
      connection?.removeEventListener?.("change", onEnvironmentChange);
      disable();
    };
  }, []);

  useEffect(() => {
    // Router owns scroll restoration: clear only stale mobile menu locks.
    document.body.classList.remove("atelier-menu-locked");
  }, [pathname]);

  return null;
}
