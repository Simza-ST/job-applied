import type { Stage } from "../types";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];

const inputCls = "rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 transition";

interface Props {
  search: string;
  stage: Stage | "all";
  onSearch: (v: string) => void;
  onStage: (v: Stage | "all") => void;
}

export function FilterBar({ search, stage, onSearch, onStage }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <input
        type="search"
        placeholder="Search by title or company…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className={`${inputCls} min-w-48`}
      />
      <select
        value={stage}
        onChange={(e) => onStage(e.target.value as Stage | "all")}
        className={inputCls}
      >
        <option value="all">All stages</option>
        {STAGES.map((s) => (
          <option key={s} value={s} className="capitalize">{s}</option>
        ))}
      </select>
    </div>
  );
}
