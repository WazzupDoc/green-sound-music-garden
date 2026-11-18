import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { makeScorePath, SceneScoreV214 } from "./SceneScoreV214";

describe("V214: original production score and navigation discovery", () => {
  it("renders identical procedural waves during SSR and hydration, without randomness", () => {
    const first = makeScorePath(0.5, 1);
    expect(first).toBe(makeScorePath(0.5, 1));
    expect(first).not.toBe(makeScorePath(1.9, 1));
    expect(first).toMatch(/^M0\.0,[\d.]+ L5\.0,[\d.]+/);
    expect(first).not.toContain("NaN");
    const html = renderToStaticMarkup(<SceneScoreV214 />);
    expect(html).toContain('data-artwork="procedural-svg"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("Fiecare moment are");
    expect(html).toContain("FĂRĂ AUDIO");
    expect((html.match(/<path/g) ?? []).length).toBeGreaterThanOrEqual(5);
  });
  it("preserves homepage sections and header search while exposing actual quick searches", () => {
    const home = readFileSync(resolve(process.cwd(), "src/components/atelier/ConceptHomeV170.tsx"), "utf8");
    const header = readFileSync(resolve(process.cwd(), "src/components/site/SiteHeader.tsx"), "utf8");
    const finder = readFileSync(resolve(process.cwd(), "src/components/atelier/FrequencyFinder.tsx"), "utf8");
    const css = readFileSync(resolve(process.cwd(), "src/styles/hero-signal-v214.css"), "utf8");
    expect(home).toContain("<SceneScoreV214 />");
    expect(home).toContain('className="gs170-hero__control"');
    expect(home).not.toContain('className="gs170-stage__console"');
    expect(header).toContain("gs214-nav-code");
    expect(header).toContain("Ctrl K");
    expect(header).toContain("aria-haspopup=\"dialog\"");
    expect(finder).toContain('["DJ", "lumini", "nuntă"]');
    expect(finder).toContain("setQuery(value)");
    expect(finder).toContain("inputRef.current?.focus()");
    expect(css).toContain("prefers-reduced-motion:reduce");
    expect(css).toContain('data-gs-performance="lite"');
  });
});
