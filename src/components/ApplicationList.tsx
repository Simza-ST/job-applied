import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

export function ApplicationList({ applications }: { applications: Application[] }) {
  if (applications.length === 0)
    return <p className="text-sm text-gray-500">No applications found.</p>;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} />
      ))}
    </div>
  );
}
