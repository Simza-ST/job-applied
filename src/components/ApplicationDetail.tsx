import type { Application } from "../types";
import { StageBadge } from "./StageBadge";

export function ApplicationDetail({ app }: { app: Application }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">{app.jobTitle}</h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{app.company}</p>
        </div>
        <StageBadge stage={app.stage} />
      </div>

      <div className="mt-6 space-y-4 border-t border-gray-100 pt-4 dark:border-gray-800">
        {app.link && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Job Link</p>
            <a href={app.link} target="_blank" rel="noreferrer" className="mt-1 block truncate text-sm text-blue-600 hover:underline dark:text-blue-400">
              {app.link}
            </a>
          </div>
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Date Applied</p>
          <p className="mt-1 text-sm">{app.dateApplied}</p>
        </div>
        {app.notes && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Notes</p>
            <p className="mt-1 text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">{app.notes}</p>
          </div>
        )}
      </div>
    </>
  );
}
