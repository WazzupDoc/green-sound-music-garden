import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("V229 Contact service selection accessibility", () => {
  const source = readFileSync("src/components/site/QuoteForm.tsx", "utf8");
  it("announces the group validation error on the actual keyboard-focusable checkboxes", () => {
    expect(source).toContain('aria-invalid={!!errors.services} aria-describedby={errors.services ? "q-services-guide q-services-err" : "q-services-guide"}');
    expect(source).toContain('document.querySelector<HTMLInputElement>(".gs-quote__choices input:not(:disabled)")?.focus()');
    expect(source).toContain('<FieldError id="q-services-err" msg={errors.services?.message} />');
  });
  it("retains accessible focusable native checkbox controls and no automatic sending", () => {
    expect(source).toContain('type="checkbox" className="sr-only"');
    expect(source).toContain('handleSubmit(onSubmit, onInvalid)');
    expect(source).toContain('Nimic nu a fost transmis încă.');
  });
});
