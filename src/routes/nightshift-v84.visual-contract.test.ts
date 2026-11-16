import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const route = readFileSync("src/routes/index.tsx","utf8");
const css = readFileSync("src/styles/home-v168-dark-live.css","utf8");
describe("V168 homepage uses one real independent art direction",()=>{
 it("loads a single scoped CSS file instead of concatenating 4 generations of styles",()=>{
   expect(route).toContain('home-v168-dark-live.css?inline');
   expect(route).toContain('<style>{homeDirectionCss}</style>');
   expect(route).toContain('className="gs168-home"');
   expect(route).toContain("<ProductionHeroV168 />");
   expect(route).not.toMatch(/home-signature-v86.css|home-event-v89.css|home-redesign-v158.css|home-cover-v159.css/);
   expect(route.match(/<style>/g)).toHaveLength(1);
   expect(route).not.toMatch(/QuickBrief|EventsSelector|ServicesAtelier|Soundcheck|FrequencyLab/);
 });
 it("keeps all three service chapters/film archive and one closing CTA",()=>{
   const order=["<ProductionHeroV168 />","<ProductionIndex />","<EditorialPortfolio />",'className="crafted-finale gs-finale"'];
   const positions=order.map(x=>route.indexOf(x));
   expect(positions.every(x=>x>=0)).toBe(true);
   expect(positions).toEqual([...positions].sort((a,b)=>a-b));
   expect(route.match(/<Link to="\/contact"/g)).toHaveLength(1);
   expect(css).toContain(".gs168-home .gs-index__chapter[data-chapter=stage]");
   expect(css).toContain(".gs168-home .director-reel");
   expect(css).toContain(".gs168-home .gs-finale");
 });
 it("removes 3D stage clutter without hiding the real photography",()=>{
   expect(css).toContain(".gs160-stage__photo");
   expect(css).toContain("object-fit:cover");
   expect(css).not.toMatch(/\.gs-v90-show-wall|\.gs-v90-ticker/);
   expect(css).toContain("@media(prefers-reduced-motion:reduce)");
   expect(css).toContain("html[data-gs-performance=lite]");
 });
});
