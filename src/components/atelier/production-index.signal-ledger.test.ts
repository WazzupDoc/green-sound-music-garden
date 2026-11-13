import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync("src/components/atelier/ProductionIndex.tsx", "utf8");
const art = readFileSync("src/styles/production-signal-v83.css", "utf8");
const shared = readFileSync("src/styles.css", "utf8");

describe("V83 Green Sound production channel identity", () => {
  it("retains the original editorial catalogue and renders exactly one decorative engraving per chapter", () => {
    expect(component).toContain("editorialChapters.map((chapter)");
    expect(component).toContain("chapter.linkedServices.map((service)");
    expect(component).toContain('className="gs-index__signal-ledger" aria-hidden="true"');
    expect(component).toContain("chapterSignalLevels[chapter.art].map((level, i)");
    expect(component).toContain('className="gs-index__routing" aria-hidden="true"');
    expect(component).toContain('to={`/${service.slug}`}');
    expect(component).toContain('import signalLedgerCss from "@/styles/production-signal-v83.css?inline"');
    expect(component).toContain("<style>{signalLedgerCss}</style>");
    expect(shared).not.toContain('@import "./styles/production-signal-v83.css"');
  });

  it("keeps audio-inspired motion decorative, opt-in and off in Lite/reduced-motion", () => {
    expect(art).toContain("NOT a live-audio visualizer");
    expect(art).toContain("@media(hover:hover) and (prefers-reduced-motion:no-preference)");
    expect(art).toContain("gs-index-meter-pulse");
    expect(art).toContain("@media(prefers-reduced-motion:reduce)");
    expect(art).toContain("html[data-gs-performance=lite]");
    expect(art).toContain("animation:none!important");
    expect(art).toContain("pointer-events:none");
    expect(art).not.toMatch(/autoplay|navigator\.mediaDevices|AudioContext|new Audio\(/);
  });
});
