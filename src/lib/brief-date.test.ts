import { describe, expect, it } from "vitest";
import { isValidBriefDate } from "./brief-date";

describe("Contact calendar date validation", () => {
  it("accepts real ISO calendar dates including leap days", () => {
    expect(isValidBriefDate("2028-02-29")).toBe(true);
    expect(isValidBriefDate("2000-02-29")).toBe(true);
    expect(isValidBriefDate("2026-11-13")).toBe(true);
  });
  it("rejects impossible and malformed dates without timezone coercion", () => {
    for (const value of ["2026-02-29", "1900-02-29", "2026-04-31", "2026-13-01", "2026-00-01", "2026-01-00", "0000-01-01", "2026-1-1", "2026-11-13T00:00:00", "", null, 20261113]) {
      expect(isValidBriefDate(value)).toBe(false);
    }
  });
});
