import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { ApplicationPage } from "./pages/ApplicationPage";
import { NewApplicationPage } from "./pages/NewApplicationPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <ThemeProvider>
       <div className="flex h-screen items-center justify-center bg-slate-900">
      <h1 className="text-3xl font-bold text-amber-500 animate-pulse">
        Tailwind is working!
      </h1>
    </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApplicationsPage />} />
          <Route path="/applications/:id" element={<ApplicationPage />} />
          <Route path="/new" element={<NewApplicationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
