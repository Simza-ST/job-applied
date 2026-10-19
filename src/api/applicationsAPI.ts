import { supabase } from "../lib/supabase";
import type { Application } from "../types";

function toRow(app: Application, userId: string) {
  return {
    id: app.id,
    user_id: userId,
    stage: app.stage,
    job_title: app.jobTitle,
    company: app.company,
    link: app.link ?? null,
    notes: app.notes ?? null,
    date_applied: app.dateApplied,
    created_at: app.createdAt,
  };
}

function fromRow(row: Record<string, unknown>): Application {
  return {
    id: row.id as string,
    stage: row.stage as Application["stage"],
    jobTitle: row.job_title as string,
    company: row.company as string,
    link: (row.link as string) ?? undefined,
    notes: (row.notes as string) ?? undefined,
    dateApplied: row.date_applied as string,
    createdAt: row.created_at as string,
  };
}

async function getUserId(): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user.id;
}

export async function getApplications(): Promise<Application[]> {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(fromRow);
}

export async function addApplication(app: Application): Promise<void> {
  const userId = await getUserId();
  const { error } = await supabase.from("applications").insert(toRow(app, userId));
  if (error) throw new Error(error.message);
}

export async function updateApplication(app: Application): Promise<void> {
  const userId = await getUserId();
  const { error } = await supabase
    .from("applications")
    .update(toRow(app, userId))
    .eq("id", app.id)
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
}

export async function deleteApplication(id: string): Promise<void> {
  const userId = await getUserId();
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
}
