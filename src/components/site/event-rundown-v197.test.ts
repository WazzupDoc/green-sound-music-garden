import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/site/EventPage.tsx", "utf8");
const route = readFileSync("src/routes/evenimente.$slug.tsx", "utf8");
const css = readFileSync("src/styles/event-rundown-v197.css", "utf8");

describe("V197 editorial event rundown", () => {
  it("keeps native event-to-service navigation, semantic ordered list and dynamic steps", () => {
    expect(source).toContain("<ol>{event.moments.map");
    expect(source).toContain('aria-label={`Etapa ${index + 1} din ${event.moments.length}`}');
    expect(source).toContain("getService(moment.service)");
    expect(source).toContain("Descoperă {service.name}");
    expect(source).toContain('href="#desfasurator-eveniment"');
    expect(source).toContain('tabIndex={-1}');
  });
  it("renders route-scoped style in SSR markup without global import-graph dependency", () => {
    expect(route).toContain('event-rundown-v197.css?inline');
    expect(route).toContain('<style>{eventRundownCss}</style>');
    expect(route).toContain('className="gs197-event-page"');
    expect(css).toContain(".gs197-event-page .rs-event-timeline");
  });
  it("supports small screens, visible keyboard focus and Lite/reduced-motion", () => {
    expect(css).toContain("max-width: 520px");
    expect(css).toContain("max-width: 900px");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain('data-gs-performance="lite"');
    expect(css).not.toContain("@import");
  });
});
