import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import { ApplicationDetail } from "../components/ApplicationDetail";
import { ApplicationEditForm } from "../components/ApplicationEditForm";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import type { Stage } from "../types";

export function ApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const { applications, update, remove } = useApplications();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const app = applications.find((a) => a.id === id);
  if (!app) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
      <p className="text-lg font-semibold">Application not found.</p>
      <Link to="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">← Back to list</Link>
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
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
        ← Back
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {editing
          ? <ApplicationEditForm app={app} onSave={handleUpdate} onCancel={() => setEditing(false)} />
          : <ApplicationDetail app={app} />
        }
      </div>

      {!editing && (
        <div className="flex gap-3">
          <button onClick={() => setEditing(true)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            Edit
          </button>
          <button onClick={() => setConfirmDelete(true)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 transition-colors">
            Delete application
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
