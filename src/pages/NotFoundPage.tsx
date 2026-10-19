import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
      <div className="relative">
        <p className="select-none text-[120px] font-black leading-none text-gray-100 dark:text-gray-800/80">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg dark:bg-gray-900">
            🗂️
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Page not found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist or was moved.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Back to dashboard
      </Link>
    </div>
  );
}
