import { Link } from "react-router-dom";
import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

type ApplicationListProps = { applications: Application[] };

export function ApplicationList({ applications }: ApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          No applications found.
        </p>
        <Link
          to="/new"
          className="mt-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Add your first one →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} />
      ))}
    </div>
  );
}
