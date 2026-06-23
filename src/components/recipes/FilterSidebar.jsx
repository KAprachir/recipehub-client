"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, ListBox } from "@heroui/react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

const CATEGORIES = [
  "Main Course",
  "Breakfast",
  "Dessert",
  "Appetizer",
  "Salad",
  "Beverage",
];

const CUISINES = [
  "All Cuisines",
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "American",
  "Bengali",
  "Thai",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

export default function FilterSidebar({ currentFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local States initialized from URL params
  const [categories, setCategories] = useState(
    currentFilters.category ? currentFilters.category.split(",") : []
  );
  const [cuisine, setCuisine] = useState(currentFilters.cuisine || "All Cuisines");
  const [difficulty, setDifficulty] = useState(currentFilters.difficulty || "");
  const [maxTime, setMaxTime] = useState(currentFilters.maxTime || 60);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Sync state with URL params when they change (e.g. back navigation or external updates)
  useEffect(() => {
    setCategories(currentFilters.category ? currentFilters.category.split(",") : []);
    setCuisine(currentFilters.cuisine || "All Cuisines");
    setDifficulty(currentFilters.difficulty || "");
    setMaxTime(currentFilters.maxTime || 60);
  }, [currentFilters]);

  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // If the filter changes, the page resets to 1
    router.push(`/recipes?${params.toString()}`);
  };

  const handleClearAll = () => {
    setCategories([]);
    setCuisine("All Cuisines");
    setDifficulty("");
    setMaxTime(60);
    router.push("/recipes");
  };

  return (
    <div className="space-y-4 lg:space-y-6 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-900 sticky top-24">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="w-full flex items-center justify-between py-2.5 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-100 active:scale-[0.98] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Filter size={14} className="text-[#046A38] dark:text-emerald-500" />
            <span>Recipe Filters</span>
          </span>
          {isMobileExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Filter Options Wrapper */}
      <div className={`${isMobileExpanded ? "block" : "hidden lg:block"} space-y-6`}>
        <div className="flex items-center justify-between border-b pb-3 pt-2 lg:pt-0">
          <h3 className="font-bold text-sm tracking-wide uppercase text-zinc-500">
            Filters
          </h3>
          <button
            onClick={handleClearAll}
            className="text-xs text-zinc-400 hover:text-emerald-600 transition-all font-semibold cursor-pointer"
          >
            Clear All
          </button>
        </div>

      {/* Category Checkboxes */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          Category
        </label>
        <div className="flex flex-col space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={(e) => {
                  let updated;
                  if (e.target.checked) {
                    updated = [...categories, cat];
                  } else {
                    updated = categories.filter((c) => c !== cat);
                  }
                  setCategories(updated);
                  updateQueryParams("category", updated.join(","));
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border rounded-md flex items-center justify-center transition-all text-white ${
                  categories.includes(cat)
                    ? "bg-emerald-600 border-emerald-600"
                    : "bg-white border-zinc-300 group-hover:border-zinc-400 dark:bg-zinc-950 dark:border-zinc-800 dark:group-hover:border-zinc-600"
                }`}
              >
                {categories.includes(cat) && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 select-none">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Cuisine Select Dropdown */}
      <div className="space-y-2 pt-2">
        <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          Cuisine
        </label>
        <Select
          size="sm"
          variant="bordered"
          selectedKey={cuisine}
          onSelectionChange={(key) => {
            setCuisine(key);
            updateQueryParams("cuisine", key === "All Cuisines" ? "" : key);
          }}
          aria-label="Cuisine"
        >
          <Select.Trigger className="w-full flex items-center justify-between border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl h-10 px-3 text-sm">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="w-full min-w-[200px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-1">
            <ListBox className="outline-none">
              {CUISINES.map((cui) => (
                <ListBox.Item
                  key={cui}
                  id={cui}
                  textValue={cui}
                  className="px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer outline-none flex items-center justify-between selected:bg-emerald-50 dark:selected:bg-emerald-950/20 selected:text-emerald-700 dark:selected:text-emerald-400 font-medium"
                >
                  {cui}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Difficulty Button Matrix */}
      <div className="space-y-2.5 pt-2">
        <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          Difficulty
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DIFFICULTIES.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => {
                const val = difficulty === level ? "" : level;
                setDifficulty(val);
                updateQueryParams("difficulty", val);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                difficulty === level
                  ? "bg-emerald-50 text-emerald-700 border-emerald-400 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Max Time Slider */}
      <div className="space-y-2.5 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Max Time
          </label>
          <span className="text-xs font-bold text-emerald-600">
            {maxTime} min
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="180"
          step="5"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          onMouseUp={() => updateQueryParams("maxTime", maxTime)}
          onTouchEnd={() => updateQueryParams("maxTime", maxTime)}
          className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
      </div>
      </div>
    </div>
  );
}
