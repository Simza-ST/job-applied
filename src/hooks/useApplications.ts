import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApplications,
  addApplication,
  updateApplication,
  deleteApplication,
} from "../api/applicationsAPI";
import { useToast } from "../context/ToastContext";
import type { Application } from "../types";

const KEY = ["applications"];

export function useApplications() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: applications = [], isLoading: loading, error } = useQuery({
    queryKey: KEY,
    queryFn: getApplications,
    staleTime: 1000 * 60,
  });

  const add = useMutation({
    mutationFn: addApplication,
    onMutate: async (app) => {
      await queryClient.cancelQueries({ queryKey: KEY });
      const prev = queryClient.getQueryData<Application[]>(KEY);
      queryClient.setQueryData(KEY, [app, ...(prev ?? [])]);
      return { prev };
    },
    onError: (_err, _app, ctx) => {
      queryClient.setQueryData(KEY, ctx?.prev);
      toast("Failed to add application. Please try again.", "error");
    },
    onSuccess: () => toast("Application added successfully.", "success"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });

  const update = useMutation({
    mutationFn: updateApplication,
    onMutate: async (app) => {
      await queryClient.cancelQueries({ queryKey: KEY });
      const prev = queryClient.getQueryData<Application[]>(KEY);
      queryClient.setQueryData(KEY, (prev ?? []).map((a) => (a.id === app.id ? app : a)));
      return { prev };
    },
    onError: (_err, _app, ctx) => {
      queryClient.setQueryData(KEY, ctx?.prev);
      toast("Failed to update application. Please try again.", "error");
    },
    onSuccess: () => toast("Application updated successfully.", "success"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });

  const remove = useMutation({
    mutationFn: deleteApplication,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: KEY });
      const prev = queryClient.getQueryData<Application[]>(KEY);
      queryClient.setQueryData(KEY, (prev ?? []).filter((a) => a.id !== id));
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      queryClient.setQueryData(KEY, ctx?.prev);
      toast("Failed to delete application. Please try again.", "error");
    },
    onSuccess: () => toast("Application deleted.", "info"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });

  return {
    applications,
    loading,
    error: error?.message ?? null,
    add: (app: Application) => add.mutateAsync(app),
    update: (app: Application) => update.mutateAsync(app),
    remove: (id: string) => remove.mutateAsync(id),
  };
}
