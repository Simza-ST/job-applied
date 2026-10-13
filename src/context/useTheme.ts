//createContext and useContext are used to share data globally across components
//without passing props manually.
import {createContext, useContext } from 'react';

export type Theme = "light" | "dark";

// The createContext function creates the global data container called ThemeContext.
// The ThemeContext is created with a default value of null.
// It will hold the current theme and a function to toggle the theme.
export const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(
  null,
);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}