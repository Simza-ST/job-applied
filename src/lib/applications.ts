import type { Application, Stage } from "../types";

const DAY = 1000 * 60 * 60 * 24;

export function getDaysSinceApplied(dateApplied: string, today: Date = new Date()): number {
  const diffInMs = today.getTime() - new Date(dateApplied).getTime();
  return Math.floor(diffInMs / DAY);
}

export function needsNudge(job: Application, today: Date = new Date()): boolean {
  return job.stage === "applied" && getDaysSinceApplied(job.dateApplied, today) > 14;
}

export function countByStage(apps: Application[]): Record<Stage, number> {
  return apps.reduce(
    (acc, a) => ({ ...acc, [a.stage]: (acc[a.stage] ?? 0) + 1 }),
    {} as Record<Stage, number>
  );
}
