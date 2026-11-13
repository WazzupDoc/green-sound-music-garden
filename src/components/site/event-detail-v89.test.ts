import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { events, getService, services } from "@/data/site";
import { eventTypeOptions } from "@/lib/quote";

const jsx = readFileSync("src/components/site/EventPage.tsx", "utf8");
const css = readFileSync("src/styles/event-detail-v89.css", "utf8");
const browser = readFileSync(".github/scripts/verify-crafted-browser.cjs", "utf8");

describe("V89 real event detail production brief", () => {
  it("keeps the existing event programmes and a real detail route for every service", () => {
    const catalogue = new Set(services.map(service => service.formLabel));
    const eventsAllowed: readonly string[] = eventTypeOptions;
    expect(events.length).toBeGreaterThan(0);
    for (const event of events) {
      expect(eventsAllowed).toContain(event.formLabel);
      expect(event.moments.length).toBeGreaterThan(0);
      expect(event.recommended.length).toBeGreaterThan(0);
      expect(new Set(event.recommended.map(s => s.slug)).size).toBe(event.recommended.length);
      for (const recommendation of event.recommended) {
        expect(catalogue.has(getService(recommendation.slug).formLabel)).toBe(true);
      }
    }
  });

  it("posts nothing and hands off only trusted service form labels to actual Contact", () => {
    expect(jsx).toContain('action="/contact" method="get"');
    expect(jsx).toContain('name="event" value={event.formLabel}');
    expect(jsx).toContain('name="services" value={selectedLabels.join("|")}');
    expect(jsx).toContain("getService(item.slug)");
    expect(jsx).toContain("item.service.formLabel");
    expect(jsx).toContain("aria-pressed={isSelected}");
    expect(jsx).toContain("onClick={() => toggleService(item.slug)}");
    expect(jsx).toContain("Nu trimitem nimic automat.");
    expect(jsx).not.toContain('method="post"');
  });

  it("preserves narrative, videos, FAQ, and the existing QuoteSection", () => {
    expect(jsx).toContain("event.moments.map");
    expect(jsx).toContain("event.videos.map");
    expect(jsx).toContain("event.faqs.length");
    expect(jsx).toContain("<QuoteSection");
    expect(jsx).toContain("event.recommended.map");
    expect(jsx).toContain("rs-event-timeline");
    expect(jsx).toContain("rs-event-offerings");
  });

  it("renders the visual art direction in SSR with adaptive focus and six-width evidence", () => {
    expect(jsx).toContain('import eventDetailCss from "@/styles/event-detail-v89.css?inline"');
    expect(jsx).toContain("<style>{eventDetailCss}</style>");
    expect(css).toContain(".gs-event-v89__run");
    expect(css).toContain(".gs-event-v89__brief");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
    expect(browser).toContain('base + "/evenimente/nunti"');
    expect(browser).toContain("[360, 390, 430, 768, 1440, 1920]");
    expect(browser).toContain("event-detail-timeline-");
    expect(browser).toContain("event-detail-services-");
  });
});
