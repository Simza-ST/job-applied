import type { Stage } from "../types";

// ceates a constant array STAGES that contains all the possible stages of a job application.
const STAGES: Stage[] = [
  "wishlist",
  "applied",
  "interview",
  "offer",
  "rejected",
  "closed",
];

interface Props {
  search: string;
  //the filter stage must either be a valid Stage string or "all" string
  stage: Stage | "all";
  onSearch: (v: string) => void;
  onStage: (v: Stage | "all") => void;
}

export function FilterBar({ search, stage, onSearch, onStage }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <input
        type="search"
        placeholder="Search…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="rounded border px-3 py-1.5 text-sm"
      />
      <select
        value={stage}
        onChange={(e) => onStage(e.target.value as Stage | "all")}
        className="rounded border px-3 py-1.5 text-sm"
      >
        <option value="all">All stages</option>
        {STAGES.map((s) => (
          <option key={s} value={s} className="capitalize">
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
