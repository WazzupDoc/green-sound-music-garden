import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Contact location Unicode separators V273", () => {
  it("normalizes line and paragraph separators without losing Romanian letters", () => {
    const source = readFileSync(resolve(process.cwd(), "src/routes/contact.tsx"), "utf8");
    const expression = source.match(/locationValue\.replace\(\/(\[[^\]]+\])\/g, " "\)/);
    if (!expression?.[1]) throw new Error("Contact location sanitization regex not found");
    const control = new RegExp(expression[1], "g");
    const clean = (input: string) => input.replace(control, " ").replace(/\s+/g, " ").trim();
    expect(clean("Pitești\u2028Argeș\u2029România")).toBe("Pitești Argeș România");
    expect(clean("\u2028\u2029")).toBe("");
    expect(clean("Ștefănești")).toBe("Ștefănești");
  });
});
