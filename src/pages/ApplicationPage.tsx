import { Link, useNavigate, useParams } from "react-router-dom";
import { StageBadge } from "../components/StageBadge";
import { useApplications } from "../hooks/useApplications";

export function ApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const { applications, remove } = useApplications();
  const navigate = useNavigate();

  const app = applications.find((a) => a.id === id);
  if (!app) return <p className="p-4">Application not found. <Link to="/" className="underline">Back</Link></p>;

  const handleDelete = async () => {
    await remove(app.id);
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-2xl p-4 space-y-4">
      <Link to="/" className="text-sm underline">← Back</Link>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">{app.jobTitle}</h1>
          <p className="text-gray-500">{app.company}</p>
        </div>
        <StageBadge stage={app.stage} />
      </div>
      {app.link && <a href={app.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">{app.link}</a>}
      {app.notes && <p className="text-sm whitespace-pre-wrap">{app.notes}</p>}
      <p className="text-xs text-gray-400">Applied: {app.dateApplied}</p>
      <button onClick={handleDelete} className="rounded border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
        Delete
      </button>
    </div>
  );
}
