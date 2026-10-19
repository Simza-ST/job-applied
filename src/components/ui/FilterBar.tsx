import { useEffect, useRef } from "react";
import type { Stage } from "../../types";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];

const inputCls =
  "rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600";

interface Props {
  search: string;
  stage: Stage | "all";
  total: number;
  filtered: number;
  onSearch: (v: string) => void;
  onStage: (v: Stage | "all") => void;
}

export function FilterBar({ search, stage, total, filtered, onSearch, onStage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFilter = search !== "" || stage !== "all";

  // Cmd/Ctrl+K focuses search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className={`${inputCls} min-w-48 pl-8 pr-14`}
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-400 dark:border-gray-700 dark:bg-gray-800">
            ⌘K
          </kbd>
        </div>

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

        {hasFilter && (
          <button
            onClick={() => { onSearch(""); onStage("all"); }}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>

      <p className="text-xs tabular-nums text-gray-400">
        {hasFilter
          ? <><span className="font-medium text-gray-600 dark:text-gray-300">{filtered}</span> of {total}</>
          : <><span className="font-medium text-gray-600 dark:text-gray-300">{total}</span> application{total !== 1 ? "s" : ""}</>
        }
      </p>
    </div>
  );
}
