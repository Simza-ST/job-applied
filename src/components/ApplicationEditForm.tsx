import type { Application, Stage } from "../types";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];
const inputCls = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 transition";

interface Props {
  app: Application;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function ApplicationEditForm({ app, onSave, onCancel }: Props) {
  return (
    <form onSubmit={onSave} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Job Title *</label>
          <input required name="jobTitle" defaultValue={app.jobTitle} className={inputCls} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Company *</label>
          <input required name="company" defaultValue={app.company} className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Stage</label>
          <select name="stage" defaultValue={app.stage} className={inputCls}>
            {STAGES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Date Applied *</label>
          <input required name="dateApplied" type="date" defaultValue={app.dateApplied} className={inputCls} />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Job URL</label>
        <input name="link" type="url" defaultValue={app.link ?? ""} placeholder="https://…" className={inputCls} />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Notes</label>
        <textarea name="notes" rows={3} defaultValue={app.notes ?? ""} className={inputCls} />
      </div>

      <div className="flex gap-3 pt-1">
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          Save changes
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
