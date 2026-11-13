import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const hero = readFileSync("src/components/atelier/StageHero.tsx","utf8");
const wall = readFileSync("src/components/atelier/KineticShowWall.tsx","utf8");
const css = readFileSync("src/styles/show-wall-v90.css","utf8");

describe("V90 kinetic show wall: original animated photographic art direction",()=>{
  it("renders 3 existing Green Sound photos in an original perspective visual instead of generic lights",()=>{
    expect(hero).toContain("<KineticShowWall active={active} />");
    expect(hero).toContain('gs-stage-v90');
    expect(hero).toContain("<style>{showWallCss}</style>");
    expect(hero).toContain('className="gs-v90-ticker"');
    expect(hero).toContain('data-lights={lightsEnabled && !reduced ? "on" : "off"}');
    expect(wall).toContain("pictures.map((picture, index)");
    for (const media of ["images.scena","images.dj","images.concert"]){
      expect(wall).toContain(media);
    }
    expect(wall).toContain('data-active={active}');
    expect(wall).toContain('aria-hidden="true"');
    expect(wall).not.toMatch(/<video\b|<iframe\\b|new AudioContext\(|navigator\.mediaDevices|autoPlay=\{true\}/);
  });
  it("has an unmistakable 3D effect and a real animation visible on first screen",()=>{
    expect(css).toContain("perspective:1100px");
    expect(css).toContain("transform-style:preserve-3d");
    expect(css).toContain("@keyframes gs-v90-film-float");
    expect(css).toContain("@keyframes gs-v90-film-sway");
    expect(css).toContain("@keyframes gs-v90-ticker-flow");
    expect(css).toContain("@keyframes gs-v90-scan-travel");
    expect(css).toContain(".gs-v90-ticker");
    expect(css).toContain('.gs-v90-show-wall[data-active=private]');
    expect(css).toContain('.gs-v90-show-wall[data-active=production]');
  });
  it("keeps static meaningful media for mobile, reduced motion, Lite and the lights toggle",()=>{
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
    expect(css).toContain("html[data-gs-performance=lite]");
    expect(css).toContain('[data-stage-visible=true][data-lights=on]');
    expect(css).toContain("animation:none!important");
    expect(css).not.toMatch(/https?:\/\//);
  });
});
