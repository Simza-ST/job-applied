import { Link } from "react-router-dom";
import type { Application } from "../types";
import { StageBadge } from "./StageBadge";
import { needsNudge } from "../lib/applications";

// Declares a type for the props that the ApplicationCard component will receive.
// It expects an object with a single property app of type Application.
type ApplicationCardProps = {
  app: Application;
};

// The ApplicationCard component receives an app prop of type Application
// and renders a card with the application's job title, company, and stage.
export function ApplicationCard({ app }: ApplicationCardProps) {
  return (
    <Link
      to={`/applications/${app.id}`}
      className="block rounded-lg border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{app.jobTitle}</p>
          <p className="text-sm text-gray-500">{app.company}</p>
        </div>
        <StageBadge stage={app.stage} />
      </div>
      {needsNudge(app) && (
        <p className="mt-2 text-xs text-amber-600">⚠ No update in 14+ days</p>
      )}
    </Link>
  );
}
