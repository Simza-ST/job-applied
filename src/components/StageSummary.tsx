import type { Application, Stage } from "../types";
import { countByStage } from "../lib/applications";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];

const STAGE_COLORS: Record<Stage, string> = {
  wishlist:  "text-gray-600 dark:text-gray-400",
  applied:   "text-blue-600 dark:text-blue-400",
  interview: "text-yellow-600 dark:text-yellow-400",
  offer:     "text-green-600 dark:text-green-400",
  rejected:  "text-red-600 dark:text-red-400",
  closed:    "text-slate-500 dark:text-slate-400",
};

export function StageSummary({ applications }: { applications: Application[] }) {
  const counts = countByStage(applications);
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {STAGES.map((s) => (
        <div key={s} className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className={`text-xl font-bold ${STAGE_COLORS[s]}`}>{counts[s] ?? 0}</p>
          <p className="mt-0.5 text-xs capitalize text-gray-500 dark:text-gray-400">{s}</p>
        </div>
      ))}
    </div>
  );
}
