import type { Stage } from "../types";

const STAGE_STYLES: Record<Stage, string> = {
  wishlist:  "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  applied:   "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  interview: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  offer:     "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  rejected:  "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  closed:    "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={`inline-block shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STAGE_STYLES[stage]}`}>
      {stage}
    </span>
  );
}
