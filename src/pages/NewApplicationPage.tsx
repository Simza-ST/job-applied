import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import type { Stage } from "../types";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];

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
    <div className="mx-auto max-w-lg p-4 space-y-4">
      <h1 className="text-xl font-bold">New Application</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required name="jobTitle" placeholder="Job title" className="w-full rounded border px-3 py-2 text-sm" />
        <input required name="company" placeholder="Company" className="w-full rounded border px-3 py-2 text-sm" />
        <select name="stage" defaultValue="wishlist" className="w-full rounded border px-3 py-2 text-sm">
          {STAGES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
        <input name="link" type="url" placeholder="Job URL (optional)" className="w-full rounded border px-3 py-2 text-sm" />
        <input required name="dateApplied" type="date" className="w-full rounded border px-3 py-2 text-sm" />
        <textarea name="notes" placeholder="Notes (optional)" rows={3} className="w-full rounded border px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Save</button>
          <button type="button" onClick={() => navigate("/")} className="rounded border px-4 py-2 text-sm">Cancel</button>
        </div>
      </form>
    </div>
  );
}
