import React from "react";
import { getRecipeById } from "@/lib/api/recipes";
import RecipeDetailsClient from "@/components/recipes/RecipeDetailsClient";

export default async function RecipeDetailsPage({ params }) {
  // 1. Destructure ID from params promise per Next.js 15 rules
  const { id } = await params;

  // 2. Fetch recipe data from server side using ID
  const recipe = await getRecipeById(id);

  // If no recipe with this ID exists in the database
  if (!recipe) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-zinc-500 font-bold">Recipe not found!</p>
      </div>
    );
  }

  // 3. Pass the fetched recipe data to the client view component as props
  return <RecipeDetailsClient recipe={recipe} />;
}
