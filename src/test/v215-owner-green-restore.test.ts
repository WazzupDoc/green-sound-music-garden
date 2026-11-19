import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const read=(p:string)=>readFileSync(resolve(process.cwd(),p),"utf8");

describe("V215: restore the owner's green concept without losing real discovery",()=>{
 it("preserves real source media and service discovery while replacing rejected faux mixer",()=>{
   const home=read("src/components/atelier/ConceptHomeV170.tsx");
   const route=read("src/routes/index.tsx");
   expect(home).not.toContain('className="gs170-stage__console"');
   expect(home).toContain('className="gs244-hero__title"');
   expect(route).toContain("home-editorial-cover-v244.css?inline");
   expect(home).not.toContain("SceneScoreV214");
   expect(home).toContain("images.concert.src");
   expect(home).toContain("serviceDirectory.map(({ title, items })");
   expect(home).toContain("process.map(step");
   expect(home).toContain("VideoLite video={film.video}");
   expect(route).toContain('home-refinement-v215.css?inline');
   expect(route).not.toContain("hero-signal-v214");
 });
 it("restores simple nav and improves usable finder with mobile-safe look",()=>{
   const header=read("src/components/site/SiteHeader.tsx");
   const finder=read("src/components/atelier/FrequencyFinder.tsx");
   const hc=read("src/styles/home-refinement-v215.css");
   const nc=read("src/styles/navigation-v215.css");
   expect(header).not.toContain("gs214-nav-code");
   expect(header).toContain('className="gs215-search-text"');
   expect(header).toContain('aria-haspopup="dialog"');
   expect(finder).toContain('["DJ", "lumini", "nuntă"]');
   expect(finder).toContain("setQuery(term)");
   expect(finder).toContain("inputRef.current?.focus()");
   expect(hc).toContain("@media(max-width:740px)");
   expect(hc).toContain(".gs170-stage__console{display:none}");
   expect(nc).toContain("prefers-reduced-motion:reduce");
   expect(nc).toContain("data-gs-performance=lite");
 });
});
