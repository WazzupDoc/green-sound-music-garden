import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Contact location prefill invisible-character guard", () => {
  it("filters invisible format characters before checking for empty location", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");
    const expression = source.match(/locationValue\.replace\(\/(\[[^\]]+\])\/g, " "\)/);
    expect(expression, "Contact must sanitize location before accepting prefill").not.toBeNull();
    const characterClass = expression![1];
    const invisible = /[\u061C\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF]/gu;
    for (const char of ["\u200B", "\u200D", "\u200E", "\u061C", "\u2060", "\uFEFF"]) {
      expect(new RegExp(characterClass, "u").test(char)).toBe(true);
    }
    expect("Pitești".replace(invisible, " ")).toBe("Pitești");
    expect("\u200B\uFEFF".replace(invisible, " ").trim()).toBe("");
  });
});
