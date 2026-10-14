import { useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { ApplicationList } from "../components/ApplicationList";
import { StageSummary } from "../components/StageSummary";
import { useApplications } from "../hooks/useApplications";
import type { Stage } from "../types";

export function ApplicationsPage() {
  const { applications, loading, error } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  const filtered = applications.filter((a) => {
    const matchStage = stage === "all" || a.stage === stage;
    const q = search.toLowerCase();
    const matchSearch = a.jobTitle.toLowerCase().includes(q) || a.company.toLowerCase().includes(q);
    return matchStage && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track and manage your job applications.</p>
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}
      {!loading && <StageSummary applications={applications} />}
      <FilterBar search={search} stage={stage} onSearch={setSearch} onStage={setStage} />
      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-gray-400">Loading…</div>
      ) : (
        <ApplicationList applications={filtered} />
      )}
    </div>
  );
}
