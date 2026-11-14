import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const read=(p:string)=>readFileSync(p,"utf8");
const route=read("src/routes/index.tsx");
const hero=read("src/components/atelier/StageHero.tsx");
const css=read("src/styles/home-signature-v86.css");
const index=read("src/components/atelier/ProductionIndex.tsx");
const archived=read("src/components/atelier/ProductionDeckArt.tsx");

describe("V86 redesign removes V85's synthetic desk and preserves original show media",()=>{
 it("keeps V85 artwork available for rollback but does not render it in the current page",()=>{
  expect(archived).toContain('<svg viewBox="0 0 900 490"');
  expect(hero).not.toContain("<ProductionDeckArt />");
  expect(route).not.toContain("homeProductionCss");
  expect(route).toContain('homeSignatureCss from "@/styles/home-signature-v86.css?inline"');
  // The single inset photo has been replaced with three existing Green Sound
  // media sources inside an original perspective editorial composition.
  expect(hero).not.toContain('className="gs-production-backdrop-v85"');
  expect(hero).toContain("<KineticShowWall active={active} />");
  const wall=read("src/components/atelier/KineticShowWall.tsx");
  for(const media of ["images.scena","images.dj","images.concert"]){
   expect(wall).toContain(media);
  }
  expect(wall).toContain('aria-hidden="true"');
  expect(css).toContain(".gs-home-v86 .gs-production-backdrop-v85");
 });
 it("renders one lead production act plus two side-by-side service chapters",()=>{
  expect(css).toContain("grid-template-columns:minmax(0,1.08fr) minmax(0,1fr)");
  expect(css).toContain("grid-row:1/span2");
  expect(css).toContain(".gs-index__chapter[data-chapter=stage]");
  expect(css).toContain(".gs-index__chapter[data-chapter=people]");
  expect(index).toContain("chapter.linkedServices.map((service)");
  expect(index).toContain('to={`/${service.slug}`}');
 });
 it("maintains Lite/reduced-motion safeguards without outside images",()=>{
  expect(css).toContain("@media(max-width:640px)");
  expect(css).toContain("html[data-gs-performance=lite]");
  expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  expect(css).not.toMatch(/url\(https?:|new AudioContext|autoplay/);
 });
});
