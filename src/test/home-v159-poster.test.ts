import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const route=readFileSync("src/routes/index.tsx","utf8");
const page=readFileSync("src/components/atelier/ConceptHomeV170.tsx","utf8");
const css=readFileSync("src/styles/home-rebuild-v297.css","utf8");
describe("V170 removes rejected static hero without regressing movie and contact",()=>{
 it("switches route to concept and source-backed stage with interactive visual production desk",()=>{
   expect(route).toContain('className="gs170-home"');
   expect(route).not.toMatch(/gs166-home|gs168-home|home-cover-v159/);
   expect(page).not.toContain('className="gs170-stage__console"');
   expect(page).toContain('className="gs297-diptych"');
   expect(css).toContain(".gs297-diptych");
 });
 it("uses a true modal for films with separate visitor Play",()=>{
   expect(page).toContain("setFilmIndex(index)");
   expect(page).toContain("<Dialog open={filmIndex !== null}");
   expect(page).toContain("<VideoLite");
   expect(page).toContain("if (!open) setFilmIndex(null)");
 });
 it("keeps clear source and performance fallbacks",()=>{
   expect(page).toContain("images.concert.src");
   expect(page).toContain("images.dj.src");
   expect(css).toContain('html[data-gs-performance="lite"]');
   expect(css).toContain('.gs170-hero__control button[aria-pressed="true"]');
 });
});
