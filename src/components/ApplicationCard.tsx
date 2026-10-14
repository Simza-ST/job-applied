import { Link } from "react-router-dom";
import type { Application } from "../types";
import { StageBadge } from "./StageBadge";
import { needsNudge } from "../lib/applications";

type ApplicationCardProps = { app: Application };

export function ApplicationCard({ app }: ApplicationCardProps) {
  return (
    <Link
      to={`/applications/${app.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900 dark:text-gray-100">{app.jobTitle}</p>
          <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">{app.company}</p>
        </div>
        <StageBadge stage={app.stage} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-400">{app.dateApplied}</p>
        {needsNudge(app) && (
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">⚠ 14+ days</p>
        )}
      </div>
    </Link>
  );
}
