import { useState } from "react";
import type { Application } from "../types";
import { StageBadge } from "./ui/StageBadge";
import { needsNudge, getDaysSinceApplied } from "../lib/applications";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
];

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">{label}</p>
      {children}
    </div>
  );
}

export function ApplicationDetail({ app }: { app: Application }) {
  const [copied, setCopied] = useState(false);
  const days = getDaysSinceApplied(app.dateApplied);
  const nudge = needsNudge(app);

  const copyLink = () => {
    if (!app.link) return;
    navigator.clipboard.writeText(app.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${avatarColor(app.company)}`}>
            {app.company.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">{app.jobTitle}</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{app.company}</p>
          </div>
        </div>
        <StageBadge stage={app.stage} />
      </div>

      {/* Nudge alert */}
      {nudge && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/50 dark:bg-amber-900/20">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            No update in <span className="font-semibold">{days} days</span> — consider following up with the recruiter.
          </p>
        </div>
      )}

      {/* Fields grid */}
      <div className="grid gap-5 border-t border-gray-100 pt-5 sm:grid-cols-2 dark:border-gray-800">
        <Field label="Date Applied">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{app.dateApplied}</span>
            <span className="text-xs text-gray-400">
              ({days === 0 ? "today" : `${days} day${days !== 1 ? "s" : ""} ago`})
            </span>
          </div>
        </Field>

        <Field label="Stage">
          <StageBadge stage={app.stage} />
        </Field>

        {app.link && (
          <Field label="Job Posting">
            <div className="flex items-center gap-2">
              <a
                href={app.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View posting
              </a>
              <button
                onClick={copyLink}
                title="Copy link"
                className="rounded-lg border border-gray-200 p-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                {copied ? (
                  <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </Field>
        )}

        {app.notes && (
          <div className="sm:col-span-2">
            <Field label="Notes">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">{app.notes}</p>
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}
