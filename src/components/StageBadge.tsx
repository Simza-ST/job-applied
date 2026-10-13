import type { Stage } from "../types";

// it creates a mapping between each stage and its corresponding CSS classes
// the Record it enforces a strict rule that ensures every possible stage is
// accounted for in the STAGE_STYLES object, preventing any missing or undefined styles.
const STAGE_STYLES: Record<Stage, string> = {
  wishlist: "bg-gray-100 text-gray-700",
  applied: "bg-blue-100 text-blue-700",
  interview: "bg-yellow-100 text-yellow-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  closed: "bg-slate-100 text-slate-500",
};

type StageBadgeProps = {
  stage: Stage;
};

export function StageBadge({ stage }: StageBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STAGE_STYLES[stage]}`}
    >
      {stage}
    </span>
  );
}
