import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const route=readFileSync("src/routes/index.tsx","utf8");
const hero=readFileSync("src/components/atelier/ProductionHeroV160.tsx","utf8");
const css=readFileSync("src/styles/home-direction-v160.css","utf8");
describe("V160 rejects the V159 paper poster and restores authentic sound/production identity",()=>{
 it("does not mount V159 or its old image-card stage",()=>{
   expect(route).not.toContain("home-cover-v159.css?inline");
   expect(route).not.toContain("<StageHero />");
   expect(route).toContain('className="gs160-home"');
   expect(css).toContain("background:#07160f");
   expect(css).not.toMatch(/\.gs-home-v159|\.gs-v90-show-wall/);
 });
 it("preserves functional Light Desk with keyboard Escape and visitor-controlled film",()=>{
   expect(hero).toContain("desk.current.open = false");
   expect(hero).toContain('event.key !== "Escape"');
   expect(hero).toContain('id="gs160-power"');
   expect(hero).toContain("setLightOn(v => !v)");
   expect(hero).toContain("DialogContent");
   expect(hero).toContain("filmOpen && <VideoLite");
 });
 it("supports preference-driven low-motion and eye-safe quiet surfaces",()=>{
   expect(css).toContain(".gs160-stage[data-lights=off]");
   expect(css).toContain("html[data-gs-performance=lite]");
   expect(hero).toContain('data-hydrated={hydrated ? "true" : "false"}');
 });
});
