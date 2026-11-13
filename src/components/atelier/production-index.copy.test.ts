import { describe, expect, it } from "vitest";
import { editorialChapters } from "./ProductionIndex";

describe("editorial chapter content", () => {
  it("describes concrete, existing offerings rather than generic promises", () => {
    const notes = editorialChapters.map((chapter) => chapter.note);
    expect(notes).toHaveLength(3);
    expect(notes[0]).toMatch(/DJ & MC.*trupă live.*studio/i);
    expect(notes[1]).toMatch(/Sunet.*lumini.*fum greu/i);
    expect(notes[2]).toMatch(/Hostess.*ursitoare.*animație/i);
    for (const note of notes) {
      expect(note).not.toMatch(/momente de neuitat|magie|soluții complete/i);
      expect(note.length).toBeLessThan(180);
    }
  });
});
