import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@/data/site";
import { validateBrief } from "@/routes/contact";

describe("V223 service detail → Contact brief", () => {
  it("accepts each real service label from typed TanStack Router links", () => {
    for (const service of services) {
      expect(validateBrief({ services: [service.formLabel] }).services).toEqual([service.formLabel]);
    }
  });

  it("keeps legacy pipe-separated links and deduplicates valid selections", () => {
    const first = services[0]!.formLabel;
    const second = services[1]!.formLabel;
    expect(validateBrief({ services: `${first}|${second}|${first}` }).services).toEqual([first, second]);
    expect(validateBrief({ services: [first, second, first] }).services).toEqual([first, second]);
  });

  it("rejects unknown or unsafe array values before prefill", () => {
    const valid = services[0]!.formLabel;
    expect(validateBrief({ services: [valid, "unknown"] }).services).toEqual([valid]);
    expect(validateBrief({ services: [valid, {}] }).services).toBeUndefined();
    expect(validateBrief({ services: Array(9).fill(valid) }).services).toBeUndefined();
  });

  it("preserves the direct Contact link contract and ships no unfinished sales text", () => {
    const code = readFileSync(resolve(process.cwd(), "src/components/site/ServiceSignature.tsx"), "utf8");
    expect(code).toContain('search={{ services: [service.formLabel] }}');
    expect(code).toContain('hash="contact-form-title"');
    expect(code).not.toContain("[DE COMPLETAT DE PROPRIETAR]");
  });
});
