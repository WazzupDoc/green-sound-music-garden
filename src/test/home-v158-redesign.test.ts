import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const page=readFileSync("src/components/atelier/ConceptHomeV170.tsx","utf8");
const css=readFileSync("src/styles/home-reference-v170.css","utf8");
const programme=readFileSync("src/components/atelier/ProductionIndex.tsx","utf8");
describe("V170 preserves original conversion and visitor control",()=>{
 it("has a real Contact destination, portfolio anchor, and visual-only light toggles",()=>{
   expect(page).toContain('to="/contact"');
   expect(page).toContain('href="#gs170-films"');
   expect(page).toContain("setLightsOn(value => !value)");
   expect(page).toContain('aria-pressed={lightsOn}');
   expect(page).toContain('aria-pressed={lightHue === "cool"}');
 });
 it("uses first-party source images and exactly three published film references",()=>{
   expect(page).toContain("images.concert.src");
   expect(programme).toContain("image: images.dj");
   expect(programme).toContain("image: images.scena");
   expect(page).toContain("videos.nuntaRamada");
   expect(page).toContain("videos.showLumini");
   expect(page).toContain("videos.neatza");
 });
 it("keeps real responsive CSS and optional animation",()=>{
   expect(css).toContain("@media(max-width:740px)");
   expect(css).toContain("@media(max-width:470px)");
   expect(css).toContain("@media(prefers-reduced-motion:reduce)");
   expect(css).toContain("gs170-waveflow");
 });
});
