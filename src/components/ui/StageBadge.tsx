import type { Stage } from "../../types";

const STAGE_STYLES: Record<Stage, { badge: string; dot: string }> = {
  wishlist:  { badge: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",           dot: "bg-gray-400" },
  applied:   { badge: "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",         dot: "bg-blue-500" },
  interview: { badge: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300", dot: "bg-yellow-500" },
  offer:     { badge: "bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300",     dot: "bg-green-500" },
  rejected:  { badge: "bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300",             dot: "bg-red-500" },
  closed:    { badge: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",       dot: "bg-slate-400" },
};

export function StageBadge({ stage }: { stage: Stage }) {
  const { badge, dot } = STAGE_STYLES[stage];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {stage}
    </span>
  );
}
