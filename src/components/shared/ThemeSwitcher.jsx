"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Determine the initial theme from localStorage or system theme settings
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = storedTheme || systemTheme;

    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-850 dark:text-neutral-250 transition-all cursor-pointer border border-neutral-200/50 dark:border-neutral-750 flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
      aria-label="Toggle Theme Mode"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-amber-500 animate-spin-slow" />
      ) : (
        <Moon size={18} className="text-indigo-600" />
      )}
    </button>
  );
}
