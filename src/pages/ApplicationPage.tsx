import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import { ApplicationDetail } from "../components/ApplicationDetail";
import { ApplicationEditForm } from "../components/ApplicationEditForm";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import type { Stage } from "../types";

export function ApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const { applications, loading, update, remove } = useApplications();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 animate-pulse">
        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2 dark:border-gray-800">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-2.5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const app = applications.find((a) => a.id === id);
  if (!app) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl dark:bg-gray-800">🔍</div>
      <p className="font-semibold">Application not found</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">It may have been deleted or the link is invalid.</p>
      <Link to="/" className="mt-2 text-sm text-blue-600 hover:underline dark:text-blue-400">← Back to dashboard</Link>
    </div>
  );

  const handleDelete = async () => {
    await remove(app.id);
    navigate("/");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await update({
      ...app,
      jobTitle: fd.get("jobTitle") as string,
      company: fd.get("company") as string,
      stage: fd.get("stage") as Stage,
      link: fd.get("link") as string,
      notes: fd.get("notes") as string,
      dateApplied: fd.get("dateApplied") as string,
    });
    setEditing(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to dashboard
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {editing
          ? <ApplicationEditForm app={app} onSave={handleUpdate} onCancel={() => setEditing(false)} />
          : <ApplicationDetail app={app} />
        }
      </div>

      {!editing && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800/50 dark:text-red-400 dark:hover:bg-red-950/50"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}

      {confirmDelete && (
        <DeleteConfirmModal
          jobTitle={app.jobTitle}
          company={app.company}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}
