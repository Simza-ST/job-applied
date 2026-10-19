import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { useApplications } from "../../hooks/useApplications";

export function Navbar() {
  const { pathname } = useLocation();
  const { applications } = useApplications();
  const isNew = pathname === "/new";
  const isDetail = pathname.startsWith("/applications/");

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/90 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/90">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        {/* Left: logo + breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold tracking-tight text-gray-900 dark:text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-[11px] font-black text-white shadow-sm">
              JT
            </span>
            <span className="text-sm">JobTracker</span>
          </Link>

          {(isNew || isDetail) && (
            <>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {isNew ? "New Application" : "Details"}
              </span>
            </>
          )}

          {!isNew && !isDetail && applications.length > 0 && (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {applications.length}
            </span>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isNew && (
            <Link
              to="/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
