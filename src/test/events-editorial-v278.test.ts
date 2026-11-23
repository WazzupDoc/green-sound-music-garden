import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("V278 events editorial five-track selector", () => {
  const route = readFileSync("src/routes/evenimente.index.tsx", "utf8");
  const css = readFileSync("src/styles/event-editorial-setlist-v278.css", "utf8");

  it("renders a real section heading and maintains five native selection buttons and direct event links", () => {
    expect(route).toContain('className="gs173-events gs198-events gs201-events gs278-events"');
    expect(route).toContain('<h2>Alege <em>ritmul.</em></h2>');
    expect(route).toContain('className="gs173-setlist__select"');
    expect(route).toContain('aria-pressed={selected}');
    expect(route).toContain('className="gs173-setlist__route"');
    expect(route).toContain('onKeyDown={(keyEvent) => onSetlistKeyDown(keyEvent, index)}');
  });

  it("replaces repeated five-column cards with stacked rows and no horizontal mobile rail", () => {
    expect(css).toContain(".gs278-events .gs173-setlist {");
    expect(css).toMatch(/\.gs278-events \.gs173-setlist\s*\{[^}]*display:\s*block/s);
    expect(css).toMatch(/\.gs278-events \.gs173-setlist\s*\{[^}]*overflow:\s*visible/s);
    expect(css).toMatch(/@media \(max-width: 600px\)/);
    expect(css).toContain('grid-template-columns: 1fr;');
  });

  it("keeps interaction, motion and performance guardrails", () => {
    expect(css).toContain('data-active="true"');
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain('data-gs-performance="lite"');
    expect(route).toContain('fetchPriority={visualIndex === 1 ? "high" : undefined}');
    expect(route).toContain('event.moments.slice(0, 3)');
  });
});
