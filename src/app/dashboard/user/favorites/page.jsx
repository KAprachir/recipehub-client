"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Avatar, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { getUserFavorites } from "@/lib/api/user";
import { toggleFavoriteRecipe } from "@/lib/actions/recipes";
import {
  Search,
  Heart,
  BookOpen,
} from "lucide-react";
import Swal from "sweetalert2";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all favorited recipes on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getUserFavorites();
        setFavorites(data || []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Remove a recipe from favorites list by calling the server action
  const handleRemoveFavorite = async (recipeId, recipeName) => {
    Swal.fire({
      title: "Remove from Favorites?",
      text: `Do you want to remove "${recipeName}" from your favorites list?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#046A38",
      confirmButtonText: "Yes, remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Toggle favorite state on the database (deletes the pairing)
          await toggleFavoriteRecipe(recipeId);
          
          // Instantly filter out the removed recipe from local state to update the UI
          setFavorites((prev) => prev.filter((r) => (r._id || r.id) !== recipeId));
          
          Swal.fire("Removed!", "Recipe removed from favorites.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to remove favorite. Please try again.", "error");
        }
      }
    });
  };

  // Client-side search helper: filters favorited recipes by name or category
  const filteredFavorites = favorites.filter((recipe) => {
    const name = recipe.recipeName || recipe.name || "";
    const category = recipe.category || "";
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Animation variants for container cascading
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-8 text-zinc-800 dark:text-zinc-200 min-h-screen flex flex-col justify-between"
    >
      <div className="space-y-6">
        {/* ─── HEADER AREA ─── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-5"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              My Favorite Recipes
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage and organize your curated collection of professional recipes.
            </p>
          </div>
          
          {/* Search Box Input */}
          <div className="relative flex items-center w-full md:w-80">
            <Search size={18} className="absolute left-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-800/85 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38]/50 transition-all shadow-2xs"
            />
          </div>
        </motion.div>

        {/* ─── FAVORITES CARD GRID ─── */}
        {loading ? (
          <div className="h-60 flex items-center justify-center text-zinc-400 text-sm">
            Loading your favorites...
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="h-60 flex flex-col items-center justify-center text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
            <Heart size={36} className="text-zinc-300 dark:text-zinc-700 mb-2 stroke-[1.5]" />
            <p className="font-semibold text-sm">No favorite recipes found.</p>
            <p className="text-xs text-zinc-400 mt-1">Browse recipes and click the heart icon to add them here.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredFavorites.map((recipe) => {
              const recipeId = recipe._id || recipe.id;
              const recipeName = recipe.recipeName || recipe.name || "Untitled Recipe";
              const recipeImage = recipe.recipeImage || recipe.image || "";
              const chefName = recipe.authorName || recipe.chefName || "Anonymous Chef";
              const chefAvatar = recipe.authorImage || recipe.chefAvatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=100&q=80";

              return (
                <motion.div
                  key={recipeId}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <Link href={`/recipes/${recipeId}`} className="block h-full">
                    <Card className="shadow-sm border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 overflow-hidden rounded-2xl flex flex-col h-full group hover:shadow-md transition-shadow duration-300">
                      
                      {/* Image & Favorite Toggle Button */}
                      <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                        <img
                          src={recipeImage}
                          alt={recipeName}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        
                        {/* Active Heart button matching mockup */}
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevents card link navigation
                            e.stopPropagation();
                            handleRemoveFavorite(recipeId, recipeName);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white dark:bg-zinc-900/90 dark:hover:bg-zinc-900 flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer text-emerald-500 dark:text-emerald-400"
                          title="Remove from favorites"
                        >
                          <Heart size={15} fill="currentColor" className="stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Body Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#046A38] dark:text-emerald-500 uppercase tracking-wider">
                            {recipe.category}
                          </span>
                          <h3 className="text-sm font-black text-zinc-950 dark:text-white tracking-tight leading-snug group-hover:text-[#046A38] dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {recipeName}
                          </h3>
                        </div>

                        {/* Author block matching mockup */}
                        <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-900/60 mt-auto">
                          <Avatar
                            src={chefAvatar}
                            className="w-6 h-6 ring-1 ring-zinc-200 dark:ring-zinc-800"
                            size="sm"
                          />
                          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                            {chefName}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* ─── FOOTER AREA ─── */}
      <motion.footer
        variants={itemVariants}
        className="pt-8 mt-12 border-t border-zinc-200/60 dark:border-zinc-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4"
      >
        <div className="space-y-1 text-left">
          <p className="text-sm font-black text-[#046A38] dark:text-emerald-500 tracking-tight">
            RecipeHub
          </p>
          <p className="text-[10px] text-zinc-400 font-medium">
            &copy; 2024 RecipeHub Professional Culinary Systems. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            About Us
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Contact Support
          </Link>
        </div>
      </motion.footer>
    </motion.div>
  );
}
