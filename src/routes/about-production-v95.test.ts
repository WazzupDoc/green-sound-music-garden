import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const route = readFileSync("src/routes/despre-noi.tsx", "utf8");
const css = readFileSync("src/styles/about-production-v95.css", "utf8");
describe("V95 About editorial production notes", () => {
 it("preserves canonical route, truthful content and real navigation", () => {
  expect(route).toContain('createFileRoute("/despre-noi")');
  expect(route).toContain('path: "/despre-noi"');
  expect(route).toContain("business.founded");
  expect(route).toContain("process.map");
  expect(route).toContain('to="/servicii"');
  expect(route).toContain('to="/contact"');
  expect(route).toContain("images.scena");
  expect(route).toContain("images.dj");
  expect(route).not.toContain("images.unsplash.com");
 });
 it("has accessible semantic landmarks, one H1, and first-party SSR scoped styles", () => {
  expect((route.match(/<h1\b/g)||[]).length).toBe(1);
  expect(route).toContain('aria-label="Fir de navigare"');
  expect(route).toContain('aria-current="page"');
  expect(route).toContain("<ol");
  expect(route).toContain("aboutCss}</style>");
  expect(css).toContain(".gs-about-v95__hero-grid");
  expect(css).toContain(".gs-about-v95__steps");
  expect(css).toContain(":focus-visible");
  expect(css).toContain("@media(max-width:480px)");
  expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  expect(css).toContain("html[data-gs-performance=lite]");
 });
});
