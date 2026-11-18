import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Events selection actions layout", () => {
  const source = readFileSync("src/components/atelier/EventSoundcheck.tsx", "utf8");

  it("groups reset and clear actions in a wrapping layout for narrow viewports", () => {
    expect(source).toContain('className="soundcheck__selection-actions mt-3 mb-5 flex flex-wrap items-center gap-3"');
    expect(source).toContain('className="soundcheck__reset inline-flex min-h-11 min-w-0 max-w-full');
    expect(source).toContain('className="soundcheck__clear inline-flex min-h-11 max-w-full');
    expect(source).not.toContain('soundcheck__clear ml-3');
    expect(source).toContain("whitespace-normal text-left break-words");
  });

  it("keeps both controls keyboard native and clear disabled when empty", () => {
    expect(source).toContain('onClick={() => setSelected([])} disabled={selected.length === 0}');
    expect(source).toContain('onClick={() => setSelected(suggestedFor(eventSlug))}');
  });
});
