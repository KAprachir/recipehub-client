"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, ListBox } from "@heroui/react";

export default function SortDropdown({ initialSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (key) => {
    if (!key) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", key);
    params.set("page", "1"); // Reset to page 1 on sort change
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <Select
      aria-label="Sort By"
      selectedKey={initialSort || "Newest"}
      onSelectionChange={handleSortChange}
    >
      <Select.Trigger className="w-full flex items-center justify-between border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl h-10 px-3 text-sm">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="w-full min-w-[176px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-1">
        <ListBox className="outline-none">
          <ListBox.Item
            key="Newest"
            id="Newest"
            textValue="Newest"
            className="px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer outline-none flex items-center justify-between selected:bg-emerald-50 dark:selected:bg-emerald-950/20 selected:text-emerald-700 dark:selected:text-emerald-400 font-medium"
          >
            Newest
          </ListBox.Item>
          <ListBox.Item
            key="Popular"
            id="Popular"
            textValue="Popular"
            className="px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer outline-none flex items-center justify-between selected:bg-emerald-50 dark:selected:bg-emerald-950/20 selected:text-emerald-700 dark:selected:text-emerald-400 font-medium"
          >
            Most Popular
          </ListBox.Item>
          <ListBox.Item
            key="PrepTime"
            id="PrepTime"
            textValue="PrepTime"
            className="px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer outline-none flex items-center justify-between selected:bg-emerald-50 dark:selected:bg-emerald-950/20 selected:text-emerald-700 dark:selected:text-emerald-400 font-medium"
          >
            Preparation Time
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
