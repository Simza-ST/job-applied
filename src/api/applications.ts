import type { Application } from "../types";

const KEY = "job-applied:applications";
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getApplications(): Promise<Application[]> {
  await delay();
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Application[]) : [];
}

export async function saveApplications(apps: Application[]): Promise<void> {
  await delay();
  localStorage.setItem(KEY, JSON.stringify(apps));
}
