import { useState } from "react";
import { Link } from "react-router-dom";
import { FilterBar } from "../components/FilterBar";
import { ApplicationList } from "../components/ApplicationList";
import { StageSummary } from "../components/StageSummary";
import { ThemeToggle } from "../components/ThemeToggle";
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
    <div className="mx-auto max-w-4xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Job Applications</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <Link to="/new" className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
            + New
          </Link>
        </div>
      </div>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && <StageSummary applications={applications} />}
      <FilterBar search={search} stage={stage} onSearch={setSearch} onStage={setStage} />
      <ApplicationList applications={filtered} />
    </div>
  );
}
