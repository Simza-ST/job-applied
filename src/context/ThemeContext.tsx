//useState tracks the active mode, and useEffect updates the browser when things change.
import { useEffect, useState } from "react";
import {type Theme, ThemeContext } from "./useTheme";


// The ThemeProvider component is responsible for managing the theme state
// and providing it to its children components through the ThemeContext.
export function ThemeProvider({ children }: { children: React.ReactNode }) {//if the prop is one you can declare the type like this
  const [theme, setTheme] = useState<Theme>(
    // The useState hook initializes the theme state.
    // The initial value is determined by checking the localStorage for a saved theme.
    // If a theme is found, it's used; otherwise, the default is "light".
    () => (localStorage.getItem("theme") as Theme) ?? "light",
  );

  useEffect(() => {
    // The useEffect hook runs whenever the theme state changes.
    // It adds or removes the "dark" class from the document's root element based on the theme.
    // It also saves the current theme to localStorage.
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);//instructs the effect to only run when the 'theme' variable changes.

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
