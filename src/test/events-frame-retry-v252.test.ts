import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("V252 Events manual frame retry regression", () => {
  const source = readFileSync(resolve(process.cwd(), "src/routes/evenimente.index.tsx"), "utf8");
  it("exposes a user-triggered retry only on image failure", () => {
    expect(source).toContain('frameFailed && <button type="button"');
    expect(source).toContain('Reîncearcă fotografia');
    expect(source).toContain('setFailedFrameSlug(null); setFrameRetry(n => n + 1)');
  });
  it("restarts preload on retry without changing selected event", () => {
    expect(source).toContain('[activeEvent, visualEvent.slug, frameRetry]');
    expect(source).toContain('aria-label={"Reîncearcă încărcarea fotografiei pentru " + activeEvent.name}');
  });
});
