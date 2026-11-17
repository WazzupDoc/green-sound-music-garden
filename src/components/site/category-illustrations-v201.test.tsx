import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { events, services } from "@/data/site";
import { CategorySignal } from "@/components/site/CategorySignal";
const source=readFileSync("src/components/site/CategorySignal.tsx","utf8");
const eventsRoute=readFileSync("src/routes/evenimente.index.tsx","utf8");
const serviceRoute=readFileSync("src/routes/servicii.tsx","utf8");
const css=readFileSync("src/styles/category-illustrated-v201.css","utf8");
describe("V201 owner-approved illustrated category art",()=>{
  it("renders 13 distinct first-party atlas cells without replacing native labels",()=>{
    const slugs=[...events.map(item=>item.slug),...services.map(item=>item.slug)];
    expect(slugs).toHaveLength(13);
    const positions=new Set<string>();
    for(const kind of slugs){
      const result=renderToStaticMarkup(<CategorySignal kind={kind}/>);
      expect(result).toContain('class="gs201-cue__art"');
      expect(result).toContain('data-kind="'+kind+'"');
      expect(result).toContain('aria-hidden="true"');
      expect(result).toContain('<svg'); // Lite/no-data fallback
      const pos=result.match(/background-position:([^;"]+)/)?.[1];
      expect(pos).toBeTruthy();
      positions.add(pos!);
    }
    expect(positions.size).toBe(13);
    expect(source).toContain('Record<CategoryCueKind, number>');
  });
  it("keeps the existing event selection/button/keyboard behavior and live service links",()=>{
    expect(eventsRoute).toContain("aria-pressed={selected}");
    expect(eventsRoute).toContain('onKeyDown={(keyEvent) => onSetlistKeyDown(keyEvent, index)}');
    expect(eventsRoute).toContain('setCueRevision(previous => previous + 1)');
    expect(eventsRoute).toContain('to="/evenimente/$slug"');
    expect(serviceRoute).toContain('to={`/${service.slug}`}');
    expect(eventsRoute).toContain("category-illustrated-v201.css?inline");
    expect(serviceRoute).toContain("category-illustrated-v201.css?inline");
  });
  it("serves one atlas with original CSS responsive/motion and data saver guards",()=>{
    expect(css).toContain('/media/gs-category-illustrations-v201.avif');
    expect(css).toContain('background-size: 700% 200%');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('data-gs-performance="lite"');
    expect(css).toContain('prefers-reduced-data: reduce');
    expect(css).toContain('@media (max-width:480px)');
    expect(css).not.toContain("@import");
  });
});
