import type { Application, Stage } from "../../types";
import { countByStage } from "../../lib/applications";

const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "rejected", "closed"];

const STAGE_CONFIG: Record<Stage, { color: string; activeBg: string; icon: React.ReactNode }> = {
  wishlist: {
    color: "text-gray-600 dark:text-gray-300",
    activeBg: "bg-gray-50 border-gray-400 dark:bg-gray-800/60",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>,
  },
  applied: {
    color: "text-blue-600 dark:text-blue-400",
    activeBg: "bg-blue-50 border-blue-500 dark:bg-blue-900/30",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  interview: {
    color: "text-yellow-600 dark:text-yellow-400",
    activeBg: "bg-yellow-50 border-yellow-500 dark:bg-yellow-900/30",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  },
  offer: {
    color: "text-green-600 dark:text-green-400",
    activeBg: "bg-green-50 border-green-500 dark:bg-green-900/30",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  rejected: {
    color: "text-red-600 dark:text-red-400",
    activeBg: "bg-red-50 border-red-500 dark:bg-red-900/30",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  closed: {
    color: "text-slate-500 dark:text-slate-400",
    activeBg: "bg-slate-50 border-slate-400 dark:bg-slate-800/60",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
  },
};

interface Props {
  applications: Application[];
  activeStage: Stage | "all";
  onStageClick: (s: Stage | "all") => void;
}

export function StageSummary({ applications, activeStage, onStageClick }: Props) {
  const counts = countByStage(applications);
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {STAGES.map((s) => {
        const { color, activeBg, icon } = STAGE_CONFIG[s];
        const isActive = activeStage === s;
        const count = counts[s] ?? 0;
        return (
          <button
            key={s}
            onClick={() => onStageClick(isActive ? "all" : s)}
            className={`group rounded-xl border px-3 py-3 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isActive
                ? `${activeBg} ring-1 ring-inset ring-current/20`
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
            }`}
          >
            <p className={`text-xl font-bold tabular-nums ${color}`}>{count}</p>
            <p className={`mt-1 flex items-center justify-center gap-1 text-xs capitalize ${isActive ? color : "text-gray-500 dark:text-gray-400"}`}>
              {icon}
              {s}
            </p>
          </button>
        );
      })}
    </div>
  );
}
