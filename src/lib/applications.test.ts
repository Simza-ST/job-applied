import { describe, expect, it } from "vitest";
import { countByStage, getDaysSinceApplied, needsNudge } from "./applications";
import type { Application } from "../types";

const base: Application = {
  id: "1",
  stage: "applied",
  jobTitle: "Dev",
  company: "Acme",
  dateApplied: "2024-01-01",
  createdAt: "2024-01-01",
};

describe("getDaysSinceApplied", () => {
  it("returns correct days", () => {
    expect(getDaysSinceApplied("2024-01-01", new Date("2024-01-15"))).toBe(14);
  });

  it("returns 0 when applied today", () => {
    expect(getDaysSinceApplied("2024-01-01", new Date("2024-01-01"))).toBe(0);
  });

  it("returns 1 when applied yesterday", () => {
    expect(getDaysSinceApplied("2024-01-01", new Date("2024-01-02"))).toBe(1);
  });

  it("handles month boundaries correctly", () => {
    expect(getDaysSinceApplied("2024-01-31", new Date("2024-02-01"))).toBe(1);
  });

  it("handles leap year correctly", () => {
    expect(getDaysSinceApplied("2024-02-28", new Date("2024-03-01"))).toBe(2);
  });
});

describe("needsNudge", () => {
  it("true when applied > 14 days ago", () => {
    expect(needsNudge(base, new Date("2024-01-16"))).toBe(true);
  });

  it("false when applied exactly 14 days ago", () => {
    expect(needsNudge(base, new Date("2024-01-15"))).toBe(false);
  });

  it("false when applied < 14 days ago", () => {
    expect(needsNudge(base, new Date("2024-01-10"))).toBe(false);
  });

  it("false when stage is interview", () => {
    expect(needsNudge({ ...base, stage: "interview" }, new Date("2024-02-01"))).toBe(false);
  });

  it("false when stage is offer", () => {
    expect(needsNudge({ ...base, stage: "offer" }, new Date("2024-02-01"))).toBe(false);
  });

  it("false when stage is rejected", () => {
    expect(needsNudge({ ...base, stage: "rejected" }, new Date("2024-02-01"))).toBe(false);
  });

  it("false when stage is wishlist", () => {
    expect(needsNudge({ ...base, stage: "wishlist" }, new Date("2024-02-01"))).toBe(false);
  });

  it("false when stage is closed", () => {
    expect(needsNudge({ ...base, stage: "closed" }, new Date("2024-02-01"))).toBe(false);
  });
});

describe("countByStage", () => {
  it("counts correctly across multiple stages", () => {
    const apps = [
      base,
      { ...base, id: "2", stage: "interview" as const },
      { ...base, id: "3", stage: "interview" as const },
      { ...base, id: "4", stage: "offer" as const },
    ];
    const counts = countByStage(apps);
    expect(counts.applied).toBe(1);
    expect(counts.interview).toBe(2);
    expect(counts.offer).toBe(1);
  });

  it("returns empty object for empty array", () => {
    expect(countByStage([])).toEqual({});
  });

  it("counts a single application", () => {
    const counts = countByStage([base]);
    expect(counts.applied).toBe(1);
  });

  it("does not include stages with zero count", () => {
    const counts = countByStage([base]);
    expect(counts.wishlist).toBeUndefined();
    expect(counts.interview).toBeUndefined();
  });

  it("counts all 6 stages when all are present", () => {
    const apps: Application[] = [
      { ...base, id: "1", stage: "wishlist" },
      { ...base, id: "2", stage: "applied" },
      { ...base, id: "3", stage: "interview" },
      { ...base, id: "4", stage: "offer" },
      { ...base, id: "5", stage: "rejected" },
      { ...base, id: "6", stage: "closed" },
    ];
    const counts = countByStage(apps);
    expect(counts).toEqual({ wishlist: 1, applied: 1, interview: 1, offer: 1, rejected: 1, closed: 1 });
  });
});
