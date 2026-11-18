import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { events, services } from "@/data/site";
import { CategorySignal } from "@/components/site/CategorySignal";
import { renderToStaticMarkup } from "react-dom/server";

const eventPage = readFileSync("src/routes/evenimente.index.tsx", "utf8");
const servicePage = readFileSync("src/routes/servicii.tsx", "utf8");
const css = readFileSync("src/styles/category-signature-v198.css", "utf8");

describe("V198 original SVG category cues", () => {
  it("provides an individual SSR vector for every real event and service", () => {
    expect(events).toHaveLength(5);
    expect(services).toHaveLength(8);
    for (const kind of [...events.map(event => event.slug), ...services.map(service => service.slug)]) {
      const markup = renderToStaticMarkup(<CategorySignal kind={kind} />);
      expect(markup).toContain(`data-kind="${kind}"`);
      expect(markup).toContain('aria-hidden="true"');
      expect(markup).toContain("<svg");
      expect(markup).toContain("<path");
      expect(markup).toContain('data-play="false"');
    }
  });
  it("replays the selected cue on repeated clicks and keyboard changes without autoplay", () => {
    expect(eventPage).toContain('const [cueRevision, setCueRevision] = useState(0)');
    expect(eventPage).toContain("setCueRevision(previous => previous + 1)");
    expect(eventPage).toContain("kind={event.slug}");
    expect(eventPage).toContain("play={selected && cueRevision > 0}");
    expect(eventPage).toContain('aria-pressed={selected}');
    expect(eventPage).toContain('aria-controls="gs173-selected-programme"');
  });
  it("preserves direct service links and keeps new CSS strictly route-scoped and motion-safe", () => {
    expect(servicePage).toContain('kind={service.slug}');
    expect(servicePage).toContain('to={`/${service.slug}`}');
    expect(eventPage).toContain('category-signature-v198.css?inline');
    expect(servicePage).toContain('category-signature-v198.css?inline');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('data-gs-performance="lite"');
    expect(css).toContain('gs198-party-burst');
    expect(css).toContain('gs198-record-turn');
    expect(css).toContain('gs198-beam-sweep');
    expect(css).not.toContain("@import");
  });
});
