import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const source=(path:string)=>readFileSync(path,"utf8");
const home=source("src/routes/index.tsx");
const page=source("src/components/atelier/ConceptHomeV170.tsx");
const css=source("src/styles/home-reference-v170.css");
const programme=source("src/components/atelier/ProductionIndex.tsx");
describe("V170 owner-selected concept implementation contract",()=>{
 it("has a single owner-selected art direction without V166/V168 themes",()=>{
   expect(home).toContain('home-reference-v170.css?inline');
   expect(home).toContain('className="gs170-home"');
   expect(home).toContain("<ConceptHomeV170 />");
   expect(home).not.toMatch(/ProductionHeroV166|ProductionHeroV168/);
 });
 it("keeps a clear hero / three editorial service chapters / three films / CTA",()=>{
   for(const className of ["gs170-hero","gs170-films","gs170-final"]){
     expect(page).toContain(className);
   }
   expect(page).toContain("<ProductionIndex />");
   expect(page).not.toContain("featured.map((item, index)");
   expect(page).not.toContain("process.map((step, index)");
   expect(page).toContain("films.map((item, index)");
 });
 it("keeps real services and films, with functional film dialog",()=>{
   expect(programme).toContain("new Set(editorialServiceSlugs)");
   expect(programme).toContain("editorialChapters.map((chapter)");
   expect(page).toContain("VideoLite video={film.video}");
   expect(page).toContain("images.concert");
 });
 it("has mobile composition, CSS beams/waveform and accessibility fallbacks",()=>{
   expect(css).toContain("@keyframes gs170-beam");
   expect(css).toContain("@keyframes gs170-meter");
   expect(css).toContain("@keyframes gs170-waveflow");
   expect(css).toContain("@media(max-width:470px)");
   expect(css).toContain("data-gs-performance=lite");
   expect(css).toContain("prefers-reduced-motion:reduce");
 });
});
