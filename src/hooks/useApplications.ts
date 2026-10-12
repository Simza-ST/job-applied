import { useCallback, useEffect, useState } from "react";
import { getApplications, saveApplications } from "../api/applications";
import type { Application } from "../types";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApplications()
      .then(setApplications)
      .catch(() => setError("Failed to load applications"))
      .finally(() => setLoading(false));
  }, []);

  const persist = useCallback(async (next: Application[]) => {
    setApplications(next);
    await saveApplications(next);
  }, []);

  const add = useCallback(
    (app: Application) => persist([...applications, app]),
    [applications, persist]
  );

  const update = useCallback(
    (app: Application) =>
      persist(applications.map((a) => (a.id === app.id ? app : a))),
    [applications, persist]
  );

  const remove = useCallback(
    (id: string) => persist(applications.filter((a) => a.id !== id)),
    [applications, persist]
  );

  return { applications, loading, error, add, update, remove };
}
