import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const read=(p:string)=>readFileSync(p,"utf8");
const route=read("src/routes/index.tsx");
const hero=read("src/components/atelier/ProductionHeroV168.tsx");
const css=read("src/styles/home-v168-dark-live.css");
const index=read("src/components/atelier/ProductionIndex.tsx");
const archived=read("src/components/atelier/ProductionDeckArt.tsx");

describe("V168 maintains source-approved media while removing obsolete production hardware",()=>{
 it("keeps archived V85 artwork for rollback but does not mount old components or CSS",()=>{
  expect(archived).toContain('<svg viewBox="0 0 900 490"');
  expect(route).not.toContain("homeProductionCss");
  expect(route).not.toContain('home-signature-v86.css?inline');
  expect(route).not.toContain("<StageHero />");
  expect(route).toContain("<ProductionHeroV168 />");
  expect(hero).not.toContain("ProductionDeckArt");
  expect(hero).not.toContain("KineticShowWall");
  for(const media of ["images.scena","images.dj","images.concert"]){
   expect(hero).toContain(media);
  }
  expect(hero).toContain('className="gs160-stage__photo"');
  expect(css).not.toContain(".gs-production-backdrop-v85");
 });
 it("renders three original editorial chapters and all direct service links",()=>{
  expect(css).toContain(".gs168-home .gs-index__chapters");
  expect(css).toContain(".gs168-home .gs-index__chapter[data-chapter=stage]");
  expect(css).toContain(".gs168-home .gs-index__chapter[data-chapter=people]");
  expect(index).toContain("chapter.linkedServices.map((service)");
  expect(index).toContain('to={`/${service.slug}`}');
 });
 it("preserves Lite/reduced motion, source media and no automatic audio",()=>{
  expect(css).toContain("@media(max-width:470px)");
  expect(css).toContain("html[data-gs-performance=lite]");
  expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  expect(css).not.toMatch(/url\(https?:|new AudioContext|autoplay/);
  expect(hero).toContain("Dialog");
  expect(hero).toContain("VideoLite");
 });
});
