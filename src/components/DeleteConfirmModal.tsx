import { useEffect, useRef } from "react";

interface Props {
  jobTitle: string;
  company: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ jobTitle, company, onConfirm, onCancel }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h2 id="delete-modal-title" className="text-base font-semibold text-gray-900 dark:text-gray-100">Delete application?</h2>
        <p id="delete-modal-desc" className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-gray-100">{jobTitle}</span>
          {" "}at{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">{company}</span>
          {" "}will be permanently removed. This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2.5">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
