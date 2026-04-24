"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // "dark" | "light" | "system"
  const [preference, setPreference] = useState("dark");
  // resolved actual theme applied to DOM
  const [resolved, setResolved] = useState("dark");

  // On mount: read saved preference or default to "dark"
  useEffect(() => {
    const saved = localStorage.getItem("sf-theme") || "dark";
    setPreference(saved);
  }, []);

  // Whenever preference changes, resolve and apply to <html>
  useEffect(() => {
    function apply(pref) {
      let theme;
      if (pref === "system") {
        theme = window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
      } else {
        theme = pref;
      }
      setResolved(theme);
      document.documentElement.setAttribute("data-theme", theme);
    }

    apply(preference);
    localStorage.setItem("sf-theme", preference);

    // If system, also listen for OS changes
    if (preference === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      const handler = () => apply("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [preference]);

  function toggle() {
    // Cycle: dark → light → dark (simple toggle)
    setPreference((p) => {
      if (p === "dark") return "light";
      if (p === "light") return "dark";
      // if system, resolve to opposite of current
      return resolved === "dark" ? "light" : "dark";
    });
  }

  function setTheme(t) {
    setPreference(t); // "dark" | "light" | "system"
  }

  return (
    <ThemeContext.Provider value={{ preference, resolved, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
