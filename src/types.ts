export type Stage =
  | "wishlist"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "closed";

export interface Application {
  id: string;
  stage: Stage;
  jobTitle: string;
  company: string;
  link?: string;
  notes?: string;
  dateApplied: string;
  createdAt: string;
}
