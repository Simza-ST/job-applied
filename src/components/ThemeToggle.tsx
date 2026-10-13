import { useTheme } from "../context/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="rounded border px-3 py-1.5 text-sm">
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
