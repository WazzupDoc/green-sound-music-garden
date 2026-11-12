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
    document.body.classList.remove("atelier-menu-locked");
  }, [pathname]);
  return null;
}
