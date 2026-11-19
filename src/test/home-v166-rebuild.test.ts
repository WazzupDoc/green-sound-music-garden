import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const source=(path:string)=>readFileSync(path,"utf8");
const home=source("src/routes/index.tsx");
const page=source("src/components/atelier/ConceptHomeV170.tsx");
const css=source("src/styles/home-reference-v170.css");
describe("V170 owner-selected concept implementation contract",()=>{
 it("has a single owner-selected art direction without V166/V168 themes",()=>{
   expect(home).toContain('home-reference-v170.css?inline');
   expect(home).toContain('className="gs170-home"');
   expect(home).toContain("<ConceptHomeV170 />");
   expect(home).not.toMatch(/ProductionHeroV166|ProductionHeroV168/);
 });
 it("reconstructs visual journey hero / service directory / process / films / CTA",()=>{
   for(const className of ["gs170-hero","gs170-services","gs170-process","gs170-films","gs170-final"]){
     expect(page).toContain(className);
   }
   expect(page).toContain("serviceDirectory.map(({ title, items })");
   expect(page).toContain("process.map(step");
   expect(page).toContain("films.map((item, index)");
 });
 it("keeps real services and films, with functional film dialog",()=>{
   expect(page).toContain("new Set(allSlugs)");
   expect(page).toContain("services.find(item => item.slug === slug)");
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
