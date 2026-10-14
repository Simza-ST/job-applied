import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import type { Stage } from "../types";

const STAGES: Stage[] = [
  "wishlist",
  "applied",
  "interview",
  "offer",
  "rejected",
  "closed",
];

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 transition";

export function NewApplicationPage() {
  const { add } = useApplications();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await add({
      id: crypto.randomUUID(),
      jobTitle: fd.get("jobTitle") as string,
      company: fd.get("company") as string,
      stage: fd.get("stage") as Stage,
      link: fd.get("link") as string,
      notes: fd.get("notes") as string,
      dateApplied: fd.get("dateApplied") as string,
      createdAt: new Date().toISOString(),
    });
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">New Application</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a new job application to track.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Job Title *
              </label>
              <input
                required
                name="jobTitle"
                placeholder="e.g. Frontend Engineer"
                className={inputCls}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Company *
              </label>
              <input
                required
                name="company"
                placeholder="e.g. Acme Corp"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Stage
              </label>
              <select name="stage" defaultValue="wishlist" className={inputCls}>
                {STAGES.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Date Applied *
              </label>
              <input
                required
                name="dateApplied"
                type="date"
                className={inputCls}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Job URL(Optional)
            </label>
            <input
              name="link"
              type="url"
              placeholder="https://…"
              className={inputCls}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Notes(Optional)
            </label>
            <textarea
              name="notes"
              placeholder="Any notes about this role…"
              rows={3}
              className={inputCls}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Save application
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
