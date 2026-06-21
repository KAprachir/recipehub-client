export const dynamic = "force-dynamic";

import React from "react";
import FilterSidebar from "@/components/recipes/FilterSidebar";
import BrowseRecipeCard from "@/components/cards/BrowseRecipeCard";
import PaginationSection from "@/components/recipes/PaginationSection";
import SortDropdown from "@/components/recipes/SortDropdown";
import { getRecipes } from "@/lib/api/recipes"; // আপনার এক্সিস্টিং এপিআই ফাংশন

export default async function RecipesPage(props) {
  // Next.js 15-এ searchParams প্রমিস আকারে আসে
  const searchParams = await props.searchParams;

  const currentPage = parseInt(searchParams.page) || 1;
  const selectedCategory = searchParams.category || "";
  const selectedCuisine = searchParams.cuisine || "";
  const selectedDifficulty = searchParams.difficulty || "";
  const maxTime = searchParams.maxTime || "";
  const sortBy = searchParams.sortBy || "Newest";

  // ফিল্টার অবজেক্টটি আপনার ব্যাকএন্ড এপিআই-তে পাস করা হচ্ছে
  const { recipes, totalCount } = await getRecipes({
    page: currentPage,
    category: selectedCategory,
    cuisine: selectedCuisine,
    difficulty: selectedDifficulty,
    maxTime: maxTime,
    sortBy: sortBy,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-zinc-800 dark:text-zinc-200">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT COLUMN: FILTERS SIDEBAR (Client Component) */}
        <div className="lg:col-span-1">
          <FilterSidebar currentFilters={searchParams} />
        </div>

        {/* RIGHT COLUMN: MAIN RECIPE CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Title & Sorting Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-5">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Browse All Recipes
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Discover over {totalCount ?? 0} professional culinary creations.
              </p>
            </div>

            <div className="w-44">
              <SortDropdown initialSort={sortBy} />
            </div>
          </div>

          {/* Recipes Card Grid */}
          {recipes?.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center text-zinc-400">
              <p className="font-semibold">
                No recipes found matching the selected filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes?.map((recipe) => (
                <BrowseRecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}

          {/* Bottom Pagination Area */}
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
            <PaginationSection
              totalCount={totalCount ?? 0}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
