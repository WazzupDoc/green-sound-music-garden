import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getBrowserConnection, getPerformanceSignals, shouldUseLiteEffects } from "@/lib/performance";

/** Adaptive performance, browser-native scrolling; no decorative cursor. */
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
    const valid = (mode: string | null) =>
      mode === "verde" || mode === "cald" || mode === "albastru" || mode === "neutru"
        ? mode : "neutru";
    let stored: string | null = null;
    try { stored = window.localStorage.getItem("gsm-light"); } catch { /* storage unavailable */ }
    document.documentElement.dataset["light"] = valid(stored);

    const sync = (event: StorageEvent) => {
      if (event.key === "gsm-light") {
        document.documentElement.dataset["light"] = valid(event.newValue);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    document.body.classList.remove("atelier-menu-locked");
  }, [pathname]);
  return null;
}
