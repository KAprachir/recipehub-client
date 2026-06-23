import React from "react";
import RecipeManagementClient from "@/components/admin/RecipeManagementClient";
import { getAdminRecipesData } from "@/lib/api/recipes";

// Simple function to fetch all recipe data from backend at once

export default async function RecipeManagementPage() {
  const summaryData = await getAdminRecipesData();

  return (
    <div className="space-y-6 p-2 text-zinc-800 dark:text-zinc-200">
      {/* Top Heading */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          Recipe Repository
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Manage and curate your global culinary database with precision.
        </p>
      </div>

      {/* Data passed to Client Component */}
      <RecipeManagementClient summaryData={summaryData} />
    </div>
  );
}
