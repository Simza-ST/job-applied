import type { Application, Stage } from "../types";
import { countByStage } from "../lib/applications";
import { StageBadge } from "./StageBadge";

const STAGES: Stage[] = [
  "wishlist",
  "applied",
  "interview",
  "offer",
  "rejected",
  "closed",
];

type StageSummaryProps = {
  applications: Application[];
};

export function StageSummary({ applications }: StageSummaryProps) {
  // this returns an Record<Stage, number> that contains the count of applications for each stage
  const counts = countByStage(applications);
  return (
    <div className="flex flex-wrap gap-3">
      {STAGES.map((s) => (
        <div key={s} className="flex items-center gap-1">
          <StageBadge stage={s} />
          <span className="text-sm font-semibold">{counts[s] ?? 0}</span>
        </div>
      ))}
    </div>
  );
}
