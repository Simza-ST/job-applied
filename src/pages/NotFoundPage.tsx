import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500">Page not found.</p>
      <Link to="/" className="text-blue-600 underline">Go home</Link>
    </div>
  );
}
