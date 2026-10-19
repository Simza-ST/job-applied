import type { Application, Stage } from "../types";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-600";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

interface Props {
  app: Application;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function ApplicationEditForm({ app, onSave, onCancel }: Props) {
  return (
    <form onSubmit={onSave} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Job Title" required>
          <input required name="jobTitle" defaultValue={app.jobTitle} className={inputCls} />
        </Field>
        <Field label="Company" required>
          <input required name="company" defaultValue={app.company} className={inputCls} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Stage">
          <select name="stage" defaultValue={app.stage} className={inputCls}>
            {STAGES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
        </Field>
        <Field label="Date Applied" required>
          <input required name="dateApplied" type="date" defaultValue={app.dateApplied} className={inputCls} />
        </Field>
      </div>

      <Field label="Job URL">
        <input name="link" type="url" defaultValue={app.link ?? ""} placeholder="https://…" className={inputCls} />
      </Field>

      <Field label="Notes">
        <textarea name="notes" rows={4} defaultValue={app.notes ?? ""} placeholder="Recruiter contact, salary range, prep notes…" className={inputCls} />
      </Field>

      <div className="flex gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          Save changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
