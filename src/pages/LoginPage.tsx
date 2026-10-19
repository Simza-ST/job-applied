import { useState } from "react";
import { supabase } from "../lib/supabase";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fn =
      mode === "signup"
        ? supabase.auth.signUp({ email, password })
        : supabase.auth.signInWithPassword({ email, password });
    const { error } = await fn;
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // on success the component unmounts — don't call setLoading
  }

  async function handleMagicLink() {
    if (!email) { setError("Enter your email first."); return; }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setMagicSent(true);
    setLoading(false);
  }

  const inputCls =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg">
            JT
          </span>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">JobTracker</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to manage your applications</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {magicSent ? (
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              ✉️ Check your email for a magic link!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMode(m); setError(""); }}
                    className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                      mode === m
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label htmlFor="email" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Email</label>
                  <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="password" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Password</label>
                  <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" minLength={6} />
                </div>
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </button>

              <button
                type="button"
                onClick={handleMagicLink}
                disabled={loading}
                className="text-xs text-blue-600 hover:underline disabled:opacity-50"
              >
                Send magic link instead
              </button>
            </form>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">Your data is private and only visible to you.</p>
      </div>
    </div>
  );
}
