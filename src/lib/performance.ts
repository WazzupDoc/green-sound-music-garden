/**
 * Opt-in-to-less-motion device heuristics, evaluated only in the browser.
 *
 * Network Information and deviceMemory are non-Baseline: missing properties
 * must never be treated as a slow device. No metrics are sent or persisted.
 * This controls decorative effects only; content and interactions stay intact.
 */
export type PerformanceSignals = {
  reducedMotion?: boolean | undefined;
  saveData?: boolean | undefined;
  effectiveType?: string | undefined;
  deviceMemory?: number | undefined;
  hardwareConcurrency?: number | undefined;
};

export function shouldUseLiteEffects({
  reducedMotion,
  saveData,
  effectiveType,
  deviceMemory,
  hardwareConcurrency,
}: PerformanceSignals): boolean {
  if (reducedMotion === true || saveData === true) return true;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return true;
  if (typeof deviceMemory === "number" && deviceMemory > 0) {
    if (deviceMemory <= 2) return true;
    if (deviceMemory <= 4 &&
      typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4) return true;
  }
  return false;
}

type BrowserConnection = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (name: "change", callback: () => void) => void;
  removeEventListener?: (name: "change", callback: () => void) => void;
};

export function getPerformanceSignals(): PerformanceSignals {
  const nav = navigator as Navigator & {
    connection?: BrowserConnection;
    deviceMemory?: number;
  };
  return {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: nav.connection?.saveData,
    effectiveType: nav.connection?.effectiveType,
    deviceMemory: nav.deviceMemory,
    hardwareConcurrency: nav.hardwareConcurrency,
  };
}

/** Return the connection if supported, otherwise undefined with no polyfill. */
export function getBrowserConnection(): BrowserConnection | undefined {
  return (navigator as Navigator & { connection?: BrowserConnection }).connection;
}
