"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Avatar } from "@heroui/react";
import {
  Clock,
  Flame,
  Globe,
  Layers,
  Heart,
  ArrowLeft,
  ShoppingBag,
  Info,
  CheckCircle2,
  Lightbulb,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import { getUserFavorites } from "@/lib/api/user";
import { toggleFavoriteRecipe } from "@/lib/actions/recipes";

export default function RecipeDetailsClient({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  // Check active user authentication state
  const { user } = useAuth();

  // Load user's favorite status on page mount or user auth state change
  useEffect(() => {
    if (user && recipe?._id) {
      const loadFavoriteStatus = async () => {
        try {
          const favorites = await getUserFavorites();
          if (Array.isArray(favorites)) {
            // Check if current recipe._id exists in user's favorites list
            const isFav = favorites.some((fav) => fav._id === recipe._id);
            setIsFavorited(isFav);
          }
        } catch (error) {
          console.error("Failed to load favorite status:", error);
        }
      };
      loadFavoriteStatus();
    }
  }, [user, recipe?._id]);

  // Request the backend to toggle favorite status (adds or removes)
  const handleFavoriteToggle = async () => {
    // Restrict favoriting to logged-in users only
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to be logged in to favorite recipes.",
        icon: "warning",
        confirmButtonColor: "#00693E",
      });
      return;
    }

    try {
      const response = await toggleFavoriteRecipe(recipe._id);
      
      // Update UI state and notify user based on backend toggle results
      if (response.action === "added") {
        setIsFavorited(true);
        Swal.fire({
          title: "Added!",
          text: "Recipe added to your favorites.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else if (response.action === "removed") {
        setIsFavorited(false);
        Swal.fire({
          title: "Removed!",
          text: "Recipe removed from your favorites.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to toggle favorite status. Please try again.",
        icon: "error",
      });
    }
  };

  const handlePurchase = () => {
    Swal.fire({
      title: "Redirecting to Stripe...",
      text: `Securing payment for ${recipe.recipeName}`,
      icon: "info",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      setHasPurchased(true);
      Swal.fire(
        "Unlocked 🎉",
        "You now have lifetime access to this recipe!",
        "success",
      );
    });
  };

  const handleReport = () => {
    Swal.fire({
      title: "Report Recipe",
      input: "select",
      inputOptions: {
        spam: "Spam",
        offensive: "Offensive Content",
        copyright: "Copyright Issue",
      },
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Report Received",
          "Thank you. Admin will moderate this content shortly.",
          "success",
        );
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8 bg-zinc-50/50 dark:bg-zinc-950/20 text-zinc-800 dark:text-zinc-200 min-h-screen">
      {/* Back Navigator */}
      <Link
        href="/recipes"
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft size={14} /> <span>Back to Recipes</span>
      </Link>

      {/* ─── TOP SECTION ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Banner Frame */}
        <div className="lg:col-span-2 relative h-[360px] rounded-3xl overflow-hidden shadow-md group border border-zinc-200/40 dark:border-zinc-800/40">
          <img
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <div className="flex gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-1 rounded-md">
                Featured
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black px-2.5 py-1 rounded-md">
                Masterclass
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
              {recipe.recipeName}
            </h1>
          </div>
        </div>

        {/* Action Controls Side Card */}
        <Card className="p-5 border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between rounded-3xl h-full">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={
                  recipe.authorImage ||
                  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
                }
                className="w-10 h-10 ring-2 ring-offset-2 ring-emerald-500 dark:ring-offset-zinc-900"
              />
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Authored by
                </p>
                <p className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">
                  {recipe.authorName || "Anonymous Chef"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40">
              <Heart size={14} className="fill-red-500 text-red-500" />
              <span>{recipe.likesCount || 0}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center gap-2.5 border border-zinc-100 dark:border-zinc-800/40">
              <Layers size={16} className="text-emerald-600" />
              <div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                  Category
                </p>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 truncate">
                  {recipe.category}
                </p>
              </div>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center gap-2.5 border border-zinc-100 dark:border-zinc-800/40">
              <Globe size={16} className="text-emerald-600" />
              <div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                  Cuisine
                </p>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {recipe.cuisineType}
                </p>
              </div>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center gap-2.5 border border-zinc-100 dark:border-zinc-800/40">
              <Clock size={16} className="text-emerald-600" />
              <div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                  Prep Time
                </p>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {recipe.preparationTime} mins
                </p>
              </div>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center gap-2.5 border border-zinc-100 dark:border-zinc-800/40">
              <Flame size={16} className="text-emerald-600" />
              <div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                  Difficulty
                </p>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {recipe.difficultyLevel}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              onClick={handlePurchase}
              disabled={hasPurchased}
              className={`w-full font-bold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all ${
                hasPurchased
                  ? "bg-zinc-100 dark:bg-zinc-800 text-emerald-600 cursor-default"
                  : "bg-[#00693E] hover:bg-[#005230] text-white"
              }`}
            >
              {hasPurchased ? (
                <CheckCircle2 size={16} />
              ) : (
                <ShoppingBag size={16} />
              )}
              <span>
                {hasPurchased
                  ? "Recipe Unlocked"
                  : `Unlock Premium Recipe — $${recipe.price || "4.99"}`}
              </span>
            </Button>

            <div className="flex gap-2">
              <Button
                variant="bordered"
                onClick={handleFavoriteToggle}
                className={`flex-1 font-bold py-6 border-zinc-200 dark:border-zinc-700 rounded-xl transition-all ${isFavorited ? "bg-red-50/50 text-red-500 border-red-200" : ""}`}
              >
                <Heart
                  size={16}
                  className={isFavorited ? "fill-currentColor" : ""}
                />
                <span>Favorite</span>
              </Button>
              <Button
                variant="bordered"
                isIconOnly
                onClick={handleReport}
                className="border-zinc-200 dark:border-zinc-700 p-6 rounded-xl text-zinc-400 hover:text-red-500 transition-all"
              >
                <Info size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* ─── BOTTOM SPLIT SECTION ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Ingredients Array Loop */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-extrabold border-b border-zinc-200/60 pb-3">
            <ShoppingBag size={18} />{" "}
            <h2 className="text-base uppercase tracking-wide">Ingredients</h2>
          </div>
          <div className="flex flex-col space-y-2">
            {recipe.ingredients?.map((ing, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xs"
              >
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {typeof ing === "string" ? ing : ing.name}
                </span>
                {ing.amount && (
                  <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md text-emerald-700 dark:text-emerald-400">
                    {ing.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
          {recipe.chefTip && (
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100/70 dark:border-emerald-900/30 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Lightbulb size={14} /> <span>Chef's Tip</span>
              </div>
              <p className="text-xs text-emerald-900/80 dark:text-emerald-400/80 italic font-medium leading-relaxed">
                "{recipe.chefTip}"
              </p>
            </div>
          )}
        </div>

        {/* Instructions Steps Loop */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-extrabold border-b border-zinc-200/60 pb-3">
            <FileText size={18} />{" "}
            <h2 className="text-base uppercase tracking-wide">
              Culinary Instructions
            </h2>
          </div>
          <div className="flex flex-col space-y-6 relative pl-4 border-l border-dashed border-zinc-200 dark:border-zinc-800">
            {/* If instructions is stored as an array of objects or single block text string */}
            {Array.isArray(recipe.instructions) ? (
              recipe.instructions.map((inst, index) => (
                <div key={index} className="space-y-3 relative group">
                  <span className="absolute -left-[27px] top-0.5 w-6 h-6 rounded-full bg-[#00693E] text-white text-xs font-black flex items-center justify-center shadow-xs">
                    {inst.step || index + 1}
                  </span>
                  <div className="space-y-1">
                    {inst.title && (
                      <h3 className="text-base font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">
                        {inst.title}
                      </h3>
                    )}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      {inst.description || inst}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                {recipe.instructions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
