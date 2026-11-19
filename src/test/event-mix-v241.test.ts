import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { events, getService } from "@/data/site";

const eventPage = readFileSync(resolve(process.cwd(), "src/components/site/EventPage.tsx"), "utf8");
const route = readFileSync(resolve(process.cwd(), "src/routes/evenimente.$slug.tsx"), "utf8");
const contact = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");
const style = readFileSync(resolve(process.cwd(), "src/styles/event-offerings-v241.css"), "utf8");

describe("V241 native event mix -> Contact handoff", () => {
  it("allows all genuine recommended event services to travel in one editable brief", () => {
    expect(eventPage).toContain('event.recommended.map(item => getService(item.slug).formLabel)');
    expect(eventPage).toContain('encodeURIComponent(event.formLabel)');
    expect(eventPage).toContain('encodeURIComponent(serviceLabels.join("|"))');
    expect(eventPage).toContain("Pregătește cererea cu aceste servicii");
    expect(eventPage).toContain("Mesajul nu se trimite automat.");
    expect(contact).toContain("parseServices(serviceValue)");

    for (const event of events) {
      const selected = [...new Set(event.recommended.map(item => getService(item.slug).formLabel))];
      expect(selected.length).toBeGreaterThan(0);
      expect(selected.length).toBeLessThanOrEqual(8);
      const url = new URL(`https://greensoundmusic.com/contact?event=${encodeURIComponent(event.formLabel)}&services=${encodeURIComponent(selected.join("|"))}`);
      expect(url.searchParams.get("event")).toBe(event.formLabel);
      expect(url.searchParams.get("services")?.split("|")).toEqual(selected);
      expect(url.searchParams.get("services")?.length).toBeLessThanOrEqual(900);
    }
  });

  it("keeps separate SSR service details, event selection, and no-backend semantics", () => {
    expect(eventPage).toContain('aria-label="Servicii propuse pentru eveniment"');
    expect(eventPage).toContain('aria-label={`Detalii despre ${service.name}`}');
    expect(eventPage).toContain("viewTransition className=\"gs241-mix__detail\"");
    expect(eventPage).toContain("id=\"servicii-potrivite\"");
    expect(route).toContain('event-offerings-v241.css?inline');
    expect(route).toContain("<style>{eventMixCss}</style>");
    expect(eventPage).not.toContain("fetch(briefHref");
  });

  it("keeps an accessible responsive visual difference without always-on motion", () => {
    expect(style).toContain(".gs197-event-page .gs241-mix__number");
    expect(style).toContain(".gs197-event-page .gs241-mix__brief:focus-visible");
    expect(style).toContain("@media (max-width: 550px)");
    expect(style).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(style).toContain('html:not([data-gs-performance="lite"])');
    expect(style).not.toContain("@keyframes");
  });
});
