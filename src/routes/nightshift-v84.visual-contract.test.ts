import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const route=readFileSync("src/routes/index.tsx","utf8");
const page=readFileSync("src/components/atelier/ConceptHomeV170.tsx","utf8");
const css=readFileSync("src/styles/home-reference-v170.css","utf8");
describe("V170 authentic event-production art direction",()=>{
 it("imports one source-authored reference design, no stacked legacy masks",()=>{
   expect(route).toContain("home-reference-v170.css?inline");
   expect(route).toContain("<ConceptHomeV170 />");
   expect(route).not.toMatch(/home-direction-v160.css|home-rebuild-v166.css|home-v168-dark-live.css/);
   expect(css).toContain(".gs170-home .gs170-stage__console");
 });
 it("keeps source production photography, opt-in beams, all services and process details",()=>{
   expect(page).toContain("images.concert.src");
   expect(page).toContain('className="gs170-stage__beams"');
   expect(page).not.toContain('className="gs170-stage__console"');
   expect(page).toContain('className="gs244-hero__title"');
   expect(page).toContain("serviceDirectory.map(({ title, items })");
   expect(page).toContain("process.map(step");
   expect(css).toContain("@keyframes gs170-beam");
   expect(css).toContain("@keyframes gs170-meter");
 });
 it("respects reduced-motion and Lite without WebGL or forced media autoplay",()=>{
   expect(css).toContain("@media(prefers-reduced-motion:reduce)");
   expect(css).toContain("html[data-gs-performance=lite]");
   expect(page).not.toMatch(/autoplay|new AudioContext|WebGL/);
   expect(page).toContain("VideoLite video={film.video}");
 });
});
