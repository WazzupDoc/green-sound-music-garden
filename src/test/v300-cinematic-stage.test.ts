import { readFileSync } from "node:fs";
import { describe,expect,it } from "vitest";
const read=(p:string)=>readFileSync(p,"utf8");
describe("V300 cinematic stage",()=>{
 it("renders an original deterministic waveform and explicit film control",()=>{
  const source=read("src/components/atelier/ConceptHomeV170.tsx");
  expect(source).toContain("<StageWave />");expect(source).toContain("length: 21");expect(source).toContain("requestAnimationFrame");expect(source).toContain("cancelAnimationFrame");expect(source).toContain("setFilmIndex(1)");expect(source).toContain("<ProductionIndex />");
 });
 it("keeps a static visual in Lite and reduced motion, with manual effects toggle",()=>{
  const css=read("src/styles/home-rebuild-v297.css");
  expect(css).toContain("gs300-wave-cue");expect(css).toContain('data-lights="off"');expect(css).toContain("prefers-reduced-motion:reduce");expect(css).toContain('data-gs-performance="lite"');
  expect(read("src/components/site/SiteHeader.tsx")).toContain("<NavGlyph route={entry.to} />");
 });
});
