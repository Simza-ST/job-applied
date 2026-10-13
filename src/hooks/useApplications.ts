import { useCallback, useEffect, useState } from "react";
import { getApplications, saveApplications } from "../api/applicationsAPI";
import type { Application } from "../types";

// Custom hook for managing applications data.
// It provides state for applications, loading, and error,
// along with functions to add, update, and remove applications.
// The hook also handles persistence of applications to local storage.
export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApplications() // it fetches the applications from the API(localStorage)
      .then(setApplications) // if successful, it updates the state with the fetched applications
      .catch(() => setError("Failed to load applications")) // if failed, it sets an error message
      .finally(() => setLoading(false)); // changes loading state to false regardless of success or failure
  }, []); // empty dependency array means this effect runs once after the initial render

  // The persist function updates the local state and saves the applications to persistent storage.
  // It uses useCallback to memoize the function and prevent unnecessary re-renders.
  const persist = useCallback(async (next: Application[]) => {
    setApplications(next); // updates the current application state with the fresh data array called array
    await saveApplications(next); // it waits untill it save the updated array back to persistent storage
  }, []);

  // The add, update, and remove functions are memoized using useCallback
  // to prevent unnecessary re-creations of these functions on every render.
  // They all rely on the persist function to update both the local state and persistent storage.
  const add = useCallback(
    (app: Application) => persist([...applications, app]), // takes existing applications and add the new application
    [applications, persist], // dependencies ensure the callback is updated if either 'applications' or 'persist' changes
  );

  const update = useCallback(
    (app: Application) =>
      //  If it matches, it swaps in the updated version (app).
      //  If it doesn't match, it leaves the original item (a) untouched
      persist(applications.map((a) => (a.id === app.id ? app : a))),
    [applications, persist],
  );

  const remove = useCallback(
    // it filters out the application with the matching ID
    (id: string) => persist(applications.filter((a) => a.id !== id)),
    [applications, persist],
  );

  return { applications, loading, error, add, update, remove };
}
