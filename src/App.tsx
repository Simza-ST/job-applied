import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/ui/Navbar";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { ApplicationPage } from "./pages/ApplicationPage";
import { NewApplicationPage } from "./pages/NewApplicationPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
          <BrowserRouter>
            <Navbar />
            <main className="mx-auto max-w-4xl px-4 py-8">
              <Routes>
                <Route path="/" element={<ApplicationsPage />} />
                <Route path="/applications/:id" element={<ApplicationPage />} />
                <Route path="/new" element={<NewApplicationPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
