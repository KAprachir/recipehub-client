import React from "react";
import { getRecipeById } from "@/lib/api/recipes";
import RecipeDetailsClient from "@/components/recipes/RecipeDetailsClient";

export default async function RecipeDetailsPage({ params }) {
  // ১. Next.js 15 এর নিয়ম অনুযায়ী প্রমিস থেকে আইডি আলাদা করা
  const { id } = await params;

  // ২. সার্ভার সাইড থেকে আইডি দিয়ে রেসিপি ডাটা তুলে আনা
  const recipe = await getRecipeById(id);

  // যদি ডাটাবেজে এই আইডির কোনো রেসিপি না থাকে
  if (!recipe) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-zinc-500 font-bold">Recipe not found!</p>
      </div>
    );
  }

  // ৩. প্রাপ্ত রেসিপি ডাটা ক্লায়েন্ট ভিউ কম্পোনেন্টে প্রপস আকারে পাস করা
  return <RecipeDetailsClient recipe={recipe} />;
}
