interface Props {
  jobTitle: string;
  company: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ jobTitle, company, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-base font-semibold">Delete application?</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-gray-100">{jobTitle}</span> at{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">{company}</span> will be permanently removed.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
