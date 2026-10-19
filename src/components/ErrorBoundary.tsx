import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const safe = error.message.replace(/[\r\n]/g, " ");
    console.error("[ErrorBoundary]", safe, info.componentStack?.split("\n")[0]);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl dark:bg-red-900/30">
            ⚠️
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Something went wrong</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {this.state.error.message}
            </p>
          </div>
          <button
            onClick={() => this.setState({ error: null })}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
