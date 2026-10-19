import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import type { Stage } from "../types";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">{title}</p>
      {children}
    </div>
  );
}

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

export function NewApplicationPage() {
  const { add } = useApplications();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
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
          Add a new job application to your pipeline.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Section title="Role">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Job Title" required>
              <input required name="jobTitle" placeholder="e.g. Frontend Engineer" className={inputCls} />
            </Field>
            <Field label="Company" required>
              <input required name="company" placeholder="e.g. Acme Corp" className={inputCls} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Job URL">
              <input name="link" type="url" placeholder="https://…" className={inputCls} />
            </Field>
          </div>
        </Section>

        <Section title="Status">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Stage">
              <select name="stage" defaultValue="wishlist" className={inputCls}>
                {STAGES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </Field>
            <Field label="Date Applied" required>
              <input required name="dateApplied" type="date" className={inputCls} />
            </Field>
          </div>
        </Section>

        <Section title="Notes">
          <textarea
            name="notes"
            placeholder="Recruiter contact, salary range, interview prep…"
            rows={4}
            className={inputCls}
          />
        </Section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60"
          >
            {saving && (
              <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {saving ? "Saving…" : "Save application"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
