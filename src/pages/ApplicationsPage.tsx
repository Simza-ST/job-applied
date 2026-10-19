import { useState } from "react";
import { Link } from "react-router-dom";
import { FilterBar } from "../components/ui/FilterBar";
import { ApplicationsTable } from "../components/ui/ApplicationsTable";
import { StageSummary } from "../components/ui/StageSummary";
import { useApplications } from "../hooks/useApplications";
import type { Stage } from "../types";

export function ApplicationsPage() {
  const { applications, loading, error } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  const filtered = applications.filter((a) => {
    const matchStage = stage === "all" || a.stage === stage;
    const q = search.toLowerCase();
    return matchStage && (
      a.jobTitle.toLowerCase().includes(q) || a.company.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and manage your job search pipeline.
          </p>
        </div>
        {!loading && applications.length > 0 && (
          <Link
            to="/new"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add application
          </Link>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800/50 dark:bg-red-950/50">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">Failed to load applications</p>
            <p className="mt-0.5 text-xs text-red-600/80 dark:text-red-500">{error}</p>
          </div>
        </div>
      )}

      {/* Stage summary */}
      {!loading && applications.length > 0 && (
        <StageSummary applications={applications} activeStage={stage} onStageClick={setStage} />
      )}

      {/* Filter bar — only show when there's data */}
      {!loading && applications.length > 0 && (
        <FilterBar
          search={search}
          stage={stage}
          total={applications.length}
          filtered={filtered.length}
          onSearch={setSearch}
          onStage={setStage}
        />
      )}

      <ApplicationsTable applications={filtered} loading={loading} globalFilter={search} />
    </div>
  );
}
