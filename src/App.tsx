import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/ui/Navbar";
import { Toaster } from "./components/ui/Toaster";
import { LoginPage } from "./pages/LoginPage";

const ApplicationsPage  = lazy(() => import("./pages/ApplicationsPage").then(m => ({ default: m.ApplicationsPage })));
const ApplicationPage   = lazy(() => import("./pages/ApplicationPage").then(m => ({ default: m.ApplicationPage })));
const NewApplicationPage = lazy(() => import("./pages/NewApplicationPage").then(m => ({ default: m.NewApplicationPage })));
const NotFoundPage      = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60, retry: 1 } },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <svg className="h-6 w-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );
}

function AuthGate() {
  const { session, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!session) return <LoginPage />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                    element={<ApplicationsPage />} />
            <Route path="/applications/:id"    element={<ApplicationPage />} />
            <Route path="/new"                 element={<NewApplicationPage />} />
            <Route path="/login"               element={<Navigate to="/" replace />} />
            <Route path="*"                    element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <BrowserRouter>
                <AuthGate />
              </BrowserRouter>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
