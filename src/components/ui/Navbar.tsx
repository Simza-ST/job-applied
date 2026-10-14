import { Link } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          JobTracker
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/new"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            + New
          </Link>
        </div>
      </div>
    </header>
  );
}