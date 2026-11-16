import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { events, getService } from "@/data/site";
const route = readFileSync("src/routes/evenimente.index.tsx", "utf8");
const css = readFileSync("src/styles/event-index-v172.css", "utf8");

describe("V172 event direction console — SSR + navigation + motion contract", () => {
  it("renders all real event choices with direct detail routes even without hydration", () => {
    expect(events.length).toBe(5);
    expect(new Set(events.map(event => event.slug)).size).toBe(events.length);
    expect(route).toContain("events.map((event, index)");
    expect(route).toContain('to="/evenimente/$slug"');
    expect(route).toContain("params={{ slug: event.slug }}");
    expect(route).toContain('className="gs172-programme__detail"');
    expect(route).toContain("QuoteSection");
  });
  it("offers native preview buttons and explicit keyboard arrow/home/end selection", () => {
    expect(route).toContain('aria-pressed={selected}');
    expect(route).toContain('aria-controls="gs172-stage"');
    expect(route).toContain('event.key === "ArrowDown"');
    expect(route).toContain('event.key === "ArrowUp"');
    expect(route).toContain('event.key === "Home"');
    expect(route).toContain('event.key === "End"');
    expect(route).toContain('aria-live="polite"');
    expect(route).toContain("setActiveSlug");
  });
  it("preserves event and genuine service deep links, without simulated sends", () => {
    for (const event of events) {
      expect(event.formLabel).toBeTruthy();
      for (const rec of event.recommended.slice(0,3)) expect(getService(rec.slug).name).toBeTruthy();
    }
    expect(route).toContain("encodeURIComponent(activeEvent.formLabel)");
    expect(route).toContain('to={`/${service.slug}`}');
    expect(route).not.toContain("fetch(");
  });
  it("keeps route-scoped SSR CSS, responsive focus and Lite/reduced-motion safeguards", () => {
    expect(route).toContain('import eventIndexCss from "@/styles/event-index-v172.css?inline"');
    expect(route).toContain("<style>{eventIndexCss}</style>");
    expect(css).toContain("@media(max-width:760px)");
    expect(css).toContain("@media(max-width:460px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("data-gs-performance=lite");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("@keyframes gs172-scene-in");
    expect(css).not.toContain("autoplay");
  });
});
