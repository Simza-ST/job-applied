import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-3 text-center">
      <p className="text-6xl font-bold text-gray-200 dark:text-gray-800">404</p>
      <p className="text-lg font-semibold">Page not found</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
        Go home
      </Link>
    </div>
  );
}
