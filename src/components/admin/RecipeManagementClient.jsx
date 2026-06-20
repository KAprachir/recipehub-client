"use client";
import React, { useState } from "react";
import { Card, Avatar, Button, Switch } from "@heroui/react";
import {
  Utensils,
  Star,
  Eye,
  TrendingUp,
  Edit2,
  Trash2,
  MoreVertical,
} from "lucide-react";
import Swal from "sweetalert2";
import { deleteRecipe } from "@/lib/actions/recipes";

export default function RecipeManagementClient({ summaryData }) {
  const [recipes, setRecipes] = useState(summaryData?.recipes || []);

  // ১. Feature / Unfeature Recipe Toggle Handler
  const handleToggleFeature = async (
    recipeId,
    currentFeaturedState,
    recipeName,
  ) => {
    const nextState = !currentFeaturedState;
    try {
      setRecipes((prev) =>
        prev.map((rec) =>
          rec._id === recipeId ? { ...rec, isFeatured: nextState } : rec,
        ),
      );

      // ব্যাকএন্ডের PATCH API কল করার জায়গা
      // await fetch(`/api/admin/recipes/${recipeId}/feature`, { method: 'PATCH', body: JSON.stringify({ isFeatured: nextState }) });

      Swal.fire({
        title: nextState ? "Added to Featured! ⭐" : "Removed from Featured",
        text: `"${recipeName}" স্ট্যাটাস আপডেট হয়েছে।`,
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      setRecipes((prev) =>
        prev.map((rec) =>
          rec._id === recipeId
            ? { ...rec, isFeatured: currentFeaturedState }
            : rec,
        ),
      );
      Swal.fire("Error", "Failed to update featured configuration.", "error");
    }
  };

  // ২. Delete Recipe Handler
  const handleDeleteRecipe = (recipeId, recipeName) => {
    Swal.fire({
      title: `Delete "${recipeName}"?`,
      text: "এটি মঙ্গোডিবি থেকে চিরতরে ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ব্যাকএন্ড ডিলিট API কল করার জায়গা
          await deleteRecipe(recipeId);

          setRecipes((prev) => prev.filter((rec) => rec._id !== recipeId));
          Swal.fire("Deleted!", "Recipe has been safely removed.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete item.", "error");
        }
      }
    });
  };

  // ক্যাটাগরি চিপস স্টাইল ম্যাপিং
  const getCategoryChipStyle = (cat) => {
    switch (cat?.toLowerCase()) {
      case "seafood":
        return "bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400 border border-teal-100 dark:border-teal-900/50";
      case "italian":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50";
      case "dessert":
        return "bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50";
      default:
        return "bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── TOP CARD METRICS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl flex flex-row items-center gap-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 rounded-xl">
            <Utensils size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Total Recipes
            </p>
            <p className="text-xl font-black mt-0.5">
              {summaryData?.totalCount || "0"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl flex flex-row items-center gap-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 rounded-xl">
            <Star size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Featured
            </p>
            <p className="text-xl font-black mt-0.5">
              {summaryData?.featuredCount || "0"}
            </p>
          </div>
        </Card>
        <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl flex flex-row items-center gap-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 rounded-xl">
            <Eye size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Avg Views
            </p>
            <p className="text-xl font-black mt-0.5">3.8k</p>
          </div>
        </Card>
        <Card className="p-4 bg-[#10B981] text-white rounded-2xl flex flex-row items-center gap-4 shadow-sm">
          <div className="p-3 bg-white/20 text-white rounded-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
              Growth
            </p>
            <p className="text-xl font-black mt-0.5">+12.4%</p>
          </div>
        </Card>
      </div>

      {/* ─── CORE RECIPES TABLE ─── */}
      <div className="w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-xs">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-900/60 border-b border-zinc-200/60 dark:border-zinc-800/80">
                <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                  Recipe Details
                </th>
                <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                  Author
                </th>
                <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                  Category
                </th>
                <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase text-center">
                  Featured
                </th>
                <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {recipes.map((recipe) => (
                <tr
                  key={recipe._id}
                  className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20 transition-colors"
                >
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100 dark:border-zinc-800">
                        <img
                          src={recipe.recipeImage}
                          alt={recipe.recipeName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                          {recipe.recipeName}
                        </p>
                        <p className="text-[10px] font-semibold text-zinc-400 tracking-wider mt-0.5">
                          ID: #{recipe._id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Avatar src={recipe.authorImage} className="w-6 h-6" />
                      <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                        {recipe.authorName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full ${getCategoryChipStyle(recipe.category)}`}
                    >
                      {recipe.category}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <Switch
                        size="sm"
                        color="success"
                        isSelected={recipe.isFeatured}
                        onValueChange={() =>
                          handleToggleFeature(
                            recipe._id,
                            recipe.isFeatured,
                            recipe.recipeName,
                          )
                        }
                      />
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="light"
                        isIconOnly
                        size="sm"
                        className="text-zinc-400 hover:text-zinc-700"
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button
                        variant="light"
                        isIconOnly
                        size="sm"
                        onClick={() =>
                          handleDeleteRecipe(recipe._id, recipe.recipeName)
                        }
                        className="text-zinc-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </Button>
                      <Button
                        variant="light"
                        isIconOnly
                        size="sm"
                        className="text-zinc-300"
                      >
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
