import { useState } from "react";
import {
  createTableHook,
  tableFeatures,
  rowSortingFeature,
  rowPaginationFeature,
  globalFilteringFeature,
  columnFilteringFeature,
  createCoreRowModel,
  createSortedRowModel,
  createPaginatedRowModel,
  createFilteredRowModel,
  flexRender,
  type SortDirection,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import type { Application } from "../../types";
import { StageBadge } from "./StageBadge";
import { ApplicationCard } from "./ApplicationCard";
import { getDaysSinceApplied, needsNudge } from "../../lib/applications";

const _features = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  globalFilteringFeature,
  columnFilteringFeature,
  coreRowModel: createCoreRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filteredRowModel: createFilteredRowModel(),
});

const { useAppTable, createAppColumnHelper } = createTableHook({
  features: _features,
});

const col = createAppColumnHelper<Application>();

const columns = col.columns([
  col.accessor("jobTitle", {
    header: "Job Title",
    cell: (i) => (
      <Link
        to={`/applications/${i.row.original.id}`}
        className="font-medium text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400 transition-colors"
      >
        {i.getValue()}
      </Link>
    ),
  }),
  col.accessor("company", {
    header: "Company",
    cell: (i) => (
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {i.getValue().slice(0, 2).toUpperCase()}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{i.getValue()}</span>
      </div>
    ),
  }),
  col.accessor("stage", {
    header: "Stage",
    cell: (i) => <StageBadge stage={i.getValue()} />,
  }),
  col.accessor("dateApplied", {
    header: "Applied",
    cell: (i) => {
      const days = getDaysSinceApplied(i.getValue());
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{i.getValue()}</span>
          {needsNudge(i.row.original) && (
            <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-xs text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              {days}d
            </span>
          )}
        </div>
      );
    },
  }),
  col.display({
    id: "actions",
    header: "",
    cell: (i) => (
      <Link
        to={`/applications/${i.row.original.id}`}
        className="text-xs text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        View →
      </Link>
    ),
  }),
]);

function SortIcon({ sorted }: { sorted: false | SortDirection }) {
  if (!sorted) return <span className="ml-1 text-gray-300 dark:text-gray-600">↕</span>;
  return <span className="ml-1 text-blue-500">{sorted === "asc" ? "↑" : "↓"}</span>;
}

interface Props {
  applications: Application[];
  loading?: boolean;
  globalFilter: string;
}

type ViewMode = "cards" | "table";

export function ApplicationsTable({ applications, loading, globalFilter }: Props) {
  const [view, setView] = useState<ViewMode>("cards");
  const [pageSize, setPageSize] = useState(9);

  const table = useAppTable(
    {
      data: applications,
      columns,
      state: { globalFilter },
      initialState: { pagination: { pageSize, pageIndex: 0 } },
    },
    (s) => ({ sorting: s.sorting, pagination: s.pagination }),
  );

  const handlePageSize = (n: number) => {
    setPageSize(n);
    table.setPageSize(n);
  };

  const { pageIndex } = table.state.pagination;
  const pageCount = table.getPageCount();

  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="mt-3 h-px bg-gray-100 dark:bg-gray-800" />
            <div className="mt-3 h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-20 text-center dark:border-gray-800">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl dark:bg-gray-800">📋</div>
        <p className="font-medium text-gray-700 dark:text-gray-300">No applications found</p>
        <p className="mt-1 text-sm text-gray-400">Try adjusting your filters or add a new one.</p>
        <Link to="/new" className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          Add application
        </Link>
      </div>
    );
  }

  const rows = table.getRowModel().rows;
  const totalFiltered = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-3">
      {/* toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {totalFiltered} result{totalFiltered !== 1 ? "s" : ""}
          {pageCount > 1 && ` · page ${pageIndex + 1} of ${pageCount}`}
        </p>
        <div className="flex items-center gap-2">
          {view === "table" && (
            <select
              className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              onChange={(e) => {
                const [id, dir] = e.target.value.split(":");
                table.setSorting(id ? [{ id, desc: dir === "desc" }] : []);
              }}
              defaultValue=""
            >
              <option value="">Sort by…</option>
              <option value="jobTitle:asc">Title A→Z</option>
              <option value="jobTitle:desc">Title Z→A</option>
              <option value="company:asc">Company A→Z</option>
              <option value="dateApplied:desc">Newest first</option>
              <option value="dateApplied:asc">Oldest first</option>
              <option value="stage:asc">Stage</option>
            </select>
          )}
          <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setView("cards")}
              className={`px-2.5 py-1.5 text-xs transition-colors ${view === "cards" ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"}`}
            >
              ⊞ Cards
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-2.5 py-1.5 text-xs transition-colors ${view === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"}`}
            >
              ☰ Table
            </button>
          </div>
        </div>
      </div>

      {/* card view */}
      {view === "cards" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <ApplicationCard key={row.id} app={row.original} />
          ))}
        </div>
      )}

      {/* table view */}
      {view === "table" && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      onClick={h.column.getToggleSortingHandler()}
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${h.column.getCanSort() ? "cursor-pointer select-none hover:text-gray-900 dark:hover:text-gray-200" : ""}`}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {h.column.getCanSort() && <SortIcon sorted={h.column.getIsSorted()} />}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              ← Prev
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${pageIndex === i ? "border-blue-500 bg-blue-600 text-white" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              Next →
            </button>
          </div>
          <select
            value={pageSize}
            onChange={(e) => handlePageSize(Number(e.target.value))}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            {[6, 9, 12, 24].map((n) => <option key={n} value={n}>{n} per page</option>)}
          </select>
        </div>
      )}
    </div>
  );
}
