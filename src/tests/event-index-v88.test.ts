import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const route = readFileSync("src/routes/evenimente.index.tsx", "utf8");
const css = readFileSync("src/styles/event-index-v88.css", "utf8");
describe("V88 event editorial programme", () => {
 it("keeps native event detail links and all source event records", () => {
  expect(route).toContain("events.map((event,index)");
  expect(route).toContain('to="/evenimente/$slug"');
  expect(route).toContain("params={{slug:event.slug}}");
  expect(route).toContain("event.short");
  expect(route).toContain("QuoteSection");
 });
 it("has SSR-scoped original styling and reduced-motion and mobile safeguards", () => {
  expect(route).toContain("eventIndexCss");
  expect(route).toContain("dangerouslySetInnerHTML={{__html:eventIndexCss}}");
  expect(css).toContain("@media(max-width:700px)");
  expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  expect(css).toContain(":focus-visible");
 });
});
