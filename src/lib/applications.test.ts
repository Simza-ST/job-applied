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
    const today = new Date("2024-01-15");
    expect(getDaysSinceApplied("2024-01-01", today)).toBe(14);
  });
});

describe("needsNudge", () => {
  it("true when applied > 14 days ago", () => {
    expect(needsNudge(base, new Date("2024-01-16"))).toBe(true);
  });
  it("false when applied <= 14 days ago", () => {
    expect(needsNudge(base, new Date("2024-01-15"))).toBe(false);
  });
  it("false when not in applied stage", () => {
    expect(needsNudge({ ...base, stage: "interview" }, new Date("2024-02-01"))).toBe(false);
  });
});

describe("countByStage", () => {
  it("counts correctly", () => {
    const apps = [base, { ...base, id: "2", stage: "interview" as const }];
    const counts = countByStage(apps);
    expect(counts.applied).toBe(1);
    expect(counts.interview).toBe(1);
  });
});
